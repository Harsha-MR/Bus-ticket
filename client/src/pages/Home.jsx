// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <header className="bg-blue-600 text-white p-4">
        <h1 className="text-center text-3xl font-bold">Welcome to Bus Ticket Booking</h1>
      </header> */}
      
      <main className="p-6">
        <div className="max-w-xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Book Your Bus Ticket</h2>
          <p className="text-gray-700 mb-6">Find buses, book tickets, and travel to your destination comfortably!</p>
          
          <div className="flex justify-center">
            <Link
              to="/search"
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              Start Booking
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
