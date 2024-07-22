// IMPORT - LIBRARYS //
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// IMPORT - COMPONENTS //
import { Profile } from './profile.tsx';
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarContent,
  NavbarItem,
  Link,
  Image
} from "@nextui-org/react";

// IMPORT - ICONS //
import {
  Home,
  Search,
  HeartHandshake,
  CalendarDays,
  ArrowLeft
} from 'lucide-react';

// IMPORT - IMAGES //
import logo from '../../public/images/logo/logo.png';

// CREATE - INTERFACES //
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

// COMPONENT - NAVBAR //
export const NavBar = (props: userData) => {

  return (
    <Navbar
      position="static"
      shouldHideOnScroll
      isBordered={true}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          className="flex md:hidden"
        />
        <Link href="/">
          <NavbarBrand>
            <Image
              className="h-10 w-12"
              alt="logo crush if"
              src={logo} />
            <p className="text-primary font-recursive font-semibold uppercase tracking-widest">Crush</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      {/* NAVBAR - CENTER CONTENT */}
      <NavbarContent 
        className="hidden md:flex"
        justify="center"
      >
        {/* MENU - NAV LINKS */}
        <NavLink to="/">
          {({ isActive }) => isActive ? (
            <Button 
              color="primary"
              variant="flat"
              radius="full"
              startContent={<Home />}
            >
              <p className="font-Poppins font-semibold">Inicio</p>
            </Button>
          ) : (
            <Button
              color="primary"
              variant="flat"
              radius="lg"
              isIconOnly={true}
            >
              <Home />
            </Button>
          )}
        </NavLink>
        <NavLink to="/search">
          {({ isActive }) => isActive ? (
            <Button 
              color="primary"
              variant="flat"
              radius="full"
              startContent={<Search />}
            >
              <p className="font-poppins font-semibold">Pesquisar</p>
            </Button>
          ) : (
            <Button
              color="primary"
              variant="flat"
              radius="lg"
              isIconOnly={true}
            >
              <Search />
            </Button>
          )}
        </NavLink>
        <NavLink to="/match">
          {({ isActive }) => isActive ? (
            <Button 
              color="primary"
              variant="flat"
              radius="full"
              startContent={<HeartHandshake />}
            >
              <p className="font-poppins font-semibold">Crush</p>
            </Button>
          ) : (
            <Button
              color="primary"
              variant="flat"
              radius="lg"
              isIconOnly={true}
            >
              <HeartHandshake />
            </Button>
          )}
        </NavLink>
        <NavLink to="/events">
          {({ isActive }) => isActive ? (
            <Button 
              color="primary"
              variant="flat"
              radius="full"
              startContent={<CalendarDays />}
            >
              <p className="font-poppins font-semibold">Evêntos</p>
            </Button>
          ) : (
            <Button
              color="primary"
              variant="flat"
              radius="lg"
              isIconOnly={true}
            >
              <CalendarDays />
            </Button>
          )}
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

// COMPONENT - NAV BAR RETURN //
export const NavBarReturn: React.FC<NavBarReturnProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Navbar
      isBordered
      shouldHideOnScroll
      isBlurred={true}
      position={'static'}>
      <NavbarContent justify="start">
        <NavbarItem>
          <Button
            isIconOnly
            color="primary"
            variant="flat"
            onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Button>
        </NavbarItem>

        <NavbarItem>
          <p className="font-poppins font-semibold">{title}</p>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};