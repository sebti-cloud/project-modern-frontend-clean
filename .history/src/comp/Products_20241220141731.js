import React, { useState, useEffect } from 'react';
import './admin.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', type: '', price: '' });
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
                <input type="text" name="type" placeholder="Type" value={editProduct ? editProduct.type : newProduct.type} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" value={editProduct ? editProduct.price : newProduct.price} onChange={handleChange} required />
                <input type="file" name="image" onChange={handleFileChange} required={editProduct ? false : true} />
                <button type="submit">{editProduct ? 'Update Product' : 'Add Product'}</button>
            </form>
            <div className="product-grid">
                {products.map(product => (
                    <div className="product-box" key={product.id}>
                        <img src={`${process.env.REACT_APP_API_URL}${product.image}`} alt={product.name} />
                        <div className="product-info">
                            <div className="product-name">{product.name}</div>
                            <div className="product-price">${product.price}</div>
                            <button className="edit" onClick={() => handleEditProduct(product)}>Edit</button>
                            <button className="delete" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
