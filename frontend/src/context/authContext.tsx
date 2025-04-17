import { createContext, useContext, useEffect, useState } from "react";
import { getMe, logout } from "../services/auth";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logoutService: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

const authContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logoutService: async () => {},
  fetchUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const userData = await getMe();
      setUser(userData);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logoutService = async () => {
    await logout();
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <authContext.Provider value={{ user, loading, logoutService, fetchUser }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
