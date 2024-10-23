import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Button } from "../../components/ui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "../../components/ui/dropdown";

import {  
  SunSolid,
  EclipseSolid,
  MoonSolid,
  SunriseSolid,
  SunsetSolid,
  PlanetSolid
} from "@mynaui/icons-react";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?:
    | "light"
    | "dark"
    | "black"
    | "modern-light"
    | "modern-dark"
    | "system";
  storageKey?: string;
}

interface ThemeContextType {
  theme: "light" | "dark" | "black" | "modern-light" | "modern-dark" | "system";
  setTheme: (
    theme:
      | "light"
      | "dark"
      | "black"
      | "modern-light"
      | "modern-dark"
      | "system"
  ) => void;
}

const initialState: ThemeContextType = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeContextType>(initialState);

export const HexaThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) => {
  const [theme, setTheme] = useState<
    "light" | "dark" | "black" | "modern-light" | "modern-dark" | "system"
  >(
    () =>
      (localStorage.getItem(storageKey) as
        | "light"
        | "dark"
        | "black"
        | "modern-light"
        | "modern-dark"
        | "system") || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(
      "light",
      "dark",
      "black",
      "modern-light",
      "modern-dark"
    );

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export const ThemeToggle: React.FC = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="outline" size="icon">
          <SunSolid
            className={`h-[1.2rem] w-[1.2rem] ${
              theme === "dark" ||
              theme === "black" ||
              theme === "modern-light" ||
              theme === "modern-dark" ||
              theme === "system"
                ? "hidden"
                : ""
            }`}
          />
          <MoonSolid
            className={`h-[1.2rem] w-[1.2rem] ${
              theme === "light" ||
              theme === "black" ||
              theme === "modern-light" ||
              theme === "modern-dark" ||
              theme === "system"
                ? "hidden"
                : ""
            }`}
          />
          <EclipseSolid
            className={`h-[1.2rem] w-[1.2rem] ${
              theme === "dark" ||
              theme === "light" ||
              theme === "modern-light" ||
              theme === "modern-dark" ||
              theme === "system"
                ? "hidden"
                : ""
            }`}
          />
          <SunriseSolid
            className={`h-[1.2rem] w-[1.2rem] ${
              theme === "dark" ||
              theme === "light" ||
              theme === "black" ||
              theme === "modern-dark" ||
              theme === "system"
                ? "hidden"
                : ""
            }`}
          />
          <SunsetSolid
            className={`h-[1.2rem] w-[1.2rem] ${
              theme === "dark" ||
              theme === "light" ||
              theme === "modern-light" ||
              theme === "black" ||
              theme === "system"
                ? "hidden"
                : ""
            }`}
          />
          <PlanetSolid
            className={`h-[1.2rem] w-[1.2rem] ${
              theme === "dark" ||
              theme === "light" ||
              theme === "modern-light" ||
              theme === "black" ||
              theme === "modern-dark"
                ? "hidden"
                : ""
            }`}
          />
          <span className="sr-only">Alterar Tema</span>
        </Button>
      </DropdownTrigger>
      <DropdownContent align="end">
        <DropdownItem onClick={() => setTheme("light")}>Claro</DropdownItem>
        <DropdownItem onClick={() => setTheme("dark")}>Escuro</DropdownItem>
        <DropdownItem onClick={() => setTheme("black")}>Preto</DropdownItem>
        <DropdownItem onClick={() => setTheme("modern-light")}>
          Moderno - Claro
        </DropdownItem>
        <DropdownItem onClick={() => setTheme("modern-dark")}>
          Moderno - Escuro
        </DropdownItem>
        <DropdownItem onClick={() => setTheme("system")}>Sistema</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};
