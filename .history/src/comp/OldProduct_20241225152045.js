import React, { useState, useEffect } from 'react';
import './OldProduct.css'; // Assurez-vous que le CSS est lié correctement
import { AiOutlineShoppingCart } from 'react-icons/ai';

const OldProduct = ({ addtocart }) => {
    const [oldProducts, setOldProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('${process.env.REACT_APP_API_URL}/api/products');
            const data = await response.json();
            const oldProducts = data.filter((x) => x.type === 'old');
            setOldProducts(oldProducts);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching old products:', error);
            setLoading(false);
        }
    };

    const filterProducts = async (category) => {
        setFilter(category);
        setLoading(true);
        try {
            let url = `${process.env.REACT_APP_API_URL}/api/products?type=old`;
            if (category !== 'all') {
                url += `&category=${category}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            const filteredProducts = data.filter((x) => x.type === 'old');
            setOldProducts(filteredProducts);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching filtered products:', error);
            setLoading(false);
        }
    };

    return (
        <div className="oldProducts">
            <div className="banner">
                <h2>Old Products</h2>
                <p>Find rare and out-of-fashion products at great prices</p>
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
                    {oldProducts.map(product => (
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

export default OldProduct;
