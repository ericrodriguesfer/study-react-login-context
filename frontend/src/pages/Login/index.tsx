import React, { useContext } from 'react';
import AuthContext from '../../contexts/auth';

const Login: React.FC = () => {
  const context = useContext(AuthContext);

  function handleLogin() {
    context.Login();
  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
