import React, { useState, useEffect } from 'react';
import './admin.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchOrders();
        fetchProducts();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('${process.env.REACT_APP_API_URL}/api/orders');
            const data = await response.json();
            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('${process.env.REACT_APP_API_URL}/api/products');
            const data = await response.json();
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleValidateOrder = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${id}/validate`, {
                method: 'PUT',
            });
            if (response.ok) {
                fetchOrders();
                alert('Order validated successfully!', 'alert-success');
            } else {
                alert('Failed to validate order.', 'alert-danger');
            }
        } catch (error) {
            console.error('Error validating order:', error);
        }
    };

    const handleDeleteOrder = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchOrders();
                alert('Commande supprimée avec succès!', 'alert-danger');
            } else {
                const errorData = await response.json();
                alert(`Échec de la suppression de la commande: ${errorData.message}`, 'alert-danger');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de la commande:', error);
            alert(`Erreur lors de la suppression de la commande: ${error.message}`, 'alert-danger');
        }
    };

    const getProductDetails = (productId) => {
        return products.find(product => product.id === productId);
    };

    return (
        <div className="orders">
            <h2 className="orders-header">Commande</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom du client</th>
                        <th>Téléphone</th>
                        <th>Produits</th>
                        <th>Prix Total</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.user_name} {order.user_surname}</td>
                            <td>{order.user_phone}</td>
                            <td>
                                {order.products && order.products.map(product => {
                                    const productDetails = getProductDetails(product.id);
                                    return productDetails ? (
                                        <div key={product.id}>
                                            <img src={`${process.env.REACT_APP_API_URL}${productDetails.image}`} alt={productDetails.name} width="50" />
                                            {productDetails.name} x {product.qty}
                                        </div>
                                    ) : null;
                                })}
                            </td>
                            <td>{order.total_price} Mad</td>
                            <td>{new Date(order.created_at).toLocaleString()}</td>
                            <td>{order.status === 'validated' ? 'Validée' : 'En attente'}</td>
                            <td>
                                <button className="validate" onClick={() => handleValidateOrder(order.id)}>Valider</button>
                                <button className="delete" onClick={() => handleDeleteOrder(order.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
