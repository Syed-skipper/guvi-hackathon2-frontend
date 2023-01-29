import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./NavBar";
import DeleteProduct from "./DeleteProduct";
import { env } from "./Config";
import * as Joi from "@hapi/joi";

function AddProduct() {
  const navigate = useNavigate();
  const schema = Joi.object({
    producturl: Joi.string()
      .required()
      .label("Product URL")
      .error(new Error("Please enter a valid URL")),
    productname: Joi.string()
      .required()
      .label("Product Name")
      .error(new Error("Please enter a product name")),
    price: Joi.number()
      .required()
      .label("Price")
      .error(new Error("Please enter a valid price")),
    quantity: Joi.number()
      .required()
      .label("Quantity")
      .error(new Error("Please enter a valid quantity")),
    type: Joi.string()
      .required()
      .label("Type")
      .error(new Error("Please enter a valid type")),
  });
  const [formData, setFormData] = useState({
    producturl: "",
    productname: "",
    price: "",
    quantity: "",
    type: "",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = schema.validate(formData, { abortEarly: false });
      if (result.error) {
        console.log(result.error);
      } else {
        const response = await axios.post(
          `${env.api}/products/create`,
          { products: { ...formData } },
          { headers: { accesstoken: localStorage.getItem("token") } }
        );
        const notify = () =>
          toast("Product Added Successfully", {
            position: "top-right",
            autoClose: 4000,
          });
        notify();
        console.log(response);
        setTimeout(() => {
          navigate("/homepage");
        }, 5000);
      }
    } catch (error) {
      console.log("On catch");
      console.log(error);
    }
  };

  const handlecancel = () => {
    navigate("/homepage");
  };

  return (
    <>
      <NavBar />
      <div style={{ display: "flex" }}>
        <div
          className="product col-md-3 col-lg-5"
          style={{
            justifyContent: "center",
            padding: "30px",
            backgroundColor: "white",
            paddingLeft: "62px",
          }}
        >
          <Typography
            variant="h4"
            style={{ fontSize: "30px", color: "black", fontWeight: "bolder" }}
          >
            Add Product
          </Typography>

          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                className="textfield"
                sx={{
                  width: 300,
                }}
                id="standard-basic"
                label="ProductUrl"
                required
                variant="standard"
                name="name"
                value={formData.producturl}
                onChange={(e) =>
                  setFormData({ ...formData, producturl: e.target.value })
                }
              />
            </div>
            <br />
            <div>
              <TextField
                className="textfield"
                sx={{
                  width: 300,
                }}
                id="standard-basic"
                label="Product Name"
                required
                variant="standard"
                name="productname"
                value={formData.productname}
                onChange={(e) =>
                  setFormData({ ...formData, productname: e.target.value })
                }
              />
            </div>
            <br />
            <div>
              <TextField
                className="textfield"
                sx={{
                  width: 300,
                }}
                id="standard-basic"
                label="Product Price"
                required
                variant="standard"
                type="text"
                name="price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <br />
            <div>
              <TextField
                className="textfield"
                sx={{
                  width: 300,
                }}
                id="standard-basic"
                label="Quantity"
                variant="standard"
                required
                type="number"
                name="confirmpassword"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
              />
            </div>
            <br />
            <div>
              <select
                style={{ width: "300px" }}
                class="form-select"
                aria-label="Default select example"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option selected>Select Type</option>
                <option value="camera">Camera</option>
                <option value="lens">Lens</option>
                <option value="light">Light</option>
              </select>
            </div>
            <br />
            <div>
              <Button
                style={{
                  width: "120px",
                  marginRight: "53px",
                }}
                variant="contained"
                onClick={handlecancel}
              >
                Back
              </Button>
              <Button
                style={{
                  width: "120px",
                }}
                variant="contained"
                type="submit"
              >
                Add
              </Button>
              <ToastContainer />
            </div>
          </form>
        </div>
        <div className="col-lg-7" style={{ backgroundColor: "#99A3A4" }}>
          <p
            style={{
              fontSize: "30px",
              color: "black",
              fontWeight: "bolder",
              textAlign: "center",

              backgroundColor: "skyblue",
              padding: "15px",
            }}
          >
            Delete Product
          </p>
          <DeleteProduct style={{ padding: "0px", margin: "0px" }} />
        </div>
      </div>
    </>
  );
}
export default AddProduct;
