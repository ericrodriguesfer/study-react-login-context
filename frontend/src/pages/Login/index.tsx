import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { LoginData, useAuth } from '../../contexts/auth';

const loginDataSchema = yup.object({
  email: yup
    .string()
    .email('E-mail repassado é inválido')
    .required('O campo e-mail é obrigatório'),
  password: yup.string().required('O campo senha é obrigatório'),
});

const Login: React.FC = () => {
  const { Login } = useAuth();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginDataSchema),
  });

  async function handleLogin({ email, password }: LoginData) {
    await Login({ email, password });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <input
              type="email"
              onChange={onChange}
              onBlur={onBlur}
              defaultValue={value}
              placeholder="Digite seu e-mail de login"
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <input
              type="password"
              onChange={onChange}
              onBlur={onBlur}
              defaultValue={value}
              placeholder="Digite sua senha de login"
            />
          )}
          name="password"
        />
        <button>Login</button>
        <Link to="/register">Se registrar</Link>
      </form>
    </div>
  );
};

export default Login;
