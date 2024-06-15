import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  CircularProgress,
  Stack,
  Tooltip,
} from "@mui/material";
import { Alert } from "@mui/material"; // For error messages
import { Link, useNavigate } from "react-router-dom"; // For navigation
import logo from "../assets/logo.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  ErrorOutline,
} from "@mui/icons-material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  // Password Validation
  const validatePassword = (value: string) => {
    const passwordStrengthRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordStrengthRegex.test(value)) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");
    setError("");
    setSuccess("");
    setIsLoading(true);

    validateEmail(email);
    validatePassword(password);

    if (emailError || passwordError) {
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      if (email === "test@example.com" && password === "password123") {
        setSuccess("Login successful! Redirecting...");
        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify({ email, rememberMe }));
        }
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setError("Invalid email or password");
        setEmail("");
        setPassword("");
      }
    }, 2000);
  };

  const handleGoogleLogin = () => {
    alert("Google Login Clicked");
  };

  const handleFacebookLogin = () => {
    alert("Facebook Login Clicked");
  };

  useEffect(() => {
    if (email) {
      validateEmail(email);
    }
  }, [email]);

  useEffect(() => {
    if (password) {
      validatePassword(password);
    }
  }, [password]);

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
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          position: "relative",
          paddingBottom: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          "& .MuiTextField-root": {
            marginBottom: 2,
          },
        }}
      >
        <Box display="flex" justifyContent="center" marginBottom={2}>
          <img
            src={logo}
            alt="Creator Trends Logo"
            style={{ width: "250px" }}
          />
        </Box>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Welcome Back
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={!!emailError}
          helperText={emailError}
          variant="outlined"
          InputProps={{
            "aria-label": "email",
            endAdornment: emailError && (
              <InputAdornment position="end">
                <Tooltip title={emailError}>
                  <ErrorOutline color="error" />
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={!!passwordError}
          helperText={passwordError}
          variant="outlined"
          InputProps={{
            "aria-label": "password",
            endAdornment: (
              <>
                {passwordError && (
                  <InputAdornment position="end">
                    <Tooltip title={passwordError}>
                      <ErrorOutline color="error" />
                    </Tooltip>
                  </InputAdornment>
                )}
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              </>
            ),
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          }
          label="Remember Me"
          sx={{ marginTop: 1 }}
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
          disabled={isLoading}
          aria-label="sign in"
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Sign In"
          )}
        </Button>

        <Box mt={2}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                borderColor: "#d3d3d3",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
              aria-label="google login"
            >
              Google Login
            </Button>
            <Button
              variant="outlined"
              startIcon={<FacebookIcon />}
              onClick={handleFacebookLogin}
              sx={{
                backgroundColor: "#fff",
                color: "#1877F2",
                borderColor: "#1877F2",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  borderColor: "#1877F2",
                },
              }}
              aria-label="facebook login"
            >
              Facebook Login
            </Button>
          </Stack>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop={2}
        >
          <MuiLink
            component={Link}
            color="#000"
            to="/forgot-password"
            fontSize="12px"
            sx={{ marginBottom: 1.5 }}
            aria-label="forgot password"
          >
            Forgot Your Password?
          </MuiLink>
        </Box>
        <Box
          sx={{
            backgroundColor: "#dbebfa", // Light gray background color
            width: "100%",
            borderRadius: "0 0 8px 8px",
            position: "absolute",
            bottom: 0,
            padding: "15px 0",
            textAlign: "center",
            left: "0px",
          }}
        >
          <Typography variant="body2">
            Don’t have an account?{" "}
            <MuiLink
              component={Link}
              to="/signup"
              sx={{ color: "#007bff" }}
              aria-label="create account"
            >
              Create one
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
