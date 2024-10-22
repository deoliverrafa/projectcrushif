import * as React from "react";
import { cn } from "../lib/utils.ts";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet.tsx";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownTrigger,
} from "./ui/dropdown.tsx";
import { Button } from "./ui/button.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.tsx";
import { Card, CardTitle } from "./ui/card.tsx";
import { Separator } from "./ui/separator.tsx";

import {
  GridSolid,
  SearchSolid,
  FireSolid,
  AcademicHatSolid,
  SendSolid,
  ChevronDown,
  CogFourSolid,
  QuestionCircleSolid,
  HeartWavesSolid,
  ChevronRight,
  HeartSolid,
  BookmarkSolid,
  NotificationSolid,
  LogoutSolid,
  EditOneSolid,
  LightningSolid,
  ChevronLeft
} from "@mynaui/icons-react";

import { getUserData } from "../utils/getUserData.tsx";

interface profile {
  nickname: string;
  name: string;
  avatar: string;
}

interface User {
  _id: string;
  nickname: string;
  name?: string;
  email: string;
  campus: string;
  className?: string;
}

interface userData {
  user: User | null;
  className?: string;
  avatarPath?: string;
}

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

const Profile = ({ nickname, name, avatar }: profile) => {
  const userData = getUserData();

  function logOutHandle() {
    localStorage.setItem("token", "null");
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatar} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      </SheetTrigger>

      <SheetContent className="select-none p-0">
        <SheetHeader className="p-4">
          <SheetTitle className="text-center">Central de Contas</SheetTitle>

          <SheetDescription className="text-center">
            Gerencie suas experiências com o Central de Contas do{" "}
            <span className="font-cookie text-primary text-lg">Crushif</span>{" "}
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 p-2">
          <Card className="w-full">
            <div className="flex flex-row justify-between items-center p-4">
              <Link
                to={`/profile/${userData._id}`}
                className="flex space-x-2 h-full"
              >
                <Avatar>
                  <AvatarFallback>{nickname}</AvatarFallback>
                  <AvatarImage src={avatar} />
                </Avatar>

                <div className="flex flex-col items-start justify-center">
                  <div className="flex flex-row items-center space-x-1">
                    <CardTitle className="font-semibold md:font-medium text-md md:text-sm tracking-tight">
                      {nickname ? `${nickname}` : "indisponível"}
                    </CardTitle>

                    <div>
                      <HeartWavesSolid className="text-success h-4 w-4 md:h-3 md:w-3" />
                    </div>
                  </div>

                  <CardTitle className="font-normal md:font-light text-sm md:text-xs tracking-tight text-wrap">
                    {name ? `${name}` : "indisponível"}
                  </CardTitle>
                </div>
              </Link>

              <Link to={`/profile/${userData._id}`}>
                <ChevronRight />
              </Link>
            </div>
          </Card>

          <Separator />

          <Card className="flex flex-col p-2 space-y-2 w-full">
            <SheetDescription className="font-semibold md:font-medium">
              Experiência do usuário
            </SheetDescription>

            <Link
              to=""
              className="flex flex-row justify-between items-center p-3"
            >
              <div className="flex flex-row items-center gap-2">
                <NotificationSolid />
                <p className="font-poppins font-semibold md:font-medium text-md md:text-sm tracking-tight">
                  Notificações
                </p>
              </div>
              <ChevronRight />
            </Link>

            <Link
              to=""
              className="flex flex-row justify-between items-center p-3"
            >
              <div className="flex flex-row items-center gap-2">
                <LightningSolid />
                <p className="font-poppins font-semibold md:font-medium text-md md:text-sm tracking-tight">
                  Upgrade
                </p>
              </div>
              <ChevronRight />
            </Link>

            <Link
              to=""
              className="flex flex-row justify-between items-center p-3"
            >
              <div className="flex flex-row items-center gap-2">
                <HeartSolid />
                <p className="font-poppins font-semibold md:font-medium text-md md:text-sm tracking-tight">
                  Salvos
                </p>
              </div>
              <ChevronRight />
            </Link>

            <Link
              to=""
              className="flex flex-row justify-between items-center p-3"
            >
              <div className="flex flex-row items-center gap-2">
                <BookmarkSolid />
                <p className="font-poppins font-semibold md:font-medium text-md md:text-sm tracking-tight">
                  Favoritos
                </p>
              </div>
              <ChevronRight />
            </Link>
          </Card>

          <Separator />

          <Card className="flex flex-col p-2 space-y-2 w-full">
            <SheetDescription className="font-semibold md:font-medium">
              Conta do usuário
            </SheetDescription>

            <Link
              to=""
              className="flex flex-row justify-between items-center p-3"
            >
              <div className="flex flex-row items-center gap-2">
                <EditOneSolid />
                <p className="font-poppins font-semibold md:font-medium text-md md:text-sm tracking-tight">
                  Editar
                </p>
              </div>
              <ChevronRight />
            </Link>

            <Link
              to="/auth/login"
              className="flex flex-row justify-between items-center p-3"
              onClick={logOutHandle}
            >
              <div className="flex flex-row items-center gap-2">
                <LogoutSolid className="text-danger" />
                <p className="text-danger font-poppins font-semibold md:font-medium text-md md:text-sm tracking-tight">
                  Sair
                </p>
              </div>
              <ChevronRight className="text-danger" />
            </Link>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Navbar: React.FC<NavbarProps> = ({ className, children, ...props }) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={cn(
        "transition-transform duration-300 select-none bg-card shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex flex-row justify-between items-center shadow-[0_-2px_4px_rgba(0,0,0,0.1)] sticky top-0 inset-x-0 translate-y-0 md:translate-y-0/2 px-4 md:px-2 py-2 md:py-1 w-full z-20",
        isVisible ? "translate-y-0" : "-translate-y-full",
        className
      )}
      {...props}
    >
      {children}
    </nav>
  );
};
Navbar.displayName = "Navbar";

