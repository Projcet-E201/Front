import React from "react";
// import "./App.css";

import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MotorPage from "./pages/Motor/MotorPage";
import MotorDetailPage from "./pages/Motor/MotorDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/motor" element={<MotorPage />} />
      <Route path="/motor/:motorNumber" element={<MotorDetailPage />} />
    </Routes>
  );
}

export default App;
