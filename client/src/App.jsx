// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';

// const App = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={user ? <Home /> : <Login />} />
//         <Route path="/search-results" element={user ? <SearchResults /> : <Login />} />
//         <Route path="/booking" element={user ? <Booking /> : <Login />} />
//         <Route path="/payment" element={user ? <Payment /> : <Login />} />
//         <Route path="/confirmation" element={user ? <Confirmation /> : <Login />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// };

// export default App;

// // src/App.jsx
// import React from 'react';
// import { Route, Routes } from 'react-router-dom';  // Ensure you import Route and Routes
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Header from './components/Header';
// import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/search-results" element={<SearchResults /> } />
        <Route path="/booking" element={ <Booking /> } />
        <Route path="/payment" element={ <Payment />} />
        <Route path="/confirmation" element={ <Confirmation /> } />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
