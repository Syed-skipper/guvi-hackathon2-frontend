import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { env } from "./Config";
import '../App.css'

function SignUpPage() {
  const [result, setResult] = useState({ msg: "" });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    password: "",
    confirmpassword: "",
    mobilenumber: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${env.api}/register/signup`, {
        ...formData,
      });
      console.log(response);
      if (response.status === 200) {
        const notify = () =>
          toast("Registration Successful", {
            position: "top-right",
            autoClose: 4000,
          });
        notify();
        navigate("/homepage");
      }
    } catch (error) {
      console.log(error);
      setResult(error.response.data);
    }
  };

  const handlecancel = () => {
    navigate("/");
  };

  return (
    <>
      <div className="bg-img">
        <div
          className="container"
          style={{
            justifyContent: "center",
            padding: "30px",
            backgroundColor: "white",
          }}
        >
          <Typography variant="h4">Register Yourself</Typography>

          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                className="textfield"
                sx={{
                  width: 300,
                }}
                id="standard-basic"
                label="First Name"
                required
                variant="standard"
                name="name"
                value={formData.firstname}
                onChange={(e) =>
                  setFormData({ ...formData, firstname: e.target.value })
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
                label="Email"
                required
                variant="standard"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
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
                label="Password"
                required
                variant="standard"
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
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
                label="Confirm Password"
                variant="standard"
                required
                type="text"
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmpassword: e.target.value })
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
                label="Mobile Number"
                variant="standard"
                type="number"
                required
                min="10"
                max="10"
                name="mobilenumber"
                value={formData.mobilenumber}
                onChange={(e) =>
                  setFormData({ ...formData, mobilenumber: e.target.value })
                }
              />
            </div>
            <br />
            <p
              style={{ color: "red", fontWeight: "bold", textAlign: "center" }}
            >
              {result.msg}
            </p>
            <div>
              <Button
                style={{
                  width: "120px",
                  marginRight: "53px",
                }}
                variant="contained"
                onClick={handlecancel}
              >
                Cancel
              </Button>
              <Button
                style={{
                  width: "120px",
                }}
                variant="contained"
                type="submit"
                // onClick={notify}
              >
                SignUp
              </Button>
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default SignUpPage;
