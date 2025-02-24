import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { PieChart } from 'react-minimal-pie-chart';
import './admin.css';

Modal.setAppElement('#root');

const UserActivity = ({ match }) => {
  const { userId } = match.params;
  const [logins, setLogins] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchLogins();
    fetchPurchases();
    fetchLikedProducts();
  }, [userId]);

  const fetchLogins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user-activities/logins/${userId}`);
      const data = await response.json();
      console.log('Logins:', data);
      setLogins(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des connexions des utilisateurs:', error);
    }
  };

  const fetchPurchases = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user-activities/purchases/${userId}`);
      const data = await response.json();
      console.log('Purchases:', data);
      setPurchases(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des achats des utilisateurs:', error);
    }
  };

  const fetchLikedProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user-activities/liked-products/${userId}`);
      const data = await response.json();
      console.log('Liked Products:', data);
      setLikedProducts(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits aimés:', error);
    }
  };

  const openModal = () => {
    // Exemple de données de graphique
    const data = [
      { title: 'Électronique', value: 10, color: '#E38627' },
      { title: 'Vêtements', value: 15, color: '#C13C37' },
      { title: 'Maison', value: 20, color: '#6A2135' }
    ];
    setChartData(data);
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
          <li><a href="/categories">Catégories</a></li>
          <li><a href="/likedProducts">Produits aimés</a></li>
          <li><a href="/contacts">Messages</a></li>
          <li><a href="/admins">Administrateurs</a></li>
          <li><a href="/admin-settings">Settings</a></li>
          <li><a href="/admin-users">Utilisateurs</a></li>
        </ul>
      </nav>
      <div className="user-activities">
        <h2 className="user-activities-header">Activités de l'Utilisateur (ID: {userId})</h2>

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

        <h3>Achats Récents</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => (
              <tr key={index}>
                <td>{purchase.product}</td>
                <td>{new Date(purchase.purchase_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Produits Aimés</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
            </tr>
          </thead>
          <tbody>
            {likedProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.product}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={openModal} className="interests-button">Voir les Intérêts</button>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="User Interests"
          className="modal"
          overlayClassName="overlay"
        >
          <button onClick={closeModal} className="close-button">X</button>
          <PieChart data={chartData} />
        </Modal>
      </div>
    </div>
  );
};

export default UserActivity;
