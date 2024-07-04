// IMPORT - LIBRARYS //
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownSection,
  Avatar,
  Link,
  Image
} from "@nextui-org/react";

// IMPORT - ICONS //
import {
  ProfileIcon,
  SettingIcon,
  ShareIcon,
  LogoutIcon,
  SearchIcon,
  ArrowLeftIcon
} from './../icons/icons.tsx';

// IMPORT - IMAGES //
import logo from "../../public/images/CrushIf_Logo-removebg-preview.png";
import React from 'react';

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
  function logOutHandle() {
    localStorage.setItem('token', "null");
  }

  return (
    <Navbar
      isBordered
      shouldHideOnScroll
      isBlurred={true}
      position={'static'}>
      <NavbarContent justify="start">
        <Dropdown>
          <DropdownTrigger>
            <Avatar
              isBordered
              className="font-Poppins uppercase"
              color="primary"
              size="sm"
              name={props.user?.nickname ? props.user.nickname : ""}
              src={props.avatarPath ? props.avatarPath : ""} />
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile Actions">
            <DropdownSection
              title="Conta"
              className="font-Poppins">
              <DropdownItem
                className="gap-2">
                <p className="font-semibold">Logado como:</p>
                <p className="font-regular text-default">{props.user?.email}</p>
              </DropdownItem>

              <DropdownItem
                key="profile"
                description="Exibir perfil do usuário"
                className="font-Poppins"
                href="/profile"
                startContent={<ProfileIcon className="size-4" />}>
                Perfil
              </DropdownItem>

              <DropdownItem
                key="user"
                description="Configurações do usuário"
                className="font-Poppins"
                href="/profile/edit"
                startContent={<SettingIcon className="size-4" />}>
                Configurações
              </DropdownItem>

              <DropdownItem
                key="share"
                description="Compartilhar perfil do usuário"
                className="font-Poppins"
                startContent={<ShareIcon className="size-4" />}>
                Compartilhar
              </DropdownItem>

              <DropdownItem
                key="logout"
                description="Deslogar da conta do usuário"
                className="font-Poppins text-danger"
                href="/auth/login"
                onClick={logOutHandle}
                startContent={<LogoutIcon className="size-4" />}>
                Sair
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarContent justify="center">
        <Link href="/">
          <NavbarBrand>
            <Image
              className="h-10 w-10"
              alt="logo crush if"
              src={logo} />
            <p className="font-Poppins text-foreground font-bold text-xl md:text-2xl">Crush</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent justify="end">
        <Button
          variant="light"
          isIconOnly>
          <SearchIcon className="size-6" />
        </Button>
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
            variant="light"
            onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="size-6" />
          </Button>
        </NavbarItem>

        <NavbarItem>
          <p className="font-Poppins font-bold">{title}</p>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};