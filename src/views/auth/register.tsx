// IMPORT - LIBRARYS //
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Select,
  SelectItem,
  Input,
  Link
} from "@nextui-org/react";

// IMPORT - COMPONENTS //
import { ThemeSwitcher } from "../../components/themeSwitcher";
import { Loading } from './../../components/loading.tsx';

// IMPORT - ICONS //
import {
  EyeInvisibleIcon,
  EyeIcon
} from './../../icons/icons.tsx';

// IMPORT - IMAGES //
import logo from "../../../public/images/CrushIf_Logo-removebg-preview.png"

export const RegisterPage = () => {

  const institutosFederaisPorEstado = [
    // Acre
    "IFAC",
    // Alagoas
    "IFAL",
    // Amapá
    "IFAP",
    // Amazonas
    "IFAM",
    // Bahia
    "IFBA",
    // Ceará
    "IFCE",
    // Distrito Federal
    "IFB",
    // Espírito Santo
    "IFES",
    // Goiás
    "IFG",
    // Maranhão
    "IFMA",
    // Mato Grosso
    "IFMT",
    // Mato Grosso do Sul
    "IFMS",
    // Minas Gerais
    "IFMG",
    // Pará
    "IFPA",
    // Paraíba
    "IFPB",
    // Paraná
    "IFPR",
    // Pernambuco
    "IFPE",
    // Piauí
    "IFPI",
    // Rio de Janeiro
    "IFRJ",
    // Rio Grande do Norte
    "IFRN",
    // Rio Grande do Sul
    "IFRS",
    // Rondônia
    "IFRO",
    // Roraima
    "IFRR",
    // Santa Catarina
    "IFSC",
    // São Paulo
    "IFSP",
    // Sergipe
    "IFS",
    // Tocantins
    "IFTO"
  ];

  interface UserDataRegister {
    nickname: string
    email: string
    password: string
    birthdaydata: string
    campus: string
  }

  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    birthdaydata: "",
    campus: "",
  })


  const [messageError, setMessageError] = useState(String);
  const [clickedButton, setClickedButton] = useState(Boolean);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setClickedButton(false);
    const { name, value } = e.target;

    setFormData((prevData: UserDataRegister) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setClickedButton(true);
    setMessageError("")

    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:4040/auth/register", formData)

      if (response.data.isRegistered) {
        window.location.href = "/"
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const messageError = error;

        console.log(messageError.response?.data.message);

        setMessageError(messageError.response?.data.message ? messageError.response.data.message : "Verifique sua conexão")
      }
    } finally {
      setClickedButton(false)
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-svh">

        <div className="flex flex-row justify-end items-center w-full">
          <ThemeSwitcher className="my-1.5 mx-2" />
        </div>

        <Card
          shadow="lg"
          radius="lg">
          <CardHeader className="flex gap-3">
            <img
              src={logo}
              alt="logo crush ifto"
              className="w-20 h-20" />

            <div className="flex flex-col">
              <h2 className="font-Poppins font-semibold text-2xl md:text-3xl">Registre-se!</h2>
              <p className="font-Poppins text-default font-medium text-xs md:text-sm">Crie uma conta para ter acesso a plataforma.</p>
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
                  type="text"
                  label="Usuário"
                  placeholder="Ex: nickname"
                  className="font-Poppins font-medium w-5/6"
                  name="nickname"
                  onChange={handleChange}
                  errorMessage={messageError ? (messageError == "Usuário já está em uso. Por favor, escolha outro." ? messageError : null) : messageError}
                  value={formData.nickname}
                />
              </div>

              <div className="flex flex-row justify-center items-center">
                <Input
                  isClearable
                  isRequired
                  radius="full"
                  type="email"
                  label="E-mail"
                  placeholder="Ex: name@email.com"
                  className="font-Poppins font-medium w-5/6"
                  name="email"
                  onChange={handleChange}
                  errorMessage={messageError ? (messageError == "E-mail já está em uso." ? messageError : null) : null}
                  value={formData.email} />
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
                        <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  onChange={handleChange}
                  errorMessage={messageError ? (messageError == "Preencha todos os campos" ? messageError : null) : messageError}
                  value={formData.password} />
              </div>

              <div className="flex flex-row justify-center items-center ">
                <Input
                  isRequired
                  radius="full"
                  type="date"
                  label="Nascimento"
                  className="font-Poppins font-medium w-5/6"
                  name="birthdaydata"
                  onChange={handleChange}
                  errorMessage={messageError ? (messageError == "Preencha todos os campos." ? messageError : null) : messageError}
                  value={formData.birthdaydata} />
              </div>

              <div className="flex flex-row justify-center items-center ">
                <div className="flex w-full justify-center items-center ">
                  <Select
                    isRequired
                    radius="full"
                    label="Instituto"
                    className="font-Poppins font-medium w-5/6"
                    name="campus"
                    onChange={handleChange}
                    errorMessage={messageError ? (messageError == "Preencha todos os campos." ? messageError : null) : messageError}
                    value={formData.campus}>
                    {institutosFederaisPorEstado.map((instituto) => (
                      <SelectItem
                        key={instituto} value={instituto}>
                        {instituto}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
              <Divider />

              <div className="flex flex-row justify-center items-center">
                <Button
                  color="primary"
                  size="lg"
                  radius="full"
                  className="font-Poppins font-bold uppercase w-5/6"
                  type="submit" >Registrar-se</Button>
              </div>

              <div className="flex flex-col justify-center items-center text-center">
                <div>
                  {clickedButton ?
                    <Loading /> : null}
                </div>

                <Link className="flex flex-row justify-center items-center  w-full" href="login">
                  <Button
                    className="font-Poppins font-bold uppercase w-5/6"
                    color="primary"
                    radius="full"
                    size="lg"
                    variant="bordered">
                    Entrar
                  </Button>
                </Link>
              </div>
            </form >
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default RegisterPage;