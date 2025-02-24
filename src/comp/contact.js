import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './contact.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import API_URL from '../config.js'; // Importer la configuration API

const ContactForm = ({ cartCount }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        phone: '' // Ajouter le champ téléphone
    });

    useEffect(() => {
        localStorage.setItem('cartCount', cartCount); // Sauvegarder l'état du panier dans localStorage
    }, [cartCount]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Message envoyé avec succès!');
                setFormData({ name: '', email: '', subject: '', message: '', phone: '' });
            } else {
                alert('Échec de l\'envoi du message.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="contact">
            <div className="container">
                <form className="form" onSubmit={handleSubmit}>
                    <h2>Contactez-nous</h2>
                    <div className="box">
                        <div className="lable"><h4>Nom</h4></div>
                        <div className="input">
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="box">
                        <div className="lable"><h4>Email</h4></div>
                        <div className="input">
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="box">
                        <div className="lable"><h4>Sujet</h4></div>
                        <div className="input">
                            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="box">
                        <div className="lable"><h4>Numéro de téléphone</h4></div>
                        <div className="input">
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="box">
                        <div className="lable"><h4>Message</h4></div>
                        <div className="input">
                            <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
                        </div>
                    </div>
                    <button type="submit">Envoyer</button>
                </form>
            </div>

            {/* Icône fixe du panier */}
            {cartCount > 0 && (
                <Link to="/cart">
                    <div className="cart-icon">
                        <AiOutlineShoppingCart />
                        <span className="cart-count">{cartCount}</span>
                    </div>
                </Link>
            )}
        </div>
    );
};

ContactForm.propTypes = {
  cartCount: PropTypes.number.isRequired,
  setCartCount: PropTypes.func.isRequired,
};

export default ContactForm;
