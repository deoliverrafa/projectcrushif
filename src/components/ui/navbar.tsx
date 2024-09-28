import * as React from "react";
import { cn } from "../../lib/utils";
import { HexaLink, HexaNavLink } from "../../components/ui/router";

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className, children, ...props }) => {
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

export const NavbarContent: React.FC<NavbarContentProps> = ({ className, children, ...props }) => {
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

interface NavbarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  activeClassName?: string;
  hoverClassName?: string;
  className?: string;
}

export const NavbarItem: React.FC<NavbarItemProps> = ({
  href,
  activeClassName,
  hoverClassName,
  className,
  children,
  ...props
}) => {
  const handleRipple = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
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
    <HexaNavLink
      activeClassName={activeClassName}
      hoverClassName={hoverClassName}
      className={cn(
        "rounded-md font-semibold flex flex-row items-center relative gap-1 overflow-hidden px-4 md:px-2 py-2 md:py-1 text-md md:text-sm",
        className
      )}
      href={href}
      onClick={(e) => {
        handleRipple(e);
        if (props.onClick) props.onClick(e);
      }}
      {...props}
    >
      {children}
    </HexaNavLink>
  );
};
NavbarItem.displayName = "NavbarItem";

interface NavbarBrandProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  activeClassName?: string;
  hoverClassName?: string;
  className?: string;
}

export const NavbarBrand: React.FC<NavbarBrandProps> = ({
  href,
  activeClassName,
  hoverClassName,
  className,
  children,
  ...props
}) => {
  return (
    <HexaLink
      className={cn(
        "font-semibold flex items-center gap-2 text-lg md:text-md",
        className
      )}
      href={href}
      {...props}
    >
      {children}
    </HexaLink>
  );
};
NavbarBrand.displayName = "NavbarBrand";
