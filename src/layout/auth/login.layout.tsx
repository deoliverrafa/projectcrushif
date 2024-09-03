import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Loading } from "../../components/loading.component.tsx";
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
import { Divider } from "@nextui-org/react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "../../components/ui/alert.tsx";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "../../components/ui/drawer";

import { Siren } from "lucide-react";

interface UserDataLogin {
  nickname: string;
  password: string;
}

export const LoginLayout = () => {
  const [clickedButton, setClickedButton] = React.useState(false);
  const [messageError, setMessageError] = React.useState(String);

  const [formData, setFormData] = React.useState({
    nickname: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData: UserDataLogin) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setMessageError("");

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_LOGIN_ROUTE
        }`,
        formData
      );

      if (response.data.logged == true) {
        setClickedButton(false);
        localStorage.setItem("token", response.data.token);
        window.location.href = "/";
      } else {
        setClickedButton(false);
        setMessageError(response.data.message);
      }
    } catch (error: any) {
      setMessageError(error.response.data.message);
      setClickedButton(false);
    }
  };

  return (
    <>
      <div className="hidden md:flex flex-col space-y-2">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle className="font-recursive uppercase tracking-widest">
              Login
            </CardTitle>
            <CardDescription>
              Faça login para ter acesso a plataforma!
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              action="register"
              method="POST"
              className="flex flex-col relative space-y-5"
              onSubmit={handleSubmit}
            >
              <div className="grid items-center gap-1.5 w-full max-w-sm">
                <Label htmlFor="nickname">Usuário</Label>
                <Input
                  type="nickname"
                  placeholder="ex: nickname"
                  className="font-inter font-medium"
                  name="nickname"
                  id="nickname"
                  onChange={handleChange}
                />
              </div>

              <div className="grid items-center gap-1.5 w-full max-w-sm">
                <Label htmlFor="password">Senha</Label>
                <Input
                  type="password"
                  placeholder="ex: ••••••"
                  className="font-inter font-medium"
                  name="password"
                  id="password"
                  onChange={handleChange}
                />
              </div>

              <Button
                className="font-poppins font-semibold uppercase"
                onClick={() => setClickedButton(true)}
              >
                Entrar
              </Button>
            </form>
          </CardContent>

          <Divider className="mb-5" />

          <CardFooter className="flex flex-col space-y-2">
            <Link to="/auth/register" className="w-full">
              <Button className="font-poppins font-semibold uppercase w-full" variant={"outline"}>
                Registre-se
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

export const LoginLayoutMobile = () => {
  const [clickedButton, setClickedButton] = React.useState(false);
  const [messageError, setMessageError] = React.useState(String);

  const [formData, setFormData] = React.useState({
    nickname: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData: UserDataLogin) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setMessageError("");

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_LOGIN_ROUTE
        }`,
        formData
      );

      if (response.data.logged == true) {
        setClickedButton(false);
        localStorage.setItem("token", response.data.token);
        window.location.href = "/";
      } else {
        setClickedButton(false);
        setMessageError(response.data.message);
      }
    } catch (error: any) {
      setMessageError(error.response.data.message);
      setClickedButton(false);
    }
  };

  return (
    <>
      <Card className="flex flex-col md:hidden w-5/6 max-w-sm">
        <CardHeader>
          <CardTitle className="font-recursive uppercase tracking-widest">
            Login
          </CardTitle>
          <CardDescription>
            Faça login para ter acesso a plataforma!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Drawer>
            <DrawerTrigger className="w-full" asChild>
              <Button className="uppercase w-full">Logar</Button>
            </DrawerTrigger>

            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="font-recursive uppercase tracking-widest">
                  Login
                </DrawerTitle>
                <DrawerDescription>
                  Faça login para ter acesso a plataforma!
                </DrawerDescription>
              </DrawerHeader>

              <form
                action="register"
                method="POST"
                className="flex flex-col relative px-4 py-6 space-y-5"
                onSubmit={handleSubmit}
              >
                <div className="space-y-2">
                  <Label htmlFor="nickname">Usuário</Label>
                  <Input
                    type="nickname"
                    placeholder="ex: nickname"
                    className="font-inter font-medium"
                    name="nickname"
                    id="nickname"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    type="password"
                    placeholder="ex: ••••••"
                    className="font-inter font-medium"
                    name="password"
                    id="password"
                    onChange={handleChange}
                  />
                </div>

                {messageError ? (
                  <Alert
                    className="max-w-sm"
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

                <Button
                  className="font-poppins font-semibold uppercase "
                  onClick={() => setClickedButton(true)}
                >
                  Entrar
                </Button>
              </form>
            </DrawerContent>
          </Drawer>
        </CardContent>

        <Divider className="mb-5" />

        <CardFooter className="flex flex-col space-y-2">
          <Link to="/auth/register" className="w-full">
            <Button className="font-poppins font-semibold uppercase  w-full" variant={"outline"}>
              Registre-se
            </Button>
          </Link>

          <p className="font-inter text-wrap text-center text-tiny">
            Ao entrar, você concorda com os Termos e e Política de Privacidade
            do{" "}
            <Link to="/auth/terms" className="text-pink-500 dark:text-pink-600 font-recursive font-semibold uppercase tracking-widest">
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