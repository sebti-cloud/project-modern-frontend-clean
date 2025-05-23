import React, { useState, useEffect } from 'react';
import './sales.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Sales = ({ fetchSalesProducts, addtocart }) => {
    const [salesProducts, setSalesProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchSalesProducts(setSalesProducts);
            setLoading(false);
        };
        fetchData();
    }, [fetchSalesProducts]);

    const filterProducts = async (category) => {
        setFilter(category);
        setLoading(true);
        await fetchSalesProducts(setSalesProducts, category);
        setLoading(false);
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
                    {salesProducts.map(product => (
                        <div key={product.id} className="product_card">
                            <img src={`${process.env.REACT_APP_API_URL}${product.image}`} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.price} MAD</p>
                            <button onClick={() => addtocart(product)}>
                                <AiOutlineShoppingCart /> Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Sales;
