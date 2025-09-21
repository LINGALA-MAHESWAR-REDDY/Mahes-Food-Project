//trackorder.js
import React, { useEffect, useState } from 'react';

function TrackOrder() {
  const [status, setStatus] = useState('Preparing');

  useEffect(() => {
    const stages = ['Preparing', 'Cooking', 'Out for Delivery', 'Delivered'];
    let index = 0;

    const interval = setInterval(() => {
      index++;
      if (index < stages.length) {
        setStatus(stages[index]);
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-5 mb-5 text-center">
      <h4 className="text-primary mb-4">🚚 Track Your Order</h4>
      <div className="card mx-auto shadow-sm p-4" style={{ maxWidth: '400px' }}>
        <h5 className="mb-3">Current Status:</h5>
        <span className="badge bg-info fs-5">{status}</span>
      </div>
    </div>
  );
}

export default TrackOrder;
