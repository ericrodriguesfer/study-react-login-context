import React, { createContext } from 'react';

interface AuthContextData {
  signed: boolean;
  Login(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

import api from '../services/api';

export const AuthProvider: React.FC = ({ children }) => {
  async function Login() {
    const response = await api.post('session', {
      email: 'eegames7@gmail.com',
      password: 'qwe123',
    });

    console.log(response);
  }

  return (
    <AuthContext.Provider value={{ signed: true, Login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
