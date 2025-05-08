import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7150/api/auth/login', {
        email,
        password
      });
  
      const token = response.data.token;
      const role = response.data.roles; // Ensure the backend sends the role
      localStorage.setItem('token', token);
      localStorage.setItem('userRoles', role); // Store the role in localStorage
      onLogin(token, role); // Pass both token and role to the parent
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={loginUser} className="login-form">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
