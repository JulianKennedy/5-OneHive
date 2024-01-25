import logo from './logo.svg';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Header } from './Components/Header';
import './App.css';
import HomePage from './Components/HomePage';
import LearnPage from './Components/LearnPage';
import AdoptPage from './Components/AdoptPage';
import AboutUsPage from './Components/AboutUsPage';
import ProductPage from './Components/ProductPage';
import LoginPage from './Components/LoginPage';
import React from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/learn" element={<LearnPage/>} />
      <Route path="/adopt" element={<AdoptPage/>} />
      <Route path="/product" element={<ProductPage/>} />
      <Route path="/about" element={<AboutUsPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      {/* <Route path="/add-on" element={<AddOnPage/>} />
      <Route path="/stats" element={<StatsPage/>} />
      <Route path="/payment" element={<PaymentPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage/>} />
      <Route path="/fecinfo" element={<FECInfoPage/>} />  */}
      </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
