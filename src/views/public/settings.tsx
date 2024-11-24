import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { NavBarReturn } from "../../components/navbar.tsx";
import { ThemeToggle } from "../../components/ui/theme.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card.tsx";
import { Button } from "../../components/ui/button.tsx";
import { Separator } from "../../components/ui/separator.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog.tsx";
import { Label } from "../../components/ui/label.tsx";
import { Input } from "../../components/ui/input.tsx";

import UserIcon from "../../../public/images/user.png"

import {
  LogoutSolid,
  TrashOneSolid,
  HeartWavesSolid,
  XSolid,
} from "@mynaui/icons-react";

import { getUserData } from "../../utils/getUserData.tsx";

interface UserData {
  nickname: string;
  avatar: string;
  email: string;
  type: string;
}

const SettingsLayout = ({
  userData,
  logOutHandle,
}: {
  userData: UserData;
  logOutHandle: () => void;
}) => {
  const [error, setError] = React.useState("");

  const [password, setPassword] = React.useState<string>("");

  const deleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_USER_DELETE_ACCOUNT
        }`,
        {
          data: { password, token },
        }
      );
      alert(response.data.message);
      logOutHandle();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao deletar a conta:", error.message);
        return setError("Erro ao deletar a conta");
      }
    }
  };

  return (
    <React.Fragment>
      <Card className="select-none my-2 w-full md:w-6/12">
        <CardHeader>
          <h1 className="font-poppins font-semibold tracking-widest text-xl">
            Geral
          </h1>
        </CardHeader>
        <Separator className="mb-5" />
        <CardContent>
          <div className="flex flex-row justify-between items-center">
            <CardDescription>Tema:</CardDescription>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      <Card className="select-none my-2 w-full md:w-6/12">
        <CardHeader>
          <h1 className="font-poppins font-semibold tracking-widest text-xl">
            Conta
          </h1>
        </CardHeader>
        <Separator className="mb-5" />
        <CardContent>
          <div className="flex flex-row items-center space-x-2">
            <Avatar className="border-2 border-border">
              <AvatarFallback>{userData.nickname}</AvatarFallback>
              <AvatarImage className="object-cover" src={userData.avatar ? userData.avatar : UserIcon} />
            </Avatar>

            <div className="flex flex-col">
              <div className="flex flex-row items-center space-x-1">
                <CardTitle className="font-semibold md:font-medium text-md md:text-sm tracking-tight">
                  {userData.nickname}
                </CardTitle>
                <HeartWavesSolid
                  className={`${userData?.type === "Plus"
                      ? "text-info"
                      : userData?.type === "Admin"
                        ? "text-danger"
                        : userData?.type === "verified"
                          ? "text-success"
                          : "hidden"
                    } h-3 w-3`}
                />
              </div>
              <CardTitle className="font-normal md:font-light text-sm md:text-xs tracking-tight">
                {userData.email}
              </CardTitle>
            </div>
          </div>
        </CardContent>

        <Separator className="mb-5" />

        <CardFooter className="flex-col justify-start items-start space-y-2">
          <Link to={"/"}>
            <Button variant={"danger"} onClick={logOutHandle}>
              <LogoutSolid className="mr-2 h-5 w-5" />
              Deslogar
            </Button>
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"danger"}>
                <TrashOneSolid className="mr-2 h-5 w-5" />
                Deletar conta
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader className="space-y-0.5">
                <DialogTitle>Excluir conta</DialogTitle>

                <DialogDescription>
                  Deseja excluir sua conta de usuário?
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="password">Senha atual</Label>
                <Input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                {error ? (
                  <DialogDescription className="text-danger flex flex-row items-center gap-2">
                    <XSolid className="h-4 w-4" />
                    {error}
                  </DialogDescription>
                ) : null}
              </div>

              <DialogFooter>
                <Button variant={"danger"} onClick={deleteAccount}>
                  Deletar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </React.Fragment>
  );
};

const SettingsPage = () => {
  const userData = getUserData();

  function logOutHandle() {
    localStorage.setItem("token", "null");
    window.location.href = "/";
  }

  return (
    <>
      <NavBarReturn title="Configurações" />

      <main className="flex flex-col justify-center items-center h-screen w-full">
        <SettingsLayout userData={userData} logOutHandle={logOutHandle} />
      </main>
    </>
  );
};

export default SettingsPage;
