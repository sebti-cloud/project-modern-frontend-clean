import React, { useEffect } from 'react';
import './payment.css';
import { useNavigate } from 'react-router-dom';

const Payment = ({ amount }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=AX4oc4rorla1a5ueg7Mzh2WDGwM5Q-zsJcC_DT3ZksO1couL8afcg3NznZZb-CNvY1o5KObQ8ysLoRax`;
    script.async = true;
    script.onload = () => {
      try {
        window.paypal.Buttons({
          createOrder: function(data, actions) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount,
                },
              }],
            });
          },
          onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
              alert('Transaction terminée par ' + details.payer.name.given_name);
              navigate('/order-confirmation');
            });
          },
          onError: function(err) {
            console.error('Erreur lors du processus de paiement :', err);
            alert('Erreur lors du processus de paiement');
          },
        }).render('#paypal-button-container');
      } catch (error) {
        console.error('Erreur lors du chargement du script PayPal :', error);
      }
    };
    script.onerror = () => {
      console.error('Erreur de chargement du script PayPal');
    };
    document.body.appendChild(script);
  }, [amount, navigate]);

  return (
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
                    <div className="payment-plan-info-price">${amount} par mois</div>
                  </div>
                  <a href="#" className="payment-plan-change">Changer</a>
                </div>
                <div className="payment-summary">
                  <div className="payment-summary-item">
                    <div className="payment-summary-name">Frais supplémentaires</div>
                    <div className="payment-summary-price">$10</div>
                  </div>
                  <div className="payment-summary-item">
                    <div className="payment-summary-name">Réduction 20%</div>
                    <div className="payment-summary-price">-$10</div>
                  </div>
                  <div className="payment-summary-divider"></div>
                  <div className="payment-summary-item payment-summary-total">
                    <div className="payment-summary-name">Total</div>
                    <div className="payment-summary-price">${amount}</div>
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
  );
};

export default Payment;
