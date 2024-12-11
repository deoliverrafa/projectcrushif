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
import { Switch } from "../../components/ui/switch.tsx"

import UserIcon from "../../../public/images/user.png"

import {
  LogoutSolid,
  TrashOneSolid,
  HeartWavesSolid,
  XSolid,
} from "@mynaui/icons-react";

import { getUserData } from "../../utils/getUserData.tsx";
import { getStatusUser } from "../../utils/getStatusUser.tsx";
import { User } from "../../interfaces/userInterface.ts";

const SettingsLayout = ({
  userData,
  logOutHandle,
}: {
  userData: User;
  logOutHandle: () => void;
}) => {
  const [userId] = React.useState<string | null>(
    localStorage.getItem("userId")
  );
  
  const [error, setError] = React.useState("");

  const [password, setPassword] = React.useState<string>("");
  const [inContrast, setInContrast] = React.useState<boolean>(
    localStorage.getItem("inContrast") === "true"
  );

  React.useEffect(() => {
    document.body.classList.toggle("high-contrast", inContrast);
    localStorage.setItem("inContrast", String(inContrast));
  }, [inContrast]);

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
  
  getStatusUser(userId);

  return (
    <React.Fragment>
      <Card className="select-none my-2 w-full md:w-6/12">
        <CardHeader>
          <CardTitle className="text-foreground uppercase text-2xl md:text-5xl">
            Exibição
          </CardTitle>
        </CardHeader>
        
        <Separator className="mb-5" />
        
        <CardContent className="space-y-4">
          <div className="flex flex-row justify-between items-center gap-1">
            <div className="flex flex-col">
            <CardDescription className="text-foreground">Tema</CardDescription>
            <CardDescription className="text-xs md:text-xs text-muted-foreground">Selecione um tema para ser aplicado na aplicação</CardDescription>
            </div>
            <ThemeToggle />
          </div>
          
          <div className="flex flex-row justify-between items-center gap-1">
            <div className="flex flex-col">
            <CardDescription className="text-foreground">Texto em alta contraste</CardDescription>
            <CardDescription className="text-xs md:text-xs text-muted-foreground">O texto ficará mais vísivel para os usuários na aplicação</CardDescription>
            </div>
            <Switch 
              checked={inContrast}
              onCheckedChange={(checked) => setInContrast(checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="select-none my-2 w-full md:w-6/12">
        <CardHeader>
          <CardTitle className="text-foreground uppercase text-2xl md:text-5xl">
            Conta
          </CardTitle>
        </CardHeader>
        
        <Separator className="mb-5" />
        
        <CardContent>
          <div className="flex flex-row items-center space-x-2">
            <div className="relative">
            <Avatar className="shadow-lg border-2 border-border">
              <AvatarFallback>{userData?.userName}</AvatarFallback>
              <AvatarImage
                className="object-cover"
                src={userData?.avatar ? userData?.avatar : UserIcon}
              />
            </Avatar>

            <span
              className={`border border-border h-2.5 w-2.5 bottom-0 right-1 rounded-full text-xs ${
                userData.status === "online" ? "bg-success" : "bg-secondary"
              } absolute`}
            ></span>
          </div>

            <div className="flex flex-col">
              <div className="flex flex-row items-center space-x-1">
                <CardDescription className="font-semibold md:font-medium text-md md:text-sm tracking-tight">
                  {userData.nickname}
                </CardDescription>
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
              <CardDescription className="font-normal md:font-light text-xs md:text-xs">
                {userData.email}
              </CardDescription>
            </div>
          </div>
        </CardContent>

        <Separator className="mb-5" />

        <CardFooter className="flex-col justify-start items-start space-y-2">
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
          
          <Link to={"/"}>
            <Button variant={"danger"} onClick={logOutHandle}>
              <LogoutSolid className="mr-2 h-5 w-5" />
              Deslogar
            </Button>
          </Link>
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
