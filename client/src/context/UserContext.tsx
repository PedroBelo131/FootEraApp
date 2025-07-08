import { createContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: number;
  name: string;
  username: string;
  age?: number;
  position?: string;
  team?: string;
  avatar?: string;
}

export interface Score {
  total: number;
  performance: number;
  discipline: number;
  responsibility: number;
}

interface UserContextType {
  user: User | null;
  score: Score | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);


// teste

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [score, setScore] = useState<Score | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // Aqui você simula ou faz uma chamada real à API
      // Exemplo simulado:
      await new Promise((res) => setTimeout(res, 1000));
      setUser({
        id: 1,
        name: "João da Silva",
        username,
        age: 18,
        position: "Atacante",
        team: "Sub-20",
        avatar: "/avatar.png"
      });
      setScore({
        total: 85,
        performance: 90,
        discipline: 80,
        responsibility: 85
      });
    } catch (error) {
      throw new Error("Login falhou");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setScore(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        score,
        isLoading,
        isLoggedIn: !!user,
        login,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
