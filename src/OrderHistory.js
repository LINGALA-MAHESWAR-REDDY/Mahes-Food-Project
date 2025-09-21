//orderhitory.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderHistory({ reorderItems }) {
  const navigate = useNavigate();
  const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];

  return (
    <div className="container mt-5 mb-5 text-center">
      <h4 className="text-primary mb-4">📜 Your Order History</h4>

      {orders.length === 0 ? (
        <p className="text-muted">No past orders found.</p>
      ) : (
        <div className="d-flex flex-column align-items-center gap-4">
          {orders.map((order) => (
            <div key={order.id} className="card mb-4 shadow-sm w-50">
              <div className="card-header d-flex justify-content-between">
                <span>🧾 Order ID: {order.id}</span>
                <span>{order.date}</span>
              </div>
              <div className="card-body">
                <table className="table table-sm table-bordered mb-3">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price (₹)</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>₹{item.price * item.quantity}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="3" className="fw-bold text-end">Total</td>
                      <td className="fw-bold">₹{order.total}</td>
                    </tr>
                  </tbody>
                </table>
                <button
                  className="btn btn-outline-success"
                  onClick={() => {
                    reorderItems(order.items);
                    navigate('/cart');
                  }}
                >
                  🔁 Reorder
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
