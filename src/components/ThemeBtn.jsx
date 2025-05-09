import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/themeContext";

const ThemeBtn = () => {
    const {isDark, setIsDark} = useTheme();

    return (
      <button
        onClick={() => setIsDark((prev) => !prev)}
        className={
          isDark
            ? "p-4 rounded-full bg-white text-violet-600 fixed bottom-4 right-4 transition-all duration-500 shadow-xl hover:scale-105 cursor-pointer"
            : "transition-all duration-500 fixed bottom-4 right-4 p-4 rounded-full bg-violet-900 text-white shadow-xl hover:scale-105 cursor-pointer"
        }
      >
        {isDark ? <Sun /> : <Moon />}
      </button>
    );
}

export default ThemeBtn;