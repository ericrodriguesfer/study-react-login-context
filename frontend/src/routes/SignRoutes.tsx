import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';

const SignRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SignRoutes;
