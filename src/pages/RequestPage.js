import React, { useState } from 'react';
import axios from 'axios';

const RequestPage = () => {
  const [userId, setUserId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post('/solicitar_carteirinha', { userId });
    console.log(response.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" required />
      <button type="submit">Request a Carteirinha</button>
    </form>
  );
};

export default RequestPage;