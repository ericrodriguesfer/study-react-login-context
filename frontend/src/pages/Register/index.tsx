import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { RegisterData, useAuth } from '../../contexts/auth';

const registerDataSchema = yup.object({
  name: yup.string().required('O campo nome é obrigatório'),
  email: yup
    .string()
    .email('E-mail repassado é inválido')
    .required('O campo e-mail é obrigatório'),
  username: yup.string().required('O campo nome de usuário é obrigatório'),
  password: yup.string().required('O campo senha é obrigatório'),
});

const Register: React.FC = () => {
  const { Register } = useAuth();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(registerDataSchema),
  });

  async function handleRegister({
    name,
    username,
    email,
    password,
  }: RegisterData) {
    const response = await Register({ name, username, email, password });

    response === true ? navigate('/') : navigate('/register');
  }

  return (
    <div>
      <h1>Registrar-se</h1>
      <form onSubmit={handleSubmit(handleRegister)}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <input
              type="text"
              onChange={onChange}
              onBlur={onBlur}
              defaultValue={value}
              placeholder="Digite seu nome para registro"
            />
          )}
          name="name"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <input
              type="text"
              onChange={onChange}
              onBlur={onBlur}
              defaultValue={value}
              placeholder="Digite seu nome de usuárop para registro"
            />
          )}
          name="username"
        />
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
        <button>Registrar-se</button>
        <Link to="/">Efetuar login</Link>
      </form>
    </div>
  );
};

export default Register;
