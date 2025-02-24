import React from 'react';
import API_URL from '../config.js';

const OrderConfirmation = ({ trackingNumber }) => (
  <div>
    <h2>Commande Confirmée</h2>
    <p>Merci pour votre commande. Votre numéro de suivi est :</p>
    <h3>{trackingNumber}</h3>
  </div>
);

export default OrderConfirmation;
