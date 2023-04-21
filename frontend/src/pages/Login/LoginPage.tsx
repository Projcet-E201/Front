import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
// import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import { FormControlLabel } from "@mui/material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import logo from "../../assets/semse_logo.png";
const LoginPage = () => {
  const navigate = useNavigate();

  const inputRef = useRef(null);

  const handleKeyPress = (event: any) => {
    const inputValue = event.target.value;
    // if (!/^[0-9]+$/.test(inputValue)) {
    //   event.preventDefault();
    // }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} style={{ width: "20vw" }} alt="" />
          {/* <Typography component="h1" variant="h5">
            Sign in
          </Typography> */}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>SEMSE Monitoring System</h1>
        </div>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              onKeyPress={handleKeyPress}
              inputRef={inputRef}
              variant="standard"
              label="Employee ID"
              type="text"
              placeholder="사번을 입력하세요"
              required
              fullWidth
              name="id"
              autoFocus
              margin="normal"
            ></TextField>
            <TextField
              variant="standard"
              label="Password"
              type="password"
              required
              fullWidth
              name="password"
              autoComplete="current-password"
              margin="normal"
            ></TextField>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            ></FormControlLabel>

            <Button
              onClick={() => navigate("/machine/1")}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: "50px" }}
            >
              Sign in
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default LoginPage;
