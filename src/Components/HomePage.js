import React, { useEffect, useState } from "react";
import axios from "axios";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { env } from "./Config";
import NavBar from "./NavBar";

function Homepage() {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState({
    productname: "",
    producturl:'',
    price: "",
    quantity: "",
    type: "",
  });
  const [initial, setinitial] = useState(0);
  const addcart = async (row) => {
    cart.productname = row.row.productname;
    cart.producturl = row.row.producturl;
    cart.price = row.row.price;
    cart.quantity = row.row.quantity;
    cart.type = row.row.type;
    try {
      const response = await axios.post(`${env.api}/addcart/create`, {
        ...cart,
      });
      console.log(response.data);
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
      console.log()
    }
    async function getUser() {
      const response = await axios.get(`${env.api}/register/getuser`);
      var userrole = response.data[0].role
      localStorage.setItem("role",userrole)
   }
    getProducts();
    getUser();
  });

  return (
    <>
      <NavBar />
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
                  onClick={() => addcart({ row })}
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
