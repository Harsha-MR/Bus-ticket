import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/search-results', { state: { origin, destination, date } });
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="From" 
        value={origin} 
        onChange={(e) => setOrigin(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="To" 
        value={destination} 
        onChange={(e) => setDestination(e.target.value)} 
      />
      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchForm;
