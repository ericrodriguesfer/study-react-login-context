import React from 'react';
import { useAuth } from '../../contexts/auth';

const Home: React.FC = () => {
  const { Logout, user } = useAuth();

  async function handleLogout() {
    Logout();
  }

  return (
    <React.Fragment>
      <h1>Home screen</h1>
      <h2>Olá, {user?.username}, sejam bem vindo!!!</h2>
      <button onClick={handleLogout}>Logout</button>
    </React.Fragment>
  );
};

export default Home;
