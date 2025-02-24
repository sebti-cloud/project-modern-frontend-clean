import React, { useState, useEffect } from 'react';
import API_URL from '../config.js';
import './sales.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Sales = () => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartCount] = useState(parseInt(localStorage.getItem('cartCount')) || 0);

    useEffect(() => {
        fetchProducts();
        fetchPromotions();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('${process.env.REACT_APP_API_URL}/api/products');
            await response.json(); // Lecture des données sans affectation de variable
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const fetchPromotions = async () => {
        try {
            const response = await fetch('${process.env.REACT_APP_API_URL}/api/promotions');
            const data = await response.json();
            setPromotions(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching promotions:', error);
            setLoading(false);
        }
    };

    const filterProducts = async (category) => {
        setLoading(true);
        try {
            let url = `${process.env.REACT_APP_API_URL}/api/products`;
            if (category !== 'all') {
                url += `?category=${category}`;
            }
            const response = await fetch(url);
            await response.json(); // Lecture des données sans affectation de variable
            setLoading(false);
        } catch (error) {
            console.error('Error fetching filtered products:', error);
            setLoading(false);
        }
    };

    return (
        <div className="sales">
            <div className="banner">
                <h2>Big Sales</h2>
                <p>Get the best deals on our top products</p>
            </div>
            <div className="filters">
                <button onClick={() => filterProducts('all')}>All</button>
                <button onClick={() => filterProducts('electronics')}>Electronics</button>
                <button onClick={() => filterProducts('fashion')}>Fashion</button>
                <button onClick={() => filterProducts('home')}>Home</button>
            </div>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="products_grid">
                    {promotions.length > 0 ? (
                        promotions.map(promo => (
                            <div key={promo.id} className="product_card">
                                <h3>{promo.name}</h3>
                                <p>{promo.description}</p>
                                <p>Discount: {promo.discount_value} {promo.discount_type}</p>
                                <p>Valid from: {new Date(promo.start_date).toLocaleDateString()} to {new Date(promo.end_date).toLocaleDateString()}</p>
                            </div>
                        ))
                    ) : (
                        <div className="no-promotions" style={{
                            textAlign: 'center',
                            backgroundColor: '#fff5f5',
                            color: '#c82333',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '1px solid #f5c6cb',
                            marginTop: '20px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '18px',
                            maxWidth: '600px',
                            margin: '20px auto'
                        }}>
                            <strong>Aucune promotion pour le moment.</strong>
                            <p>Restez attentifs pour chasser les opportunit&eacute;s &agrave; tout moment.</p>
                            <div style={{ fontSize: '50px', color: '#c82333', marginTop: '10px' }}>📢</div>
                        </div>
                    )}
                </div>
            )}

            {cartCount > 0 && (
                <Link to="/cart">
                    <div className="cart-icon">
                        <AiOutlineShoppingCart />
                        <span className="cart-count">{cartCount}</span>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default Sales;
