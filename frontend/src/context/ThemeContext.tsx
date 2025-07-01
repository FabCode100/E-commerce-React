// src/context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
    tema: "light" | "dark";
    alternarTema: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
    tema: "light",
    alternarTema: () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [tema, setTema] = useState<"light" | "dark">("light");

    useEffect(() => {
        // Verifica preferencia do sistema ou localStorage
        const temaSalvo = localStorage.getItem("tema");
        if (temaSalvo === "dark" || (!temaSalvo && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            setTema("dark");
            document.documentElement.classList.add("dark");
        } else {
            setTema("light");
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const alternarTema = () => {
        if (tema === "light") {
            setTema("dark");
            document.documentElement.classList.add("dark");
            localStorage.setItem("tema", "dark");
        } else {
            setTema("light");
            document.documentElement.classList.remove("dark");
            localStorage.setItem("tema", "light");
        }
    };

    return (
        <ThemeContext.Provider value={{ tema, alternarTema }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