interface NavbarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const NavbarContent: React.FC<NavbarContentProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-row items-center py-2 md:py-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
NavbarContent.displayName = "NavbarContent";

interface NavbarItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  activeClassName?: string;
  hoverClassName?: string;
  className?: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  href,
  activeClassName,
  hoverClassName,
  className,
  children,
  ...props
}) => {
  const handleRipple = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");

    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${
      event.clientX - button.getBoundingClientRect().left - radius
    }px`;
    circle.style.top = `${
      event.clientY - button.getBoundingClientRect().top - radius
    }px`;
    circle.style.position = "absolute";
    circle.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
    circle.style.borderRadius = "50%";
    circle.style.transform = "scale(0)";
    circle.style.pointerEvents = "none";
    circle.style.opacity = "1";
    circle.style.transition = "transform 600ms ease, opacity 600ms ease";

    circle.classList.add("ripple");

    const existingRipple = button.querySelector(".ripple");
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(circle);

    requestAnimationFrame(() => {
      circle.style.transform = "scale(4)";
      circle.style.opacity = "0";
    });

    circle.addEventListener("transitionend", () => {
      circle.remove();
    });
  };

  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          "rounded-md font-semibold flex flex-row items-center relative gap-1 overflow-hidden px-4 md:px-2 py-2 md:py-1 text-md md:text-sm",
          isActive ? "text-primary" : "text-muted-foreground",
          "hover:text-primary/70",
          className
        )
      }
      to={href}
      onClick={(e) => {
        handleRipple(e);
        if (props.onClick) props.onClick(e);
      }}
      {...props}
    >
      {children}
    </NavLink>
  );
};
NavbarItem.displayName = "NavbarItem";

interface NavbarBrandProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  activeClassName?: string;
  hoverClassName?: string;
  className?: string;
}

const NavbarBrand: React.FC<NavbarBrandProps> = ({
  href,
  activeClassName,
  hoverClassName,
  className,
  children,
  ...props
}) => {
  return (
    <Link
      className={cn(
        "font-bold md:font-semibold flex items-center gap-2 text-lg md:text-md",
        className
      )}
      to={href}
      {...props}
    >
      {children}
    </Link>
  );
};
NavbarBrand.displayName = "NavbarBrand";

export const NavBar = (props: userData) => {
  return (
    <Navbar>
      <NavbarContent>
        <Dropdown>
          <DropdownTrigger>
            <NavbarBrand
              className="text-primary font-cookie font-medium md:font-medium text-[2rem]"
              href={""}
            >
              <FireSolid />
              Crushif
              <ChevronDown className="text-muted-foreground" />
            </NavbarBrand>
          </DropdownTrigger>

          <DropdownContent className="select-none">
            <DropdownLabel className="text-sm text-muted-foreground font-semibold md:font-medium">
              Menu
            </DropdownLabel>

            <Link
              to={"/settings"}
              className="flex flex-row justify-between items-center p-2"
            >
              <DropdownItem className="flex flex-row items-center gap-2">
                <CogFourSolid />
                <p className="font-poppins font-semibold md:font-medium text-lg md:text-md tracking-tight">
                  Configurações
                </p>
              </DropdownItem>

              <ChevronRight />
            </Link>

            <Link
              to={"/support"}
              className="flex flex-row justify-between items-center p-2"
            >
              <DropdownItem className="flex flex-row items-center gap-2">
                <QuestionCircleSolid />
                <p className="font-poppins font-semibold md:font-medium text-lg md:text-md tracking-tight">
                  Suporte
                </p>
              </DropdownItem>

              <ChevronRight />
            </Link>
          </DropdownContent>
        </Dropdown>
      </NavbarContent>

      <NavbarContent className="hidden md:flex">
        <NavbarItem
          href="/"
          activeClassName="text-primary"
          hoverClassName="text-primary/70"
        >
          <GridSolid className="h-5 w-5" />
          Inicio
        </NavbarItem>

        <NavbarItem
          href="/search"
          activeClassName="text-primary"
          hoverClassName="text-primary/70"
        >
          <SearchSolid className="h-5 w-5" />
          Pesquisar
        </NavbarItem>
        <NavbarItem
          href="/match"
          activeClassName="text-primary"
          hoverClassName="text-primary/70"
        >
          <FireSolid className="h-5 w-5" />
          Crush
        </NavbarItem>

        <NavbarItem
          href="/events"
          activeClassName="text-primary"
          hoverClassName="text-primary/70"
        >
          <AcademicHatSolid className="h-5 w-5" />
          Evêntos
        </NavbarItem>
      </NavbarContent>

      <NavbarContent>
        <NavbarItem
          href="/notifications"
          activeClassName="text-primary"
          hoverClassName="text-primary/70"
        >
          <SendSolid className="h-6 w-6 md:h-5 md:w-5" />
        </NavbarItem>

        <NavbarItem href={""}>
          <Profile
            nickname={props.user?.nickname ? props.user.nickname : ""}
            name={props.user?.name ? props.user.name : ""}
            avatar={props.avatarPath ? props.avatarPath : ""}
          />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

interface NavBarReturnProps {
  title: string;
}

export const NavBarReturn = (props: NavBarReturnProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar>
        <NavbarContent>
          <Button
            variant={"ghost"}
            className="text-primary"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-1" />
            {props.title}
          </Button>
        </NavbarContent>
      </Navbar>
    </>
  );
};
