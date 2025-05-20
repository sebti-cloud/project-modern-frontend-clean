import React, { useState } from 'react';
import { MdLocalShipping } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { CiLogout, CiUser } from "react-icons/ci";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import './nav.css';

const Nav = ({ search, setSearch, searchproduct, setSearchResults }) => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/search?query=${search}`);
      const data = await response.json();
      setResults(data);
      setSearchResults(data);  // Propagation des résultats vers les composants enfants
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <div className='header'>
      <div className='top_header'>
        <div className='icon'>
          <MdLocalShipping />
        </div>
        <div className='info'>
          <p>Livraison gratuite pour des achats jusqu'à 700 MAD</p>
        </div>
      </div>
      <div className='mid_header'>
        <div className='logo'>
          <img src='image/logo.jpg' alt='logo'></img>
        </div>
        <div className='search_box'>
          <input type='text' value={search} placeholder='recherche' onChange={(e) => setSearch(e.target.value)} />
          <button onClick={handleSearch}><AiOutlineSearch /></button>
        </div>
        {isAuthenticated ? (
          <div className='user'>
            <div className='icon'><CiLogout /></div>
            <div className='btn'>
              <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
            </div>
          </div>
        ) : (
          <div className='user'>
            <div className='icon'><FiLogIn /></div>
            <div className='btn'>
              <button onClick={() => loginWithRedirect()}>Connexion</button>
            </div>
          </div>
        )}
      </div>
      <div className='last_header'>
        <div className='user_profile'>
          {isAuthenticated ? (
            <>
              <div className='icon'><CiUser /></div>
              <div className='info'>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </div>
            </>
          ) : (
            <>
              <div className='icon'><CiUser /></div>
              <div className='info'>
                <p>Veuillez vous connecter</p>
              </div>
            </>
          )}
        </div>
        <div className='nav'>
          <ul>
            <li><Link to='/' className='link'>Accueil</Link></li>
            <li><Link to='/shop' className='link'>Boutique</Link></li>
            <li><Link to='/Cart' className='link'>Panier</Link></li>
            <li><Link to='/about' className='link'>À propos</Link></li>
            <li><Link to='/contact' className='link'>Contact</Link></li>
          </ul>
        </div>
        <div className='offer'>
          <p>10% de réduction sur tous les iPhone</p>
        </div>
      </div>
    </div>
  );
};

export default Nav;
