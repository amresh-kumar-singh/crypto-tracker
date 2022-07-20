import { Box, Button, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = CryptoState();

  const handleSubmit = async (e) => {
    if (!email || !password) {
      setAlert({
        open: true,
        type: "error",
        message: "Email or password field are empty",
      });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        type: "success",
        message: `Logged in Successfully Welcome ${result.user.email}`,
      });
      handleClose();
    } catch (e) {
      setAlert({
        open: true,
        type: "error",
        message: e.message,
      });
    }
  };
  return (
    <Box p={3} sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="contained" onClick={handleSubmit} size="large">
        Login
      </Button>
    </Box>
  );
};

export default Login;
