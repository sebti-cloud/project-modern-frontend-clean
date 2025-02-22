import React from "react";
import PropTypes from 'prop-types';
import { Routes, Route } from "react-router-dom"; // Vérifiez cette importation
import Home from './home.js';
import Shop from './shop.js'; 
import Cart from "./cart.js";
import Contact from "./contact.js"; 

const Rout = ({ shop, Filter, allcatfilter, addtocart, cart, setCart, fetchProducts, searchproduct }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home shop={shop} fetchProducts={fetchProducts} addtocart={addtocart} searchproduct={searchproduct} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/shop" element={<Shop shop={shop} Filter={Filter} allcatfilter={allcatfilter} addtocart={addtocart} fetchProducts={fetchProducts} />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

Rout.propTypes = {
  shop: PropTypes.func.isRequired,
  Filter: PropTypes.func.isRequired,
  allcatfilter: PropTypes.func.isRequired,
  addtocart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  searchproduct: PropTypes.func.isRequired,
};

export default Rout;
