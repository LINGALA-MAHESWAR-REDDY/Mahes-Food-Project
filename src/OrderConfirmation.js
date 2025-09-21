//orderconfirmation.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderConfirmation({ cartItems, clearCart }) {
  const navigate = useNavigate();
  const [confirmedOrder, setConfirmedOrder] = useState(() => {
    const saved = localStorage.getItem('lastConfirmedOrder');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (cartItems.length > 0) {
      const totalCost = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const newOrder = {
        id: Date.now(),
        items: cartItems,
        total: totalCost,
        date: new Date().toLocaleString(),
      };

      const previousOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
      localStorage.setItem('orderHistory', JSON.stringify([newOrder, ...previousOrders]));
      localStorage.setItem('lastConfirmedOrder', JSON.stringify(newOrder));

      setConfirmedOrder(newOrder);
      clearCart();
    }
  }, [cartItems, clearCart]);

  const downloadInvoice = () => {
    if (!confirmedOrder) return;

    const lines = [
      '🧾 FoodCart Invoice',
      `Order ID: ${confirmedOrder.id}`,
      `Date: ${confirmedOrder.date}`,
      '',
      ...confirmedOrder.items.map(
        (item) => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
      ),
      '',
      `Total: ₹${confirmedOrder.total}`,
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `invoice_${confirmedOrder.id}.txt`;
    link.click();
  };

  const clearConfirmation = () => {
    localStorage.removeItem('lastConfirmedOrder');
    setConfirmedOrder(null);
  };

  return (
    <div className="mt-5 mb-5 text-center">
      <h4 className="text-success mb-4">✅ Order Confirmed!</h4>
      <p className="text-muted">Thank you for your order. Here's what you ordered:</p>

      {confirmedOrder ? (
        <>
          <div className="d-flex justify-content-center">
            <div className="table-responsive" style={{ maxWidth: '700px' }}>
              <table className="table table-bordered table-striped mt-4">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price (₹)</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {confirmedOrder.items.map((item) => (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="3" className="fw-bold text-end">Grand Total</td>
                    <td className="fw-bold">₹{confirmedOrder.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
            <button className="btn btn-outline-primary" onClick={() => navigate('/order-history')}>
              📜 View Order History
            </button>
            <button className="btn btn-outline-success" onClick={downloadInvoice}>
              ⬇️ Download Invoice
            </button>
            <button className="btn btn-outline-warning" onClick={() => navigate('/track-order')}>
              🚚 Track Order
            </button>
            <button className="btn btn-outline-danger" onClick={clearConfirmation}>
              ❌ Clear Confirmation
            </button>
          </div>
        </>
      ) : (
        <p className="text-muted mt-4">No invoice available. No order was confirmed.</p>
      )}
    </div>
  );
}

export default OrderConfirmation;
