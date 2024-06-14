// IMPORT - LIBRARYS //
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  DropdownItem, 
  DropdownTrigger, 
  Dropdown, 
  DropdownMenu, 
  DropdownSection,
  Avatar, 
  Link,
  Image
} from "@nextui-org/react";

// IMPORT - COMPONENTS //
import {
  ProfileIcon,
  SettingIcon,
  ShareIcon,
  LogoutIcon,
  SearchIcon
} from './../icons/icons.tsx';

// IMPORT - IMAGES //
import logo from "../../public/images/CrushIf_Logo-removebg-preview.png";

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
    localStorage.setItem('userId', "null");
  }

  return (
    <>
      <Navbar 
        isBordered
        shouldHideOnScroll
        isBlurred={true}
        position={'static'}
      >
        <NavbarContent justify="start">
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Avatar
                isBordered
                className="font-Poppins uppercase"
                color="primary"
                size="sm"
                name={props.user?.nickname ? props.user.nickname : ""}
                src={props.avatarPath ? props.avatarPath : ""}
              />
            </DropdownTrigger>
            
            <DropdownMenu aria-label="Profile Actions">
              <DropdownSection 
                title="Conta"
                className="font-Poppins">
                <DropdownItem 
                  key="profile" 
                  className="gap-2">
                  <p className="font-semibold">Logado como:</p>
                  <p className="font-regular text-default">{props.user?.email}</p>
                </DropdownItem>
                
                <DropdownItem 
                  key="profilr" 
                  description="Exibir perfil do usuário"
                  className="font-Poppins" 
                  href="/user"
                  startContent={<ProfileIcon className="size-4" />}>
                  Perfil
                </DropdownItem>
                
                <DropdownItem 
                  key="user" 
                  description="Configurações do usuário"
                  className="font-Poppins" 
                  href="/user"
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
                src={logo}
              />
              <p className="font-Poppins text-foreground font-bold text-xl md:text-2xl">Crush</p>
            </NavbarBrand>
          </Link>
        </NavbarContent>
        
        <NavbarContent justify="end">
          <SearchIcon className="size-6" />
        </NavbarContent>
      </Navbar>
    </>
  );
};