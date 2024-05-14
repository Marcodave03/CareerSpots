import { ReactNode, createContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  role: string;
};

export type Context = {
  isAuthenticated: boolean;
  user: User;
  isLoading: boolean;
  hasRole: (requiredRoles: string[]) => boolean;
};

const defaultUser = {
  id: "",
  name: "",
  role: "",
};

export const AuthContext = createContext<Context>({
  isAuthenticated: false,
  user: defaultUser,
  isLoading: false,
  hasRole: () => false,
});

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>(defaultUser);
  const [isLoading, setIsLoading] = useState(true); // Add this

  useEffect(() => {
    // do ajax call to validate if user is authenticated or not
    // This is just an example
    // simulated loading on ajax call
    setTimeout(() => {
      setIsAuthenticated(true);
      setUser({ id: "S0001", name: "John Doe", role: "admin" });
      setIsLoading(false); // Set loading to false after authentication is resolved
    }, 1000); // Simulate a 1-second delay
  }, []);

  const hasRole = (requiredRoles: string[]) => {
    return requiredRoles.includes(user!.role);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};
