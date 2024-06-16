import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Link as MuiLink,
  Alert,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import loginImage from "../assets/login-image.jpg";
import zxcvbn from "zxcvbn";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptUpdates, setAcceptUpdates] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [username, setUsername] = useState("");
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [showUsernameHelper, setShowUsernameHelper] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(true);

  const isEmail = (input: string) => /\S+@\S+\.\S+/.test(input);
  const isPhone = (input: string) => /^\d{10}$/.test(input);

  const customPasswordFeedback = {
    0: "Password is too weak. Consider using more characters, numbers, and special symbols.",
    1: "Password is still weak. Try adding more complexity.",
    2: "Password is okay but could be stronger. Use a mix of letters, numbers, and special symbols.",
    3: "Password is fairly strong. Consider adding even more complexity for better security.",
    4: "Password is strong and secure 🎉",
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!isEmail(emailOrPhone) && !isPhone(emailOrPhone)) {
      setError("Please enter a valid email or phone number");
      return;
    }

    setSuccess("Signup Successful!");
  };

  const handleSocialSignUp = (provider: string) => {
    console.log("Sign up with provider");
  };

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  });

  const handlePasswordChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setPassword(value);

    if (value) {
      setShowPasswordStrength(true); // Show the strength meter
      const strength = zxcvbn(value);
      setPasswordStrength({
        score: strength.score,
        feedback: customPasswordFeedback[strength.score],
      });
    } else {
      setShowPasswordStrength(false); // Hide the strength meter if password is empty
    }
  };

  const handleUsernameChange = async (e: { target: { value: any } }) => {
    const value = e.target.value;
    setUsername(value);
    setShowUsernameHelper(true);

    if (value) {
      try {
        const response = await fetch(`/api/check-username?username=${value}`);
        const data = await response.json();
        setUsernameAvailable(data.available);
      } catch (error) {
        console.error("Error checking username availability", error);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${height / 100}px`);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      className="gradient-background"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
        overflow: "auto",
      }}
    >
      <Grid
        container
        sx={{
          maxWidth: 1200,
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          overflow: "hidden",
          flexGrow: 1,
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: "white",
            padding: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflowY: "auto",
            maxHeight: "90vh",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              width: "100%",
              maxWidth: 600,
              maxHeight: "85vh",
              padding: { xs: 0, md: 4 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 2,
                width: "100%",
              }}
            >
              <img
                src={logo}
                alt="Creator Trends Logo"
                style={{ width: "300px" }}
              />
            </Box>

            <Typography
              variant="body1"
              marginBottom={1}
              sx={{
                paddingLeft: { xs: 2, sm: 2, md: 4 },
                paddingRight: { xs: 2, sm: 2, md: 4 },
                textAlign: "center",
                fontWeight: "bold",
                color: "grey",
                fontSize: "15px",
                marginTop: -4,
                marginBottom: 0,
              }}
            >
              Sign up to discover trending videos from your favourite creators.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: "100%" }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ width: "100%" }}>
                {success}
              </Alert>
            )}

            <Box
              sx={{
                marginY: 2,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box sx={{ width: "80%" }}>
                <Button
                  startIcon={<FacebookIcon />}
                  variant="contained"
                  fullWidth
                  onClick={() => handleSocialSignUp("Facebook")}
                  sx={{
                    backgroundColor: "#4267B2",
                    "&:hover": { backgroundColor: "#365899" },
                    marginBottom: 1,
                    width: "100%",
                  }}
                >
                  Sign Up with Facebook
                </Button>
                <Button
                  startIcon={<GoogleIcon />}
                  variant="contained"
                  fullWidth
                  onClick={() => handleSocialSignUp("Google")}
                  sx={{
                    backgroundColor: "#DB4437",
                    "&:hover": { backgroundColor: "#C53929" },
                    width: "100%",
                  }}
                >
                  Sign Up with Google
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                marginY: 2,
              }}
            >
              <Divider sx={{ flexGrow: 1, marginRight: 1 }} />
              <Typography variant="body2" color="textSecondary">
                OR
              </Typography>
              <Divider sx={{ flexGrow: 1, marginLeft: 1 }} />
            </Box>

            <TextField
              label="Full Name"
              type="text"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              sx={{ width: "80%" }}
            />

            <TextField
              label="Email or Mobile Number"
              type="text"
              fullWidth
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              required
              sx={{ width: "80%" }}
            />

            <TextField
              label="Username"
              type="text"
              fullWidth
              value={username}
              onChange={handleUsernameChange}
              required
              helperText={
                showUsernameHelper
                  ? usernameAvailable
                    ? "Username is available"
                    : "Username is taken"
                  : ""
              }
              error={showUsernameHelper && !usernameAvailable}
              sx={{ width: "80%" }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              required
              sx={{ width: "80%" }}
            />
            {showPasswordStrength && (
              <Box
                sx={{
                  width: "80%",
                  height: 10,
                  background: "#E0E0E0",
                  borderRadius: 5,
                  overflow: "hidden",
                  marginTop: 1,
                }}
              >
                <Box
                  sx={{
                    width: `${(passwordStrength.score + 1) * 20}%`,
                    height: "100%",
                    backgroundColor:
                      passwordStrength.score === 0
                        ? "red"
                        : passwordStrength.score === 1
                          ? "orange"
                          : passwordStrength.score === 2
                            ? "yellow"
                            : passwordStrength.score === 3
                              ? "lightgreen"
                              : "green",
                    transition: "width 0.3s ease-in-out",
                  }}
                />
              </Box>
            )}
            {showPasswordStrength && (
              <Typography
                variant="body2"
                color="textSecondary"
                fontWeight="bold"
                sx={{ marginTop: 0, width: "80%" }}
              >
                {passwordStrength.feedback}
              </Typography>
            )}

            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              sx={{ width: "80%" }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptUpdates}
                  onChange={(e) => setAcceptUpdates(e.target.checked)}
                />
              }
              label="I want to receive updates about Creator Trends"
              sx={{ width: "80%" }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: 2,
                padding: 1.5,
                backgroundColor: "#007bff",
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
                width: "80%",
              }}
            >
              Sign up
            </Button>

            <Typography
              variant="body2"
              marginTop={2}
              sx={{
                paddingBottom: 4,
              }}
            >
              Already have an account?{" "}
              <MuiLink
                component={Link}
                to="/login"
                sx={{ textDecoration: "none", color: "#007bff" }}
              >
                Log In
              </MuiLink>
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "block" },
            backgroundImage: `url(${loginImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </Box>
  );
};

export default Signup;
