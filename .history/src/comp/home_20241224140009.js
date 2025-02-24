import React, { useState, useEffect } from "react";
import './home.css';
import { Link } from "react-router-dom";
import { AiFillEye, AiFillHeart, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram, BiLogoYoutube } from "react-icons/bi";

const Home = ({ addtocart }) => {
    const [newProduct, setNewProduct] = useState([]);
    const [featuredProduct, setFeaturedProduct] = useState([]);
    const [topProduct, setTopProduct] = useState([]);
    const [trendingProduct, setTrendingProduct] = useState([]);
    const [likedMessage, setLikedMessage] = useState('');
    const [showLikedMessage, setShowLikedMessage] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [detail, setDetail] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('${process.env.REACT_APP_API_URL}/api/products');
            const data = await response.json();
            setTrendingProduct(data);
            setProductCategories(data);
            setProductTypes(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const setProductCategories = (products) => {
        const newProducts = products.filter((x) => x.type === 'new');
        console.log('New Products:', newProducts);  // Vérification par console.log
        setNewProduct(newProducts);

        const featuredProducts = products.filter((x) => x.type === 'featured');
        console.log('Featured Products:', featuredProducts);  // Vérification par console.log
        setFeaturedProduct(featuredProducts);

        const topProducts = products.filter((x) => x.type === 'top');
        console.log('Top Products:', topProducts);  // Vérification par console.log
        setTopProduct(topProducts);
    };

    const setProductTypes = (products) => {
        // Autres types de produits si nécessaire
    };

    const filtertype = (x) => {
        const filterproduct = trendingProduct.filter((curElm) => curElm.type === x);
        setTrendingProduct(filterproduct);
    };

    const allTrendingProduct = () => {
        fetchProducts();
    };

    const placeholderImage = "/uploads/placeholder.jpg"; // Remplace par le chemin réel de ton image de remplacement

    const renderProductImage = (imagePath) => {
        return imagePath && imagePath.trim() !== "" ? `${process.env.REACT_APP_API_URL}${imagePath}` : placeholderImage;
    };

    const handleLike = async (productId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}/like`, {
                method: 'PUT',
            });
            if (response.ok) {
                fetchProducts();
                setLikedMessage('Liked product!');  // Mettre à jour le message aimé
                setShowLikedMessage(true);  // Afficher le message
                setTimeout(() => setShowLikedMessage(false), 3000);  // Effacer le message après 3 secondes
            } else {
                console.error('Failed to like product.');
            }
        } catch (error) {
            console.error('Error liking product:', error);
        }
    };

    const detailpage = (product) => {
        setDetail(product);
        console.log('Product Details:', product);  // Ajout de logs pour vérifier les détails du produit
        setShowDetail(true);
    };

    const closeDetail = () => {
        setShowDetail(false);
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

            <div className="home">
                {showLikedMessage && <div className="liked-message">{likedMessage}</div>}
                <div id="about-us" className="top_banner">
                    <div className="contant">
                        <h3>silver aluminum</h3>
                        <h2>Apple Watch</h2>
                        <p>30% off at your first order</p>
                        <Link to='/shop' className="link">Shop Now</Link>
                    </div>
                </div>
                <div id="trending-product" className="trending">
                    <div className="container">
                        <div className='left_box'>
                            <div className="header">
                                <div className="heading">
                                    <h2 onClick={() => allTrendingProduct()}>trending product</h2>
                                </div>
                                <div className="cate">
                                    <h3 onClick={() => filtertype('new')}>New</h3>
                                    <h3 onClick={() => filtertype('featured')}>Featured</h3>
                                    <h3 onClick={() => filtertype('top')}>Top Selling</h3>
                                </div>
                            </div>
                            <div className="products">
                                <div className="container">
                                    {
                                        trendingProduct.map((curElm) => {
                                            return (
                                                <div key={curElm.id} className='box'>
                                                    <div className='img_box'>
                                                        <img src={renderProductImage(curElm.image)} alt={curElm.name || 'Product'} />
                                                        <div className="icon">
                                                            <div className="icon_box" onClick={() => detailpage(curElm)}>
                                                                <AiFillEye />
                                                            </div>
                                                            <div className="icon_box" onClick={() => handleLike(curElm.id)}>
                                                                <AiFillHeart />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="info">
                                                        <h3>{curElm.name}</h3>
                                                        <p>${curElm.price}</p>
                                                        <button className='btn' onClick={() => addtocart(curElm)}>Add To Cart</button>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                                <button>Show More</button>
                            </div>
                        </div>
                        <div className="right_box">
                            <div className="right_container">
                                <div id="testimonial" className="testimonial">
                                    <div className="head">
                                        <h3>our testimonial</h3>
                                    </div>
                                    <div className="detail">
                                        <div className="img_box">
                                            <img src="${process.env.REACT_APP_API_URL}/uploads/T1.jpg" alt="testimonial"></img>
                                        </div>
                                        <div className="info">
                                            <h3>LAHRECH Mohamed</h3>
                                            <h4>Web designer</h4>
                                            <p>Je suis un spécialiste dans ce sens et je vous conseille par ce service parce qu'il développe vos potentiels techniques.</p>
                                        </div>
                                    </div>
                                </div>
                                <div id="newsletter" className="newsletter">
                                    <div className="head">
                                        <h3>newsletter</h3>
                                    </div>
                                    <div className="form">
                                        <p>join our mailing list</p>
                                        <input type="email" placeholder="E-mail" autoComplete="off"></input>
                                        <button>Subscribe</button>
                                        <div className="icon_box">
                                            <div className="icon">
                                                <BiLogoFacebook />
                                            </div>
                                            <div className="icon">
                                                <BiLogoTwitter />
                                            </div>
                                            <div className="icon">
                                                <BiLogoInstagram />
                                            </div>
                                            <div className="icon">
                                                <BiLogoYoutube />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="banners">
                    <div className="container">
                        <div class="box">
                            <div class="top">
                                <img src='${process.env.REACT_APP_API_URL}/uploads/Multi-Banner-4.jpg' alt=''></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="new-product" class="product_type">
                    <div class="container">
                        <div class="box">
                            <div class="header">
                                <h2>New Product</h2>
                            </div>
                            {
                                Array.isArray(newProduct) && newProduct.map((curElm) => {
                                    return (
                                        <div key={curElm.id} class="productbox">
                                            <div class="img-box">
                                                <img src={renderProductImage(curElm.image)} alt={curElm.name || 'New Product'}></img>
                                            </div>
                                            <div class="detail">
                                                <h3>{curElm.name}</h3>
                                                <p>${curElm.price}</p>
                                                <div class="icon">
                                                    <button onClick={() => detailpage(curElm)}><AiFillEye /></button>
                                                    <button onClick={() => handleLike(curElm.id)}><AiFillHeart /></button>
                                                    <button onClick={() => addtocart(curElm)}><AiOutlineShoppingCart /></button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div id="featured-product" class="box">
                            <div class="header">
                                <h2>Featured Product</h2>
                            </div>
                            {
                                Array.isArray(featuredProduct) && featuredProduct.map((curElm) => {
                                    return (
                                        <div key={curElm.id} class="productbox">
                                            <div class="img-box">
                                                <img src={renderProductImage(curElm.image)} alt={curElm.name || 'Featured Product'}></img>
                                            </div>
                                            <div class="detail">
                                                <h3>{curElm.name}</h3>
                                                <p>${curElm.price}</p>
                                                <div class="icon">
                                                    <button onClick={() => detailpage(curElm)}><AiFillEye /></button>
                                                    <button onClick={() => handleLike(curElm.id)}><AiFillHeart /></button>
                                                    <button onClick={() => addtocart(curElm)}><AiOutlineShoppingCart /></button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div id="top-product" class="box">
                            <div class="header">
                                <h2>Top Product</h2>
                            </div>
                            {
                                Array.isArray(topProduct) && topProduct.map((curElm) => {
                                    return (
                                        <div key={curElm.id} class="productbox">
                                            <div class="img-box">
                                                <img src={renderProductImage(curElm.image)} alt={curElm.name || 'Top Product'}></img>
                                            </div>
                                            <div class="detail">
                                                <h3>{curElm.name}</h3>
                                                <p>${curElm.price}</p>
                                                <div class="icon">
                                                    <button onClick={() => detailpage(curElm)}><AiFillEye /></button>
                                                    <button onClick={() => handleLike(curElm.id)}><AiFillHeart /></button>
                                                    <button onClick={() => addtocart(curElm)}><AiOutlineShoppingCart /></button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
