// IMPORT - LIBRARYS //
import { ChangeEvent, FormEvent, useState } from "react";
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
  Select,
  SelectItem,
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
  
  const emailsEstudantisPorEstado = [
    // Acre
    "@estudante.ifac.gov.br",
    // Alagoas
    "@estudante.ifal.gov.br",
    // Amapá
    "@estudante.ifap.gov.br",
    // Amazonas
    "@estudante.ifam.gov.br",
    // Bahia
    "@estudante.ifba.gov.br",
    // Ceará
    "@estudante.ifce.gov.br",
    // Distrito Federal
    "@estudante.ifb.gov.br",
    // Espírito Santo
    "@estudante.ifes.gov.br",
    // Goiás
    "@estudante.ifg.gov.br",
    // Maranhão
    "@estudante.ifma.gov.br",
    // Mato Grosso
    "@estudante.ifmt.gov.br",
    // Mato Grosso do Sul
    "@estudante.ifms.gov.br",
    // Minas Gerais
    "@estudante.ifmg.gov.br",
    // Pará
    "@estudante.ifpa.gov.br",
    // Paraíba
    "@estudante.ifpb.gov.br",
    // Paraná
    "@estudante.ifpr.gov.br",
    // Pernambuco
    "@estudante.ifpe.gov.br",
    // Piauí
    "@estudante.ifpi.gov.br",
    // Rio de Janeiro
    "@estudante.ifrj.gov.br",
    // Rio Grande do Norte
    "@estudante.ifrn.gov.br",
    // Rio Grande do Sul
    "@estudante.ifrs.gov.br",
    // Rondônia
    "@estudante.ifro.gov.br",
    // Roraima
    "@estudante.ifrr.gov.br",
    // Santa Catarina
    "@estudante.ifsc.gov.br",
    // São Paulo
    "@estudante.ifsp.gov.br",
    // Sergipe
    "@estudante.ifs.gov.br",
    // Tocantins
    "@estudante.ifto.gov.br"
  ];

  interface UserDataRegister {
    nickname: string
    email: string
    password: string
    birthdaydata: string
    campus: string
    userName: string
    type: string
  }

  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    birthdaydata: "",
    campus: "",
    userName: "",
    type: "Free"
  })

  const [messageError, setMessageError] = useState(String);
  const [clickedButton, setClickedButton] = useState(Boolean);
  const [emailCompleted, setEmailCompleted] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setClickedButton(false);
    const { name, value } = e.target;

    if (value.length === 0) {
      setEmailCompleted(false)
    }

    if (!emailCompleted) {
      if (name == 'email' && value && value.includes('@')) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: `${value}estudante.if.edu.br`
        }));
        setEmailCompleted(true);
      } else {
        setFormData((prevData: UserDataRegister) => ({
          ...prevData,
          [name]: value
        }));
        setEmailCompleted(false)
      }
    } else {
      setFormData((prevData: UserDataRegister) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setClickedButton(true);
    setMessageError("")

    e.preventDefault()

    try {
      const response = await axios.post("https://crush-api.vercel.app/auth/register", formData)

      if (response.data.isRegistered) {
        window.location.href = "/"
      }

    } catch (error: any) {
      const messageError = error.response.data.message;
      
      setMessageError(messageError)
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
          radius="lg">
          <CardHeader className="flex gap-3">
            <img
              src={logo}
              alt="logo crush ifto"
              className="w-20 h-20" />

            <div className="flex flex-col">
              <h2 className="font-poppins font-semibold uppercase tracking-widest text-2xl md:text-3xl">Registre-se</h2>
              <p className="text-default font-poppins tracking-tight text-xs md:text-sm">Crie uma conta para ter acesso a plataforma.</p>
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
                  radius="lg"
                  size="sm"
                  type="text"
                  label="Nome"
                  placeholder="ex: nome completo"
                  className="font-inter font-medium w-5/6"
                  name="userName"
                  onChange={handleChange}
                  value={formData.userName}
                />
              </div>

              <div className="flex flex-row justify-center items-center">
                <Input
                  radius="lg"
                  size="sm"
                  type="text"
                  label="Usuário"
                  placeholder="ex: nickname"
                  className="font-inter font-medium w-5/6"
                  name="nickname"
                  onChange={handleChange}
                  errorMessage={messageError ? (messageError == "Usuário já está em uso. Por favor, escolha outro." ? messageError : null) : messageError}
                  value={formData.nickname}
                />
              </div>

              <div className="flex flex-col justify-center items-center space-y-1">
                <div className="flex flex-row space-x-1 w-5/6">
                  <Input
                    radius="lg"
                    size="sm"
                    type="email"
                    label="E-mail"
                    placeholder="ex: nome"
                    className="font-inter font-medium w-32"
                    name="email"
                    onChange={handleChange}
                    errorMessage={messageError ? (messageError == "Email já está em uso" ? messageError : null) : null}
                    value={formData.email} 
                  />
                  <Select
                    radius="lg"
                    size="sm"
                    label="Extensão"
                    placeholder="@estudante.if.gov.br"
                    className="text-default font-inter font-medium w-full"
                    name="campus"
                    onChange={handleChange}
                    errorMessage={messageError ? (messageError == "Preencha todos os campos." ? messageError : null) : messageError}
                    value={formData.campus}>
                   {emailsEstudantisPorEstado.map((email) => (
                      <SelectItem
                        key={email} value={email}>
                        {email}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                 
                <p className="text-default font-inter font-medium tracking-wide text-center text-[0.5rem]">
                  (Informe o nome do seu e-mail institucional e selecione a extensão)
                </p>
              </div>

              <div className="flex flex-row justify-center items-center">
                <Input
                  radius="lg"
                  size="sm"
                  label="Senha"
                  placeholder="ex: ••••••"
                  className="font-inter font-medium w-5/6"
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
                  errorMessage={messageError ? (messageError == "Preencha todos os campos" ? messageError : null) : messageError}
                  value={formData.password} />
              </div>

              <div className="flex flex-row justify-center items-center ">
                <Input
                  radius="lg"
                  size="sm"
                  type="date"
                  label="Nascimento"
                  className="font-inter font-medium w-5/6"
                  name="birthdaydata"
                  onChange={handleChange}
                  errorMessage={messageError ? (messageError == "Preencha todos os campos." ? messageError : null) : messageError}
                  value={formData.birthdaydata} />
              </div>

              <div className="flex flex-row justify-center items-center ">
                <div className="flex w-full justify-center items-center ">
                  <Select
                    radius="lg"
                    size="sm"
                    label="Instituto"
                    className="text-default font-inter font-medium w-5/6"
                    name="campus"
                    placeholder="IF"
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
                  size="md"
                  radius="full"
                  className="font-poppins font-bold uppercase tracking-widest w-5/6"
                  type="submit" >Registrar-se</Button>
              </div>

              <div className="flex flex-col justify-center items-center text-center">
                <div>
                  {clickedButton ?
                    <Loading /> : null}
                </div>

                <Link className="flex flex-row justify-center items-center  w-full" href="login">
                  <Button
                    className="font-poppins font-bold uppercase tracking-widest w-5/6"
                    color="primary"
                    radius="full"
                    size="md"
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