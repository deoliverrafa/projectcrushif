import { Link } from "react-router-dom";

import { NavBarReturn } from "../../components/navbar.tsx";
import { ThemeToggle } from "../../components/ui/theme.tsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card.tsx";
import { Button } from "../../components/ui/button.tsx";
import { Separator } from "../../components/ui/separator.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar.tsx";

import { BadgeCheck, LogOut, Trash } from "lucide-react";

import { getUserData } from "../../utils/getUserData.tsx";

interface UserData {
  nickname: string;
  avatar: string;
  email: string;
}

const SettingsLayout = ({
  userData,
  logOutHandle,
}: {
  userData: UserData;
  logOutHandle: () => void;
}) => {
  return (
    <>
      <Card className="my-2 w-11/12 max-w-[768px]">
        <CardHeader>
          <h1 className="font-poppins font-semibold tracking-widest text-xl">
            Geral
          </h1>
        </CardHeader>
        <Separator className="mb-5" />
        <CardContent>
          <div className="flex flex-row justify-between items-center">
            <p className="font-inter font-medium tracking-wider">Tema:</p>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      <Card className="my-2 w-11/12 max-w-[768px]">
        <CardHeader>
          <h1 className="font-poppins font-semibold tracking-widest text-xl">
            Conta
          </h1>
        </CardHeader>
        <Separator className="mb-5" />
        <CardContent>
          <div className="flex flex-row items-center space-x-2">
            <Avatar>
              <AvatarFallback>{userData.nickname}</AvatarFallback>
              <AvatarImage src={userData.avatar} />
            </Avatar>

            <div className="flex flex-col">
              <div className="flex flex-row items-center space-x-1">
                <p className="font-inter font-semibold">{userData.nickname}</p>
                <BadgeCheck className="fill-success text-background size-3.5" />
              </div>
              <p className="text-default text-tiny font-inter tracking-tight">
                {userData.email}
              </p>
            </div>
          </div>
        </CardContent>

        <Separator className="mb-5" />

        <CardFooter className="flex-col justify-start items-start space-y-2">
          <Link to={"/"}>
            <Button variant={"danger"} onClick={logOutHandle}>
              <LogOut className="mr-2 h-5 w-5" />
              Deslogar
            </Button>
          </Link>
          <Button variant={"danger"} onClick={logOutHandle}>
            <Trash className="mr-2 h-5 w-5" />
            Deletar conta
          </Button>
        </CardFooter>
      </Card>
    </>
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
