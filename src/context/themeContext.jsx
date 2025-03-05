import { createContext, useEffect, useState } from "react";
export const ThemeContext = createContext();
export const themeVal = localStorage.getItem("theme");

export const ThemeContextProvider = ({children}) => {
    const [theme, setTheme] = useState(themeVal ?? "light");
    useEffect(() => {
        document.documentElement.setAttribute("theme", theme);
    }, [theme]);

    const toggleTheme = (newTheme) => {
        const themeToAdd = newTheme === "dark" ? "dark" : "light";
        document.documentElement.setAttribute("theme", themeToAdd);
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}