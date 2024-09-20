// src/components/CustomerMenu.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerMenu = ({ match }) => {
  const [menu, setMenu] = useState(null);
  const [tableNumber, setTableNumber] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/menu/${match.params.restaurantName}`);
        setMenu(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMenu();
  }, [match.params.restaurantName]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle order submission logic here (e.g., POST request to backend)
    console.log('Order submitted for table', tableNumber, 'with items', selectedItems);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tableNumber">
            Table Number
          </label>
          <input
            id="tableNumber"
            type="text"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            required
          />
        </div>

        {menu && (
          <div>
            {menu.items.map((item, index) => (
              <div key={index} className="mb-2">
                <input
                  type="checkbox"
                  id={`item-${index}`}
                  value={item.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedItems(prev =>
                      e.target.checked
                        ? [...prev, value]
                        : prev.filter(item => item !== value)
                    );
                  }}
                />
                <label htmlFor={`item-${index}`} className="ml-2">{item.name} - ${item.price}</label>
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 mt-4"
            >
              Submit Order
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CustomerMenu;
