import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define shape of AppActivePageContext
interface AppActivePageContextProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

// Create context
const AppActivePageContext = createContext<
  AppActivePageContextProps | undefined
>(undefined);

// Custom hook
export const useActivePage = () => {
  const context = useContext(AppActivePageContext);
  if (!context) {
    throw new Error('useActivePage must be used within an ActivePageProvider');
  }
  return context;
};

export const ActivePageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Default page is "home" (you can change as needed)
  const [activePage, setActivePage] = useState<string>('home');

  return (
    <AppActivePageContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </AppActivePageContext.Provider>
  );
};
