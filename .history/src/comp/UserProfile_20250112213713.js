import React, { useState, useEffect } from 'react';
import UploadProfilePhoto from './UploadProfilePhoto';
import Cookies from 'js-cookie'; // Importez js-cookie pour gérer les cookies
import './UserProfile.css'; // Assurez-vous d'importer le fichier CSS
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [showUploadOptions, setShowUploadOptions] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cartCount, setCartCount] = useState(parseInt(localStorage.getItem('cartCount')) || 0); // Initialiser à partir de localStorage

    useEffect(() => {
        localStorage.setItem('cartCount', cartCount); // Sauvegarder l'état du panier dans localStorage
    }, [cartCount]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = Cookies.get('token'); // Utilisez js-cookie pour récupérer le jeton
            if (!token) {
                console.error('No token found');
                return;
            }
            try {
                const response = await fetch('${process.env.REACT_APP_API_URL}/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }
                const result = await response.json();
                setUser(result);
                if (result.photo) {
                    setShowUploadOptions(false);
                }
                console.log('User profile:', result); // Ajout de log pour vérifier l'URL de la photo
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        fetchUserProfile();
    }, []);

    const uploadPhoto = async (photo) => {
        const formData = new FormData();
        formData.append('photo', photo);
        const token = Cookies.get('token'); // Utilisez js-cookie pour récupérer le jeton
        if (!token) {
            console.error('No token found');
            return;
        }
        try {
            const response = await fetch('${process.env.REACT_APP_API_URL}/api/user/upload', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to upload photo');
            }
            const result = await response.json();
            setUser({ ...user, photo: result.photo });
            setShowUploadOptions(false);
            window.location.reload();
        } catch (error) {
            console.error('Error uploading photo:', error);
            alert('Error uploading photo');
        }
    };

    const changePhoto = () => {
        setShowUploadOptions(true);
    };

    const openModal = () => {
        setIsModalOpen(true);
        document.addEventListener('click', closeModal);
    };

    const closeModal = (e) => {
        if (!e.target.closest('.modal-content')) {
            setIsModalOpen(false);
            document.removeEventListener('click', closeModal);
        }
    };

    return (
        <div className="profile-container">
            <h1 className="profile-title">{user ? user.name : 'Profile'}</h1>
            {user && user.photo ? (
                <>
                    <img className="profile-photo" src={`${process.env.REACT_APP_API_URL}${user.photo}`} alt="Profile" onClick={openModal} style={{ cursor: 'pointer' }} />
                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <img src={`${process.env.REACT_APP_API_URL}${user.photo}`} alt="Profile" className='profile-photo-modal' />
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <p className="profile-placeholder">Aucune photo</p>
            )}
            {showUploadOptions ? (
                <UploadProfilePhoto uploadPhoto={uploadPhoto} />
            ) : (
                <button onClick={changePhoto}>Changer la photo de profil</button>
            )}
            
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

export default UserProfile;
