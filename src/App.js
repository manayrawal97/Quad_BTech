import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowList from './components/ShowList';
import ShowSummary from './components/ShowSummary';
import './App.css';

const App = () => {
  return (
    <div className='bg-light'>
    <Router>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/show/:id" element={<ShowSummary />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
