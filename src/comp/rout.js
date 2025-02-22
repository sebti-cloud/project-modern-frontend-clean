import React from "react";
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

export default Rout;
