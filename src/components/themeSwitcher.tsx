// USE CLIENT //
"use client";

// IMPORT - LIBRARYS /!
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";

// IMPORT - ICONS //
import {
  MoonFilledIcon,
  SunFilledIcon
} from './../icons/iconsFilled.tsx';

// CREATE - INTERFACES //
interface themeSwitcherProps {
    className?: string
}

// COMPONENT - THEME SWITCHER //
export const ThemeSwitcher = (props: themeSwitcherProps) => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        // Verifica se há um estado de tema salvo no localStorage
        const savedTheme = localStorage.getItem('theme');
        // Se houver um estado salvo e for diferente do estado atual, define o estado do tema
        if (savedTheme && savedTheme !== theme) {
            setTheme(savedTheme);
        }
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        // Salva o estado do tema no localStorage
        localStorage.setItem('theme', newTheme);
    }

    if (!mounted) return null

  return (
    <div className={`${props.className}`}>
      <Switch
        onClick={toggleTheme}
        defaultSelected={theme === 'dark'} // Define o estado selecionado com base no tema atual
        size="lg"
        color="primary"
        thumbIcon={({ className }) => (
        <>
        {theme === "dark" ? (
          <MoonFilledIcon className={`text-default size-5 ${className}`} />
        ) : (
          <SunFilledIcon className="text-primary size-5" />
        )}
        </>
        )}/>
    </div>
  );
};
