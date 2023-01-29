import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import{ env } from './Config'

function LoginComponent() {
  const navigate = useNavigate();
  const [result, setResult] = useState({ msg: "" });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const user = await axios.post(`${env.api}/register/signin`, {
      ...formData,
    });
    console.log(user);
    if (user.data) {
      localStorage.setItem("token", user.data[0]);
      localStorage.setItem("userid",user.data[1]);
      localStorage.setItem("role",user.data[2]);
      localStorage.setItem("name",user.data[3])
      navigate("/homepage");
    }
  }catch(error){
    console.log(error.response.data)
    setResult(error.response.data)
  }
    
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "600px",
          justifyContent: "center",
          backgroundColor: "#85C1E9",
        }}
      >
        <div
          style={{
            margin: "50px",
            marginTop: "70px",
            padding: "40px",
            width: "330px",
            height: "455px",
            textAlign: "center",
            backgroundColor: "whitesmoke",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h4">Sign In</Typography>

          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                id="standard-basic"
                label="E-mail"
                variant="standard"
                required
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
                id="standard-basic"
                label="Password"
                variant="standard"
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <br />
            <p style={{ color: "red", fontWeight: "bold" }}>{result.msg}</p>

            <Link
              to="/forgetpassword"
              style={{
                textDecoration: "none",
                color: "black",
                float: "center",
                fontWeight:'bold'
              }}
            >
              Forget Password?
            </Link>
            <br />
            <br />
            <div>
              <Button variant="contained" type="submit">
                SignIn
              </Button>
            </div>
          </form>
          <br />
          <Typography>
            Not a User ? &nbsp;&nbsp;
            <a href="/signup" style={{ textDecoration: "none" }}>
              SignUp
            </a>
          </Typography>
          <br/>
          <div>
          <Typography> 
            Admin Login : admin@gmail.com<br/>
            Password : admin123
          </Typography>
        </div>
        </div>
        
        
      </div>
    </>
  );
}
export default LoginComponent;
