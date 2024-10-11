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

import { Moon, Sun, Eclipse } from "lucide-react";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: "light" | "dark" | "black" | "system";
  storageKey?: string;
}

interface ThemeContextType {
  theme: "light" | "dark" | "black" | "system";
  setTheme: (theme: "light" | "dark" | "black" | "system") => void;
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
  const [theme, setTheme] = useState<"light" | "dark" | "black" | "system">(
    () =>
      (localStorage.getItem(storageKey) as "light" | "dark" | "black" | "system") ||
      defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark", "black");

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
          <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-all ${
              theme === "dark" || theme === "black" ? "hidden" : ""
            }`}
          />
          <Moon
            className={`h-[1.2rem] w-[1.2rem] transition-all ${
              theme === "light" || theme === "black" ? "hidden" : ""
            }`}
          />
          <Eclipse
            className={`h-[1.2rem] w-[1.2rem] transition-all ${
              theme === "dark" || theme === "light" ? "hidden" : ""
            }`}
          />
          <span className="sr-only">Alterar Tema</span>
        </Button>
      </DropdownTrigger>
      <DropdownContent align="end">
        <DropdownItem onClick={() => setTheme("light")}>Claro</DropdownItem>
        <DropdownItem onClick={() => setTheme("dark")}>Escuro</DropdownItem>
        <DropdownItem onClick={() => setTheme("black")}>Preto</DropdownItem>
        <DropdownItem onClick={() => setTheme("system")}>Sistema</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};
