//App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Cart from './Cart';
import Contact from './Contact';
import Footer from './Footer';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import RestaurantDetail from './RestaurantDetail';
import OrderConfirmation from './OrderConfirmation';
import OrderHistory from './OrderHistory';
import TrackOrder from './TrackOrder';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      return existing
        ? prev.map((i) =>
            i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (name, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (name) => {
    setCartItems((prev) => prev.filter((item) => item.name !== name));
  };

  const clearCart = () => setCartItems([]);

  const reorderItems = (items) => {
    setCartItems(items.map(item => ({ ...item })));
  };

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <Navbar
        cartItems={cartItems}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Cart
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/restaurant/:id"
            element={
              <RestaurantDetail
                addToCart={addToCart}
                cartItems={cartItems}
              />
            }
          />
          <Route
            path="/order-confirmation"
            element={
              <OrderConfirmation cartItems={cartItems} clearCart={clearCart} />
            }
          />
          <Route
            path="/order-history"
            element={<OrderHistory reorderItems={reorderItems} />}
          />
          <Route path="/track-order" element={<TrackOrder />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
