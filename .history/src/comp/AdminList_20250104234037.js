import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminList.css'; // Fichier CSS pour le style

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const roles = ['admin', 'admin_principale', 'moderateur']; // Liste des rôles disponibles

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('${process.env.REACT_APP_API_URL}/api/admins');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('${process.env.REACT_APP_API_URL}/api/admins', { name, email, username, role });
      fetchAdmins();
      setName('');
      setEmail('');
      setUsername('');
      setRole('');
      alert('Admin added successfully');
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/admins/${id}`);
      fetchAdmins();
      alert('Admin deleted successfully');
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, { role: newRole });
      fetchAdmins();
      alert('Admin role updated successfully');
    } catch (error) {
      console.error('Error updating admin role:', error);
    }
  };

  return (
    <div className="admin-list-container">
      <h2>Admin List</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
        <button type="submit" className="add-button">Add Admin</button>
      </form>
      <ul className="admin-list">
        {admins.map(admin => (
          <li key={admin.id} className="admin-item">
            <div className="admin-details">
              <span className="admin-name">{admin.name}</span>
              <span className="admin-email">{admin.email}</span>
              <span className="admin-username">{admin.username}</span>
              <span className="admin-role">
                <select value={admin.role} onChange={(e) => handleRoleChange(admin.id, e.target.value)}>
                  {roles.map(roleOption => (
                    <option key={roleOption} value={roleOption}>
                      {roleOption}
                    </option>
                  ))}
                </select>
              </span>
            </div>
            <button onClick={() => handleDelete(admin.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminList;
