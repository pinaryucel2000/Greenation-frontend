import "./register.css";
import Navbar from "../navbar/navbar";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { SERVER } from "../../../constants";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [registerClicked, setRegisterClicked] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // registration confirmation dialog

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let errorTmp;
    if (registerClicked == true) {
      if (password1 == password2) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password1,
          }),
        };

        const apiCall = SERVER + "register";
        fetch(apiCall, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data == "Added successfully") {
              handleClickOpen();
            } else {
              errorTmp = data;
            }
          })
          .then(() => {
            setError(errorTmp);
          });
      } else {
        setError("Passwords do not match.");
      }
    }
    setRegisterClicked(false);
  }, [registerClicked]);

  return (
    <div className="register">
      <Navbar />
      <div className="registerBox">
        <h1 className="registerHeader">
          <a>Greenation</a> Register
        </h1>
        <div className="registerHeaderUnderline"></div>
        <RegisterationTextField
          fullWidth
          id="username"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <RegisterationTextField
          fullWidth
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <RegisterationTextField
          fullWidth
          id="password1"
          label="Password"
          variant="outlined"
          type="password"
          value={password1}
          onChange={(event) => {
            setPassword1(event.target.value);
          }}
        />
        <RegisterationTextField
          fullWidth
          id="password2"
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={password2}
          onChange={(event) => {
            setPassword2(event.target.value);
          }}
        />
        <div className="registerError">{error}</div>
        <RegistrationButton
          onClick={() => {
            setRegisterClicked(true);
          }}
        >
          REGISTER
        </RegistrationButton>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <h1 className="successfulRegistrationHeader">
              Registration was successful!
            </h1>
          </DialogTitle>
          <DialogContent>
            <div className="registrationConfirmationDialogContent">
              {" "}
              Click{" "}
              <a className="loginRef" href="login">
                here
              </a>{" "}
              to go to the login page.
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

const RegistrationButton = styled(Button)({
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
  color: "#535452",
  padding: "0.5em",
  borderRadius: "10px",
  boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.15)",
  color: "#f6fff3",
});

const RegisterationTextField = styled(TextField)({
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

export default Register;
