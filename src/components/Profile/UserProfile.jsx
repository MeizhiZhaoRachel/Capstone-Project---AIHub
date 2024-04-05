import React, { useState, useEffect } from 'react';
import { useAuth } from './Sign/AuthContext'; 

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://yourbackend.com/api/user-profile', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching user's profile:", error);
        // Handle error - for example, redirect to sign-in page or show a message
      }
    };

    if (authToken) {
      fetchUserProfile();
    }
  }, [authToken]); // Dependency array ensures this effect runs when authToken changes

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Profile</h2>

      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>

    </div>
  );
};

export default UserProfile;