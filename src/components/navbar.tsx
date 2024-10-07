import * as React from "react";
import { cn } from "../lib/utils.ts";
import { Link, NavLink, useNavigate } from "react-router-dom";

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
  BadgeCheck,
  Bell,
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

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
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

        <Link to={`/profile/${userData._id}`}>
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
        </Link>

        <DropdownSeparator />

        <Link to={""}>
          <DropdownItem className="cursor-pointer font-poppins font-semibold">
            <Heart className="mr-2 size-4" />
            Curtidas
          </DropdownItem>
        </Link>
        <Link to={""}>
          <DropdownItem className="cursor-pointer font-poppins font-semibold">
            <Crown className="mr-2 size-4" />
            Favoritos
          </DropdownItem>
        </Link>
        <Link to={""}>
          <DropdownItem className="cursor-pointer font-poppins font-semibold">
            <Zap className="mr-2 size-4" />
            Upgrade
          </DropdownItem>
        </Link>
        <Link to={"/settings"}>
          <DropdownItem className="cursor-pointer font-poppins font-semibold">
            <Settings className="mr-2 size-4" />
            Configurações
          </DropdownItem>
        </Link>
        <Link to={"/support"}>
          <DropdownItem className="cursor-pointer font-poppins font-semibold">
            <BadgeHelp className="mr-2 size-4" />
            Suporte
          </DropdownItem>
        </Link>
        <DropdownSeparator />
        <Link to={"/auth/login"}>
          <DropdownItem
            className="cursor-pointer text-danger font-poppins font-semibold"
            onClick={logOutHandle}
          >
            <LogOut className="mr-2 size-4" />
            Deslogar
          </DropdownItem>
        </Link>
      </DropdownContent>
    </Dropdown>
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
        "transition-transform duration-300 select-none bg-card border-b border-input shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex flex-row justify-between items-center shadow-[0_-2px_4px_rgba(0,0,0,0.1)] sticky top-0 inset-x-0 translate-y-0 md:translate-y-0/2 px-4 md:px-2 py-2 md:py-1 w-full z-20",
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
        "font-semibold flex items-center gap-2 text-lg md:text-md",
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
            <ArrowLeft className="mr-2" />
            {props.title}
          </Button>
        </NavbarContent>
      </Navbar>
    </>
  );
};
