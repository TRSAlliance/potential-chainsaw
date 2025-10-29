// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Intro from "./pages/Intro";
import AppDashboard from "./pages/AppDashboard";
import LearningProgressHub from "./LearningProgressHub";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/intro" element={<Intro />} />
      <Route path="/app" element={<AppDashboard />} />
      <Route path="/learning" element={<LearningProgressHub userProgress={{}} />} />
    </Routes>
  </BrowserRouter>
);
