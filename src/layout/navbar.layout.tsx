import * as React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { Profile } from "../components/user/profile.component";
import { ShareComponent } from "../components/share.component.tsx";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu.tsx";
import { Button } from "../components/ui/button.tsx";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Image,
  Avatar,
} from "@nextui-org/react";

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
  Pencil
} from "lucide-react";

import logoCrush from "../../public/images/logo/logo.png";

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

export const NavBar = (props: userData) => {
  // const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      position="static"
      shouldHideOnScroll
      isBordered={true}
      isBlurred={false}
      className="select-none"
    >
      <NavbarContent justify="start">
        <Link to="/">
          <NavbarBrand>
            <Image
              className="h-10 w-12 md:w-10"
              alt="logo crush if"
              src={logoCrush}
            />
            <p className="text-pink-500 dark:text-pink-600 font-recursive font-semibold uppercase tracking-widest">
              CrushIF
            </p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden md:flex" justify="center">
        <NavLink to="/">
          {({ isActive }) =>
            isActive ? (
              <div className="cursor-pointer flex flex-row items-center space-x-1">
                <LayoutGrid className="text-pink-500 dark:text-pink-600 fill-pink-500 dark:fill-pink-600 size-6" />
                <p className="text-pink-500 dark:text-pink-600 font-poppins font-semibold text-sm">
                  Inicio
                </p>
              </div>
            ) : (
              <div className="cursor-pointer flex flex-row justify-center items-center space-x-1">
                <LayoutGrid className="text-slate-700 dark:text-slate-400 size-6" />
                <p className="text-slate-700 dark:text-slate-400 font-poppins font-semibold text-sm">
                  Inicio
                </p>
              </div>
            )
          }
        </NavLink>
        <NavLink to="/search">
          {({ isActive }) =>
            isActive ? (
              <div className="cursor-pointer flex flex-row items-center space-x-1">
                <Search className="text-pink-500 dark:text-pink-600 fill-pink-500 dark:fill-pink-600 size-6" />
                <p className="text-pink-500 dark:text-pink-600 font-poppins font-semibold text-sm">
                  Pesquisar
                </p>
              </div>
            ) : (
              <div className="cursor-pointer flex flex-row justify-center items-center space-x-1">
                <Search className="text-slate-700 dark:text-slate-400 size-6" />
                <p className="text-slate-700 dark:text-slate-400 font-poppins font-semibold text-sm">
                  Pesquisar
                </p>
              </div>
            )
          }
        </NavLink>
        <NavLink to="/match">
          {({ isActive }) =>
            isActive ? (
              <div className="cursor-pointer flex flex-row items-center space-x-1">
                <HeartHandshake className="text-pink-500 dark:text-pink-600 fill-pink-500 dark:fill-pink-600 size-6" />
                <p className="text-pink-500 dark:text-pink-600 font-poppins font-semibold text-sm">
                  Crush
                </p>
              </div>
            ) : (
              <div className="cursor-pointer flex flex-row justify-center items-center space-x-1">
                <HeartHandshake className="text-slate-700 dark:text-slate-400 size-6" />
                <p className="text-slate-700 dark:text-slate-400 font-poppins font-semibold text-sm">
                  Crush
                </p>
              </div>
            )
          }
        </NavLink>
        <NavLink to="/events">
          {({ isActive }) =>
            isActive ? (
              <div className="cursor-pointer flex flex-row items-center space-x-1">
                <CalendarDays className="text-pink-500 dark:text-pink-600 fill-pink-500 dark:fill-pink-600   size-6" />
                <p className="text-pink-500 dark:text-pink-600 font-poppins font-semibold text-sm">
                  Evêntos
                </p>
              </div>
            ) : (
              <div className="cursor-pointer flex flex-row justify-center items-center space-x-1">
                <CalendarDays className="text-slate-700 dark:text-slate-400 size-6" />
                <p className="text-slate-700 dark:text-slate-400 font-poppins font-semibold text-sm">
                  Evêntos
                </p>
              </div>
            )
          }
        </NavLink>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavLink to="/notifications">
          {({ isActive }) =>
            isActive ? (
              <Button variant={"outline"} size={"icon"}>
                <Bell className="text-pink-500 dark:text-pink-600 fill-pink-500 dark:fill-pink-600   size-6" />
              </Button>
            ) : (
              <Button variant={"outline"} size={"icon"}>
                <Bell className="text-slate-700 dark:text-slate-400 size-6" />
              </Button>
            )
          }
        </NavLink>

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
  const navigate = useNavigate();

  const [shareIsOpen, setShareIsOpen] = React.useState(false);

  const handleOpenShare = () => {
    setShareIsOpen(true);
  };

  const handleCloseShare = () => {
    setShareIsOpen(false);
  };

  return (
    <>
      <Navbar
        isBordered
        shouldHideOnScroll
        isBlurred={false}
        position={"static"}
        className="select-none"
      >
        <NavbarContent justify="start">
          <Button
            variant={"ghost"}
            className="text-pink-500 dark:text-pink-600 font-poppins font-semibold uppercase"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2" />
            {props.title}
          </Button>
        </NavbarContent>

        {props.profile && (
          <NavbarContent justify="end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="cursor-pointer " />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>Perfil</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <div>
                  <Link to={`/profile/${props.id}`}>
                    <DropdownMenuItem className="cursor-pointer">
                      <div className="flex flex-row items-center space-x-2">
                        <div className="flex relative">
                          <div className="flex absolute right-0 bottom-0 h-2 w-2 z-10">
                            <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                            <span className="bg-success rounded-full inline-flex relative h-2 w-2"></span>
                          </div>
                          <Avatar
                            size="sm"
                            name={props.name}
                            src={props.avatar}
                          />
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
                    </DropdownMenuItem>
                  </Link>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="cursor-pointer font-poppins font-semibold"
                  onClick={handleOpenShare}
                >
                  <Share className="mr-2 size-4" />
                  Compartilhar
                </DropdownMenuItem>

                {props.isOwnProfile && (
                  <>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="cursor-pointer text-red-500 dark:text-red-600 font-poppins font-semibold">
                      <Pencil className="mr-2 size-4" />
                      Editar
                    </DropdownMenuItem>
                  </>
                )}

                {!props.isOwnProfile && (
                  <>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="cursor-pointer text-red-500 dark:text-red-600 font-poppins font-semibold">
                      <Siren className="mr-2 size-4" />
                      Reportar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-red-500 dark:text-red-600 font-poppins font-semibold">
                      <Ban className="mr-2 size-4" />
                      Bloquear
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
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
