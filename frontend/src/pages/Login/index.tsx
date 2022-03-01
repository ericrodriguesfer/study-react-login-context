import React from 'react';
import { useAuth } from '../../contexts/auth';

const Login: React.FC = () => {
  const context = useAuth();

  function handleLogin() {
    context.Login();
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
