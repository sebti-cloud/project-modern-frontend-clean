import React from 'react'
import { MdLocalShipping } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { CiLogout, CiUser } from "react-icons/ci";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import './nav.css'

const Nav = ({search, setSearch, searchproduct}) => {
  //Shop page product
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  return (
    <>
      <div className='header'>
        <div className='top_header'>
          <div className='icon'>
            <MdLocalShipping />
          </div>
          <div className='info'>
            <p> Free Shipping when Shopping upto 2000 Mad</p>
          </div>
        </div>
        <div className='mid_header'>
          <div className='logo'>
            <img src='image/logo.jpg' alt='logo'></img>
          </div>
          <div className='search_box'>
            <input type='text' value={search} placeholder='search' onChange={(e) => setSearch(e.target.value)}></input>
            <button onClick={searchproduct}><AiOutlineSearch /></button>
          </div>
          {
            isAuthenticated ?
              //if the user is loged in will show Logout button and his profile
              <div className='user'>
                <div className='icon'>
                  <CiLogout />
                </div>
                <div className='btn'>
                  <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} >Logout</button>
                </div>
              </div>
              :

              //if the user is loged loged out will show Login button
              <div className='user'>
                <div className='icon'>
                  <FiLogIn />
                </div>
                <div className='btn'>
                  <button onClick={() => loginWithRedirect()} >Login</button>
                </div>
              </div>
          }
        </div>
        <div className='last_header'>
          <div className='user_profile'>
            {
              //User profile shown here
              isAuthenticated ? <>
                <div className='icon'>
                  <CiUser />
                </div>
                <div className='info'>
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                </div>
              </>
                :
                <>
                  <div className='icon'>
                    <CiUser />
                  </div>
                  <div className='info'>
                    <p>Please Login</p>
                  </div>
                </>
            }
          </div>
        
        <div className='nav'>
          <ul>
            <li><Link to='/' className='link'>Home</Link></li>
            <li><Link to='/shop' className='link'>Shop</Link></li>
            <li><Link to='/Cart' className='link'>Cart</Link></li>
            <li><Link to='/about' className='link'>About</Link></li>
            <li><Link to='/contact' className='link'>Contact</Link></li>

          </ul>
        </div>
        <div className='offer'>
          <p>flat 10% over all iphone</p>
        </div>
        </div>
      </div>
    </>
  )
}

export default Nav