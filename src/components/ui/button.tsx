import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./../../lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-md md:text-sm font-bold md:font-medium transition-colors focus-visible:outline-none hover:animate-clickBounce disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-primary/70 via-primary/90 to-primary text-primary-foreground shadow hover:bg-primary/90",
        secondary:
          "bg-gradient-to-br from-secondary/70 via-secondary/90 to-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        outline:
          "border text-muted-foreground border-border bg-gradient-to-br from-background/70 via-background/90 to-background shadow-sm hover:bg-card/80 hover:text-accent-foreground",
        success:
          "bg-gradient-to-br from-success/70 via-success/90 to-success text-success-foreground shadow-sm hover:bg-success/90",
        warning:
          "bg-gradient-to-br from-warning/70 via-warning/90 to-warning text-warning-foreground shadow-sm hover:bg-warning/90",
        danger:
          "bg-gradient-to-br from-danger/70 via-danger/90 to-danger text-danger-foreground shadow-sm hover:bg-danger/90",
        info:
          "bg-gradient-to-br from-info/70 via-info/90 to-info text-info-foreground shadow-sm hover:bg-info/90",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 md:h-9 px-5 py-2.5",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-10 md:h-9 w-10 md:w-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const handleRipple = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
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
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          "overflow-hidden"
        )}
        ref={ref}
        onClick={(e) => {
          handleRipple(e);
          if (props.onClick) props.onClick(e);
        }}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
