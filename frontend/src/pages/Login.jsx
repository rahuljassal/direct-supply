import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import StyledTextField from "../components/common/StyledTextField";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../services/authApiSlice";
import { updateAlertInfo } from "../redux/slices/alertSlice";
import { useDispatch } from "react-redux";
import { setAccessTokenCredentials } from "../redux/slices/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StyledDropDown from "../components/common/StyledDropDown";
import StyledMenuItem from "../components/common/StyledMenuItem";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  width: "500px !important",
}));

export default function Login() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [role, setRole] = useState("buyer");
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emailError || passwordError || nameError) {
      // do nothing
    } else {
      const data = new FormData(event.currentTarget);
      try {
        if (pathname === "/register") {
          const res = await register({
            email: data.get("email"),
            password: data.get("password"),
            role: role,
            name: data.get("name"),
          }).unwrap();
          navigate("/login");
        } else {
          const res = await login({
            email: data.get("email"),
            password: data.get("password"),
          }).unwrap();
          dispatch(setAccessTokenCredentials(res));
          navigate("/home");
        }

        dispatch(
          updateAlertInfo({
            open: true,
            severity: "success",
            message: `${
              pathname === "/register" ? "User Registered" : "Logged"
            } in successfully`,
          })
        );
      } catch (error) {
        dispatch(
          updateAlertInfo({
            open: true,
            severity: "error",
            message: error.data.error || `Something went wrong`,
          })
        );
      }
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const name = document.getElementById("name");
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
    if (!name.value || name.value.length < 0) {
      setNameError(true);
      setNameErrorMessage("Please add a name");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined" sx={{ width: "80%" }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          {pathname === "/register" ? "Sign up" : "Sign in"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          {pathname === "/register" ? (
            <FormControl>
              <StyledTextField
                error={nameError}
                helperText={nameErrorMessage}
                id="name"
                type="name"
                name="name"
                placeholder="your name"
                autoComplete="name"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={nameError ? "error" : "primary"}
                sx={{ ariaLabel: "name" }}
              />
            </FormControl>
          ) : null}
          <FormControl>
            <StyledTextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? "error" : "primary"}
              sx={{ ariaLabel: "email" }}
            />
          </FormControl>
          <FormControl>
            <StyledTextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
          {pathname === "/register" ? (
            <FormControl>
              <StyledDropDown
                id="role"
                name="role"
                placeholder="your role"
                required
                fullWidth
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <StyledMenuItem value={"buyer"}>Buyer</StyledMenuItem>
                <StyledMenuItem value={"supplier"}>Supplier</StyledMenuItem>
                <StyledMenuItem value={"sales"}>Sales</StyledMenuItem>
              </StyledDropDown>
            </FormControl>
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            {pathname === "/register" ? "Sign up" : "Sign in"}
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            {pathname === "/register"
              ? "Already have an account?"
              : "Don't have an account?"}
            <span>
              <Link
                to={pathname === "/register" ? "/login" : "/register"}
                sx={{ alignSelf: "center" }}
              >
                <Button variant="text" sx={{ fontSize: "12px" }}>
                  {pathname === "/register" ? "Sign in" : "Sign up"}
                </Button>
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </SignInContainer>
  );
}
