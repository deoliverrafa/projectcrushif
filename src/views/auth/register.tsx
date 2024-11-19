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
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { Badge } from "../../components/ui/badge";

import { FireSolid, SpinnerSolid, XSolid } from "@mynaui/icons-react";

import RegisterArt from "../../../public/images/register_art.png";

interface UserDataRegister {
  nickname: string;
  email: string;
  password: string;
  birthdaydata: string;
  campus: string;
  userName: string;
  type: string;
}

const LogoLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <img src={RegisterArt} className="hidden md:flex md:h-[300px] md:w-[300px]" />
    </div>
  );
};

export const RegisterLayout = () => {
  const [messageError, setMessageError] = React.useState(String);
  const [clickedButton, setClickedButton] = React.useState(Boolean);

  const [nicknameLength, setNicknameLength] = React.useState<number>(0);
  const [userNameLength, setUserNameLength] = React.useState<number>(0);

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

    if (name === "nickname") {
      setNicknameLength(value.length);
    }
    if (name === "userName") {
      setUserNameLength(value.length);
    }

    setFormData((prevData: UserDataRegister) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setClickedButton(true);
    setMessageError("");

    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_REGISTER_ROUTE
        }`,
        formData
      );

      if (response.data.isRegistered) {
        window.location.href = "/auth/verify";
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
      <div className="flex flex-col justify-center items-center space-y-2 h-screen md:h-full">
        <Card className="max-w-sm">
          <CardHeader>
            <Badge className="w-fit" variant={"outline"}>
              <FireSolid className="text-primary" />
            </Badge>
            <CardTitle className="tracking-wider">Registre-se</CardTitle>
            <CardDescription className="tracking-wide">
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
              <div className="flex flex-col md:flex-row justify-between items-center space-y-5 md:space-y-0 md:space-x-2">
                <div className="grid items-center gap-1.5 w-full max-w-sm">
                  <Label htmlFor="userName">Nome Completo <span className="text-xs">{userNameLength}/72</span></Label>
                  <Input
                    type="text"
                    placeholder="Informe seu nome"
                    id="userName"
                    name="userName"
                    onChange={handleChange}
                    value={formData.userName}
                    maxLength={72}
                  />
                </div>

                <div className="grid items-center gap-1.5 w-full max-w-sm">
                  <Label htmlFor="nickname">Usuário <span className="text-xs">{nicknameLength}/12</span></Label>
                  <Input
                    type="text"
                    placeholder="Nome do usuário"
                    id="nickname"
                    name="nickname"
                    onChange={handleChange}
                    value={formData.nickname}
                    maxLength={12}
                  />
                </div>
              </div>


              <div className="flex flex-row justify-center items-center space-x-2">
                <div className="grid items-center gap-1.5 w-full max-w-sm">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    type="text"
                    placeholder="Informe seu e-mail"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
              </div>

              <div className="grid items-center gap-1.5 w-full max-w-sm">
                <Label htmlFor="password">Senha</Label>
                <Input
                  type="password"
                  placeholder="Informe sua senha"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>

              {messageError ? (
                <CardDescription className="text-danger flex flex-row items-center gap-2">
                  <XSolid className="h-4 w-4" />
                  {messageError}
                </CardDescription>
              ) : null}

              <Button disabled={clickedButton} type="submit">
                {clickedButton ? (
                  <SpinnerSolid className="animate-spin mr-2 h-5 w-5" />
                ) : null}
                Registrar
              </Button>
            </form>
          </CardContent>

          <Separator className="mb-5" />

          <CardFooter className="flex flex-col space-y-2">
            <Link to="/auth/login" className="w-full">
              <Button className="w-full" variant={"outline"}>
                Entrar
              </Button>
            </Link>

            <p className="font-poppins text-wrap text-center text-sm">
              Ao entrar, você concorda com os Termos e e Política de Privacidade
              do{" "}
              <Link
                to="/auth/terms"
                className="text-primary font-cookie font-medium text-xl"
              >
                Crushif
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export const RegisterPage = () => {
  return (
    <>
      <main className="select-none flex flex-col items-center md:flex-row md:justify-around md:items-center h-svh w-full">
        <LogoLayout />
        <RegisterLayout />
      </main>
    </>
  );
};

export default RegisterPage;
