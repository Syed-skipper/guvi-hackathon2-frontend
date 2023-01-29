const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: "rzp_test_3U2F1RqhLiz51B",
  key_secret: "tnh5kjhoKsjh5yB11hXuYxLe"
});

const options = {
  amount: 50000,  // amount in the smallest currency unit
  currency: "INR",
  receipt: "order_rcptid_11",
  payment_capture: 1
};

instance.orders.create(options, function(err, order) {
  console.log(order);
});