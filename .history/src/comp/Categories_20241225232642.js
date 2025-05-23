import React, { useState, useEffect } from 'react';
import './admin.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('${process.env.REACT_APP_API_URL}/api/categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('${process.env.REACT_APP_API_URL}/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCategory }),
            });
            if (response.ok) {
                fetchCategories();
                setNewCategory('');
                alert('Category added successfully!');
            } else {
                alert('Failed to add category.');
            }
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/categories/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchCategories();
                alert('Category deleted successfully!');
            } else {
                alert('Failed to delete category.');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="categories">
            <h2 className="categories-header">Categories</h2>
            <form onSubmit={handleAddCategory}>
                <input type="text" name="category" placeholder="Nom de la catégorie" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} required />
                <button type="submit">Ajouter une catégorie</button>
            </form>
            <table className="categories-table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>
                                <button onClick={() => handleDeleteCategory(category.id)} className="delete-button">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Categories;
