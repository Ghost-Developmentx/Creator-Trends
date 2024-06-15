import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (email === "test@example.com") {
      setSuccess(
        "'Password recovery instructions have been sent to your email.'",
      );
    } else {
      setError("Email address not found.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #A8EDEA 0%, #F5C6EC 100%)",
        padding: 3,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 450,
          minHeight: 350,
          padding: 4,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          overflow: "auto",
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          marginBottom={2}
          width="100%"
          alignItems="center"
        >
          <img
            src={logo}
            alt="Creator Trends Logo"
            style={{ width: "200px" }}
          />
        </Box>
        <Typography variant="h5" marginBottom={2} fontWeight="bold">
          Reset your password
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <p>
          Enter your user account's verified email address and we will send you
          a password reset link.
        </p>

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
          variant="outlined"
        />

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{
            marginTop: 2,
            padding: 1.5,
            backgroundColor: "#007bff",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          Send password reset email
        </Button>

        <Typography variant="body2" marginTop={2}>
          <Link to="/login">Back To Login</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
