import React, { useState, useEffect } from 'react';
import './admin.css';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', type: '', price: '' });
    const [editProduct, setEditProduct] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchOrders();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('${process.env.REACT_APP_API_URL}/api/products');
            const data = await response.json();
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch('${process.env.REACT_APP_API_URL}/api/orders');
            const data = await response.json();
            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleChange = (e) => {
        if (editProduct) {
            setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
        } else {
            setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('type', newProduct.type);
        formData.append('price', newProduct.price);
        formData.append('image', selectedFile);

        try {
            const response = await fetch('${process.env.REACT_APP_API_URL}/api/products', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                fetchProducts();
                setNewProduct({ name: '', type: '', price: '' });
                setSelectedFile(null);
                alert('Product added successfully!');
            } else {
                alert('Failed to add product.');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleEditProduct = (product) => {
        setEditProduct(product);
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', editProduct.name);
        formData.append('type', editProduct.type);
        formData.append('price', editProduct.price);
        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${editProduct.id}`, {
                method: 'PUT',
                body: formData,
            });
            if (response.ok) {
                fetchProducts();
                setEditProduct(null);
                setSelectedFile(null);
                alert('Product updated successfully!');
            } else {
                alert('Failed to update product.');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchProducts();
                alert('Product deleted successfully!');
            } else {
                alert('Failed to delete product.');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="admin">
            <h1>Admin Dashboard</h1>
            <section className="products">
                <h2>Products</h2>
                <form onSubmit={editProduct ? handleUpdateProduct : handleAddProduct}>
                    <input type="text" name="name" placeholder="Name" value={editProduct ? editProduct.name : newProduct.name} onChange={handleChange} required />
                    <input type="text" name="type" placeholder="Type" value={editProduct ? editProduct.type : newProduct.type} onChange={handleChange} required />
                    <input type="number" name="price" placeholder="Price" value={editProduct ? editProduct.price : newProduct.price} onChange={handleChange} required />
                    <input type="file" name="image" onChange={handleFileChange} required={editProduct ? false : true} />
                    <button type="submit">{editProduct ? 'Update Product' : 'Add Product'}</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.type}</td>
                                <td>${product.price}</td>
                                <td><img src={`${process.env.REACT_APP_API_URL}${product.image}`} alt={product.name} width="50" /></td>
                                <td>
                                    <button onClick={() => handleEditProduct(product)}>Edit</button>
                                    <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <section className="orders">
                <h2>Orders</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User Name</th>
                            <th>Phone</th>
                            <th>Product Name</th>
                            <th>Product Image</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.user_name} {order.user_surname}</td>
                                <td>{order.user_phone}</td>
                                <td>{order.product_name}</td>
                                <td><img src={`${process.env.REACT_APP_API_URL}${order.product_image}`} alt={order.product_name} width="50" /></td>
                                <td>{order.qty}</td>
                                <td>${order.total_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Admin;
