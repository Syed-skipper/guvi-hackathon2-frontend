import React, {useContext}from "react";
import { myContext } from "./Context";
import "../App.css";
import NavBar from "./NavBar";

function Checkout() {
    const { array } = useContext(myContext);
    console.log(array)
  return( 
  <>
    <NavBar/>
    <div>
        <h1>{array}</h1>
    </div>
  
  
  
  </>
  );
}
export default Checkout;
