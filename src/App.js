import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExpenseTracker from './Components/ExpenseTracker';
import './App.css'
import ViewTransaction from './Components/ViewTransaction';
import Register from './Components/Register';
import Login from './Components/Login';
import PrintTranscation from './Components/PrintTranscation';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ExpenseTracker" element={<ExpenseTracker />} />
          <Route path="/ExpenseTracker/ViewTransaction" element={<ViewTransaction />} />
          <Route path='/ExpenseTracker/ViewTransaction/PrintTransaction' element={<PrintTranscation/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
