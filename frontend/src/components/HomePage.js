import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Digital Marketplace</h1>
      <p>Explore unique handcrafted goods from local artisans.</p>
      <Link to="/products">View Products</Link>
       <br />
      <Link to="/register">Register</Link>
      <br />
       <Link to="/login">Login</Link>
    </div>
  );
}

export default HomePage;
