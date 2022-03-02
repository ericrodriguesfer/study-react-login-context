import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

interface UseData {
  name: string;
  username: string;
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface UpdateData {
  name: string;
  email: string;
  username: string;
}

interface AuthContextData {
  signed: boolean;
  user: UseData | null;
  Login({ email, password }: LoginData): Promise<void>;
  Register({ name, username, email, password }: RegisterData): Promise<boolean>;
  Update({ name, username, email }: UpdateData): Promise<boolean>;
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

  async function Login({ email, password }: LoginData) {
    try {
      const response = await api.post('session', {
        email,
        password,
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
    } catch (error) {
      console.log('ERROR => ', error);
    }
  }

  async function Register({
    name,
    username,
    email,
    password,
  }: RegisterData): Promise<boolean> {
    try {
      const response = await api.post('users', {
        name,
        username,
        email,
        password,
      });

      return true;
    } catch (error) {
      console.log('ERROR => ', error);
      return false;
    }
  }

  async function Update({
    name,
    username,
    email,
  }: UpdateData): Promise<boolean> {
    try {
      const response = await api.put('users', {
        name,
        username,
        email,
      });

      const userLoged: UseData = {
        name: response.data.name,
        username: response.data.username,
        email: response.data.email,
      };

      setUser(userLoged);

      localStorage.setItem('@App:user', JSON.stringify(userLoged));

      return true;
    } catch (error) {
      console.log('ERROR => ', error);
      return false;
    }
  }

  async function Logout() {
    setUser(null);

    localStorage.removeItem('@App:user');
    localStorage.removeItem('@App:token');
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Login, Logout, Register, Update }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
