// ThemeContext.tsx or wherever your ThemeProvider is defined
import React, {
  createContext, useContext, ReactNode, useState, useEffect,
} from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty('--primary', '#FFF');
      root.style.setProperty('--secondary', '#222222');
    } else {
      root.style.setProperty('--primary', '#222222');
      root.style.setProperty('--secondary', '#FFF');
    }
  }, [isDarkMode]);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
