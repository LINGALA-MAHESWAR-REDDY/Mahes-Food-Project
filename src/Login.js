// Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
    } else {
      setError('');
      onLogin();
      navigate('/');
    }
  };

  return (
    <div className="mt-5 mb-5 d-flex justify-content-center">
      <div
        className="card shadow-lg p-4 text-start"
        style={{ width: '40%', backgroundColor: '#f0f4f8' }}
      >
        <h4 className="mb-4 text-primary text-center">🔐 Login</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          {error && <small className="text-danger">{error}</small>}
          <div className="text-center mt-3">
            <button type="submit" className="btn btn-primary px-4">Login</button>
          </div>
        </form>

        <div className="text-center mt-3">
          <p className="text-muted">
            New user?{' '}
            <Link to="/register" className="text-primary fw-semibold">Please register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;