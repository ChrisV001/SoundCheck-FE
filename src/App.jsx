import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLoginSuccess={(data) => console.log(data)} />} />
      </Routes>
    </Router>
  );
}

export default App
