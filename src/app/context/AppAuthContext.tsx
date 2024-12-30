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
  token: string | null; // Include token
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
  const [token, setToken] = useState<string | null>(null);

  const { setActivePage } = useActivePage();

  useEffect(() => {
    const storedToken = Cookies.get('app_token');
    if (storedToken) {
      try {
        const decoded: DecodedToken = jwtDecode(storedToken);
        if (decoded?.role && decoded.exp > Date.now() / 1000) {
          setRole(decoded.role);
          setIsAuthenticated(true);
          setToken(storedToken);
          setActivePage('home'); // Or wherever you want to go on refresh
        } else {
          Cookies.remove('app_token'); // Remove expired token
        }
      } catch (err) {
        console.error('Invalid token in cookies:', err);
        Cookies.remove('app_token');
      }
    }
  }, [setActivePage]);

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
      const userToken = data.token;
      const decoded: DecodedToken = jwtDecode(userToken);

      Cookies.set('app_token', userToken, {
        secure: true,
        sameSite: 'None',
        expires: 7,
      });

      setRole(decoded.role);
      setIsAuthenticated(true);
      setToken(userToken);

      setTimeout(() => setActivePage('home'), 0);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('app_token');
    setRole(null);
    setIsAuthenticated(false);
    setToken(null);
    setActivePage('login');
  };

  return (
    <AppAuthContext.Provider
      value={{
        isAuthenticated,
        role,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AppAuthContext.Provider>
  );
};
