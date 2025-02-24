import React, { useState, useEffect } from "react";
import './home.css';
import { Link } from "react-router-dom";
import { AiFillEye, AiFillHeart, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram, BiLogoYoutube } from "react-icons/bi";

const Home = ({ shop, fetchProducts, addtocart, searchproduct }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState([]);
  const [likedMessage, setLikedMessage] = useState('');
  const [showLikedMessage, setShowLikedMessage] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const detailpage = (product) => {
    setDetail(product);
    setShowDetail(true);
  };

  const closeDetail = () => {
    setShowDetail(false);
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

  const placeholderImage = "/uploads/placeholder.jpg";
  const renderProductImage = (imagePath) => {
    return imagePath && imagePath.trim() !== "" ? `${process.env.REACT_APP_API_URL}${imagePath}` : placeholderImage;
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
              <h3>{detail.price} Mad</h3>
              <button onClick={() => addtocart(detail)}>Ajouter au panier</button>
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
            <p>30% de réduction sur votre première commande</p>
            <Link to='/shop' className="link">Achetez maintenant</Link>
          </div>
        </div>
        <div id="trending-product" className="trending">
          <div className="container">
            <div className='left_box'>
              <div className="header">
                <div className="heading">
                  <h2>Produits tendance</h2>
                </div>
                <div className="cate">
                  <h3 onClick={() => fetchProducts('new')}>Nouveaux</h3>
                  <h3 onClick={() => fetchProducts('featured')}>Spéciaux</h3>
                  <h3 onClick={() => fetchProducts('top')}>Top Selling</h3>
                </div>
              </div>
              <div className="products">
                <div className="container">
                  {
                    shop.map((curElm) => {
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
                            <p>{curElm.price} Mad</p>
                            <button className='btn' onClick={() => addtocart(curElm)}>Ajouter au panier</button>
                          </div>
                        </div>
                      );
                    })
                  }
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
                    <h3>bulletin</h3>
                  </div>
                  <div className="form">
                    <p>rejoignez notre liste de diffusion</p>
                    <input type="email" placeholder="E-mail" autoComplete="off"></input>
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
                <h2>Nouveaux Produits</h2>
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
                        <p>{curElm.price} Mad</p>
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
                <h2>Produits Spéciaux</h2>
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
                        <p>{curElm.price} Mad</p>
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
                <h2>Meilleurs Produits</h2>
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
                        <p>{curElm.price} Mad</p>
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
