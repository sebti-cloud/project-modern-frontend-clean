import React, { useState, useEffect } from 'react';
import './shop.css';
import { AiFillEye, AiFillHeart, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";

const Shop = ({ addtocart }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [detail, setDetail] = useState([]);
    const [shop, setShop] = useState([]);
    const [categories, setCategories] = useState([]);
    const [likedMessage, setLikedMessage] = useState('');
    const [showLikedMessage, setShowLikedMessage] = useState(false);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async (category = '') => {
        console.log('Fetching products for category:', category); // Debug log
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products?category=${category}`);
            const data = await response.json();
            console.log('Fetched products:', data); // Debug log
            setShop(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('${process.env.REACT_APP_API_URL}/api/categories');
            const data = await response.json();
            setCategories(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const detailpage = (product) => {
        setDetail(product);
        setShowDetail(true);
    };

    const closeDetail = () => {
        setShowDetail(false);
    };

    const filtercate = (category) => {
        console.log('Filtering by category:', category); // Debug log
        fetchProducts(category);
    };

    const allcatfilter = () => {
        console.log('Fetching all products'); // Debug log
        fetchProducts();
    };

    const handleLike = async (productId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}/like`, {
                method: 'PUT',
            });
            if (response.ok) {
                fetchProducts();
                setLikedMessage('Liked product!');
                setShowLikedMessage(true);
                setTimeout(() => setShowLikedMessage(false), 3000);
            } else {
                console.error('Failed to like product.');
            }
        } catch (error) {
            console.error('Error liking product:', error);
        }
    };
    return (
        <>
            {showDetail ? (
                <div className='product_detail'>
                    <button className='close_btn' onClick={closeDetail}><AiOutlineClose /></button>
                    <div className='container'>
                        <div className='img_box'>
                            <img src={`${process.env.REACT_APP_API_URL}${detail.image}`} alt=''></img>
                        </div>
                        <div className='info'>
                            <h4># {detail.type}</h4>
                            <h2>{detail.name}</h2>
                            <p>{detail.details}</p> {/* Affichage des détails du produit */}
                            <h3>${detail.price}</h3>
                            <button onClick={() => addtocart(detail)}>Add To Cart</button>
                        </div>
                    </div>
                </div>
            ) : null}

            <div className='shop'>
                {showLikedMessage && <div className="liked-message">{likedMessage}</div>}
                <h2># shop</h2>
                <p>Home . shop</p>
                <div className='container'>
                    <div className='left_box'>
                        <div className='category'>
                            <div className='header'>
                                <h3>All categories</h3>
                            </div>
                            <div className='box'>
                                <ul>
                                    <li onClick={() => allcatfilter()}># All</li>
                                    {categories.map(category => (
                                        <li key={category.id} onClick={() => filtercate(category.name)}>{`# ${category.name}`}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='banner'>
                            <div className='img_box'>
                                <img src='image/shop_left.jpg' alt=''></img>
                            </div>
                        </div>
                    </div>
                    <div className='right_box'>
                        <div className='banner'>
                            <div className='img_box'>
                                <img src='image/shop_top.jpg' alt=''></img>
                            </div>
                        </div>
                        <div className='product_box'>
                            <h2>Shop Product</h2>
                            <div className='product_container'>
                                {shop.map((curElm) => (
                                    <div key={curElm.id} className='box'>
                                        <div className='img_box'>
                                            <img src={`${process.env.REACT_APP_API_URL}${curElm.image}`} alt='' ></img>
                                            <div className='icon'>
                                                <li onClick={() => handleLike(curElm.id)}><AiFillHeart /></li>
                                                <li onClick={() => detailpage(curElm)}><AiFillEye /></li>
                                            </div>
                                        </div>
                                        <div className='detail'>
                                            <h3>{curElm.name}</h3>
                                            <p>${curElm.price}</p>
                                            <button onClick={() => addtocart(curElm)}>Add To Cart</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Shop;
