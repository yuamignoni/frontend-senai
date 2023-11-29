import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContentPage from './pages/ContentPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RequestPage from './pages/RequestPage';
import './App.css';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  console.log(isLoggedIn)
return (
  <Router>
    <Routes>
      <Route path="/" exact element={<HomePage/>} />
      <Route path="/conteudo" element={<ContentPage/>} />
        <Route
          path="/admin"
          element={isLoggedIn ? <AdminPage /> : <Navigate to="/login" />}
        />
      <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
        />
    <Route path="/register" element={<RegisterPage/>} />
    <Route path="/request" element={<RequestPage/>} />
    </Routes>
  </Router>
);}

export default App;