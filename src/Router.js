import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import SignIn from "./Components/SignInPage";
import AboutUs from "./Components/AboutUsPage";
import ContactUs from "./Components/ContactPage";
import SignUp from "./Components/SignupPage";
import ForgetPassword from "./Components/ForgetPage";
import PasswordReset from "./Components/PasswordReset";
import Dashboard from "./Components/Dashboard";
import Cart from "./Components/CartPage";
import DeleteProduct from './Components/DeleteProduct'

function RouterComponent() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/reset/:id/:token" element={<PasswordReset />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deleteproduct" element={<DeleteProduct/>}/>
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </>
  );
}

export default RouterComponent;
