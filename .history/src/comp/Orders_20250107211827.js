/*import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './admin.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      console.log('Fetching orders...'); // Ajout de log
      const response = await fetch('${process.env.REACT_APP_API_URL}/api/orders');
      console.log('Response received for orders:', response); // Ajout de log

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Data received for orders:', data); // Ajout de log
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      console.log('Fetching products...'); // Ajout de log
      const response = await fetch('${process.env.REACT_APP_API_URL}/api/products');
      console.log('Response received for products:', response); // Ajout de log

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Data received for products:', data); // Ajout de log
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleValidateOrder = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${id}/validate`, {
        method: 'PUT',
      });
      if (response.ok) {
        fetchOrders();
        alert('Order validated successfully!', 'alert-success');
      } else {
        alert('Failed to validate order.', 'alert-danger');
      }
    } catch (error) {
      console.error('Error validating order:', error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchOrders();
        alert('Commande supprimée avec succès!', 'alert-danger');
      } else {
        const errorData = await response.json();
        alert(`Échec de la suppression de la commande: ${errorData.message}`, 'alert-danger');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la commande:', error);
      alert(`Erreur lors de la suppression de la commande: ${error.message}`, 'alert-danger');
    }
  };

  const getProductDetails = (productId) => {
    return products.find(product => product.id === productId);
  };

  return (
    <div className="admin-dashboard">
      <nav>
        <ul>
          <li><Link to="/products">Produits</Link></li>
          <li><Link to="/orders">Commandes</Link></li>
          <li><Link to="/likedProducts">Produits aimés</Link></li>
          <li><Link to="/categories">Catégories</Link></li>
          <li><Link to="/contacts">Messages</Link></li>
          <li><Link to="/admins">Administrateurs</Link></li>
        </ul>
      </nav>
      <div className="orders">
        <h2 className="orders-header">Commandes</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom du client</th>
              <th>Téléphone</th>
              <th>Produits</th>
              <th>Prix Total</th>
              <th>Date</th>
              <th>Status</th>
              <th>Numéro de Suivi</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user_name} {order.user_surname}</td>
                <td>{order.user_phone}</td>
                <td>
                  {order.products && order.products.map(product => {
                    const productDetails = getProductDetails(product.id);
                    return productDetails ? (
                      <div key={product.id}>
                        <img src={`${process.env.REACT_APP_API_URL}${productDetails.image}`} alt={productDetails.name} width="50" />
                        {productDetails.name} x {product.qty}
                      </div>
                    ) : null;
                  })}
                </td>
                <td>{order.total_price} MAD</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
                <td>{order.status === 'validated' ? 'Validée' : 'En attente'}</td>
                <td>{order.tracking_number}</td>
                <td>
                  <button className="validate" onClick={() => handleValidateOrder(order.id)}>Valider</button>
                  <button className="delete" onClick={() => handleDeleteOrder(order.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
*/import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './admin.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [newLocation, setNewLocation] = useState('');

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('${process.env.REACT_APP_API_URL}/api/orders');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('${process.env.REACT_APP_API_URL}/api/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleValidateOrder = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${id}/validate`, {
        method: 'PUT',
      });
      if (response.ok) {
        fetchOrders();
        alert('Order validated successfully!', 'alert-success');
      } else {
        alert('Failed to validate order.', 'alert-danger');
      }
    } catch (error) {
      console.error('Error validating order:', error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchOrders();
        alert('Commande supprimée avec succès!', 'alert-danger');
      } else {
        const errorData = await response.json();
        alert(`Échec de la suppression de la commande: ${errorData.message}`, 'alert-danger');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la commande:', error);
      alert(`Erreur lors de la suppression de la commande: ${error.message}`, 'alert-danger');
    }
  };

  const handleUpdateOrder = async () => {
    if (selectedOrder) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/update-tracking/${selectedOrder.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus, location: newLocation }),
        });
        const data = await response.json();
        alert('Commande mise à jour avec succès');
        setOrders(orders.map(order => order.id === selectedOrder.id ? data : order));
        setSelectedOrder(null);
        setNewStatus('');
        setNewLocation('');
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la commande :', error);
      }
    }
  };

  const getProductDetails = (productId) => {
    return products.find(product => product.id === productId);
  };

  return (
    <div className="admin-dashboard">
      <nav>
        <ul>
          <li><Link to="/products">Produits</Link></li>
          <li><Link to="/orders">Commandes</Link></li>
          <li><Link to="/likedProducts">Produits aimés</Link></li>
          <li><Link to="/categories">Catégories</Link></li>
          <li><Link to="/contacts">Messages</Link></li>
          <li><Link to="/admins">Administrateurs</Link></li>
        </ul>
      </nav>
      <div className="orders">
        <h2 className="orders-header">Commandes</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom du client</th>
              <th>Téléphone</th>
              <th>Produits</th>
              <th>Prix Total</th>
              <th>Date</th>
              <th>Status</th>
              <th>Numéro de Suivi</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user_name} {order.user_surname}</td>
                <td>{order.user_phone}</td>
                <td>
                  {order.products && order.products.map(product => {
                    const productDetails = getProductDetails(product.id);
                    return productDetails ? (
                      <div key={product.id}>
                        <img src={`${process.env.REACT_APP_API_URL}${productDetails.image}`} alt={productDetails.name} width="50" />
                        {productDetails.name} x {product.qty}
                      </div>
                    ) : null;
                  })}
                </td>
                <td>{order.total_price} MAD</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
                <td>{order.status}</td>
                <td>{order.tracking_number}</td>
                <td>
                  <button className="validate" onClick={() => handleValidateOrder(order.id)}>Valider</button>
                  <button className="delete" onClick={() => handleDeleteOrder(order.id)}>Supprimer</button>
                  <button onClick={() => setSelectedOrder(order)}>Mettre à jour</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <div>
          <h3>Mise à jour de la commande {selectedOrder.id}</h3>
          <label>
            Nouveau Statut :
            <input
              type="text"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            />
          </label>
          <label>
            Nouvelle Localisation :
            <input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
            />
          </label>
          <button onClick={handleUpdateOrder}>Mettre à jour la commande</button>
        </div>
      )}
    </div>
  );
};

export default Orders;
