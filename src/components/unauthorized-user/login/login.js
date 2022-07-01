import Navbar from "../navbar/navbar";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import "./login.css";
import { SERVER } from "../../../constants";
import { setLocalStorage } from "../../../util";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginClicked, setLoginClicked] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let errorTmp;
    if (loginClicked == true) {
      setLoading(true);

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      };

      const apiCall = SERVER + "login";
      fetch(apiCall, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);

          if (data.id) {
            setLocalStorage("id", data.id);
            window.location.href = "/user-guide";
          } else {
            errorTmp = data;
          }
        })
        .then(() => {
          setError(errorTmp);
        });
    }
    setLoginClicked(false);
  }, [loginClicked]);

  return (
    <div className="login">
      <Dialog open={loading}>
        <DialogContent>
          Loading...
          <br /> <br />
          <LinearProgress color="inherit" className="linearProcess" />
        </DialogContent>
      </Dialog>

      <Navbar />
      <div className="loginBox">
        <h1 className="loginHeader">
          <a>Greenation</a> Login
        </h1>
        <div className="loginHeaderUnderline"></div>
        <LoginTextField
          fullWidth
          id="username"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <LoginTextField
          fullWidth
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="loginError">{error}</div>
        <LoginButton
          onClick={() => {
            setLoginClicked(true);
          }}
        >
          LOGIN
        </LoginButton>
      </div>
    </div>
  );
}

const LoginButton = styled(Button)({
  "&:hover": {
    backgroundColor: "#3e9469",
  },
  fontFamily: "Montserrat",
  fontSize: "20px",
  fontWeight: "600",
  textAlign: "center",
  display: "block",
  background: "#31b573",
  width: "9.5em",
  margin: "2em auto",
  textDecoration: "none",
  padding: "0.5em",
  borderRadius: "10px",
  boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.15)",
  color: "#f6fff3",
});

const LoginTextField = styled(TextField)({
  marginTop: "9%",
  "& label": {
    color: "#535452",
  },
  "& label.Mui-focused": {
    color: "#535452",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    "& fieldset": {
      border: "1.7px solid #535452",
    },
    "&:hover fieldset": {
      border: "2.2px solid #535452",
    },
    "&.Mui-focused fieldset": {
      border: "2.2px solid #535452",
    },
  },
});

export default Login;
