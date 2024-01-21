import React, { useState, useEffect } from 'react';

const RestaurantDetails = ({ restaurant, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []); // Add an empty dependency array to ensure it runs only once on component mount

  const handleDelete = (restaurantId) => {
    setLoading(true);

    fetch(`http://127.0.0.1:5000/restaurants/${restaurantId}`, {
      method: 'DELETE',
    })
      .then(response => {
        setLoading(false);

        if (response.ok) {
          return fetch('http://127.0.0.1:5000/restaurants');
        } else {
          console.error(`Error deleting restaurant. Server returned ${response.status} ${response.statusText}`);
          throw new Error('Delete request failed');
        }
      })
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error fetching restaurants after deletion:', error));
  };

  const handlePatch = () => {
    // Implement your update logic here
    // Make a PATCH request to update the restaurant details
  };

  const addRestaurant = (formData) => {
    setLoading(true);

    fetch('http://127.0.0.1:5000/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        setLoading(false);

        if (response.ok) {
          return fetch('http://127.0.0.1:5000/restaurants');
        } else {
          console.error(`Error creating restaurant. Server returned ${response.status} ${response.statusText}`);
          throw new Error('Create request failed');
        }
      })
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error fetching restaurants after creation:', error));
  };

  return (
    <div className="restaurant-details">
      <h2>Restaurant Details</h2>
      <p className="restaurant-name">Name: {restaurant.name}</p>
      <p className="restaurant-address">Address: {restaurant.address}</p>

      <button onClick={() => handleDelete(restaurant.id)} disabled={loading} className="delete-button">
        {loading ? 'Deleting...' : 'Delete'}
      </button>

      <button onClick={handlePatch} disabled={loading} className="update-button">
        {loading ? 'Updating...' : 'Update'}
      </button>

      <button onClick={() => addRestaurant({ /* provide your form data here */ })} disabled={loading} className="add-rest">
        {loading ? 'Adding...' : 'Add Restaurant'}
      </button>

      <button onClick={onBack} className="back-button">Back to List</button>
    </div>
  );
};

export default RestaurantDetails;
