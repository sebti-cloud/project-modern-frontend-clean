import React from 'react';
import API_URL from './config.js'; // Importer la configuration API

import Delivery from './comp/Delivery.js'; // Assurez-vous que le chemin est correct

const ParentComponent = () => {
  const trackOrder = async (trackingNumber) => {
    const response = await fetch(`/api/track?number=${trackingNumber}`);
    const data = await response.json();
    return data.info; // Supposons que 'info' contient les informations de suivi
  };

  return <Delivery trackOrder={trackOrder} />;
};

export default ParentComponent;
