/*import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from './Products';
import Orders from './Orders';
import LikedProducts from './LikedProducts';
import Categories from './Categories';
import AdminContacts from './AdminContacts';
import AdminList from './AdminList';
import AdminUsers from './AdminUsers'; // Importer la nouvelle page des utilisateurs
import './admin.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/likedProducts" element={<LikedProducts />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contacts" element={<AdminContacts />} />
        <Route path="/admins" element={<AdminList />} />
        <Route path="/users" element={<AdminUsers />} /> 
        <Route path="/" element={<Products />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
*/import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from './Products.js';
import Orders from './Orders.js';
import LikedProducts from './LikedProducts.js';
import Categories from './Categories.js';
import AdminContacts from './AdminContacts.js';
import AdminList from './AdminList.js';
import AdminUsers from './AdminUsers.js';
import ProductList from './ProductList.js'; // Importer ProductList
import Suppliers from './Suppliers.js'; // Importer Suppliers
import StockHistory from './StockHistory.js'; // Importer StockHistory
import SalesReport from './reports/SalesReport.js'; // Importer SalesReport
import AdminHome from './AdminHome.js'; // Importer AdminHome
import AdminSettings from './AdminSettings.js'; // Importer AdminSettings
import './admin.css';
import API_URL from './config.js'; // Importer la configuration API

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="admin-content">
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/likedProducts" element={<LikedProducts />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/contacts" element={<AdminContacts />} />
          <Route path="/admins" element={<AdminList />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/stock-history" element={<StockHistory />} />
          <Route path="/sales-report" element={<SalesReport />} />
          <Route path="/admin-settings" element={<AdminSettings />} />
          <Route path="/" element={<AdminHome />} /> {/* Page d'accueil par défaut */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
