import React, { useState } from 'react';
import Nav from './comp/nav';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import Rout from './comp/rout';
import Footer from './comp/footer';
import Homeproduct from './comp/home_product';
import AdminDashboard from './comp/AdminDashboard';
import About from './comp/About';
import Account from './comp/Account';
import Payment from './comp/Payment';
import Sales from './comp/Sales';
import Delivery from './comp/Delivery';
import TrackOrder from './comp/TrackOrder';
import TopProducts from './comp/TopProducts';
import OldProduct from './comp/OldProduct';

const App = () => {
  const [cart, setCart] = useState([]);
  const [shop, setShop] = useState(Homeproduct);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [salesProducts, setSalesProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [oldProducts, setOldProducts] = useState([]);

  const fetchProducts = async (category = '') => {
    try {
      let url = '${process.env.REACT_APP_API_URL}/api/products';
      if (category) {
        url += `?category=${category}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setShop(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchSalesProducts = async (category = 'all') => {
    try {
      let url = '${process.env.REACT_APP_API_URL}/api/salesProducts';
      if (category !== 'all') {
        url += `?category=${category}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSalesProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching sales products:', error);
    }
  };

  const Filter = (x) => {
    fetchProducts(x);
  };

  const allcatfilter = () => {
    fetchProducts();
  };

  const searchproduct = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/search?query=${search}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const addtocart = (product) => {
    const exist = cart.find((x) => x.id === product.id);
    if (exist) {
      alert("This product already exists in your cart");
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
      alert("Added to cart");
    }
  };

  const isAuthenticated = !!Cookies.get('token'); // Vérifie si un token est présent dans les cookies

  return (
    <Router>
      <Nav search={search} setSearch={setSearch} searchproduct={searchproduct} setSearchResults={setSearchResults} />
      <Routes>
        <Route path="/admin-dashboard" element={isAuthenticated ? <AdminDashboard /> : <Redirect to="/login" />} />
        <Route path="/admin" element={isAuthenticated ? <AdminDashboard /> : <Redirect to="/login" />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/sales" element={<Sales salesProducts={salesProducts} fetchSalesProducts={fetchSalesProducts} addtocart={addtocart} />} />
        <Route path="/delivery" element={<Delivery trackOrder={() => {}} />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/top-products" element={<TopProducts topProducts={topProducts} fetchTopProducts={() => {}} addtocart={addtocart} />} />
        <Route path="/old-product" element={<OldProduct oldProducts={oldProducts} fetchOldProducts={() => {}} addtocart={addtocart} />} />
        <Route path="/*" element={
          <Rout setCart={setCart} cart={cart} shop={shop} Filter={Filter} allcatfilter={allcatfilter} addtocart={addtocart} fetchProducts={fetchProducts} searchproduct={searchproduct} searchResults={searchResults} />
        } />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
