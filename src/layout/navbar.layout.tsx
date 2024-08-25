import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Profile } from "../components/profile.component";

import { Button } from "../components/ui/button.tsx";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Image,
} from "@nextui-org/react";

import {
  LayoutGrid,
  Search,
  HeartHandshake,
  CalendarDays,
  ArrowLeft,
} from "lucide-react";

import logo from "../../public/images/logo/logo.png";

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
    >
      <NavbarContent justify="start">
        <Link href="/">
          <NavbarBrand>
            <Image className="h-10 w-12" alt="logo crush if" src={logo} />
            <p className="text-primary font-recursive font-semibold uppercase tracking-widest">
              Crush
            </p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden md:flex" justify="center">
        <NavLink to="/">
          {({ isActive }) =>
            isActive ? (
              <div className="cursor-pointer flex flex-row items-center space-x-1">
                <LayoutGrid className="text-pink-500 dark:text-pink-600 size-6" />
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
                <Search className="text-pink-500 dark:text-pink-600 size-6" />
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
                <HeartHandshake className="text-pink-500 dark:text-pink-600 size-6" />
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
                <CalendarDays className="text-pink-500 dark:text-pink-600 size-6" />
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
}

export const NavBarReturn: React.FC<NavBarReturnProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Navbar isBordered shouldHideOnScroll isBlurred={false} position={"static"}>
      <NavbarContent justify="start">
        <NavbarItem>
          <Button size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Button>
        </NavbarItem>

        <NavbarItem>
          <p className="font-recursive font-semibold uppercase tracking-widest text-xl">
            {title}
          </p>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
