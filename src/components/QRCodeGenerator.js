// src/components/QRCodeGenerator.js
import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = ({ restaurantName, menuItems }) => {
  const [qrCodeURL, setQRCodeURL] = useState('');

  const generateQRCode = () => {
    // Create a dynamic URL that includes the restaurant name (or ID)
   // Example of QR Code URL for local testing
const qrValue = `http://192.168.x.x:3000/menu/${restaurantName}`;
    setQRCodeURL(qrValue);
  };

  const downloadQR = () => {
    const canvas = document.getElementById('qrCode');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${restaurantName}_qrcode.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="max-w-md mx-auto mt-6 text-center">
      <button
        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        onClick={generateQRCode}
      >
        Generate QR Code
      </button>

      {qrCodeURL && (
        <div className="mt-4">
          <QRCodeCanvas id="qrCode" value={qrCodeURL} size={200} />
          <div className="mt-2">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={downloadQR}
            >
              Download QR Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;


// src/components/QRCodeGenerator.js


// import React from 'react';


// import { QRCodeCanvas } from 'qrcode.react';

// const QRCodeGenerator = ({ menuURL }) => {
//   return (
//     <div className="max-w-md mx-auto mt-6 text-center">
//       <h2 className="text-lg font-semibold mb-2">QR Code for Menu</h2>
//       <QRCodeCanvas value={menuURL} size={200} />
//       <p className="mt-2">Scan the QR code to view the menu</p>
//     </div>
//   );
// };

// export default QRCodeGenerator;
