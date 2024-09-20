// src/components/RestaurantForm.js
import React, { useState } from 'react';
// import QRCode from 'qrcode.react';
import { QRCodeSVG } from 'qrcode.react';

const RestaurantForm = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [menuItems, setMenuItems] = useState([{ name: '', price: '' }]);
  const [qrCode, setQRCode] = useState('');

  const handleChange = (index, event) => {
    const newItems = [...menuItems];
    newItems[index][event.target.name] = event.target.value;
    setMenuItems(newItems);
  };

  const addMenuItem = () => {
    setMenuItems([...menuItems, { name: '', price: '' }]);
  };

  const handleGenerateQR = () => {
    const localIP = '192.168.x.x'; // Replace with your local IP address
    const menuURL = `http://${localIP}:3000/menu/${restaurantName}`;
    setQRCode(menuURL);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., POST request to backend)
    handleGenerateQR();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-3xl font-bold mb-6">Restaurant Management</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="restaurantName">
            Restaurant Name
          </label>
          <input
            id="restaurantName"
            type="text"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
          />
        </div>

        {menuItems.map((item, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`itemName-${index}`}>
              Menu Item Name
            </label>
            <input
              id={`itemName-${index}`}
              type="text"
              name="name"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={item.name}
              onChange={(e) => handleChange(index, e)}
              required
            />
            <label className="block text-gray-700 text-sm font-bold mt-2" htmlFor={`itemPrice-${index}`}>
              Price
            </label>
            <input
              id={`itemPrice-${index}`}
              type="number"
              name="price"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={item.price}
              onChange={(e) => handleChange(index, e)}
              required
            />
          </div>
        ))}

        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600"
          onClick={addMenuItem}
        >
          Add Menu Item
        </button>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 mt-4"
        >
          Generate QR Code
        </button>
      </form>

      {qrCode && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold mb-2">QR Code for Menu</h2>
          <QRCodeSVG value={qrCode} size={200} />

          <p className="mt-2">Scan the QR code to view the menu</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantForm;
