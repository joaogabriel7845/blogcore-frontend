import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {

  const [isDark, setIsDark] = useState(() => JSON.parse(localStorage.getItem('theme')) || false);

  useEffect(() => {
    localStorage.setItem('theme', isDark)
  }, [isDark])

  const theme = {
    bg: isDark ? "bg-[#121212]" : "bg-[#F4F7F5]",
    button: isDark ? "bg-[#252525]" : "bg-[#E5E5E5]",
    buttonModal: "bg-[#252525]",
    bgCard: isDark ? "bg-[#121212]/30" : "bg-[#F4F7F5]/30",
    bgHeader: isDark ? "bg-[#121212]" : "bg-white",
    text: isDark ? "text-[#F0F0F0]" : "text-black",
    textAccent: isDark ? "text-[#F5E722]" : "bg-black/85 text-white px-1 rounded-md",
    textAccentOpacity: "text-[#F5E722]/70",
    border: isDark ? "border-white/15" : "border-black/20",
    borderHover: isDark ? "hover:border-white/15" : "hover:border-black/20"
  };

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}