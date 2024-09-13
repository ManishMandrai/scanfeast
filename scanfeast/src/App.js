// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantDashboard from './components/RestaurantDashboard';
import CustomerOrder from './components/CustomerOrder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RestaurantDashboard />} />
        <Route path="/order" element={<CustomerOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
