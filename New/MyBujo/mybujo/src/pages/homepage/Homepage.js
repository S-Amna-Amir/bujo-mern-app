import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import './homepage.css';

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
    <div className='mainbody'>
        <h1>Welcome, {userEmail}!</h1>
        <p className='loadbearing'>Welcome to your home page! What would you like to do today?</p>
        <button className='navbutton' onClick={() => navigate('/profile')}>
          Edit Profile
        </button>
        <button className='navbutton' onClick={() => navigate('/physical-health')}>
          Physical Health
        </button>
        <button  className='navbutton'onClick={() => navigate('/search-filter')}>
          Search and filter
        </button>
        <div className='spookshome'>
          <img src={`${process.env.PUBLIC_URL}/spooksresize.png`}/>
        </div>

    </div>
  );
};

export default Home;
