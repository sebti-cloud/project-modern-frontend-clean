import React, { useState, useEffect } from 'react';
import API_URL from './config.js';


const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('${process.env.REACT_APP_API_URL}/api/orders/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>Order ID: {order.id}, Total Price: {order.total_price}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserOrders;
