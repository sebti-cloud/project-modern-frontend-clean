import React, { useState, useEffect } from 'react';
import API_URL from './config';

import Modal from 'react-modal';
import { PieChart } from 'react-minimal-pie-chart';
import PropTypes from 'prop-types';
import './admin.css';
import { useParams } from 'react-router-dom';

Modal.setAppElement('#root');

const UserActivity = () => {
  const { userId } = useParams();
  const [username, setUsername] = useState('');
  const [logins, setLogins] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchUsername();
    fetchLogins();
    fetchPurchases();
    fetchLikedProducts();
    fetchProducts();
  }, [userId]);

  const fetchUsername = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la r&eacute;cup&eacute;ration du nom d&apos;utilisateur');
      }
      const data = await response.json();
      setUsername(data.name);
    } catch (error) {
      console.error('Erreur lors de la r&eacute;cup&eacute;ration du nom d&apos;utilisateur:', error);
    }
  };

  const fetchLogins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user-activities/logins/${userId}`);
      const data = await response.json();
      console.log('Logins:', data);
      setLogins(data);
    } catch (error) {
      console.error('Erreur lors de la r&eacute;cup&eacute;ration des connexions des utilisateurs:', error);
    }
  };

  const fetchPurchases = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user-activities/purchases/${userId}`);
      const data = await response.json();
      console.log('Purchases:', data);
      setPurchases(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erreur lors de la r&eacute;cup&eacute;ration des achats des utilisateurs:', error);
    }
  };

  const fetchLikedProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user-activities/liked-products/${userId}`);
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format');
      }
      console.log('Liked Products:', data);
      setLikedProducts(data);
    } catch (error) {
      console.error('Erreur lors de la r&eacute;cup&eacute;ration des produits aim&eacute;s:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('${process.env.REACT_APP_API_URL}/api/products');
      const data = await response.json();

      // Normaliser les données des produits pour s'assurer que les images sont des tableaux
      const normalizedData = data.map(product => ({
        ...product,
        images: product.images ? product.images.replace(/[{}"]/g, '').split(',') : [],
      }));

      setProducts(normalizedData);
      generateChartData(normalizedData); // Générer les données du graphique
    } catch (error) {
      console.error('Erreur lors de la r&eacute;cup&eacute;ration des produits:', error);
    }
  };

  const generateChartData = (products) => {
    const categoryCount = {};
    products.forEach((product) => {
      const category = product.category;
      if (categoryCount[category]) {
        categoryCount[category] += 1;
      } else {
        categoryCount[category] = 1;
      }
    });
    const totalProducts = products.length;
    const chartData = Object.keys(categoryCount).map((category) => ({
      title: category,
      value: categoryCount[category],
      percentage: ((categoryCount[category] / totalProducts) * 100).toFixed(2),
      color: getRandomColor()
    }));
    setChartData(chartData);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="admin-dashboard">
      <nav>
        <ul>
          <li><a href="/admin">Dashboard</a></li>
          <li><a href="/products">Produits</a></li>
          <li><a href="/orders">Commandes</a></li>
          <li><a href="/categories">Cat&eacute;gories</a></li>
          <li><a href="/likedProducts">Produits aim&eacute;s</a></li>
          <li><a href="/contacts">Messages</a></li>
          <li><a href="/admins">Administrateurs</a></li>
          <li><a href="/admin-settings">Settings</a></li>
          <li><a href="/admin-users">Utilisateurs</a></li>
        </ul>
      </nav>
      <div className="user-activities">
        <h2 className="user-activities-header">Activit&eacute;s de {username}</h2>
        <h3>Connexions</h3>
        <table>
          <thead>
            <tr>
              <th>Login Time</th>
            </tr>
          </thead>
          <tbody>
            {logins.map((login, index) => (
              <tr key={index}>
                <td>{new Date(login.login_time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Achats R&eacute;cents</h3>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Category</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => {
              return (
                <tr key={index}>
                  <td>
                    {purchase.product_images && purchase.product_images.length > 0 ? (
                      <img src={`${process.env.REACT_APP_API_URL}${purchase.product_images[0]}`} alt={purchase.product_name} width="50" />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>{purchase.product_name}</td>
                  <td>{purchase.product_price ? `${purchase.product_price} MAD` : 'N/A'}</td>
                  <td>{purchase.product_category ? purchase.product_category : 'N/A'}</td>
                  <td>{new Date(purchase.purchase_date).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h3>Produits Aim&eacute;s</h3>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {likedProducts.map((product, index) => {
              return (
                <tr key={index}>
                  <td>
                    {product.images && product.images.length > 0 ? (
                      <img src={`${process.env.REACT_APP_API_URL}${product.images[0]}`} alt={product.name} width="50" />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price ? `${product.price} MAD` : 'N/A'}</td>
                  <td>{product.category ? product.category : 'N/A'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={openModal} className="interests-button">Voir les Int&eacute;r&ecirc;ts</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="User Interests"
          className="modal"
          overlayClassName="overlay"
        >
          <button onClick={closeModal} className="close-button">X</button>
          {chartData.length > 0 ? (
            <PieChart
              data={chartData.map((entry) => ({
                title: entry.title,
                value: entry.value,
                color: entry.color
              }))}
              label={({ dataEntry }) => `${dataEntry.value} (${dataEntry.percentage}%)`}
              labelStyle={(index) => ({
                fill: chartData[index].color,
                fontSize: '5px',
                fontFamily: 'sans-serif'
              })}
              style={{ height: '200px' }}
            />
          ) : (
            <p>Aucune donn&eacute;e disponible pour afficher le graphique.</p>
          )}
          <div className="legend">
            {chartData.map((entry, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: entry.color, marginRight: '10px' }}></div>
                <span>{entry.title}: {entry.percentage}%</span>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    </div>
  );
};

UserActivity.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserActivity;
