import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

interface UseData {
  name: string;
  username: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: UseData | null;
  Login(): Promise<void>;
  Logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UseData | null>(null);

  useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user');
    const storagedToken = localStorage.getItem('@App:token');

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  function Logout() {
    setUser(null);

    localStorage.removeItem('@App:user');
    localStorage.removeItem('@App:token');
  }

  async function Login() {
    const response = await api.post('session', {
      email: 'eegames7@gmail.com',
      password: 'qwe123',
    });

    const userLoged: UseData = {
      name: response.data.name,
      username: response.data.username,
      email: response.data.email,
    };

    setUser(userLoged);

    localStorage.setItem('@App:user', JSON.stringify(userLoged));
    localStorage.setItem('@App:token', response.data.token);

    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
