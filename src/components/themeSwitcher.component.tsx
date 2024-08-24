"use client";

import * as React from "react";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";

import { Sun, Moon } from "lucide-react";

interface themeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = (props: themeSwitcherProps) => {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && savedTheme !== theme) {
      setTheme(savedTheme);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) return null;

  return (
    <div className={`${props.className}`}>
      <Switch
        onClick={toggleTheme}
        defaultSelected={theme === "dark"} // Define o estado selecionado com base no tema atual
        size="lg"
        color="primary"
        thumbIcon={() => (
          <>
            {theme === "dark" ? (
              <Moon className="text-default-300 size-5" />
            ) : (
              <Sun className="text-primary size-5" />
            )}
          </>
        )}
      />
    </div>
  );
};
