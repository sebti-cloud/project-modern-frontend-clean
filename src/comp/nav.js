import React, { useState, useEffect } from 'react';
import API_URL from './config';
import PropTypes from 'prop-types';
import { AiOutlineMenu, AiOutlineSearch, AiOutlineUser, AiOutlineLogout, AiOutlineHome, AiOutlineShop, AiOutlineInfoCircle, AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './nav.css';

const Nav = ({ search, setSearch, setSearchResults, isAuthenticated, handleLogout }) => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // État pour gérer l'ouverture du menu
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = Cookies.get('userToken');
      if (!token) return;

      try {
        const response = await fetch('${process.env.REACT_APP_API_URL}/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setUser(result);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/search?query=${search}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const logout = () => {
    Cookies.remove('userToken');
    handleLogout();
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="${process.env.REACT_APP_API_URL}/uploads/logo_for_RAHTY.png" alt="Logo" />
        </Link>
        <div className="navbar-search">
          <input 
            type="text" 
            value={search} 
            placeholder="Recherche" 
            onChange={(e) => setSearch(e.target.value)} 
          />
          <button onClick={handleSearch}><AiOutlineSearch /></button>
        </div>
        <div className="navbar-icons">
          {isAuthenticated ? (
            <>
              <div className="navbar-icon" onClick={logout}><AiOutlineLogout title="Déconnexion" /></div>
              <Link to="/profile" className="navbar-icon">
                <img src={`${process.env.REACT_APP_API_URL}${user?.photo}`} alt="Profile" className="profile-photo-nav" />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-icon"><AiOutlineUser title="Connexion" />Connexion</Link>
            </>
          )}
        </div>
        <div className="navbar-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <AiOutlineMenu />
        </div>
      </div>
      <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
        <li className="navbar-item">
          <Link to="/" className="navbar-link"><AiOutlineHome className="nav-icon" /> Accueil</Link>
        </li>
        <li className="navbar-item">
          <Link to="/shop" className="navbar-link"><AiOutlineShop className="nav-icon" /> Boutique</Link>
        </li>
        <li className="navbar-item">
          <Link to="/about" className="navbar-link"><AiOutlineInfoCircle className="nav-icon" /> À propos</Link>
        </li>
        <li className="navbar-item">
          <Link to="/contact" className="navbar-link"><AiOutlineMail className="nav-icon" /> Contact</Link>
        </li>
        {isAuthenticated && (
          <li className="navbar-item">
            <Link to="/profile" className="navbar-link"><AiOutlineUser className="nav-icon" /> Mon Compte</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

Nav.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  setSearchResults: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Nav;
