import React from "react";
import { Routes, Route } from "react-router-dom";

import Main from "./Main";
import Game from "./Game";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/game" element={<Game />} />
  </Routes>
);

export default AppRoutes;
