import React, { useState, useEffect } from "react";
import './home.css';
import { Link } from "react-router-dom";
import { AiFillEye, AiFillHeart, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram, BiLogoYoutube } from "react-icons/bi";
import Cookies from 'js-cookie';

const Home = ({ addtocart, searchResults }) => { // Ajout de searchResults en tant que prop
    const [newProduct, setNewProduct] = useState([]);
    const [featuredProduct, setFeaturedProduct] = useState([]);
    const [topProduct, setTopProduct] = useState([]);
    const [trendingProduct, setTrendingProduct] = useState([]);
    const [likedMessage, setLikedMessage] = useState('');
    const [showLikedMessage, setShowLikedMessage] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [detail, setDetail] = useState([]);
    const [cartCount, setCartCount] = useState(parseInt(localStorage.getItem('cartCount')) || 0); // Initialiser à partir de localStorage

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchResults && searchResults.length > 0) {
            setTrendingProduct(searchResults);
        }
    }, [searchResults]);

    useEffect(() => {
        localStorage.setItem('cartCount', cartCount); // Sauvegarder l'état du panier dans localStorage
    }, [cartCount]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('${process.env.REACT_APP_API_URL}/api/products');
            const data = await response.json();
            setTrendingProduct(data);
            setProductCategories(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const setProductCategories = (products) => {
        const newProducts = products.filter((x) => x.types && x.types.includes('new'));
        setNewProduct(newProducts);

        const featuredProducts = products.filter((x) => x.types && x.types.includes('featured'));
        setFeaturedProduct(featuredProducts);

        const topProducts = products.filter((x) => x.types && x.types.includes('top'));
        setTopProduct(topProducts);
    };

    const filtertype = (x) => {
        const filterproduct = trendingProduct.filter((curElm) => curElm.types && curElm.types.includes(x));
        setTrendingProduct(filterproduct);
    };

    const allTrendingProduct = () => {
        fetchProducts();
    };

    const placeholderImage = "/uploads/placeholder.jpg";

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

    const detailpage = (product) => {
        setDetail(product);
        setShowDetail(true);
    };

    const closeDetail = () => {
        setShowDetail(false);
    };

    const addToCart = (product) => {
        addtocart(product); // Appeler la fonction addtocart fournie par les props
        setCartCount(cartCount + 1); // Incrémenter le compteur du panier
    };

    return (
        <>
            {/* Affichage du détail du produit */}
            {showDetail ? (
                <div className='product_detail'>
                    <button className='close_btn' onClick={closeDetail}><AiOutlineClose /></button>
                    <div className='container'>
                        <div className='img_box'>
                            <img src={`${process.env.REACT_APP_API_URL}${detail.image}`} alt='' />
                        </div>
                        <div className='info'>
                            <h4># {detail.types.join(', ')}</h4>
                            <h2>{detail.name}</h2>
                            <p>{detail.details}</p>
                            <h3>{detail.price} Mad</h3>
                            <button onClick={() => addToCart(detail)}>Ajouter au panier</button>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="home">
                {/* Affichage des messages et bannière */}
                {showLikedMessage && <div className="liked-message">{likedMessage}</div>}
                <div id="about-us" className="top_banner">
                    <div className="contant">
                        <h3>silver aluminum</h3>
                        <h2>Apple Watch</h2>
                        <p>30% de réduction sur votre première commande</p>
                        <Link to='/shop' className="link">Achetez maintenant</Link>
                    </div>
                </div>

                {/* Icône fixe du panier */}
                {cartCount > 0 && (
                    <Link to="/cart">
                        <div className="cart-icon">
                            <AiOutlineShoppingCart />
                            <span className="cart-count">{cartCount}</span>
                        </div>
                    </Link>
                )}

                {/* Affichage des produits tendances */}
                <div id="trending-product" className="trending">
                    <div className="container">
                        <div className='left_box'>
                            <div className="header">
                                <div className="heading">
                                    <h2 onClick={() => allTrendingProduct()}>Produits tendance</h2>
                                </div>
                                <div className="cate">
                                    <h3 onClick={() => filtertype('new')}>Nouveaux</h3>
                                    <h3 onClick={() => filtertype('featured')}>Spéciaux</h3>
                                    <h3 onClick={() => filtertype('top')}>Top Selling</h3>
                                </div>
                            </div>
                            <div className="products">
                                <div className="container">
                                    {trendingProduct.map((curElm) => (
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
                                                <p>{curElm.price} Mad</p>
                                                <button className='btn' onClick={() => addToCart(curElm)}>Ajouter au panier</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button>Afficher plus</button>
                            </div>
                        </div>
                        <div className="right_box">
                            <div className="right_container">
                                <div id="testimonial" className="testimonial">
                                    <div className="head">
                                        <h3>notre témoignage</h3>
                                    </div>
                                    <div className="detail">
                                        <div className="img_box">
                                            <img src="${process.env.REACT_APP_API_URL}/uploads/T1.png" alt="testimonial" />
                                        </div>
                                        <div className="info">
                                            <h3>Amine Boudali</h3>
                                            <h4>Analyste en Sécurité Informatique</h4>
                                            <p>Monsieur Amine Boudali est un expert en informatique reconnu pour ses compétences exceptionnelles en sécurité informatique et en développement logiciel. Avec plus de dix ans d'expérience dans le domaine, Amine a travaillé sur des projets variés, allant de la sécurisation des réseaux d'entreprise à la création de logiciels innovants. Son approche méthodique et sa passion pour la résolution de problèmes complexes font de lui un atout inestimable pour toute équipe technologique.</p>
                                        </div>
                                    </div>
                                </div>
                                <div id="newsletter" className="newsletter">
                                    <div className="head">
                                        <h3>bulletin</h3>
                                    </div>
                                    <div className="form">
                                        <p>rejoignez notre liste de diffusion</p>
                                        <input type="email" placeholder="E-mail" autoComplete="off" />
                                        <button>S'abonner</button>
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
                        <div className="box">
                            <div className="top">
                                <img src='${process.env.REACT_APP_API_URL}/uploads/Multi-Banner-4.jpg' alt='' />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="new-product" className="product_type">
                    <div className="container">
                        <div className="box">
                            <div className="header">
                                <h2>Nouveaux Produits</h2>
                            </div>
                            {Array.isArray(newProduct) && newProduct.map((curElm) => (
                                <div key={curElm.id} className="productbox">
                                    <div className="img-box">
                                        <img src={renderProductImage(curElm.image)} alt={curElm.name || 'New Product'} />
                                    </div>
                                    <div className="detail">
                                        <h3>{curElm.name}</h3>
                                        <p>{curElm.price} Mad</p>
                                        <div className="icon">
                                            <button onClick={() => detailpage(curElm)}><AiFillEye /></button>
                                            <button onClick={() => handleLike(curElm.id)}><AiFillHeart /></button>
                                            <button onClick={() => addToCart(curElm)}><AiOutlineShoppingCart /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div id="featured-product" className="box">
                            <div className="header">
                                <h2>Produits Spéciaux</h2>
                            </div>
                            {Array.isArray(featuredProduct) && featuredProduct.map((curElm) => (
                                <div key={curElm.id} className="productbox">
                                    <div className="img-box">
                                        <img src={renderProductImage(curElm.image)} alt={curElm.name || 'Featured Product'} />
                                    </div>
                                    <div className="detail">
                                        <h3>{curElm.name}</h3>
                                        <p>{curElm.price} Mad</p>
                                        <div className="icon">
                                            <button onClick={() => detailpage(curElm)}><AiFillEye /></button>
                                            <button onClick={() => handleLike(curElm.id)}><AiFillHeart /></button>
                                            <button onClick={() => addToCart(curElm)}><AiOutlineShoppingCart /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div id="top-product" className="box">
                            <div className="header">
                                <h2>Meilleurs Produits</h2>
                            </div>
                            {Array.isArray(topProduct) && topProduct.map((curElm) => (
                                <div key={curElm.id} className="productbox">
                                    <div className="img-box">
                                        <img src={renderProductImage(curElm.image)} alt={curElm.name || 'Top Product'} />
                                    </div>
                                    <div className="detail">
                                        <h3>{curElm.name}</h3>
                                        <p>{curElm.price} Mad</p>
                                        <div className="icon">
                                            <button onClick={() => detailpage(curElm)}><AiFillEye /></button>
                                            <button onClick={() => handleLike(curElm.id)}><AiFillHeart /></button>
                                            <button onClick={() => addToCart(curElm)}><AiOutlineShoppingCart /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;


/*import React, { useState, useEffect } from "react";
import './home.css';
import { Link } from "react-router-dom";
import { AiFillEye, AiFillHeart, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram, BiLogoYoutube } from "react-icons/bi";
import Cookies from 'js-cookie';

const Home = ({ addtocart, searchResults }) => { // Ajout de searchResults en tant que prop
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

    useEffect(() => {
        if (searchResults && searchResults.length > 0) {
            setTrendingProduct(searchResults);
        }
    }, [searchResults]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('${process.env.REACT_APP_API_URL}/api/products');
            const data = await response.json();
            setTrendingProduct(data);
            setProductCategories(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const setProductCategories = (products) => {
        const newProducts = products.filter((x) => x.types && x.types.includes('new'));
        setNewProduct(newProducts);

        const featuredProducts = products.filter((x) => x.types && x.types.includes('featured'));
        setFeaturedProduct(featuredProducts);

        const topProducts = products.filter((x) => x.types && x.types.includes('top'));
        setTopProduct(topProducts);
    };

    const filtertype = (x) => {
        const filterproduct = trendingProduct.filter((curElm) => curElm.types && curElm.types.includes(x));
        setTrendingProduct(filterproduct);
    };

    const allTrendingProduct = () => {
        fetchProducts();
    };

    const placeholderImage = "/uploads/placeholder.jpg";

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

    const detailpage = (product) => {
        setDetail(product);
        setShowDetail(true);
    };

    const closeDetail = () => {
        setShowDetail(false);
    };

    return (
        <>
{
    showDetail ? (
        <div className='product_detail'>
            <button className='close_btn' onClick={closeDetail}><AiOutlineClose /></button>
            <div className='container'>
                <div className='img_box'>
                    <img src={`${process.env.REACT_APP_API_URL}${detail.image}`} alt='' />
                </div>
                <div className='info'>
                    <h4># {detail.types.join(', ')}</h4>
                    <h2>{detail.name}</h2>
                    <p>{detail.details}</p>
                    <h3>{detail.price} Mad</h3>
                    <button onClick={() => addtocart(detail)}>Ajouter au panier</button>
                </div>
            </div>
        </div>
    ) : null
}
<div className="home">
    {showLikedMessage && <div className="liked-message">{likedMessage}</div>}
    <div id="about-us" className="top_banner">
        <div className="contant">
            <h3>silver aluminum</h3>
            <h2>Apple Watch</h2>
            <p>30% de réduction sur votre première commande</p>
            <Link to='/shop' className="link">Achetez maintenant</Link>
        </div>
    </div>

    <div id="trending-product" className="trending">
        <div className="container">
            <div className='left_box'>
                <div className="header">
                    <div className="heading">
                        <h2 onClick={() => allTrendingProduct()}>Produits tendance</h2>
                    </div>
                    <div className="cate">
                        <h3 onClick={() => filtertype('new')}>Nouveaux</h3>
                        <h3 onClick={() => filtertype('featured')}>Spéciaux</h3>
                        <h3 onClick={() => filtertype('top')}>Top Selling</h3>
                    </div>
                </div>
                <div className="products">
                    <div className="container">
                        {trendingProduct.map((curElm) => (
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
                                    <p>{curElm.price} Mad</p>
                                    <button className='btn' onClick={() => addtocart(curElm)}>Ajouter au panier</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button>Afficher plus</button>
                </div>
            </div>
            <div className="right_box">
                <div className="right_container">
                    <div id="testimonial" className="testimonial">
                        <div className="head">
                            <h3>notre témoignage</h3>
                        </div>
                        <div className="detail">
                            <div className="img_box">
                                <img src="${process.env.REACT_APP_API_URL}/uploads/T1.png" alt="testimonial" />
                            </div>
                            <div className="info">
                                <h3>Amine Boudali</h3>
                                <h4>Analyste en Sécurité Informatique</h4>
                                <p>Monsieur Amine Boudali est un expert en informatique reconnu pour ses compétences exceptionnelles en sécurité informatique et en développement logiciel. Avec plus de dix ans d'expérience dans le domaine, Amine a travaillé sur des projets variés, allant de la sécurisation des réseaux d'entreprise à la création de logiciels innovants. Son approche méthodique et sa passion pour la résolution de problèmes complexes font de lui un atout inestimable pour toute équipe technologique.</p>
                            </div>
                        </div>
                    </div>
                    <div id="newsletter" className="newsletter">
                        <div className="head">
                            <h3>bulletin</h3>
                        </div>
                        <div className="form">
                            <p>rejoignez notre liste de diffusion</p>
                            <input type="email" placeholder="E-mail" autoComplete="off" />
                            <button>S'abonner</button>
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
            <div className="box">
                <div className="top">
                    <img src='${process.env.REACT_APP_API_URL}/uploads/Multi-Banner-4.jpg' alt='' />
                </div>
            </div>
        </div>
    </div>
    <div id="new-product" className="product_type">
        <div className="container">
            <div className="box">
                <div className="header">
                    <h2>Nouveaux Produits</h2>
                </div>
                {Array.isArray(newProduct) && newProduct.map((curElm) => (
                    <div key={curElm.id} className="productbox">
                        <div className="img-box">
                            <img src={renderProductImage(curElm.image)} alt={curElm.name || 'New Product'} />
                        </div>
                        <div className="detail">
                            <h3>{curElm.name}</h3>
                            <p>{curElm.price} Mad</p>
                            <div className="icon">
                                <button onClick={() => detailpage(curElm)}><AiFillEye /></button>
                                <button onClick={() => handleLike(curElm.id)}><AiFillHeart /></button>
                                <button onClick={() => addtocart(curElm)}><AiOutlineShoppingCart /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div id="featured-product" className="box">
                <div className="header">
                    <h2>Produits Spéciaux</h2>
                </div>
                {Array.isArray(featuredProduct) && featuredProduct.map((curElm) => (
                    <div key={curElm.id} className="productbox">
                        <div className="img-box">
                            <img src={renderProductImage(curElm.image)} alt={curElm.name || 'Featured Product'} />
                        </div>
                        <div className="detail">
                            <h3>{curElm.name}</h3>
                            <p>{curElm.price} Mad</p>
                            <div className="icon">
                                <button onClick={() => detailpage(curElm)}><AiFillEye /></button>
                                <button onClick={() => handleLike(curElm.id)}><AiFillHeart /></button>
                                <button onClick={() => addtocart(curElm)}><AiOutlineShoppingCart /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div id="top-product" className="box">
                <div className="header">
                    <h2>Meilleurs Produits</h2>
                </div>
                {Array.isArray(topProduct) && topProduct.map((curElm) => (
                    <div key={curElm.id} className="productbox">
                        <div className="img-box">
                            <img src={renderProductImage(curElm.image)} alt={curElm.name || 'Top Product'} />
                        </div>
                        <div className="detail">
                            <h3>{curElm.name}</h3>
                            <p>{curElm.price} Mad</p>
                            <div className="icon">
                                <button onClick={() => detailpage(curElm)}><AiFillEye /></button>
                                <button onClick={() => handleLike(curElm.id)}><AiFillHeart /></button>
                                <button onClick={() => addtocart(curElm)}><AiOutlineShoppingCart /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
</div>
        </>
    );
};

export default Home;*/
