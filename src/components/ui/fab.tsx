import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const fabVariants = cva(
  "fixed inline-flex items-center justify-center shadow font-poppins font-semibold whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-14 md:h-12 w-14 md:w-12 z-10",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground",
        outline:
          "border border-input bg-background",
        success:
          "bg-success text-success-foreground",
        warning:
          "bg-warning text-warning-foreground",
        danger:
          "bg-danger text-danger-foreground",
      },
      placeholder: {
        topRight: "top-20 right-10",
        topLeft: "top-20 left-10",
        bottomRight: "bottom-20 right-10",
        bottomLeft: "bottom-20 left-10",
      },
    },
    defaultVariants: {
      variant: "default",
      placeholder: "bottomRight",
    },
  }
);

interface FabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof fabVariants> {
  asChild?: boolean;
}

const Fab = React.forwardRef<HTMLButtonElement, FabProps>(
  ({ className, variant, placeholder, asChild = false, ...props }, ref) => {
    const [isScrollingDown, setIsScrollingDown] = React.useState(false);
    let lastScrollY = 0;

    React.useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsScrollingDown(true);
        } else {
          setIsScrollingDown(false);
        }
        lastScrollY = window.scrollY;
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    const Comp = asChild ? Slot : "button";

    const transitionClass =
      placeholder === "topRight" || placeholder === "topLeft"
        ? isScrollingDown
          ? "-translate-y-full"
          : "translate-y-0"
        : isScrollingDown
          ? "translate-y-full"
          : "translate-y-0";

    const handleRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
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
      <Comp
        className={cn(
          fabVariants({ variant, placeholder, className }),
          "overflow-hidden transition-transform duration-500",
          transitionClass
        )}
        ref={ref}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          handleRipple(e);
          if (props.onClick) props.onClick(e);
        }}
        {...props}
      />
    );
  }
);

Fab.displayName = "Fab";

export { Fab, fabVariants };
