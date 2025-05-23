import React, { useState, useEffect } from 'react';
import './admin.css';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            console.log('Fetching users...');
            const response = await fetch('${process.env.REACT_APP_API_URL}/api/users');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setUsers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <nav>
                <ul>
                    <li><a href="/admin">Dashboard</a></li>
                    <li><a href="/products">Produits</a></li>
                    <li><a href="/orders">Commandes</a></li>
                    <li><a href="/categories">Catégories</a></li>
                    <li><a href="/likedProducts">Produits aimés</a></li>
                    <li><a href="/contacts">Messages</a></li>
                    <li><a href="/admins">Administrateurs</a></li>
                    <li><a href="/admin-settings">Settings</a></li>
                    <li><a href="/admin-users">Utilisateurs</a></li>
                </ul>
            </nav>
            <div className="users">
                <h2 className="users-header">Utilisateurs</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Photo</th>

                            <th>Nom</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Adresse</th>
                            <th>Date de Création</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <img
                                        src={user.photo ? `${process.env.REACT_APP_API_URL}${user.photo}` : '/path/to/default-user.png'}
                                        alt={user.name}
                                        className="user-photo"
                                    />
                                </td>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.address}</td>
                                <td>{new Date(user.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
