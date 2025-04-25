import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // 1️⃣ If no token, kick back to login
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    // 2️⃣ Decode and redirect admins away
    const { email, role } = jwtDecode(token);
    if (role === 'admin') return navigate('/dashboard');

    setUserEmail(email);
  }, [navigate]);

  return (
    <Container className="mt-5 text-center">
      <h1>Welcome, {userEmail}!</h1>
      <p>This is your home page.</p>
      <Button onClick={() => navigate('/profile')} className="m-2">
        Edit Profile
      </Button>
      {/* add more links or content here */}
    </Container>
  );
};

export default Home;
