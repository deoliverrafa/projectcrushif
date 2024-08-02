// IMPORT - LIBRARYS //
import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

// IMPORT - COMPONENTS //
import { ThemeSwitcher } from "../../components/themeSwitcher";
import { Loading } from './../../components/loading.tsx';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Input,
  Link
} from "@nextui-org/react";

// IMPORT - ICONS //
import {
  Eye,
  EyeOff
} from 'lucide-react';

// IMPORT - IMAGES //
import logo from "../../../public/images/logo/logo.png"

// CREATE - INTERFACES //
interface UserDataLogin {
  nickname: string
  password: string
}

// COMPONENT - LOGIN PAGE //
const LoginPage = () => {
  const [clickedButton, setClickedButton] = useState(false);
  const [messageError, setMessageError] = useState(String);
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);


  const [formData, setFormData] = useState({
    nickname: "",
    password: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData: UserDataLogin) => ({
      ...prevData,
      [name]: value
    }
    ));
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setMessageError("")

      const response = await axios.post(`https://crushapi-4ped.onrender.com/auth/login`, formData);

      if (response.data.logged == true) {
        setClickedButton(false);
        localStorage.setItem('token', response.data.token)
        window.location.href = '/';
      } else {
        setClickedButton(false)
        setMessageError(response.data.message);
      }
    } catch (error: any) {
      setMessageError(error.response.data.message)
      setClickedButton(false)
    }
  };

  return (
    <div className="flex flex-col w-full h-dvh items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row justify-end items-center w-full">
          <ThemeSwitcher className="my-1.5 mx-2" />
        </div>

        <div>
          <Card
            radius="lg">
            <CardHeader className="flex gap-3">
              <img
                src={logo}
                alt="logo crush ifto"
                className="w-20 h-20" />

              <div className="flex flex-col">
                <h2 className="font-poppins font-semibold uppercase tracking-widest text-2xl md:text-3xl">Faça Login</h2>
                <p className="text-default font-poppins tracking-tight text-xs md:text-sm">Faça login para ter acesso a plataforma</p>
              </div>
            </CardHeader>
            <Divider />

            <CardBody>
              <form
                action="register"
                method="POST"
                className="flex flex-col relative gap-5"
                onSubmit={handleSubmit}>
                <div className="flex flex-row justify-center items-center">
                  <Input
                    isClearable
                    radius="lg"
                    size="sm"
                    type="nickname"
                    label="Usuário"
                    placeholder="ex: nickname"
                    className="font-inter font-medium w-5/6"
                    name="nickname"
                    onChange={handleChange}
                    errorMessage={messageError == "Usuário não encontrado." ? messageError : null} />
                </div>

                <div className="flex flex-row justify-center items-center">
                  <Input
                    radius="lg"
                    size="sm"
                    label="Senha"
                    placeholder="ex: ••••••"
                    className="text-default font-inter font-medium w-5/6"
                    name="password"
                    endContent={
                      <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                          <EyeOff className="text-2xl text-default pointer-events-none" />
                        ) : (
                          <Eye className="text-2xl text-default pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    onChange={handleChange}
                    errorMessage={messageError == "Senha incorreta, tente novamente." ? messageError : null} />
                </div>
                <Divider />

                <div className="text-2xl text-default text-center">
                  <p className="font-inter text-default font-medium text-sm md:text-sm ">{messageError}</p>
                </div>

                <div className="flex flex-row justify-center items-center">
                  <Button
                    color="primary"
                    size="md"
                    radius="full"
                    className="font-poppins tracking-widest font-bold uppercase w-5/6"
                    type="submit"
                    onClick={() => setClickedButton(true)}>Entrar</Button>
                </div>

                <div className="flex flex-col justify-center items-center text-center">
                  <div>
                    {clickedButton ? <Loading /> : null}
                  </div>

                  <Link className="flex flex-row justify-center items-center  w-full" href="register">
                    <Button
                      className="font-poppins font-bold uppercase tracking-widest w-5/6"
                      color="primary"
                      radius="full"
                      size="md"
                      variant="bordered">
                      Registre-se
                    </Button>
                  </Link>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

// EXPORT - PAGE //
export default LoginPage;