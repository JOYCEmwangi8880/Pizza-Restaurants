// App.jsx

import { useState, useEffect } from 'react';
import RestaurantList from './Components/RestaurantList';
import RestaurantDetails from './Components/RestaurantDetails';
import './App.css';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    // Fetching the list of restaurants from the backend API
    fetch('http://127.0.0.1:5000/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  const handleViewRestaurant = (restaurantId) => {
    // Fetch restaurant details when the user clicks "View"
    fetch(`http://127.0.0.1:5000/restaurants/${restaurantId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Restaurant not found');
        }
      })
      .then(data => setSelectedRestaurant(data))
      .catch(error => console.error('Error fetching restaurant details:', error));
  };

  return (
    <div>
      <h1>Pizza-Restaurant</h1>
      <p className="msg">
        Welcome to the restaurant of your choice !!!
      </p>

      {/* RestaurantList component */}
      <div className="restaurant-list">
        <RestaurantList
          restaurants={restaurants}
          onViewRestaurant={handleViewRestaurant}
        />
      </div>

      {/* RestaurantDetails component */}
      {selectedRestaurant && (
        <div className="restaurant-details">
          <RestaurantDetails
            restaurant={selectedRestaurant}
            onBack={() => setSelectedRestaurant(null)}
          />
        </div>
      )}
    </div>
  );
}

export default App;