import logo from './logo.svg';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Header } from './Components/Header';
import './App.css';
import HomePage from './Components/HomePage';
import LearnPage from './Components/LearnPage';
import AdoptPage from './Components/AdoptPage';
import AdoptHomePage from './Components/AdoptHomePage';
import HowToAdoptPage from './Components/HowToAdoptPage';
import AboutUsPage from './Components/AboutUsPage';
import ProductPage from './Components/ProductPage';
import ProductPage2 from './Components/ProductPage2';
import LoginPage from './Components/LoginPage';
import React from "react";
import Dashboard from './Components/Dashboard';
import AddHive from './Components/AddHive';
import RegisterPage from './Components/RegisterPage';
import ProfilePage from './Components/ProfilePage';
import MapPage from './Components/MapPage';
import ForgotPasswordPage from './Components/ForgotPasswordPage';
import CartPage from './Components/CartPage';
import OrderHistoryPage from './Components/OrderHistoryPage';
import ProductPurchasePage from './Components/ProductPurchasePage';
import CheckoutPage from './Components/CheckoutPage';
import PaymentConfirmationPage from './Components/PaymentConfirmationPage';
import PasswordResetConfirmationPage from './Components/PasswordResetConfirmationPage';
import ResetPassword from './Components/ResetPasswordPage';
import ResetConfirmation from './Components/ResetConfirmation';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/learn" element={<LearnPage/>} />
      <Route path="/adopt" element={<AdoptPage/>} />
      <Route path="/adopthome" element={<AdoptHomePage/>} />
      <Route path="/howtoadopt" element={<HowToAdoptPage/>} />
      <Route path="/product" element={<ProductPage2/>} />
      <Route path="/product2" element={<ProductPage2/>} />
      <Route path="/orderhistory" element={<OrderHistoryPage/>} />
      <Route path="/about" element={<AboutUsPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/map" element={<MapPage/>} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage/>} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/product2" element={<ProductPage2/>} />
      <Route path="/adopthome" element={<AdoptHomePage/>} />
      <Route path="/purchase" element={<ProductPurchasePage/>} />
      <Route path="/checkout" element={<CheckoutPage/>} />
      <Route path="/paymentconfirmation" element={<PaymentConfirmationPage/>} />
      <Route path="/resetpassword/:resetToken" element={<ResetPassword/>} />
      <Route path="/passwordresetemail" element={<PasswordResetConfirmationPage/>} />
      <Route path="/resetpasswordconfirmation" element={<ResetConfirmation/>} />
      
      {/* <Route path="/add-on" element={<AddOnPage/>} />
      <Route path="/stats" element={<StatsPage/>} />
      <Route path="/payment" element={<PaymentPage/>} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage/>} />
      <Route path="/fecinfo" element={<FECInfoPage/>} />  */}
      </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
