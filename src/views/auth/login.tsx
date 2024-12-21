import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../../components/ui/card.tsx";
import { Input } from "../../components/ui/input.tsx";
import { Button } from "../../components/ui/button.tsx";
import { Label } from "../../components/ui/label.tsx";
import { Separator } from "../../components/ui/separator.tsx";
import { Badge } from "../../components/ui/badge.tsx";

import { FireSolid, XSolid, SpinnerSolid } from "@mynaui/icons-react";

import LoginArt from "../../../public/images/login_art.png";

const LogoLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={LoginArt} className="hidden md:flex md:h-[300px] md:w-[300px]" />
    </div>
  );
};

const LoginLayout = () => {
  const [clickedButton, setClickedButton] = React.useState(false);
  const [messageError, setMessageError] = React.useState<string>("");
  const [formData, setFormData] = React.useState({
    nickname: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClickedButton(true);

    try {
      setMessageError("");

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_LOGIN_ROUTE
        }`,
        formData
      );

      if (response.data.logged) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("welcome", "true");
        window.location.href = "/";
      } else {
        setMessageError(response.data.message);
      }
    } catch (error: any) {
      setMessageError(error.response.data.message);
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
            <CardTitle className="tracking-wider">Login</CardTitle>
            <CardDescription className="tracking-wide">
              Faça login para ter acesso a plataforma!
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              className="flex flex-col relative space-y-5"
              onSubmit={handleSubmit}
            >
              <div className="grid items-center gap-1.5 w-full max-w-sm">
                <Label htmlFor="nickname">Usuário ou email</Label>
                <Input
                  type="text"
                  placeholder="Usuário ou email"
                  name="nickname"
                  id="nickname"
                  onChange={handleChange}
                />
              </div>

              <div className="grid items-center gap-1.5 w-full max-w-sm">
                <Label htmlFor="password">Senha</Label>
                <Input
                  type="password"
                  placeholder="Informe sua senha"
                  name="password"
                  id="password"
                  onChange={handleChange}
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
                Entrar
              </Button>
            </form>
          </CardContent>

          <Separator className="mb-5" />

          <CardFooter className="flex flex-col space-y-2">
            <Link to="/auth/register" className="w-full">
              <Button className="w-full" variant={"outline"}>
                Registre-se
              </Button>
            </Link>

            <p className="text-center text-sm md:text-md">
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

const LoginPage = () => {
  return (
    <>
      <main className="select-none flex flex-col items-center md:flex-row md:justify-around md:items-center h-svh w-full">
        <LogoLayout />
        <LoginLayout />
      </main>
    </>
  );
};

export default LoginPage;
