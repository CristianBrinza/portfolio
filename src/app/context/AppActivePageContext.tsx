import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of AppActivePageContext
interface AppActivePageContextProps {
  activePage: string;
  setActivePage: (page: string) => void;
  goBack: () => void; // Function to go to the previous page
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
  const [activePage, setActivePageInternal] = useState<string>('home');
  const [, setPageHistory] = useState<string[]>([]);

  // Function to change the active page and update the history
  const setActivePage = (page: string) => {
    setPageHistory(prev => [...prev, activePage]); // Push current page to history
    setActivePageInternal(page);
  };

  // Function to go back to the previous page
  const goBack = () => {
    setPageHistory(prev => {
      if (prev.length === 0) return prev; // No-op if there's no history
      const lastPage = prev[prev.length - 1];
      setActivePageInternal(lastPage);
      return prev.slice(0, -1); // Remove the last page from history
    });
  };

  return (
    <AppActivePageContext.Provider
      value={{ activePage, setActivePage, goBack }}
    >
      {children}
    </AppActivePageContext.Provider>
  );
};
