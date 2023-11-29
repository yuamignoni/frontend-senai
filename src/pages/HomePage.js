import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import './HomePage.css';
import axios from 'axios';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setIsLoggedIn(!!token);
      setIsAdmin(decoded.admin);
    }
  }, []);

    const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleSolicitarCarteirinha = async () => {
    if (window.confirm('Você tem certeza de que deseja solicitar uma carteirinha?')) {
      const token = localStorage.getItem('token');
      try {
        await axios.post('http://localhost:8000/solicitar_carteirinha', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert('Solicitação de carteirinha enviada com sucesso!');
      } catch (error) {
    if (error.response) {
      alert(error.response.data.error);
    } else {
      alert('Erro ao fazer a solicitação. Nenhuma resposta foi recebida do servidor.');
    }
  }
    }
  };

  return (
  <>
    <header className="app-header">
      {!isLoggedIn && (<>
      <Link to="/register" className="register-link">Registrar</Link>
      <Link to="/login" className="login-link">Login</Link></>) }
      {isAdmin && (
          <Link to="/admin" className="admin-link">Admin</Link>
      )}
            {isLoggedIn && !isAdmin && (
        <button className="solicitar-carteirinha-button" onClick={handleSolicitarCarteirinha}>Solicitar Carteirinha</button>
      )}
      {isLoggedIn && (
          <button className="logout-button" onClick={handleLogout}>Logout</button>
      )}

    </header>
<div className="home">
<img src="/images/hunter.png" alt="Hunter x Hunter" className="hunter-image" />

  <h1>Bem-vindo ao Fã-Clube Hunter x Hunter</h1>
  <p>
    Hunter x Hunter é um anime e mangá japonês escrito e ilustrado por Yoshihiro Togashi.
    A história segue Gon Freecss, um jovem que aspira se tornar um Hunter e encontrar seu pai desaparecido.
    Explore um mundo cheio de desafios, amizades e criaturas extraordinárias.
  </p>
  <p>Curiosidade: O autor Yoshihiro Togashi também é conhecido por ser o criador de Yu Yu Hakusho.</p>
</div>
  </>
)};

export default HomePage;
