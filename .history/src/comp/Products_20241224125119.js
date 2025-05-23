import React, { useState, useEffect } from 'react';
import './admin.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', category: '', type: 'featured', price: '', details: '' });
    const [editProduct, setEditProduct] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchProducts();
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
        formData.append('category', newProduct.category);
        formData.append('type', newProduct.type);
        formData.append('price', newProduct.price);
        formData.append('details', newProduct.details); // Ajout du champ details
        formData.append('image', selectedFile);

        try {
            const response = await fetch('${process.env.REACT_APP_API_URL}/api/products', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                fetchProducts();
                setNewProduct({ name: '', category: '', type: 'featured', price: '', details: '' });
                setSelectedFile(null);
                alert('Product added successfully!', 'alert-success');
            } else {
                alert('Failed to add product.', 'alert-danger');
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
        formData.append('category', editProduct.category);
        formData.append('type', editProduct.type);
        formData.append('price', editProduct.price);
        formData.append('details', editProduct.details); // Ajout du champ details
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
                alert('Product updated successfully!', 'alert-success');
            } else {
                alert('Failed to update product.', 'alert-danger');
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
                alert('Product deleted successfully!', 'alert-success');
            } else {
                alert('Failed to delete product.', 'alert-danger');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    return (
        <div className="products">
            <h2 className="products-header">Products</h2>
            <form onSubmit={editProduct ? handleUpdateProduct : handleAddProduct}>
                <input type="text" name="name" placeholder="Name" value={editProduct ? editProduct.name : newProduct.name} onChange={handleChange} required />
                <input type="text" name="category" placeholder="Category" value={editProduct ? editProduct.category : newProduct.category} onChange={handleChange} required />
                <select name="type" value={editProduct ? editProduct.type : newProduct.type} onChange={handleChange} required>
                    <option value="featured">Featured</option>
                    <option value="new">New</option>
                    <option value="top">Top</option>
                </select>
                <input type="number" name="price" placeholder="Price" value={editProduct ? editProduct.price : newProduct.price} onChange={handleChange} required />
                <textarea name="details" placeholder="Details" value={editProduct ? editProduct.details : newProduct.details} onChange={handleChange} required></textarea> {/* Champ pour les détails du produit */}
                <input type="file" name="image" onChange={handleFileChange} required={editProduct ? false : true} />
                <button type="submit">{editProduct ? 'Update Product' : 'Add Product'}</button>
            </form>
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td><img src={`${process.env.REACT_APP_API_URL}${product.image}`} alt={product.name} className="product-image" /></td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.type}</td>
                            <td>${product.price}</td>
                            <td>
                                <button onClick={() => handleEditProduct(product)} className="edit-button">Edit</button>
                                <button onClick={() => handleDeleteProduct(product.id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </table>

            {editProduct && (
                <form onSubmit={handleUpdateProduct} className="edit-form">
                    <h3>Edit Product</h3>
                    <input
                        type="text"
                        name="name"
                        value={editProduct.name}
                        onChange={e => setEditProduct({ ...editProduct, name: e.target.value })}
                    />
                    <input
                        type="text"
                        name="category"
                        value={editProduct.category}
                        onChange={e => setEditProduct({ ...editProduct, category: e.target.value })}
                    />
                    <select
                        name="type"
                        value={editProduct.type}
                        onChange={e => setEditProduct({ ...editProduct, type: e.target.value })}
                    >
                        <option value="featured">Featured</option>
                        <option value="new">New</option>
                        <option value="top">Top</option>
                    </select>
                    <input
                        type="number"
                        name="price"
                        value={editProduct.price}
                        onChange={e => setEditProduct({ ...editProduct, price: e.target.value })}
                    />
                    <textarea
                        name="details"
                        value={editProduct.details}
                        onChange={e => setEditProduct({ ...editProduct, details: e.target.value })}
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                    />
                    <button type="submit" className="update-button">Update</button>
                    <button type="button" onClick={() => setEditProduct(null)} className="cancel-button">Cancel</button>
                </form>
            )}
        </div>
    );
};

export default Products;
