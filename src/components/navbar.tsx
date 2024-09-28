import * as React from "react";
import { HexaLink, HexaReturn } from "../components/ui/router.tsx";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "./ui/navbar.tsx";
import { ShareComponent } from "./share.component.tsx";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger,
} from "./ui/dropdown.tsx";
import { Button } from "./ui/button.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.tsx";

import {
  LayoutGrid,
  Search,
  HeartHandshake,
  CalendarDays,
  ArrowLeft,
  EllipsisVertical,
  Siren,
  Ban,
  Share,
  BadgeCheck,
  Bell,
  Pencil,
  ChevronDown,
  Zap,
  LogOut,
  Settings,
  BadgeHelp,
  Heart,
  Crown,
} from "lucide-react";

import logoCrush from "../../public/images/logo/logo.png";

import { getUserData } from "../utils/getUserData.tsx";

interface profile {
  name: string;
  email: string;
  avatar: string;
}

interface User {
  _id: string;
  nickname: string;
  email: string;
  campus: string;
  className?: string;
}

interface userData {
  user: User | null;
  className?: string;
  avatarPath?: string;
}

const Profile = ({ name, email, avatar }: profile) => {
  const userData = getUserData();

  function logOutHandle() {
    localStorage.setItem("token", "null");
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant={"outline"}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatar} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <ChevronDown className="ml-2" />
        </Button>
      </DropdownTrigger>

      <DropdownContent className="select-none">
        <DropdownLabel>Conta</DropdownLabel>
        <DropdownSeparator />

        <HexaLink href={`/profile/${userData._id}`}>
          <DropdownItem className="cursor-pointer">
            <div className="flex flex-row items-center space-x-2">
              <div className="flex relative">
                <div className="flex absolute right-0 bottom-0 h-2 w-2 z-10">
                  <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                  <span className="bg-success rounded-full inline-flex relative h-2 w-2"></span>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={avatar} />
                  <AvatarFallback>{name}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row items-center space-x-1">
                  <div>
                    <p className="font-poppins font-semibold">{name}</p>
                  </div>

                  <div>
                    <BadgeCheck className="text-success size-3.5" />
                  </div>
                </div>
                <p className="font-poppins text-tiny font-light tracking-light">
                  {email}
                </p>
              </div>
            </div>
          </DropdownItem>
        </HexaLink>

        <DropdownSeparator />

        <HexaLink href={""}>
          <DropdownItem className="cursor-pointer font-poppins font-semibold">
            <Heart className="mr-2 size-4" />
            Curtidas
          </DropdownItem>
        </HexaLink>
        <HexaLink href={""}>
          <DropdownItem className="cursor-pointer font-poppins font-semibold">
            <Crown className="mr-2 size-4" />
            Favoritos
          </DropdownItem>
        </HexaLink>
        <HexaLink href={""}>
          <DropdownItem className="cursor-pointer font-poppins font-semibold">
            <Zap className="mr-2 size-4" />
            Upgrade
          </DropdownItem>
        </HexaLink>
        <HexaLink href={"/settings"}>
          <DropdownItem className="cursor-pointer font-poppins font-semibold">
            <Settings className="mr-2 size-4" />
            Configurações
          </DropdownItem>
        </HexaLink>
        <HexaLink href={"/support"}>
          <DropdownItem className="cursor-pointer font-poppins font-semibold">
            <BadgeHelp className="mr-2 size-4" />
            Suporte
          </DropdownItem>
        </HexaLink>
        <DropdownSeparator />
        <HexaLink href={"/auth/login"}>
          <DropdownItem
            className="cursor-pointer text-danger font-poppins font-semibold"
            onClick={logOutHandle}
          >
            <LogOut className="mr-2 size-4" />
            Deslogar
          </DropdownItem>
        </HexaLink>
      </DropdownContent>
    </Dropdown>
  );
};

