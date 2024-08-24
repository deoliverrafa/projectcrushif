import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "../../components/ui/drawer";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "../../components/ui/alert.tsx";
import { Input } from "../../components/ui/input.tsx";
import { Button } from "../../components/ui/button.tsx";
import { Label } from "../../components/ui/label.tsx";

import { Loading } from "../../components/loading.component";

import { Divider } from "@nextui-org/react";

import { Siren } from "lucide-react";

interface UserDataLogin {
  nickname: string;
  password: string;
}

const LoginLayoutMobile = () => {
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
                  className="uppercase"
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
            <Button className="uppercase w-full" variant={"outline"}>
              Registre-se
            </Button>
          </Link>

          <p className="font-inter text-wrap text-center text-center text-tiny">
            Ao entrar, você concorda com os Termos e e Política de Privacidade
            do{" "}
            <span className="text-pink-500 dark:text-pink-600 font-recursive font-semibold uppercase tracking-widest">
              Crush
            </span>
            .
          </p>
        </CardFooter>
      </Card>

      {clickedButton ? <Loading /> : null}
    </>
  );
};

export default LoginLayoutMobile;
