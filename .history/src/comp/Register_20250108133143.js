import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importez js-cookie pour gérer les cookies
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json(); // Supposons que le backend renvoie le jeton d'authentification
        Cookies.set('token', data.token); // Stocker le jeton dans les cookies
        alert('User registered and authenticated successfully');
        navigate('/profile'); // Redirigez vers /profile après l'inscription réussie et l'authentification
      } else {
        alert('Failed to register user');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-form-container">
          <h2>S'inscrire</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group name">
              <label>Nom</label>
              <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            </div>
            <div className="input-group email">
              <label>Email</label>
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            </div>
            <div className="input-group password">
              <label>Mot de passe</label>
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </div>
            <div className="input-group phone">
              <label>Téléphone</label>
              <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
            </div>
            <div className="input-group address">
              <label>Adresse</label>
              <textarea name="address" placeholder="Address" onChange={handleChange} ></textarea>
            </div>
            <button type="submit" className="register-button">S'inscrire</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
