import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
import NavBar from "./NavBar";
import { env } from "./Config";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Cart() {
  const [item, setItem] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(`${env.api}/addcart/read`, {
        headers: {
          accesstoken: localStorage.getItem("token"),
        },
      });
      var data = response.data;
      setItem(data);
      console.log();
    }
    getProducts();
  });
  return (
    <>
      <NavBar />
      <br />

      <div style={{ marginBottom: "10px" }}>
        {item.map((row) => (
          <Card sx={{ maxWidth: 500 }} key={row.name} >
            <CardMedia
              component="img"
              alt={row.productname}
              image={row.producturl}
              style={{
                objectFit: "contain",
                maxHeight: "140px",
                maxWidth: "100%",
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h7" component="div">
                {row.productname}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ₹{row.price}
              </Typography>
            </CardContent>
            <CardActions
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <Button size="small">Buy Now</Button>
              <Button size="small">Remove</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Cart;
