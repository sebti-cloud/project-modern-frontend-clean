import React, { useState, useEffect } from 'react';
import UploadProfilePhoto from './UploadProfilePhoto';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('${process.env.REACT_APP_API_URL}/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name}</h1>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Address: {user.address}</p>
          {user.photo && <img src={`${process.env.REACT_APP_API_URL}${user.photo}`} alt="Profile" />}
          <UploadProfilePhoto />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
