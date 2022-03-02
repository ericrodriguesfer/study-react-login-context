import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { UpdateData, useAuth } from '../../contexts/auth';

const uodateDataSchema = yup.object({
  name: yup.string(),
  username: yup.string(),
  email: yup.string().email('E-mail repassado é inválido'),
});

const Update: React.FC = () => {
  const { Update, user } = useAuth();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(uodateDataSchema),
  });

  async function handleUpdate({ name, username, email }: UpdateData) {
    const response = await Update({ name, username, email });

    response === true ? navigate('/') : navigate('/update');
  }

  return (
    <div>
      <h1>Atualizar dados</h1>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <input
              type="text"
              onChange={onChange}
              onBlur={onBlur}
              defaultValue={value ?? user?.name}
              placeholder="Digite seu nome para atualização"
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
              defaultValue={value ?? user?.username}
              placeholder="Digite seu nome de usuárop para atualização"
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
              defaultValue={value ?? user?.email}
              placeholder="Digite seu e-mail para atualização"
            />
          )}
          name="email"
        />
        <button>Atualizar</button>
        <Link to="/">Voltar a home</Link>
      </form>
    </div>
  );
};

export default Update;
