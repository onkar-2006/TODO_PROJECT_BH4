import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./components/RegisterComponent/Register"
import Login from './components/loginComponent/Login';
import Home from './components/TodoComponents/Home';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Login />} /> 
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
);
