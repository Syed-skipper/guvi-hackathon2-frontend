import React, { useEffect, useState } from "react";
import axios from "axios";
import { env } from "./Config";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import '../css/Navbar.css'

function NavBar() {
  const navigate = useNavigate();
  const [initial, setinitial] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    async function getProducts() {
      const id = localStorage.getItem("userid");
      const response = await axios.get(`${env.api}/addcart/read/${id}`, {
        headers: {
          accesstoken: localStorage.getItem("token"),
        },
      });
      var data = response.data;
      setinitial(data.length);
    }
    getProducts();
  });

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleHome = async () => {
    navigate("/homepage");
  };
  const handleCart = async () => {
    navigate("/cart");
  };

  const handleDashboard = async () => {
    navigate("/dashboard");
  };
  const handleAboutPage = async () => {
    navigate("/aboutus");
  };
  const handleContactus = async () => {
    navigate("/contactus");
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" className="Appbar">
          <Toolbar
            style={{ justifyContent: "space-around" }}
            className="Toolbar"
          >
            <Typography
              style={{ fontWeight: "bold", fontSize: "28px", color: "#F1C40F" }}
            >
              CamRental
            </Typography>
            <input
              className="input"
              type="text"
              placeholder="Search"
              style={{ width: "350px", height: "35px" }}
            />
            <Button
              color="inherit"
              onClick={() => handleHome()}
              className="Button"
            >
              Product
            </Button>
            <Button color="inherit" onClick={() => handleCart()}>
              <i class="fa-solid fa-cart-shopping"></i>&nbsp; Cart&nbsp;
              <sup>
                <b>{initial}</b>
              </sup>
            </Button>
            {localStorage.getItem("role") === "admin" ? (
              <Button color="inherit" onClick={() => handleDashboard()}>
                Add Product
              </Button>
            ) : (
              []
            )}
            <div style={{ display: "flex" }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle className="AccountCircle" />
              </IconButton>
              <p
                className="p"
                style={{ padding: "7px", marginTop: "4px", paddingLeft: "0px" }}
              >
                {localStorage.getItem("name")}
              </p>
              <Menu
                className="Menu"
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem onClick={handleAboutPage}>About</MenuItem>
                <MenuItem onClick={handleContactus}>Contact</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default NavBar;
