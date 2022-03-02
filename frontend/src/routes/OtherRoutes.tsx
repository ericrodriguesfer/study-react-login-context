import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Update from '../pages/Update';

const OtherRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
};

export default OtherRoutes;
