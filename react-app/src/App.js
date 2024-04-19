import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Access, Table } from './pages';
import './style.css';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/access" element={<Access />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </Router>
    </>
  );
}
