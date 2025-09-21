// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { restaurants } from './data';

function Home() {
  return (
    <div className="mt-4">
      <h4 className="text-center mb-4">🏨 Explore Restaurants</h4>
      <div className="row">
        {restaurants.map((restaurant) => (
          <div className="col-md-4 mb-4" key={restaurant.id}>
            <Link to={`/restaurant/${restaurant.id}`} className="text-decoration-none text-dark">
              <div className="card shadow-sm h-100 w-100">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                />
                <div className="card-body text-center">
                  <h5 className="text-primary">{restaurant.name}</h5>
                  <p className="text-muted">Click to view menu</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
