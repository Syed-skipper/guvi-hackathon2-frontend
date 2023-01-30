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
      const id = localStorage.getItem("userid");
      const response = await axios.get(`${env.api}/addcart/read/${id}`, {
        headers: {
          accesstoken: localStorage.getItem("token"),
        },
      });
      var data = response.data;
      setItem(data);
    }
    getProducts();
  }, []);
  async function deletefromCart(row) {
    try {
      const response = await axios.delete(
        `${env.api}/addcart/delete/${row._id}`
      );
      console.log(response);
      if (response.status === 200) {
        const id = localStorage.getItem("userid");
        const response = await axios.get(`${env.api}/addcart/read/${id}`);
        var data = response.data;
        setItem(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
 

  return (
    <>
      <NavBar />
      <br />
      {item.length > 0 ? (
        <div style={{ marginBottom: "10px" }}>
          {item.map((row) => (
            <Card sx={{ maxWidth: 500 }} key={row._id}>
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
                <Button size="small" >Buy Now</Button>
                <Button size="small" onClick={() => deletefromCart(row)}>
                  Remove
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center  ",
          }}
        >
          <h1>No items in cart</h1>
        </div>
      )}
    </>
  );
}

export default Cart;
