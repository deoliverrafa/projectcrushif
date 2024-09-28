import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "../../lib/utils";

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  className?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
  className?: string;
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  )
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  className?: string;
  children?: React.ReactNode;
}

const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => {
    const getRandomColor = React.useCallback(() => {
      const computedStyles = getComputedStyle(document.documentElement);
      const isDarkTheme = document.documentElement.classList.contains("dark");

      const colorVars = [
        "--primary",
        "--secondary",
        "--success",
        "--warning",
        "--danger",
        "--muted",
        "--accent",
        "--destructive",
      ];

      const randomColorVar =
        colorVars[Math.floor(Math.random() * colorVars.length)];
      const colorValue = computedStyles.getPropertyValue(randomColorVar).trim();

      return isDarkTheme ? `hsl(${colorValue})` : `hsl(${colorValue})`;
    }, []);

    const [backgroundColor, setBackgroundColor] = React.useState(
      getRandomColor()
    );

    React.useEffect(() => {
      setBackgroundColor(getRandomColor());
    }, [getRandomColor]);

    const fallbackText =
      typeof children === "string"
        ? children.substring(0, 3).toUpperCase()
        : "";

    return (
      <AvatarPrimitive.Fallback
        ref={ref}
        style={{ backgroundColor, color: "white" }}
        className={cn(
          "font-poppins font-semibold tracking-wider flex h-full w-full items-center justify-center rounded-full",
          className
        )}
        {...props}
      >
        {fallbackText}
      </AvatarPrimitive.Fallback>
    );
  }
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
