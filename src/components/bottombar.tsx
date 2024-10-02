import * as React from "react";
import { cn } from "../lib/utils";
import { NavLink } from "react-router-dom";
import { LayoutGrid, Search, HeartHandshake, CalendarDays } from "lucide-react";

interface BottombarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const Bottombar = React.forwardRef<HTMLDivElement, BottombarProps>(
  ({ className, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);

    const handleScroll = React.useCallback(() => {
      setIsVisible(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    }, [lastScrollY]);

    React.useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [handleScroll]);

    return (
      <div
        ref={ref}
        className={cn(
          "transition-transform duration-300 bg-background border-t border-input shadow-[0_-2px_4px_rgba(0,0,0,0.1)] flex flex-row justify-around items-center fixed bottom-0 inset-x-0 px-2 md:px-1 py-2 md:py-1 w-full z-20",
          isVisible ? "translate-y-0" : "translate-y-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Bottombar.displayName = "Bottombar";

interface BottombarItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof NavLink>, "ref"> {
  className?: string;
  children: React.ReactNode;
}

export const BottombarItem: React.FC<BottombarItemProps> = ({
  className,
  children,
  ...props
}) => {
  const handleRipple = (event: React.MouseEvent<HTMLAnchorElement>) => {
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
          "rounded-md flex flex-col items-center relative font-semibold text-sm md:text-xs px-4 md:px-2 py-1 md:py-0.5 gap-1 overflow-hidden",
          isActive ? "text-primary" : "text-muted-foreground",
          "hover:text-primary/70",
          className
        )
      }
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
BottombarItem.displayName = "BottombarItem";

export const BottomBar = () => {
  return (
    <Bottombar className="bg-card flex md:hidden">
      <BottombarItem to="/">
        <LayoutGrid />
        Inicio
      </BottombarItem>

      <BottombarItem to="/search">
        <Search />
        Pesquisar
      </BottombarItem>

      <BottombarItem to="/match">
        <HeartHandshake />
        Crush
      </BottombarItem>

      <BottombarItem to="/events">
        <CalendarDays />
        Evêntos
      </BottombarItem>
    </Bottombar>
  );
};
BottomBar.displayName = "BottomBar";
