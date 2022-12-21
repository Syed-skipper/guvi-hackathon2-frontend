import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardMedia from "@mui/material/CardMedia";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { env } from "./Config";

function Homepage() {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState();
  const navigate = useNavigate();
  const [initial, setinitial] = useState(0);

  const addcart = async (item) => {
    try {
      cart.push(item);
      setCart(cart);
      const response = await axios.post(`${env.api}/addcart/create`, {
        ...cart,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setinitial(initial + 1);  
  };

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(`${env.api}/products/read`, {
        headers: {
          accesstoken: localStorage.getItem("token"),
        },
      });
      setProduct(response.data);
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
        <AppBar position="static">
          <Toolbar style={{ justifyContent: "space-around" }}>
            <Typography
              style={{ fontWeight: "bold", fontSize: "28px", color: "#F1C40F" }}
            >
              CamRental
            </Typography>
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
      <Grid
        container
        spacing={5}
        style={{ padding: "30px", justifyContent: "center" }}
      >
        {product.map((row) => (
          <Grid item key={row._id}>
            <Card sx={{ width: 350, height: 430 }}>
              <CardMedia
                component="img"
                height="200"
                image={row.producturl}
                alt="green iguana"
              />
              <CardContent>
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.secondary"
                  gutterBottom
                >
                  <strong>{row.productname}</strong>
                </Typography>

                <Typography sx={{ mb: 1.5 }}>
                  <strong> Price perday : {row.price} Rs</strong>
                </Typography>

                <Typography variant="body2" sx={{ fontSize: 15 }}>
                  <strong>Quantity : {row.quantity}</strong>
                  <br />
                </Typography>
                <br />
                <Button
                  variant="contained"
                  style={{
                    width: "140px",
                    marginLeft: "78px",
                    fontSize: "12px",
                  }}
                  
                  onClick={() => addcart(row.productname)}
                >
                  Add to Cart
                </Button>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Homepage;
