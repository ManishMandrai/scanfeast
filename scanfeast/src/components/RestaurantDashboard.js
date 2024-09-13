// src/components/RestaurantDashboard.js
import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

function RestaurantDashboard() {
  const [restaurantName, setRestaurantName] = useState('');
  const [menuItems, setMenuItems] = useState([{ name: '' }]);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleMenuItemChange = (index, value) => {
    const newItems = [...menuItems];
    newItems[index].name = value;
    setMenuItems(newItems);
  };

  const handleAddMenuItem = () => {
    setMenuItems([...menuItems, { name: '' }]);
  };

  const handleGenerateQRCode = () => {
    const tableNumber = 1; // Example table number
    const vercelUrl = "https://your-project-name.vercel.app"; // Replace with your Vercel URL
    const url = `${vercelUrl}/order?table=${tableNumber}`;
    setQrCodeUrl(url);
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">ScanFeast</h1>
        <img
          src="/logo.png" // Place your logo file in the public folder
          alt="ScanFeast Logo"
          className="mx-auto mb-6"
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Add Your Menu</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerateQRCode();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-lg font-medium mb-2">Restaurant Name</label>
            <input
              type="text"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Menu Items</label>
            {menuItems.map((item, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) => handleMenuItemChange(index, e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddMenuItem}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Menu Item
            </button>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Generate QR Code
          </button>
          {qrCodeUrl && (
            <div className="mt-6 text-center">
              <QRCodeSVG value={qrCodeUrl} />
              <p className="mt-2">Scan this QR code to view the menu</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default RestaurantDashboard;
