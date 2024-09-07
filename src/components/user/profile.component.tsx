import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

import { Avatar } from "@nextui-org/react";

import {
  ChevronDown,
  Zap,
  LogOut,
  BadgeCheck,
  Settings,
  BadgeHelp,
  BellRing,
  Heart,
  Crown,
} from "lucide-react";

import { getUserData } from "../../utils/getUserData";

interface profile {
  name: string;
  email: string;
  avatar: string;
}

export const Profile = ({ name, email, avatar }: profile) => {
  const userData = getUserData();

  function logOutHandle() {
    localStorage.setItem("token", "null");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"outline"}>
          <Avatar className="h-6 w-6" src={avatar} name={name} />
          <ChevronDown className="text-slate-500 dark:text-slate-400 ml-2" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="select-none">
        <DropdownMenuLabel>Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link to={`/profile/${userData._id}`}>
          <DropdownMenuItem className="cursor-pointer">
            <div className="flex flex-row items-center space-x-2">
              <div className="flex relative">
                <div className="flex absolute right-0 bottom-0 h-2 w-2 z-10">
                  <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                  <span className="bg-success rounded-full inline-flex relative h-2 w-2"></span>
                </div>
                <Avatar size="sm" name={name} src={avatar} />
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row items-center space-x-1">
                  <div>
                    <p className="text-slate-950 dark:text-slate-50 font-inter font-bold ">
                      {name}
                    </p>
                  </div>

                  <div>
                    <BadgeCheck className="text-gree-500 dark:text-green-600 size-3.5" />
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-inter text-tiny font-semibold tracking-light">
                  {email}
                </p>
              </div>
            </div>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <Link to={"/notifications"}>
          <DropdownMenuItem className="cursor-pointer font-poppins font-semibold">
            <BellRing className="mr-2 size-4" />
            Notificações
            <div className="flex relative ml-2 h-2 w-2">
              <span className="animate-ping bg-blue-500 dark:bg-blue-600 rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
              <span className="bg-blue-500 dark:bg-blue-600 rounded-full inline-flex relative h-2 w-2"></span>
            </div>
          </DropdownMenuItem>
        </Link>
        <Link to={""}>
          <DropdownMenuItem className="cursor-pointer font-poppins font-semibold">
            <Heart className="mr-2 size-4" />
            Curtidas
          </DropdownMenuItem>
        </Link>
        <Link to={""}>
          <DropdownMenuItem className="cursor-pointer font-poppins font-semibold">
            <Crown className="mr-2 size-4" />
            Favoritos
          </DropdownMenuItem>
        </Link>
        <Link to={""}>
          <DropdownMenuItem className="cursor-pointer font-poppins font-semibold">
            <Zap className="mr-2 size-4" />
            Upgrade
          </DropdownMenuItem>
        </Link>
        <Link to={"/settings"}>
          <DropdownMenuItem className="cursor-pointer font-poppins font-semibold">
            <Settings className="mr-2 size-4" />
            Configurações
          </DropdownMenuItem>
        </Link>
        <Link to={"/support"}>
          <DropdownMenuItem className="cursor-pointer font-poppins font-semibold">
            <BadgeHelp className="mr-2 size-4" />
            Suporte
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link to={"/auth/login"}>
          <DropdownMenuItem
            className="cursor-pointer text-red-500 dark:text-red-600 font-poppins font-semibold"
            onClick={logOutHandle}
          >
            <LogOut className="mr-2 size-4" />
            Deslogar
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
