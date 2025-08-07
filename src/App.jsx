import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ExhaustSystems from "./pages/ExhaustSystems";
import AddExhaustSystems from "./pages/AddExhaustSystems";
import ListAllUsers from "./pages/ListAllUsers";
import CreateUser from "./pages/CreateUser";

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
        <Route path="/add-exhaust-systems" element={<AddExhaustSystems />} />
        <Route path="/list-users" element={<ListAllUsers />} />
        <Route path="/create-user" element={<CreateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
