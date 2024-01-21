// components/RestaurantList.jsx

import React from 'react';

const RestaurantList = ({ restaurants, onViewRestaurant }) => {
  return (
    <div className="restaurant-list">
      <h2>Restaurant List</h2>
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant.id} className="restaurant-item">
            {restaurant.name}
            <button
              className="view-button"
              onClick={() => onViewRestaurant(restaurant.id)}
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default RestaurantList;
