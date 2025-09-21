// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaEnvelope, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';

function Navbar({ cartItems, isLoggedIn, handleLogout }) {
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm mb-4"
      style={{
        backgroundColor: '#f2f2f2',
        minHeight: '90px',
        borderBottom: '1px solid #ccc',
      }}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold fs-3 text-primary">
          🍽️ FoodCart App
        </Link>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <Link to="/" className="nav-link text-primary fw-semibold fs-5 d-flex align-items-center">
                <FaHome className="me-2" />
                Home
              </Link>
            </li>

            <li className="nav-item position-relative">
              <Link to="/cart" className="btn btn-outline-primary d-flex align-items-center">
                <FaShoppingCart className="me-2" />
                Cart
              </Link>
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '0.75rem' }}
                >
                  {cartCount}
                </span>
              )}
            </li>

            <li className="nav-item">
              <Link to="/contact" className="nav-link text-primary fw-semibold fs-5 d-flex align-items-center">
                <FaEnvelope className="me-2" />
                Contact
              </Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/register" className="nav-link text-primary fw-semibold fs-5 d-flex align-items-center">
                    <FaUserPlus className="me-2" />
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link text-primary fw-semibold fs-5 d-flex align-items-center">
                    <FaSignInAlt className="me-2" />
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger d-flex align-items-center"
                >
                  <FaSignOutAlt className="me-2" />
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
