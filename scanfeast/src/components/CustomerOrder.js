// src/components/CustomerOrder.js
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function CustomerOrder() {
  const [searchParams] = useSearchParams();
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [tableNumber, setTableNumber] = useState("");

  useEffect(() => {
    // Get table number from URL parameters
    const table = searchParams.get('table');
    setTableNumber(table);

    // Fetch menu items from backend or mock data
    fetchMenuItems();
  }, []);

  const fetchMenuItems = () => {
    // Mock data. Replace this with an actual API call to fetch menu items
    const mockMenuItems = [
      { id: 1, name: 'Pizza', price: 10 },
      { id: 2, name: 'Burger', price: 8 },
      { id: 3, name: 'Pasta', price: 12 },
    ];
    setMenuItems(mockMenuItems);
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelected) => ({
      ...prevSelected,
      [itemId]: !prevSelected[itemId],
    }));
  };

  const handleSubmitOrder = () => {
    const selectedMenuItems = menuItems.filter((item) => selectedItems[item.id]);
    console.log('Order submitted for Table:', tableNumber, selectedMenuItems);

    // Here you would send the order to the backend
    alert(`Order placed successfully for Table ${tableNumber}!`);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4 text-center">Menu for Table {tableNumber}</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmitOrder(); }}>
          <div className="space-y-4">
            {menuItems.map((item) => (
              <div key={item.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`item-${item.id}`}
                  checked={selectedItems[item.id] || false}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="mr-2"
                />
                <label htmlFor={`item-${item.id}`} className="text-lg">
                  {item.name} - ${item.price}
                </label>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md mt-6 w-full"
          >
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default CustomerOrder;
