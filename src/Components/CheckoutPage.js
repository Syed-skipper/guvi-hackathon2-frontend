// import React, { useState } from "react";
// import Razorpay from "razorpay";
// import NavBar from "./NavBar";

// function Checkout() {
//   const [razorpay, setRazorpay] = useState();
//   const [paymentModalVisible, setPaymentModalVisible] = useState(false);
//   const value = localStorage.getItem("cartData");
//   const value1 = JSON.parse(value)

//   const handlePaymentClick = () => {
//     const options = {
//       key: "<your_razorpay_key>",
//       amount: "100", // in the smallest currency unit
//       currency: "INR",
//       name: "Merchant Name",
//       description: "Purchase Description",
//       image: "https://example.com/your_logo.png",
//       order_id: "order_<Random Number>", // Generate unique order id
//       handler: function(response) {
//         alert(response.razorpay_payment_id);
//       },
//       modal: {
//         ondismiss: function() {
//           setPaymentModalVisible(false);
//         }
//       }
//     };

//     const razorpayInstance = new Razorpay(options);
//     setRazorpay(razorpayInstance);
//     setPaymentModalVisible(true);
//     razorpayInstance.open();
//   };

//   return (
//     <>
//       <NavBar />
//       {value1.map((item, index) => (
//         <div class="card" key={index}>
//           <div class="product">
//             <img src={item.producturl} alt="producturl" />
//             <p class="product-name">{item.productname}</p>
//             <p class="product-price">{item.price}</p>
//             <div class="quantity">
//               <button class="btn decrease">-</button>
//               <p>{item.quantity}</p>
//               <button class="btn increase">+</button>
//             </div>
//           </div>
//           <button class="pay-btn" onClick={handlePaymentClick}>
//             Pay
//           </button>
//         </div>
//       ))}
//       {paymentModalVisible && razorpay && <div class="razorpay-payment-modal"></div>}
//     </>
//   );
// }

// export default Checkout;
