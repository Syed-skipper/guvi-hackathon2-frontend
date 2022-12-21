import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Typography, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import{ env} from './Config'

function ForgetPassword() {
  
  const navigate = useNavigate();
  const [result, setResult] = useState({ msg: "" });
  const [data, setdata] = useState({ email: "" });

  const handleSubmit = async (req, res, next) => {
    try {
      const response = await axios.post(
        `${env.api}/users/forgetpassword`,
        {...data}
      );
      console.log(response); 
      setResult(response);
      setTimeout(() => {
        navigate("/");
      }, 4000);
      const notify = () =>
    toast("Mail Sended", {
      position: "top-right",
      autoClose: 4000,
    });
    notify()
    }
    
    catch (error) {
      console.log(error.response.data);
      setResult(error.response.data);
    }
  };
  const handleCancel = () =>{
    navigate('/')
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "600px",
          justifyContent: "center",
          backgroundColor: "#F8C471",
        }}
      >
        <div
          style={{
            margin: "50px",
            marginTop: "100px",
            padding: "40px",
            width: "330px",
            height: "320px",
            textAlign: "center",
            backgroundColor: "whitesmoke",
            borderRadius: "5px",
          }}
        >
          <Typography
            variant="h5"
            style={{
              paddingBottom: "8px",
              color: "#1565C0",
              fontFamily: "verdana",
              fontSize: "25px",
            }}
          >
            Forget Passsword
          </Typography>

          <Typography
            variant="h7"
            style={{
              fontSize: "1rem",
              paddingBottom: "20px",
              fontWeight: "bold",
            }}
          >
            Enter your registered email-id
          </Typography>
          <div>
            <TextField
              style={{ marginTop: "15px" }}
              id="standard-basic"
              label="E-mail"
              variant="standard"
              required
              type="email"
              name="email"
              value={data.email}
              onChange={(e) => setdata({ ...data, email: e.target.value })}
            />
          </div>

          <br />
          <p style={{ color: "red", fontWeight: "bold" }}>{result.msg}</p>

          <div style={{justifyContent:'space-between'}} >
          <Button variant="contained" type="submit" onClick={handleCancel}>
              Back
            </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained" type="submit"  onClick={handleSubmit}>
              send mail
            </Button>
            <ToastContainer/>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
