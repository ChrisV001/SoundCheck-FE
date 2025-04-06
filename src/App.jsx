import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ExhaustSystems from "./pages/ExhaustSystems";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={(data) => console.log(data)} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/exhaust-systems" element={<ExhaustSystems />} />
      </Routes>
    </Router>
  );
}

export default App;
