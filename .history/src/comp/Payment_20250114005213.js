import React, { useEffect, useState } from 'react';
import './payment.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Modal from 'react-modal';
import { FaCopy } from 'react-icons/fa';

Modal.setAppElement('#root');

const Payment = () => {
  const { orderId } = useParams();
  const [total, setTotal] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        console.error("orderId n'est pas défini.");
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/order-total/${orderId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Détails de la commande récupérés:', data);
        setTotal(data.total || 0);
        setUserEmail(data.email || '');
        setTrackingNumber(data.trackingnumber || ''); // Utiliser le nom exact de la propriété
        setUserName(data.username || ''); // Utiliser le nom exact de la propriété

        if (!data.email) {
          console.error("Email non défini.");
        }
        if (!data.trackingnumber) { // Utiliser le nom exact de la propriété
          console.error("Numéro de suivi non défini.");
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la commande:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  useEffect(() => {
    if (total !== null) {
      const script = document.createElement('script');
      const clientId = 'Ado4_0ttcdGRc2_5YbVvN5dQARN1HCrEf394FAQkfamS9oLit2rJm9OXgf6oXagid3qYs_yD7mMHhaxk';

      if (!clientId) {
        console.error("Le client-id PayPal n'est pas défini. Veuillez vérifier votre configuration.");
        return;
      }

      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setPaypalLoaded(true);
        console.log('PayPal script loaded');
      };
      script.onerror = () => {
        console.error('Erreur de chargement du script PayPal');
      };
      document.body.appendChild(script);
    }
  }, [total]);

  useEffect(() => {
    if (paypalLoaded && total !== null) {
      const usdTotal = (total / 10).toFixed(2); // Convertir le total de MAD à USD

      window.paypal.Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: usdTotal,
              },
            }],
          }).catch((err) => {
            console.error('Erreur lors de la création de la commande :', err);
            alert('Erreur lors de la création de la commande');
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(async function (details) {
            alert(`Transaction terminée par ${details.payer.name.given_name}. Votre reçu de paiement a été envoyé à ${userEmail}.`);

            if (!userEmail) {
              console.error("Email non défini, impossible d'envoyer le reçu.");
              return;
            }

            try {
              // Appel de la route pour confirmer le paiement et enregistrer le numéro de transaction
              const confirmPaymentResponse = await fetch('${process.env.REACT_APP_API_URL}/api/confirm-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, transactionId: details.id }),
              });
              if (!confirmPaymentResponse.ok) {
                throw new Error(`HTTP error! status: ${confirmPaymentResponse.status}`);
              }
              console.log('Paiement confirmé avec succès.');

              // Envoi de l'email de reçu
              const sendReceiptResponse = await fetch('${process.env.REACT_APP_API_URL}/api/send-receipt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, email: userEmail }),
              });
              if (!sendReceiptResponse.ok) {
                throw new Error(`HTTP error! status: ${sendReceiptResponse.status}`);
              }
              console.log('Reçu de paiement envoyé avec succès.');
            } catch (error) {
              console.error('Erreur lors de la confirmation du paiement et de l\'envoi du reçu :', error);
            }

            setModalIsOpen(true);
          }).catch((err) => {
            console.error('Erreur lors de l\'approbation de la commande :', err);
            alert('Erreur lors de l\'approbation de la commande');
          });
        },
        onError: function (err) {
          console.error('Erreur lors du processus de paiement :', err);
          alert('Erreur lors du processus de paiement');
        },
      }).render('#paypal-button-container');
    }
  }, [total, paypalLoaded, orderId, userEmail]);


  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingNumber);
    alert('Numéro de suivi copié dans le presse-papiers');
  };

  if (total === null) {
    console.log('Chargement...');
    return <div>Chargement...</div>;
  }

  const usdTotal = (total / 10).toFixed(2); // Définir usdTotal ici

  return (
    <>
      <section className="payment-section">
        <div className="container">
          <div className="payment-wrapper">
            <div className="payment-left">
              <div className="payment-header">
                <div className="payment-header-icon"><i className="ri-flashlight-fill"></i></div>
                <div className="payment-header-title">Résumé de la commande</div>
                <p className="payment-header-description">Voici un récapitulatif de votre commande.</p>
              </div>
              <div className="payment-content">
                <div className="payment-body">
                  <div className="payment-plan">
                    <div className="payment-plan-type">Pro</div>
                    <div className="payment-plan-info">
                      <div className="payment-plan-info-name">Plan Professionnel</div>
                      <div className="payment-plan-info-price">${usdTotal} par mois</div>
                    </div>
                    <a href="#" className="payment-plan-change">Changer</a>
                  </div>
                  <div className="payment-summary">
                    <div className="payment-summary-item">
                      <div className="payment-summary-name">Frais supplémentaires</div>
                      <div className="payment-summary-price">$1</div>
                    </div>
                    <div className="payment-summary-item">
                      <div className="payment-summary-name">Réduction 20%</div>
                      <div className="payment-summary-price">-$2</div>
                    </div>
                    <div className="payment-summary-divider"></div>
                    <div className="payment-summary-item payment-summary-total">
                      <div className="payment-summary-name">Total</div>
                      <div className="payment-summary-price">${usdTotal}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="payment-right">
              <form className="payment-form">
                <h1 className="payment-title">Détails de Paiement</h1>
                <div id="paypal-button-container"></div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} contentLabel="Tracking Number Modal" className="modal" overlayClassName="overlay">
        <h2>Merci pour votre commande, {userName} !</h2>
        <p>Votre numéro de suivi est :</p>
        <div className="tracking-number-container">
          <h3>{trackingNumber}</h3>
          <button onClick={copyToClipboard} className="copy-button">
            <FaCopy /> Copier
          </button>
        </div>
        <p>Veuillez noter ce numéro pour suivre l'état de votre commande.</p>
        <Link to="/track-order">
          <button onClick={() => setModalIsOpen(false)}>Suivre ma commande</button>
        </Link>
      </Modal>
    </>
  );
};

export default Payment;