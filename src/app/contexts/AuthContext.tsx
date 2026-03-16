import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "organizer" | "voter";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  canVote: boolean; // Les organisateurs peuvent aussi voter si true
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, role: UserRole, canVote?: boolean) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isOrganizer: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Charger l'utilisateur depuis le localStorage au démarrage
    const storedUser = localStorage.getItem("verivo_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = async (
    email: string,
    password: string,
    name: string,
    role: UserRole,
    canVote: boolean = true
  ): Promise<boolean> => {
    try {
      // Simuler un enregistrement
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Vérifier si l'utilisateur existe déjà
      const existingUsers = JSON.parse(localStorage.getItem("verivo_users") || "[]");
      if (existingUsers.some((u: any) => u.email === email)) {
        return false;
      }

      // Créer le nouvel utilisateur
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role,
        canVote: role === "voter" ? true : canVote,
      };

      // Stocker l'utilisateur dans la liste des utilisateurs
      const userData = { ...newUser, password };
      existingUsers.push(userData);
      localStorage.setItem("verivo_users", JSON.stringify(existingUsers));

      // Connecter automatiquement l'utilisateur
      setUser(newUser);
      localStorage.setItem("verivo_user", JSON.stringify(newUser));

      return true;
    } catch (error) {
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simuler une connexion
      await new Promise(resolve => setTimeout(resolve, 1000));

      const existingUsers = JSON.parse(localStorage.getItem("verivo_users") || "[]");
      const foundUser = existingUsers.find(
        (u: any) => u.email === email && u.password === password
      );

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem("verivo_user", JSON.stringify(userWithoutPassword));
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("verivo_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isOrganizer: user?.role === "organizer",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
