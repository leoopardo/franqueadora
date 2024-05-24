import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
  setTheme: Dispatch<SetStateAction<"light" | "dark">>;
  theme: "dark" | "light";
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const StyledThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
