import React from "react";
import "../App.css";
import NavBar from "./NavBar";
import "../css/checkout.css";

function Checkout() {
  const value = localStorage.getItem("cartData");
  const value1 = JSON.parse(value)
  return (
    <>
      <NavBar />
      {value1.map((item, index) => (
        <div class="card" key={index}>
          <div class="product">
            <img src={item.producturl} alt="producturl" />
            <p class="product-name">{item.productname}</p>
            <p class="product-price">{item.price}</p>
            <div class="quantity">
              <button class="btn decrease">-</button>
              <p>{item.quantity}</p>
              <button class="btn increase">+</button>
            </div>
          </div>
          <button class="pay-btn">Pay</button>
        </div>
      ))}
    </>
  );
}
export default Checkout;
