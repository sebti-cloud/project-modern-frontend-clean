import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './comp/nav';
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
import AddAdmin from './comp/AddAdmin';
import Products from './comp/Products';
import Orders from './comp/Orders';
import LikedProducts from './comp/LikedProducts';
import Categories from './comp/Categories';
import AdminContacts from './comp/AdminContacts';
import AdminList from './comp/AdminList';
import Cart from './comp/cart';
import Register from './comp/Register';
import Login from './comp/Login';
import AdminLogin from './comp/AdminLogin'; // Importer la page de connexion des administrateurs
import UserProfile from './comp/UserProfile';
import UserOrders from './comp/UserOrders';
import UserLikedProducts from './comp/UserLikedProducts';
import UploadProfilePhoto from './comp/UploadProfilePhoto';
import UserActivity from './comp/UserActivity';
import Cookies from 'js-cookie';
import AdminRoute from './comp/AdminRoute'; // Importer le composant AdminRoute

const App = () => {
  const [cart, setCart] = useState([]);
  const [shop, setShop] = useState(Homeproduct);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [salesProducts, setSalesProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [oldProducts, setOldProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('token'));

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

  useEffect(() => {
    fetchProducts();
    fetchSalesProducts();
  }, []);

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

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role'); // Supprimer le rôle de l'utilisateur des cookies lors de la déconnexion
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Nav search={search} setSearch={setSearch} searchproduct={searchproduct} setSearchResults={setSearchResults} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/admin/login" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} /> {/* Nouvelle route de connexion pour les administrateurs */}
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} />
        <Route path="/user-orders" element={isAuthenticated ? <UserOrders /> : <Navigate to="/login" />} />
        <Route path="/user-liked-products" element={isAuthenticated ? <UserLikedProducts /> : <Navigate to="/login" />} />
        <Route path="/user-activity" element={isAuthenticated ? <UserActivity /> : <Navigate to="/login" />} />
        <AdminRoute path="/admin" element={<AdminDashboard />} />
        <AdminRoute path="/add-admin" element={<AddAdmin />} />
        <AdminRoute path="/about" element={<About />} />
        <AdminRoute path="/account" element={<Account />} />
        <AdminRoute path="/payment" element={<Payment />} />
        <AdminRoute path="/sales" element={<Sales salesProducts={salesProducts} fetchSalesProducts={fetchSalesProducts} addtocart={addtocart} />} />
        <AdminRoute path="/delivery" element={<Delivery trackOrder={() => { }} />} />
        <AdminRoute path="/track-order" element={<TrackOrder />} />
        <AdminRoute path="/top-products" element={<TopProducts topProducts={topProducts} fetchTopProducts={fetchProducts} addtocart={addtocart} />} />
        <AdminRoute path="/old-product" element={<OldProduct oldProducts={oldProducts} fetchOldProducts={fetchProducts} addtocart={addtocart} />} />
        <AdminRoute path="/products" element={<Products />} />
        <AdminRoute path="/orders" element={<Orders />} />
        <AdminRoute path="/likedProducts" element={<LikedProducts />} />
        <AdminRoute path="/categories" element={<Categories />} />
        <AdminRoute path="/contacts" element={<AdminContacts />} />
        <AdminRoute path="/admins" element={<AdminList />} allowedRoles={['Admin principale', 'Moderateur']} />
        <Route path="/*" element={ <Rout setCart={setCart} cart={cart} shop={shop} Filter={Filter} allcatfilter={allcatfilter} addtocart={addtocart} fetchProducts={fetchProducts} searchproduct={searchproduct} searchResults={searchResults} /> } />
      </Routes>
      <Footer isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
    </Router>
  );
};

export default App;
