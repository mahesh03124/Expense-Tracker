import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExpenseTracker from './Components/ExpenseTracker';
import './App.css'
import ViewTransaction from './Components/ViewTransaction';
import Register from './Components/Register';
import Login from './Components/Login';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ExpenseTracker" element={<ExpenseTracker />} />
          <Route path="/ExpenseTracker/ViewTransaction" element={<ViewTransaction />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
