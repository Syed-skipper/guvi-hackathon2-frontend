import React, { useState } from "react";
import NavBar from "./NavBar";
import { ToastContainer, toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import { Typography, Button } from "@mui/material";
import { env } from "./Config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ContactUs() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(`${env.api}/feedback/create`, {
        ...data,
      });
      console.log(response);
      if (response.status === 200) {
        const notify = () =>
          toast("Thanks for your feedback", {
            position: "top-right",
            autoClose: 4000,
          });
        notify();
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NavBar />
      <div >
        <div
          style={{
            justifyContent: "center",
            padding: "30px",
            backgroundColor: "white",
            marginLeft:'200px'
          }}
        >
          <Typography variant="h4">Contact Us</Typography>

          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                className="textfield"
                sx={{
                  width: 800,
                }}
                id="standard-basic"
                label="First Name"
                required
                variant="standard"
                name="name"
                value={data.firstname}
                onChange={(e) =>
                  setData({ ...data, firstname: e.target.value })
                }
              />
            </div>
            <br />
            <div>
              <TextField
                className="textfield"
                sx={{
                  width: 800,
                }}
                id="standard-basic"
                label="Last Name"
                required
                variant="standard"
                name="name"
                value={data.lastname}
                onChange={(e) => setData({ ...data, lastname: e.target.value })}
              />
            </div>
            <br />
            <div>
              <TextField
                className="textfield"
                sx={{
                  width: 800,
                }}
                id="standard-basic"
                label="Email"
                required
                variant="standard"
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <br />
            <div>
              <TextField
                className="textfield"
                sx={{
                  width: 800,
                }}
                id="standard-basic"
                label="Phone Number"
                required
                variant="standard"
                type="number"
                name="number"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              />
            </div>
            <br />
            <div>
              <TextField
                className="textfield"
                sx={{
                  width: 800,
                }}
                id="standard-basic"
                label="Message"
                variant="standard"
                type="text"
                required
                name="message"
                value={data.message}
                onChange={(e) => setData({ ...data, message: e.target.value })}
              />
            </div>
            <br />
            <div>
              <Button
                style={{
                  width: "120px",
                }}
                variant="contained"
                type="submit"
                // onClick={notify}
              >
                Send feedback
              </Button>
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
