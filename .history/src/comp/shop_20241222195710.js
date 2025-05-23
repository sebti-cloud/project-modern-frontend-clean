import React, { useState, useEffect } from 'react';
import './shop.css';
import { AiFillEye, AiFillHeart, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";

const Shop = ({ addtocart }) => {
    // Toggle Product Detail
    const [showDetail, setShowDetail] = useState(false);
    // Detail Page Data
    const [detail, setDetail] = useState([]);
    // Shop Product Data
    const [shop, setShop] = useState([]);

    // Récupérer les produits du backend
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async (category = '') => {
        console.log('Fetching products for category:', category);  // Log de la catégorie
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products?category=${category}`);
            const data = await response.json();
            console.log('Fetched products:', data);  // Log des produits récupérés
            setShop(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const detailpage = (product) => {
        setDetail(product);
        setShowDetail(true);
    };

    const closeDetail = () => {
        setShowDetail(false);
    };

    const Filter = (category) => {
        fetchProducts(category);
    };

    const allcatfilter = () => {
        fetchProducts();
    };

    return (
        <>
            {
                showDetail ?
                    <>
                        <div className='product_detail'>
                            <button className='close_btn' onClick={closeDetail}><AiOutlineClose /></button>
                            <div className='container'>
                                <div className='img_box'>
                                    <img src={`${process.env.REACT_APP_API_URL}${detail.image}`} alt=''></img>
                                </div>
                                <div className='info'>
                                    <h4># {detail.type}</h4>
                                    <h2>{detail.name}</h2>
                                    <p>Ce produit exceptionnel offre un mélange parfait de qualité et de performance. Conçu avec des matériaux de première classe, il garantit une durabilité et une satisfaction optimale. Que ce soit pour un usage quotidien ou pour des occasions spéciales, ce produit répondra à toutes vos attentes. Ne manquez pas l'occasion d'améliorer votre expérience avec ce choix incontournable !</p>
                                    <h3>${detail.price}</h3>
                                    <button onClick={() => addtocart(detail)}>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </>
                    : null
            }

            <div className='shop'>
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
                                    <li onClick={() => Filter("tv")}># tv</li>
                                    <li onClick={() => Filter("laptop")}># laptop</li>
                                    <li onClick={() => Filter("watch")}># watch</li>
                                    <li onClick={() => Filter("electromenager")}># electromenager</li>
                                    <li onClick={() => Filter("electronics")}># electronics</li>
                                    <li onClick={() => Filter("headphone")}># headphone</li>
                                    <li onClick={() => Filter("phone")}># phone</li>
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
                                {
                                    shop.map((curElm) => (
                                        <div key={curElm.id} className='box'>
                                            <div className='img_box'>
                                                <img src={`${process.env.REACT_APP_API_URL}${curElm.image}`} alt='' ></img>
                                                <div className='icon'>
                                                    <li><AiFillHeart /></li>
                                                    <li onClick={() => detailpage(curElm)}><AiFillEye /></li>
                                                </div>
                                            </div>
                                            <div className='detail'>
                                                <h3>{curElm.name}</h3>
                                                <p>{curElm.price}</p>
                                                <button onClick={() => addtocart(curElm)}>Add To Cart</button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Shop;
