/*import React, { useState, useEffect } from 'react';
import './shop.css';
import { AiFillEye, AiFillHeart, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";

const Shop = ({ addtocart, searchResults }) => { // Ajout de searchResults en tant que prop
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

    useEffect(() => {
        if (searchResults && searchResults.length > 0) {
            setShop(searchResults);
        }
    }, [searchResults]);

    const fetchProducts = async (category = '') => {
        try {
          let url = '${process.env.REACT_APP_API_URL}/api/products';
          if (category) {
            url += `?category=${category}`;
          }
          const response = await fetch(url);
          const data = await response.json();
          setShop(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error('Error fetching products:', error);
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
                            <p>{detail.details}</p>
                            <h3>{detail.price} Mad</h3>
                            <button onClick={() => addtocart(detail)}>Ajouter au panier</button>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className='shop'>
                {showLikedMessage && <div className="liked-message">{likedMessage}</div>}
                <h2>Boutique</h2>
                <div className='container'>
                    <div className='left_box'>
                        <div className='category'>
                            <div className='header'>
                                <h3>All categories</h3>
                            </div>
                            <div className='box'>
                                <ul>
                                    <li onClick={() => allcatfilter()}># Toutes</li>
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
                            <h2>Boutique des produits</h2>
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
                                            <p>{curElm.price} Mad</p>
                                            <button onClick={() => addtocart(curElm)}>Ajouter au panier</button>
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
*/
import React, { useState, useEffect } from 'react';
import './shop.css';
import { AiFillEye, AiFillHeart, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";

const Shop = ({ addtocart, searchResults }) => {
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

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setShop(searchResults);
    }
  }, [searchResults]);

  const fetchProducts = async (category = '') => {
    try {
      let url = '${process.env.REACT_APP_API_URL}/api/products';
      if (category) {
        url += `?category=${category}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setShop(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
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
      const token = localStorage.getItem('token'); // Assurez-vous que le token est récupéré correctement
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchProducts(); // Mettre à jour la liste des produits après avoir aimé
        setLikedMessage('Produit aimé!');
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
              <h4># {detail.cat}</h4>
              <h2>{detail.name}</h2>
              <p>{detail.details}</p>
              <h3>{detail.price} Mad</h3>
              <button onClick={() => addtocart(detail)}>Ajouter au panier</button>
            </div>
          </div>
        </div>
      ) : null}

      <div className='shop'>
        {showLikedMessage && <div className="liked-message">{likedMessage}</div>}
        <h2>Boutique</h2>
        <div className='container'>
          <div className='left_box'>
            <div className='category'>
              <div className='header'>
                <h3>All categories</h3>
              </div>
              <div className='box'>
                <ul>
                  <li onClick={() => allcatfilter()}># Toutes</li>
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
              <h2>Boutique des produits</h2>
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
                      <p>{curElm.price} Mad</p>
                      <button onClick={() => addtocart(curElm)}>Ajouter au panier</button>
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
