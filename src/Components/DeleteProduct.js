import React, { useEffect, useState } from "react";
import axios from "axios";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import {env} from './Config'

function GetProduct() {
  const [product, setProduct] = useState([]);
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
  },[]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${env.api}/products/delete/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid
        container
        spacing={5}
        style={{ padding: "30px", justifyContent: "center" }}
      >
        {product.map((row) => (
          <Grid item key={row._id}>
            <Card sx={{ width: 300, height: 430 }}>
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
                    width: "180px",
                    fontSize: "12px",
                  }}
                  onClick={() => handleDelete(row._id)}
                >
                  Delete
                </Button>
              </CardContent>
              
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default GetProduct;