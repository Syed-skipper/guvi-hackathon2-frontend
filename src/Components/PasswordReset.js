import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { env } from "./Config";

function PasswordReset() {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState({ msg: "" });
  const [data, setData] = useState({ password: "", confirmpassword: "" });
  console.log(data);

  const notify = () =>
    toast("Password Updated", {
      position: "top-right",
      autoClose: 4000,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post(
        `${env.api}/users/resetpassword/${id}/${token}`,
        {
          ...data,
        },
        {
          id: id,
          token: token,
        }
      );

      console.log(user.data.msg);
      setResult(user.data.msg);
      setTimeout(() => {
        navigate("/");
      }, 4000);
      
    } catch (error) {
      console.log(error.response.data);
      setResult(error.response.data);
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
            height: "380px",
            textAlign: "center",
            backgroundColor: "whitesmoke",
            borderRadius: "5px",
          }}
        >
          <Typography
            variant="h5"
            style={{ fontFamily: "verdana", marginBottom: "15px" }}
          >
            Enter New Password
          </Typography>

          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                id="standard-basic"
                label="Enter new password"
                variant="standard"
                required
                type="password"
                name="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <br />
            <div>
              <TextField
                id="standard-basic"
                label="Confirm new password"
                variant="standard"
                required
                type="password"
                name="confirmpassword"
                value={data.confirmpassword}
                onChange={(e) =>
                  setData({ ...data, confirmpassword: e.target.value })
                }
              />
            </div>
            <br />
            <p style={{ color: "red", fontWeight: "bold" }}>{result.msg}</p>
            <br />
            <div>
              <Button variant="contained" type="submit" onClick={notify}>
                Update Password
              </Button>
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PasswordReset;
