import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const fabVariants = cva(
  "fixed inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 w-10 z-10",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 font-poppins font-semibold uppercase tracking-wider",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 font-poppins font-semibold uppercase tracking-wider",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground font-poppins font-semibold uppercase tracking-wider",
        success:
          "bg-success text-success-foreground shadow-sm hover:bg-success/90 font-poppins font-semibold uppercase tracking-wider",
        warning:
          "bg-warning text-warning-foreground shadow-sm hover:bg-warning/90 font-poppins font-semibold uppercase tracking-wider",
        danger:
          "bg-danger text-danger-foreground shadow-sm hover:bg-danger/90 font-poppins font-semibold uppercase tracking-wider",
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
    const Comp = asChild ? Slot : "button";

    const handleRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
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
          fabVariants({ variant, placeholder, className }),
          "overflow-hidden"
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
