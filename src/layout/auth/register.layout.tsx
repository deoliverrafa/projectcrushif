import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Loading } from "../../components/loading.component";
import { Alert, AlertTitle, AlertDescription } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../../components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerHeader,
  DrawerTrigger,
} from "../../components/ui/drawer";

import { Divider } from "@nextui-org/react";

import { Siren } from "lucide-react";

interface UserDataRegister {
  nickname: string;
  email: string;
  password: string;
  birthdaydata: string;
  campus: string;
  userName: string;
  type: string;
}

/* const institutosFederaisPorEstado = [
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
  "IFTO",
]; */

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
  "@estudante.ifto.gov.br",
];

export const RegisterLayout = () => {
  const [messageError, setMessageError] = React.useState(String);
  const [clickedButton, setClickedButton] = React.useState(Boolean);

  const [formData, setFormData] = React.useState({
    nickname: "",
    email: "",
    password: "",
    birthdaydata: "",
    campus: "",
    userName: "",
    type: "Free",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    
    setClickedButton(false);
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    
     setFormData((prevData: UserDataRegister) => ({
        ...prevData,
        [name]: value,
      }));
    }
    
    // if (value.length === 0) {
    //   setEmailCompleted(false);
    // }

    // if (!emailCompleted) {
    //   if (name == "email" && value && value.includes("@")) {
    //     setFormData((prevFormData) => ({
    //       ...prevFormData,
    //       [name]: `${value}estudante.if.edu.br`,
    //     }));
    //     setEmailCompleted(true);
    //   } else {
    //     setFormData((prevData: UserDataRegister) => ({
    //       ...prevData,
    //       [name]: value,
    //     }));
    //     setEmailCompleted(false);
      // }
     
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setClickedButton(true);
        setMessageError("");
    
        e.preventDefault();
    
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}${
              import.meta.env.VITE_REGISTER_ROUTE
            }`,
            formData
          );
    
          if (response.data.isRegistered) {
            window.location.href = "/";
          }
        } catch (error: any) {
          const messageError = error.response.data.message;
    
          setMessageError(messageError);
        } finally {
          setClickedButton(false);
        }
      };

  return (
    <>
      <div className="hidden md:flex flex-col space-y-2">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle className="font-recursive uppercase tracking-widest">
              Registre-se
            </CardTitle>
            <CardDescription>
              Faça registro para ter acesso a plataforma!
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              action="register"
              method="POST"
              className="flex flex-col relative space-y-5"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-row justify-center items-center space-x-2">
                <div className="grid items-center gap-1.5 w-full max-w-sm">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    type="text"
                    placeholder="ex: rafael"
                    className="font-inter font-medium"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>

                <div className="grid items-center gap-1.5 w-full max-w-sm">
                  <Label htmlFor="extension">Extensão</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="@estudante.if.gov.br" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup onChange={() => {handleChange}}>
                        {emailsEstudantisPorEstado.map((email) => (
                          <SelectItem key={email} value={email}>
                            {email}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-row justify-between items-center space-x-2">
                <div className="grid items-center gap-1.5 w-full max-w-sm">
                  <Label htmlFor="userName">Nome Completo</Label>
                  <Input
                    type="text"
                    placeholder="ex: nome sobrenome"
                    className="font-inter font-medium"
                    id="userName"
                    name="userName"
                    onChange={handleChange}
                    value={formData.userName}
                  />
                </div>

                <div className="grid items-center gap-1.5 w-full max-w-sm">
                  <Label htmlFor="nickname">
                    Usuário
                  </Label>
                  <Input
                    type="text"
                    placeholder="ex: nickname"
                    className="font-inter font-medium"
                    id="nickname"
                    name="nickname"
                    onChange={handleChange}
                    value={formData.nickname}
                  />
                </div>
              </div>

              <div className="grid items-center gap-1.5 w-full max-w-sm">
                <Label htmlFor="password">Senha</Label>
                <Input
                  type="password"
                  placeholder="ex: ••••••"
                  className="font-inter font-medium"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>

              <Button
                className="font-poppins font-semibold uppercase "
                onClick={() => setClickedButton(true)}
              >
                Registrar
              </Button>
            </form>
          </CardContent>

          <Divider className="mb-5" />

          <CardFooter className="flex flex-col space-y-2">
            <Link to="/auth/login" className="w-full">
              <Button className="font-poppins font-semibold uppercase  w-full" variant={"outline"}>
                Entrar
              </Button>
            </Link>

            <p className="font-inter text-wrap text-center text-tiny">
              Ao entrar, você concorda com os Termos e e Política de Privacidade
              do{" "}
              <Link
                to="/auth/terms"
                className="text-pink-500 dark:text-pink-600 font-recursive font-semibold uppercase tracking-widest"
              >
                Crush
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>

      {messageError ? (
        <Alert
          className="fixed top-2 inset-x-auto max-w-sm"
          variant="destructive"
        >
          <Siren className="size-4" />
          <AlertTitle className="font-recursive uppercase tracking-widest">
            Error
          </AlertTitle>
          <AlertDescription className="font-semibold text-tiny">
            Mensagem: {messageError}
          </AlertDescription>
        </Alert>
      ) : null}

      {clickedButton ? <Loading /> : null}
    </>
  );
};

export const RegisterLayoutMobile = () => {
  const [messageError, setMessageError] = React.useState(String);
  const [clickedButton, setClickedButton] = React.useState(Boolean);

  const [formData, setFormData] = React.useState({
    nickname: "",
    email: "",
    password: "",
    birthdaydata: "",
    campus: "",
    userName: "",
    type: "Free",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setClickedButton(false);
    const { name, value } = e.target;

    // if (value.length === 0) {
    //   setEmailCompleted(false);
    // }

    // if (!emailCompleted) {
    //   if (name == "email" && value && value.includes("@")) {
    //     setFormData((prevFormData) => ({
    //       ...prevFormData,
    //       [name]: `${value}estudante.if.edu.br`,
    //     }));
    //     setEmailCompleted(true);
    //   } else {
    //     setFormData((prevData: UserDataRegister) => ({
    //       ...prevData,
    //       [name]: value,
    //     }));
    //     setEmailCompleted(false);
    //   }
    setFormData((prevData: UserDataRegister) => ({
      ...prevData,
      [name]: value,
    }));
    }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setClickedButton(true);
    setMessageError("");

    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_REGISTER_ROUTE
        }`,
        formData
      );

      if (response.data.isRegistered) {
        window.location.href = "/";
      }
    } catch (error: any) {
      const messageError = error.response.data.message;

      setMessageError(messageError);
    } finally {
      setClickedButton(false);
    }
  };

  return (
    <>
      <Card className="flex flex-col md:hidden w-5/6 max-w-sm">
        <CardHeader>
          <CardTitle className="font-recursive uppercase tracking-widest">
            Registre-se
          </CardTitle>
          <CardDescription>
            Faça registro para ter acesso a plataforma!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Drawer>
            <DrawerTrigger className="w-full" asChild>
              <Button className="uppercase w-full">Registre-se</Button>
            </DrawerTrigger>

            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="font-recursive uppercase tracking-widest">
                  Registre-se
                </DrawerTitle>
                <DrawerDescription>
                  Faça registro para ter acesso a plataforma!
                </DrawerDescription>
              </DrawerHeader>

              <form
                action="register"
                method="POST"
                className="flex flex-col relative px-4 py-6 space-y-5"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-row justify-center items-center space-x-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      type="text"
                      placeholder="ex: nome"
                      className="font-inter font-medium"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="extension">Extensão</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="@estudante.if.gov.br" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup onChange={() => {handleChange}}>
                          {emailsEstudantisPorEstado.map((email) => (
                            <SelectItem key={email} value={email}>
                              {email}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-row justify-between items-center space-x-2">
                  <div className="space-y-2">
                    <Label htmlFor="userName">Nome Completo</Label>
                    <Input
                      type="text"
                      placeholder="ex: nome sobrenome"
                      className="font-inter font-medium"
                      id="userName"
                      name="userName"
                      onChange={handleChange}
                      value={formData.userName}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nickname">Usuário</Label>
                    <Input
                      type="text"
                      placeholder="ex: nickname"
                      className="font-inter font-medium"
                      id="nickname"
                      name="nickname"
                      onChange={handleChange}
                      value={formData.nickname}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    type="password"
                    placeholder="ex: ••••••"
                    className="font-inter font-medium"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>

                {messageError ? (
                  <Alert className="max-w-sm" variant="destructive">
                    <Siren className="size-4" />
                    <AlertTitle className="font-recursive uppercase tracking-widest">
                      Error
                    </AlertTitle>
                    <AlertDescription className="font-semibold text-tiny">
                      Mensagem: {messageError}
                    </AlertDescription>
                  </Alert>
                ) : null}

                <Button
                  className="font-poppins font-semibold uppercase "
                  onClick={() => setClickedButton(true)}
                >
                  Registrar
                </Button>
              </form>
            </DrawerContent>
          </Drawer>
        </CardContent>

        <Divider className="mb-5" />

        <CardFooter className="flex flex-col space-y-2">
          <Link to="/auth/login" className="w-full">
            <Button className="font-poppins font-semibold uppercase  w-full" variant={"outline"}>
              Entrar
            </Button>
          </Link>

          <p className="font-inter text-wrap text-center text-tiny">
            Ao entrar, você concorda com os Termos e e Política de Privacidade
            do{" "}
            <Link
              to="/auth/terms"
              className="text-pink-500 dark:text-pink-600 font-recursive font-semibold uppercase tracking-widest"
            >
              Crush
            </Link>
            .
          </p>
        </CardFooter>
      </Card>

      {clickedButton ? <Loading /> : null}
    </>
  );
};
