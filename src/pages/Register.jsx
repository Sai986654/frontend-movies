import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User'); // Default role

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7150/api/auth/register', {
        email,
        password,
        role
      });
      alert('Registration successful');
    } catch (error) {
      alert('Error registering user');
      console.error(error);
    }
  };

  return (
    <form onSubmit={registerUser} className="register-form">
      <h2>Register</h2>
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
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
