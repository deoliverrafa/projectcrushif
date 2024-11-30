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
  SendSolid,
  ChevronDown,
  CogFourSolid,
  QuestionCircleSolid,
  HeartWavesSolid,
  ChevronRight,
  HeartSolid,
  BookmarkSolid,
  LogoutSolid,
  EditOneSolid,
  ChevronLeft,
} from "@mynaui/icons-react";

import UserIcon from "../../public/images/user.png";

import decodeToken from "../utils/decodeToken.tsx";

interface profile {
  nickname: string;
  avatar: string;
  type: string;
}

interface User {
  _id: string;
  nickname: string;
  email: string;
  campus: string;
  className?: string;
}

interface userData {
  user: User | undefined | null;
  className?: string;
  avatarPath?: string;
}

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

const Profile = ({ nickname, avatar, type }: profile) => {
  const decodedObj = decodeToken(localStorage.getItem("token") ?? "");
  const userData = decodedObj?.user;

  function logOutHandle() {
    localStorage.setItem("token", "null");
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Avatar className="shadow-lg border-2 border-border h-8 w-8">
          <AvatarImage
            className="object-cover"
            src={avatar ? avatar : UserIcon}
          />
          <AvatarFallback>{nickname}</AvatarFallback>
        </Avatar>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto select-none p-0">
        <SheetHeader className="p-4">
          <SheetTitle className="text-center">Central de Contas</SheetTitle>

          <SheetDescription className="text-center">
            Gerencie suas experiências com o Central de Contas do{" "}
            <span className="font-cookie text-primary text-lg">Crushif</span>{" "}
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 p-2">
          <Link to={`/profile/${userData?._id}`}>
            <Card className="w-full">
              <div className="flex flex-row justify-between items-center h-full p-4">
                <div className="flex flex-row items-center gap-2">
                  <Avatar className="shadow-lg border-2 border-border">
                    <AvatarFallback>{nickname}</AvatarFallback>
                    <AvatarImage
                      className="object-cover"
                      src={avatar ? avatar : UserIcon}
                    />
                  </Avatar>

                  <div className="flex flex-row items-center gap-1">
                    <CardTitle className="font-semibold md:font-medium text-md md:text-sm tracking-tight">
                      {nickname ? `${nickname}` : "indisponível"}
                    </CardTitle>

                    <HeartWavesSolid
                      className={`${type === "Plus"
                        ? "text-info"
                        : type === "Admin"
                          ? "text-danger"
                          : type === "verified"
                            ? "text-success"
                            : "hidden"
                        } h-3.5 w-3.5`}
                    />
                  </div>
                </div>

                <Button variant={"outline"} size={"icon"}>
                  <ChevronRight />
                </Button>
              </div>
            </Card>
          </Link>

          <Separator />

          <Card className="flex flex-col p-2 space-y-2 w-full">
            <SheetDescription className="font-semibold md:font-medium ms-2 mt-2">
              Experiência do usuário
            </SheetDescription>

            <Link
              to="/saved"
              className="flex flex-row justify-between items-center px-3 py-1.5"
            >
              <div className="flex flex-row items-center gap-2">
                <HeartSolid />
                <p className="font-poppins font-semibold md:font-medium text-md md:text-sm tracking-tight">
                  Salvos
                </p>
              </div>

              <Button variant={"outline"} size={"icon"}>
                <ChevronRight />
              </Button>
            </Link>

            <Link
              to=""
              className="flex flex-row justify-between items-center px-3 py-1.5"
            >
              <div className="flex flex-row items-center gap-2">
                <BookmarkSolid />
                <p className="font-poppins font-semibold md:font-medium text-md md:text-sm tracking-tight">
                  Favoritos
                </p>
              </div>

              <Button variant={"outline"} size={"icon"}>
                <ChevronRight />
              </Button>
            </Link>
          </Card>

          <Separator />

          <Card className="flex flex-col p-2 space-y-2 w-full">
            <SheetDescription className="font-semibold md:font-medium ms-2 mt-2">
              Conta do usuário
            </SheetDescription>

            <Link
              to="/profile/edit"
              className="flex flex-row justify-between items-center px-3 py-1.5"
            >
              <div className="flex flex-row items-center gap-2">
                <EditOneSolid />
                <p className="font-poppins font-semibold md:font-medium text-md md:text-sm tracking-tight">
                  Editar
                </p>
              </div>

              <Button variant={"outline"} size={"icon"}>
                <ChevronRight />
              </Button>
            </Link>

            <Link
              to="/auth/login"
              className="flex flex-row justify-between items-center px-3 py-1.5"
              onClick={logOutHandle}
            >
              <div className="flex flex-row items-center gap-2">
                <LogoutSolid className="text-danger" />
                <p className="text-danger font-poppins font-semibold md:font-medium text-md md:text-sm tracking-tight">
                  Sair
                </p>
              </div>

              <Button className="text-danger border-danger" variant={"outline"} size={"icon"}>
                <ChevronRight />
              </Button>
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
        "border border-border rounded-b-3xl transition-transform duration-300 select-none bg-card shadow flex flex-row justify-between items-center sticky top-0 inset-x-0 translate-y-0 md:translate-y-0/2 px-4 md:px-2 py-0 w-full md:w-4/6 md:mx-auto z-20",
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
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius
      }px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius
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
          "font-semibold flex flex-row items-center relative gap-1 overflow-hidden px-4 md:px-2 py-2 md:py-1 text-md md:text-sm",
          isActive
            ? "text-primary animate-clickBounce border-t border-primary"
            : "text-muted-foreground/70",
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
  const decodedObj = decodeToken(localStorage.getItem("token") ?? "");
  const userData = decodedObj?.user;

  return (
    <Navbar>
      <NavbarContent>
        <Dropdown>
          <DropdownTrigger>
            <NavbarBrand
              className="text-primary font-cookie font-medium md:font-medium text-[2rem] gap-2 md:ms-2"
              href={""}
            >
              Crushif
              <ChevronDown className="text-muted-foreground" />
            </NavbarBrand>
          </DropdownTrigger>

          <DropdownContent className="select-none">
            <DropdownLabel>
              Menu
            </DropdownLabel>

            <Link
              to={"/settings"}
              className="flex flex-row justify-between items-center"
            >
              <DropdownItem className="focus:text-primary/70 w-full cursor-pointer flex flex-row items-center gap-1">
                <CogFourSolid className="h-5 w-5" />
                <p className="font-poppins font-semibold md:font-medium">
                  Configurações
                </p>
              </DropdownItem>
            </Link>

            <Link
              to={"/support"}
              className="flex flex-row justify-between items-center"
            >
              <DropdownItem className="focus:text-primary/70 w-full cursor-pointer flex flex-row items-center gap-1">
                <QuestionCircleSolid className="h-5 w-5" />
                <p className="font-poppins font-semibold md:font-medium">
                  Suporte
                </p>
              </DropdownItem>
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
          href="/crush"
          activeClassName="text-primary"
          hoverClassName="text-primary/70"
        >
          <FireSolid className="h-5 w-5" />
          Crush
        </NavbarItem>
      </NavbarContent>

      <NavbarContent>
        <div className="relative">
          <NavbarItem
            href="/messages"
            activeClassName="text-primary"
            hoverClassName="text-primary/70"
          >
            <SendSolid className="h-6 w-6" />
          </NavbarItem>
        </div>

        <NavbarItem className="border-0" href={""}>
          <Profile
            nickname={props.user?.nickname ? props.user.nickname : ""}
            avatar={props.avatarPath ? props.avatarPath : ""}
            type={userData?.type ? userData.type : ""}
          />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

interface NavBarReturnProps {
  title: string;
  menu?: React.ReactNode
}

export const NavBarReturn = (props: NavBarReturnProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar>
        <NavbarContent className="gap-2">
          <Button
            variant={"outline"}
            size={"icon"}
            className="text-muted-foreground hover:text-primary/70 hover:border-primary/70"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft />
          </Button>
        </NavbarContent>

        <NavbarContent className="text-foreground font-poppins font-semibold md:font-medium">
          {props.title}
        </NavbarContent>

        <NavbarContent>
          {props.menu && (
            <Button
              variant={"outline"}
              size={"icon"}
              className="text-muted-foreground hover:text-primary/70"
            >
              {props.menu}
            </Button>
          )}
        </NavbarContent>
      </Navbar>
    </>
  );
};
