import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Update from '../pages/Update';
import ListUsers from '../pages/ListUsers';

const OtherRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update" element={<Update />} />
        <Route path="/list" element={<ListUsers />} />
      </Routes>
    </BrowserRouter>
  );
};

export default OtherRoutes;
