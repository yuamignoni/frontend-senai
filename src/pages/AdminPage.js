
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css';
import Usuarios from './Usuarios';

const AdminPage = () => (
  <div className="admin">
    <header className="page-header">
      <h1>Página do Administrador</h1>
      <Link to="/" className="btn-home">Página Principal</Link>
    </header>
    <p>Informações do usuário...</p>
    <Usuarios />
  </div>
);

export default AdminPage;