import React,{useEffect, useState} from "react";
import axios from "axios";
import { env } from "./Config";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

function NavBar() {
  const navigate = useNavigate();
  const [initial, setinitial] = useState(0)
  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(`${env.api}/addcart/read`, {
        headers: {
          accesstoken: localStorage.getItem("token"),
        },
      });
      var data = response.data
      setinitial(data.length)
    }
    getProducts();
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleHome = () => {
    navigate("/homepage");
  };
  const handleCart = () => {
    navigate("/cart");
  };
 
  const handleDashboard = () => {
    navigate("/dashboard");
  };
  const handleAboutPage = () => {
    navigate("/aboutus");
  };
  const handleContactus = () => {
    navigate("/contactus");
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        
        <AppBar position="sticky">
          <Toolbar style={{ justifyContent: "space-around" }}>
           <Typography style={{fontWeight:"bold", fontSize:'28px',color:'#F1C40F'}}>CamRental</Typography>
            <Button color="inherit" onClick={() => handleHome()}>
              Home
            </Button>
            
            <Button color="inherit" onClick={() => handleAboutPage()}>
              About us
            </Button>
            <Button color="inherit" onClick={() => handleContactus()}>
              Contact us
            </Button>
            <Button color="inherit" onClick={() => handleCart()}>
              <i class="fa-solid fa-cart-shopping"></i>&nbsp; Cart&nbsp;
              <sup>
                <b>{initial}</b>
              </sup>
            </Button>
            <Button color="inherit" onClick={() => handleDashboard()}>
               Dashboard
            </Button>
            <Button color="inherit" onClick={() => handleLogout()}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default NavBar;
