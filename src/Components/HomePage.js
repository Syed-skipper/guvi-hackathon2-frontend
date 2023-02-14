import React, { useEffect, useState, useContext } from "react";
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
import { SearchContext } from "./Context";

function Homepage() {
  const [product, setProduct] = useState([]);
  const { searchTerm } = useContext(SearchContext);
  const [cart, setCart] = useState({
    productname: "",
    producturl: "",
    price: "",
    quantity: "",
    type: "",
  });
  const [initial, setinitial] = useState(0);
  const addcart = async (row) => {
    console.log(row);
    setCart();
    cart.productname = row.row.productname;
    cart.producturl = row.row.producturl;
    cart.price = row.row.price;
    cart.quantity = row.row.quantity;
    cart.type = row.row.type;
    cart.userId = localStorage.getItem("userid");
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
      console.log();
    }
    getProducts();
  }, []);
  var filteredData;
  if (searchTerm === "") {
    filteredData = product;
  } else {
    filteredData = product.filter((item) =>
      item.productname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <>
      <NavBar />
      <Grid
        container
        spacing={5}
        style={{ padding: "30px", justifyContent: "center" }}
      >
        {filteredData.map((row) => (
          <Grid item key={row._id}>
            <Card
              sx={{ width: 350, height: 400 }}
            >
              <CardMedia
                component="img"
                height="190"
                image={row.producturl}
                alt={row.productname}
                style={{
                  objectFit: "contain",
                }}
              />
              <CardContent>
                <Typography
                  style={{
                    fontSize: "15px",
                    fontFamily: "lato",
                    fontWeight: "600",
                    whiteSpace: "normal",
                    lineHeight: "1.6",
                    color: "black",
                  }}
                >
                  <strong>{row.productname}</strong>
                </Typography>
                <Typography style={{padding:'10px 10px 10px 0px', fontSize:'14px'}}>{row.description}</Typography>
                <Typography variant="body2" sx={{ fontSize: 14 }}>
                  <strong>Quantity : {row.quantity} Kg</strong>
                  <br />
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "65px",
                  }}
                >
                  <Typography sx={{ mb: 1 }}>₹{row.price} (per kg)</Typography>
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
                </div>
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
