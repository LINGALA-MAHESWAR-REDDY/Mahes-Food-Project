//restaurantdetail.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { restaurants } from './data';

function RestaurantDetail({ addToCart, cartItems }) {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === parseInt(id));
  const [filter, setFilter] = useState('All');

  if (!restaurant) return <p className="text-center mt-5">Restaurant not found.</p>;

  const filteredMenu = restaurant.menu.filter((item) => {
    if (filter === 'Veg') return item.name.toLowerCase().includes('veg') || item.name.toLowerCase().includes('paneer');
    if (filter === 'Under200') return item.price <= 200;
    if (filter === 'Popular') return item.price >= 250;
    return true;
  });

  const isInCart = (name) => cartItems.some((i) => i.name === name);

  return (
    <div className="mt-4">
      <h4 className="text-center text-primary mb-4">🍽️ {restaurant.name} Menu</h4>

      {/* Filter Buttons */}
      <div className="text-center mb-4">
        <button className={`btn btn-outline-primary mx-2 ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button>
        <button className={`btn btn-outline-success mx-2 ${filter === 'Veg' ? 'active' : ''}`} onClick={() => setFilter('Veg')}>Veg Only</button>
        <button className={`btn btn-outline-warning mx-2 ${filter === 'Under200' ? 'active' : ''}`} onClick={() => setFilter('Under200')}>Under ₹200</button>
        <button className={`btn btn-outline-danger mx-2 ${filter === 'Popular' ? 'active' : ''}`} onClick={() => setFilter('Popular')}>Most Popular</button>
      </div>

      <div className="row justify-content-center">
        {filteredMenu.length === 0 ? (
          <p className="text-muted text-center">No items match this filter.</p>
        ) : (
          filteredMenu.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm w-100">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '100%', height: '180px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                />
                <div className="card-body text-center">
                  <h5>{item.name}</h5>
                  <p className="text-muted">₹{item.price}</p>

                  {isInCart(item.name) ? (
                    <span className="badge bg-success px-3 py-2">✅ Added</span>
                  ) : (
                    <button className="btn btn-success" onClick={() => addToCart(item)}>
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RestaurantDetail;
