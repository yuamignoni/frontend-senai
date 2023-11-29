import React, { useState } from 'react';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [foto, setFoto] = useState(null)
  const navigate = useNavigate();

const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('telefone', telefone);
      formData.append('endereco', endereco);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('foto', foto);

      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log(response);
        navigate('/');
      } else {
        console.error('Erro ao realizar o cadastro:', response.status);
      }
    } catch (error) {
      console.error('Erro ao realizar o cadastro:', error);
    }
  };

  const handleFotoChange = (event) => {
    setFoto(event.target.files[0]);
  };

  return (
    <>
      <header className="app-header">
        <a href="/" className="logo-link">Hunter x Hunter</a>
      </header>
      <div className="content-container">
        <form onSubmit={handleSubmit} className="register-form">
          <input type="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" required />
          <input type="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="Telefone" required />
          <input type="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Endereço" required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <input type="file" accept="image/*" onChange={handleFotoChange} />
          <button type="submit">Cadastrar</button>
        </form>
        <div className="login-link">
          Já possui uma conta? <a href="/login">Faça login</a>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;