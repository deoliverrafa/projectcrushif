import { HexaLink } from "../../components/ui/router.tsx";

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

const SettingsPage = () => {
  const userData = getUserData();

  function logOutHandle() {
    localStorage.setItem("token", "null");
  }

  return (
    <>
      <NavBarReturn title="Configurações" />

      <main className="flex flex-col justify-center items-center h-screen w-full">
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
              <div className="flex relative">
                <div className="flex absolute  right-0 bottom-0 h-2 w-2 z-10">
                  <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                  <span className="bg-success rounded-full inline-flex relative h-2 w-2"></span>
                </div>
                <Avatar>
                  <AvatarFallback>{userData.nickname}</AvatarFallback>
                  <AvatarImage src={userData.avatar} />
                </Avatar>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row items-center space-x-1">
                  <p className="font-inter font-semibold">
                    {userData.nickname}
                  </p>
                  <BadgeCheck className="text-success size-3" />
                </div>
                <p className="text-default text-tiny font-inter tracking-tight">
                  {userData.email}
                </p>
              </div>
            </div>
          </CardContent>

          <Separator className="mb-5" />

          <CardFooter className="flex-col justify-start items-start space-y-2">
            <HexaLink href={"/"}>
              <Button variant={"danger"} onClick={logOutHandle}>
                <LogOut className="mr-2 h-5 w-5" />
                Deslogar
              </Button>
            </HexaLink>
            <Button variant={"danger"} onClick={logOutHandle}>
              <Trash className="mr-2 h-5 w-5" />
              Deletar conta
            </Button>
          </CardFooter>
        </Card>
      </main>
    </>
  );
};

export default SettingsPage;
