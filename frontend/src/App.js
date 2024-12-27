import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import UserProfile from './components/UserProfile';
import ArtisanProfile from './components/ArtisanProfile';


import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
           <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/login" element={<UserLogin />} />
           <Route path="/cart" element={<ShoppingCart />} />
           <Route path="/checkout" element={<Checkout />} />
           <Route path="/profile" element={<UserProfile />} />
           <Route path="/artisans/:id" element={<ArtisanProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