export const NavBar = (props: userData) => {
  return (
    <Navbar>
      <NavbarContent>
        <NavbarBrand
          className="text-primary font-recursive uppercase tracking-widest"
          href="/"
        >
          <img
            className="h-10 w-12 md:w-10"
            alt="logo crush if"
            src={logoCrush}
          />
          CrushIF
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex">
        <NavbarItem
          href="/"
          activeClassName="text-primary"
          hoverClassName="text-primary/70"
        >
          <LayoutGrid className="h-5 w-5" />
          Inicio
        </NavbarItem>

        <NavbarItem
          href="/search"
          activeClassName="text-primary"
          hoverClassName="text-primary/70"
        >
          <Search className="h-5 w-5" />
          Pesquisar
        </NavbarItem>
        <NavbarItem
          href="/match"
          activeClassName="text-primary"
          hoverClassName="text-primary/70"
        >
          <HeartHandshake className="h-5 w-5" />
          Crush
        </NavbarItem>

        <NavbarItem
          href="/events"
          activeClassName="text-primary"
          hoverClassName="text-primary/70"
        >
          <CalendarDays className="h-5 w-5" />
          Evêntos
        </NavbarItem>
      </NavbarContent>

      <NavbarContent>
        <NavbarItem
          href="/notifications"
          activeClassName="text-primary"
          hoverClassName="text-primary/70"
        >
          <Button variant={"outline"} size={"icon"}>
            <Bell className="h-5 w-5" />
          </Button>
        </NavbarItem>

        <Profile
          name={props.user?.nickname ? props.user.nickname : ""}
          email={props.user?.email ? props.user.email : ""}
          avatar={props.avatarPath ? props.avatarPath : ""}
        />
      </NavbarContent>
    </Navbar>
  );
};

interface NavBarReturnProps {
  title: string;
  [key: string]: any;
  profile?: boolean;
  id?: string;
  avatar?: string;
  name?: string;
  isOwnProfile?: boolean;
}

export const NavBarReturn = (props: NavBarReturnProps) => {
  const navigate = HexaReturn();

  const [shareIsOpen, setShareIsOpen] = React.useState(false);

  const handleOpenShare = () => {
    setShareIsOpen(true);
  };

  const handleCloseShare = () => {
    setShareIsOpen(false);
  };

  return (
    <>
      <Navbar>
        <NavbarContent>
          <Button
            variant={"ghost"}
            className="text-primary"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2" />
            {props.title}
          </Button>
        </NavbarContent>

        {props.profile && (
          <NavbarContent>
            <Dropdown>
              <DropdownTrigger>
                <EllipsisVertical className="cursor-pointer " />
              </DropdownTrigger>

              <DropdownContent>
                <DropdownLabel>Perfil</DropdownLabel>
                <DropdownSeparator />

                <div>
                  <HexaLink href={`/profile/${props.id}`}>
                    <DropdownItem className="cursor-pointer">
                      <div className="flex flex-row items-center space-x-2">
                        <div className="flex relative">
                          <div className="flex absolute right-0 bottom-0 h-2 w-2 z-10">
                            <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                            <span className="bg-success rounded-full inline-flex relative h-2 w-2"></span>
                          </div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={props.avatar} />
                            <AvatarFallback>{props.name}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex flex-row items-center space-x-1">
                            <div>
                              <p className="text-slate-950 dark:text-slate-50 font-inter font-bold ">
                                {props.name}
                              </p>
                            </div>

                            <div>
                              <BadgeCheck className="text-gree-500 dark:text-green-600 size-3.5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </DropdownItem>
                  </HexaLink>
                </div>

                <DropdownSeparator />

                <DropdownItem
                  className="cursor-pointer font-poppins font-semibold"
                  onClick={handleOpenShare}
                >
                  <Share className="mr-2 size-4" />
                  Compartilhar
                </DropdownItem>

                {props.isOwnProfile && (
                  <>
                    <DropdownSeparator />

                    <DropdownItem className="cursor-pointer text-red-500 dark:text-red-600 font-poppins font-semibold">
                      <Pencil className="mr-2 size-4" />
                      Editar
                    </DropdownItem>
                  </>
                )}

                {!props.isOwnProfile && (
                  <>
                    <DropdownSeparator />

                    <DropdownItem className="cursor-pointer text-red-500 dark:text-red-600 font-poppins font-semibold">
                      <Siren className="mr-2 size-4" />
                      Reportar
                    </DropdownItem>
                    <DropdownItem className="cursor-pointer text-red-500 dark:text-red-600 font-poppins font-semibold">
                      <Ban className="mr-2 size-4" />
                      Bloquear
                    </DropdownItem>
                  </>
                )}
              </DropdownContent>
            </Dropdown>
          </NavbarContent>
        )}
      </Navbar>

      {shareIsOpen && (
        <ShareComponent
          link={`https://crushif.vercel.app/profile/${props.id}`}
          onClose={handleCloseShare}
        />
      )}
    </>
  );
};
