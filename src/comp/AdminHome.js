import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBox, FaShoppingCart, FaUser, FaTags, FaChartBar, FaEnvelope, FaUsersCog, FaCogs, FaWarehouse, FaBullhorn } from 'react-icons/fa';
import Cookies from 'js-cookie';
import './AdminHome.css';

const AdminHome = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminInfo = async () => {
      const token = Cookies.get('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/api/admin/info', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch admin info');
        }
        const data = await response.json();
        setAdmin(data);
      } catch (error) {
        console.error('Error fetching admin info:', error);
        Cookies.remove('adminToken');
        navigate('/admin/login');
      }
    };

    fetchAdminInfo();
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="admin-home">
      <h1>Hi, {admin?.username || 'Admin'} ({admin?.role || 'R&ocirc;le inconnu'})</h1>
      <button onClick={handleLogout} className="logout-button">Se d&eacute;connecter</button>
      <div className="admin-sections">
        <div className="admin-card">
          <Link to="/admin/products">
            <FaBox size={40} />
            <h2>Produits</h2>
            <p>G&eacute;rez tous les produits de votre boutique.</p>
          </Link>
        </div>
        <div className="admin-card">
          <Link to="/admin/orders">
            <FaShoppingCart size={40} />
            <h2>Commandes</h2>
            <p>Suivez et g&eacute;rez les commandes des clients.</p>
          </Link>
        </div>
        <div className="admin-card">
          <Link to="/admin/admin-users">
            <FaUser size={40} />
            <h2>Utilisateurs</h2>
            <p>G&eacute;rez les comptes des utilisateurs et des administrateurs.</p>
          </Link>
        </div>
        <div className="admin-card">
          <Link to="/admin/categories">
            <FaTags size={40} />
            <h2>Cat&eacute;gories</h2>
            <p>Organisez les produits en diff&eacute;rentes cat&eacute;gories.</p>
          </Link>
        </div>
        <div className="admin-card">
          <Link to="/admin/sales-report">
            <FaChartBar size={40} />
            <h2>Rapport de Ventes</h2>
            <p>Consultez les rapports de ventes et analyses.</p>
          </Link>
        </div>
        <div className="admin-card">
          <Link to="/admin/contacts">
            <FaEnvelope size={40} />
            <h2>Messages</h2>
            <p>G&eacute;rez les messages des clients et des utilisateurs.</p>
          </Link>
        </div>
        <div className="admin-card">
          <Link to="/admin/admins">
            <FaUsersCog size={40} />
            <h2>Administrateurs</h2>
            <p>G&eacute;rez les comptes administratifs.</p>
          </Link>
        </div>
        <div className="admin-card">
          <Link to="/admin-settings">
            <FaCogs size={40} />
            <h2>Param&egrave;tres</h2>
            <p>G&eacute;rez les param&egrave;tres de l&apos;administration et les utilisateurs.</p>
          </Link>
        </div>
        <div className="admin-card">
          <Link to="/admin/stock-history">
            <FaWarehouse size={40} />
            <h2>Historique des Stocks</h2>
            <p>Visualisez et g&eacute;rez les mouvements de stock.</p>
          </Link>
        </div>
        <div className="admin-card">
          <Link to="/admin/promotions">
            <FaBullhorn size={40} />
            <h2>Promotions</h2>
            <p>G&eacute;rez les promotions et r&eacute;ductions.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
