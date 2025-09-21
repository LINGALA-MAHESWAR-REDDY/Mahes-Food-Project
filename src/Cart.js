import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, updateQuantity, removeItem }) {
  const navigate = useNavigate();
  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
    >
      <div className="card shadow-lg p-4" style={{ width: '90%', maxWidth: '1000px' }}>
        <h4 className="mb-4 text-center">🛒 Your Cart</h4>

        {cartItems.length === 0 ? (
          <p className="text-muted text-center">Your cart is empty.</p>
        ) : (
          <table className="table table-bordered table-striped text-center align-middle" style={{ width: '100%' }}>
            <thead style={{ backgroundColor: '#f0f4f8' }}>
              <tr>
                <th>Item</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(item.name, -1)}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(item.name, 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>₹{item.price * item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeItem(item.name)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan="3" className="text-center fw-bold">
                  Total Price
                </td>
                <td className="fw-bold">₹{totalCost}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        )}

        <div className="text-center mt-4">
          {cartItems.length > 0 && (
            <button className="btn btn-success me-3" onClick={() => navigate('/order-confirmation')}>
              🧾 Place Order
            </button>
          )}
          <button className="btn btn-outline-primary" onClick={() => navigate('/')}>
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
