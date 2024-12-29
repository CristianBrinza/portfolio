import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useActivePage } from './AppActivePageContext';

interface DecodedToken {
  role: string;
  exp: number;
  iat: number;
  [key: string]: any;
}

interface AppAuthContextProps {
  isAuthenticated: boolean;
  role: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AppAuthContext = createContext<AppAuthContextProps | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AppAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { setActivePage } = useActivePage();

  useEffect(() => {
    const token = Cookies.get('app_token');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded?.role) {
          setRole(decoded.role);
          setIsAuthenticated(true);
          setActivePage('home'); // Redirect on app load if token is valid
        }
      } catch (err) {
        console.error('Invalid token in cookies:', err);
        Cookies.remove('app_token');
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      const token = data.token;

      const decoded: DecodedToken = jwtDecode(token);

      Cookies.set('app_token', token, { secure: true, sameSite: 'strict' });
      setRole(decoded.role);
      setIsAuthenticated(true);

      // Ensure state updates before setting the page
      setTimeout(() => setActivePage('home'), 0);
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Propagate error to AppLogin
    }
  };

  const logout = () => {
    Cookies.remove('app_token');
    setRole(null);
    setIsAuthenticated(false);
    setActivePage('login'); // Redirect to login on logout
  };

  return (
    <AppAuthContext.Provider
      value={{
        isAuthenticated,
        role,
        login,
        logout,
      }}
    >
      {children}
    </AppAuthContext.Provider>
  );
};
