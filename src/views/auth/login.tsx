// IMPORT - LIBRARYS //
import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { 
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Input,
  Link
} from "@nextui-org/react";

// IMPORT - COMPONENTS //
import { ThemeSwitcher } from "../../components/themeSwitcher";
import { Loading } from './../../components/loading.tsx';

// IMPORT - ICONS //
import {
  EyeIcon,
  EyeInvisibleIcon
} from './../../icons/icons.tsx';

// IMPORT - IMAGES //
import logo from "../../../public/images/CrushIf_Logo-removebg-preview.png"

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
            setClickedButton(true);
            setMessageError("")

            const response = await axios.post(`https://crush-api.vercel.app/auth/login`, formData);

            localStorage.setItem("userId", response.data.user._id)

            if (!response.data.logged) {
                setMessageError(response.data.message);
            }
            else {
                window.location.href = '/';
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const messageError: any = error;

                console.log(messageError.response?.data.messsage);
                setMessageError(messageError.response?.data.message ? messageError.response.data.message : "Verifique sua conexão")
            }
        } finally {
            setClickedButton(false)
        }
    };

  return (
    <>
      <div className="flex flex-row justify-end items-center w-full">
        <ThemeSwitcher className="my-1.5 mx-2" />
      </div>

      <div className="flex flex-col justify-center items-center">
        <Card
          shadow="lg"
          radius="lg">
          <CardHeader className="flex gap-3">
            <img 
              src={logo} 
              alt="logo crush ifto" 
              className="w-20 h-20" />
            
            <div className="flex flex-col">
              <h2 className="font-Poppins font-semibold text-2xl md:text-3xl">Faça Login!</h2>
              <p className="font-Poppins text-default font-medium text-xs md:text-sm">Faça login para ter acesso a plataforma.</p>
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
                  isRequired
                  radius="full"
                  type="nickname"
                  label="Usuário"
                  placeholder="Ex: nickname"
                   className="font-Poppins font-medium w-5/6" 
                   name="nickname" 
                   onChange={handleChange} 
                   errorMessage={messageError == "Usuário não encontrado." ? messageError : null} />
              </div>

              <div className="flex flex-row justify-center items-center">
                <Input 
                  isRequired
                  radius="full"
                  label="Senha"
                  placeholder="Ex: ******"
                  className="font-Poppins font-medium w-5/6"
                  name="password"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                      <EyeInvisibleIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                      <EyeIcon className="text-2xl text-default-400 pointer-events-none"/>
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  onChange={handleChange} 
                  errorMessage={messageError == "Senha incorreta, tente novamente." ? messageError : null} />
              </div>
              <Divider />

              <div className="flex flex-row justify-center items-center">
                <Button 
                  color="primary" 
                  size="lg"
                  radius="full"
                  className="font-Poppins font-bold uppercase w-5/6" 
                  type="submit" 
                  onClick={() => setClickedButton(true)}>Entrar</Button>
              </div>

              <div className="flex flex-col justify-center items-center text-center">
                <div>
                {clickedButton ? <Loading /> : null}
                </div>

                <Link className="flex flex-row justify-center items-center  w-full" href="register">
                  <Button
                    className="font-Poppins font-bold uppercase w-5/6"
                    color="primary"
                    radius="full"
                    size="lg"
                    variant="bordered">
                      Registre-se
                  </Button>
                </Link>          
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

// EXPORT - PAGE //
export default LoginPage;