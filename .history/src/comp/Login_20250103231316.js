import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('${process.env.REACT_APP_API_URL}/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Stocker le token JWT
        alert('Login successful');
        navigate('/profile'); // Rediriger vers le profil utilisateur
      } else {
        alert('Failed to login');
      }
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = '${process.env.REACT_APP_API_URL}/auth/google';
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
      <button type="button" onClick={handleGoogleLogin}>Login with Google</button>
    </form>
  );
};

export default Login;
