import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./../../lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-md md:text-sm font-bold md:font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 font-poppins font-semibold uppercase tracking-wider",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 font-poppins font-semibold uppercase tracking-wider",
        outline:
          "border-2 md:border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground font-poppins font-semibold uppercase tracking-wider",
        success:
          "bg-success text-success-foreground shadow-sm hover:bg-success/90 font-poppins font-semibold uppercase tracking-wider",
        warning:
          "bg-warning text-warning-foreground shadow-sm hover:bg-warning/90 font-poppins font-semibold uppercase tracking-wider",
        danger:
          "bg-danger text-danger-foreground shadow-sm hover:bg-danger/90 font-poppins font-semibold uppercase tracking-wider",
        ghost:
          "hover:bg-accent hover:text-accent-foreground font-poppins font-semibold uppercase tracking-wider",
        link: "text-primary underline-offset-4 hover:underline font-poppins font-semibold uppercase tracking-wider",
      },
      size: {
        default: "h-10 md:h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-10 md:h-9 w-10 md:w-9",
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
