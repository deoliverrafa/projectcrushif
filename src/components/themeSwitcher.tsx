"use client";

import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface themeSwitcherProps {
    className?: string
}

export function ThemeSwitcher(props: themeSwitcherProps) {
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
                color="secondary"
                thumbIcon={({ className }) => (
                    <>
                        {theme === "dark" ? (
                            <i className={`fi fi-rr-moon-stars  ${className}`}></i>
                        ) : (
                            <i className={`fi fi-rr-brightness  ${className} `}></i>
                        )}
                    </>
                )}
            />
        </div>
    )
};
