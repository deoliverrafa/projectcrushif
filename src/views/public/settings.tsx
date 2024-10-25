import { Link } from "react-router-dom";

import { NavBarReturn } from "../../components/navbar.tsx";
import { ThemeToggle } from "../../components/ui/theme.tsx";
import {
  Card,
  CardContent,
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
  LogoutSolid,
  TrashOneSolid,
  HeartWavesSolid,
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
                <CardTitle className="font-semibold md:font-medium text-md md:text-sm tracking-tight">{userData.nickname}</CardTitle>
                <HeartWavesSolid
                  className={`${
                    userData?.type === "Plus"
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
          <Button variant={"danger"}>
            <TrashOneSolid className="mr-2 h-5 w-5" />
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
