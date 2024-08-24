import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Profile } from "../components/profile.tsx";
import { Drawer } from "../components/drawer.tsx";
import { Button } from "../components/ui/button.tsx";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarContent,
  NavbarItem,
  Link,
  Image,
} from "@nextui-org/react";

import {
  Home,
  Search,
  HeartHandshake,
  CalendarDays,
  ArrowLeft,
  CircleUserRound,
  BellRing,
  Heart,
  Crown,
  Settings,
  BadgeHelp,
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
        <NavbarMenuToggle
          // aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="flex md:hidden"
        />
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
              <Button>
                <Home className="size-4" />
                <p className="font-Poppins font-semibold">Inicio</p>
              </Button>
            ) : (
              <Button size="icon">
                <Home className="size-4" />
              </Button>
            )
          }
        </NavLink>
        <NavLink to="/search">
          {({ isActive }) =>
            isActive ? (
              <Button>
                <Search className="size-4" />
                <p className="font-poppins font-semibold">Pesquisar</p>
              </Button>
            ) : (
              <Button>
                <Search className="size-4" />
              </Button>
            )
          }
        </NavLink>
        <NavLink to="/match">
          {({ isActive }) =>
            isActive ? (
              <Button>
                <HeartHandshake className="size-4" />
                <p className="font-poppins font-semibold">Crush</p>
              </Button>
            ) : (
              <Button>
                <HeartHandshake />
              </Button>
            )
          }
        </NavLink>
        <NavLink to="/events">
          {({ isActive }) =>
            isActive ? (
              <Button>
                <CalendarDays />
                <p className="font-poppins font-semibold">Evêntos</p>
              </Button>
            ) : (
              <Button>
                <CalendarDays />
              </Button>
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

      <Drawer />
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

export const MenuBar = () => {
  return (
    <Navbar
      className="hidden md:flex"
      position="static"
      shouldHideOnScroll
      isBordered={true}
    >
      <NavbarContent justify="start">
        <NavbarItem>
          <Link href="/profile">
            <Button>
              <CircleUserRound />
              <p className="font-poppins font-semibold">Perfil</p>
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/notifications">
            <Button>
              <BellRing />
              <p className="font-poppins font-semibold">Notificações</p>
              <div className="flex relative h-3 w-3">
                <span className="animate-ping bg-info rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                <span className="bg-info rounded-full inline-flex relative h-3 w-3"></span>
              </div>
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarItem>
          <Link href="/liked">
            <Button>
              <Heart />
              <p className="font-poppins font-semibold">Curtidos</p>
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/favorite">
            <Button>
              <Crown />
              <p className="font-poppins font-semibold">Favoritos</p>
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/settings">
            <Button>
              <Settings />
              <p className="font-poppins font-semibold">Configurações</p>
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/support">
            <Button>
              <BadgeHelp />
              <p className="font-poppins font-semibold">Suporte</p>
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
