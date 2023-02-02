import React,{useContext} from "react";
import "../App.css";
import NavBar from "./NavBar";
import { SearchContext } from "./Context";
import '../css/checkout.css'

function Checkout() {
  const { cartdata } = useContext(SearchContext);
  
  return (
    <>
      <NavBar />
      <div class="checkout">
  <div class="card">
    <div class="product">
    <img src={cartdata.producturl} alt="producturl" />
      <p class="product-name">{cartdata.productname}</p>
      <p class="product-price">{cartdata.price}</p>
      <div class="quantity">
        <button class="btn decrease">-</button>
        <p>{cartdata.quantity}</p>
        <button class="btn increase">+</button>
      </div>
    </div>
    <button class="pay-btn">Pay</button>
  </div>
</div>

    </>
  );
}
export default Checkout;
