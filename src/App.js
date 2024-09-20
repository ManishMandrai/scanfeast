// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantForm from './components/RestaurantForm';
import CustomerMenu from './components/CustomerMenu';

const App = () => {
  return (
    <Router>
  <Routes>
    <Route path="/" element={<RestaurantForm />} />
    <Route path="/menu/:restaurantName" element={<CustomerMenu />} />
  </Routes>
</Router>

  );
};

export default App;
