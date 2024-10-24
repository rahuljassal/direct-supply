import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: "8rem", fontWeight: "bold", color: "primary.main" }}
        >
          404
        </Typography>

        <Typography variant="h5" sx={{ mb: 2, color: "text.primary" }}>
          {
            // error?.statusText || error?.message ||
            "Page Not Found"
          }
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, color: "text.primary" }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/home")}
          >
            Back to Home
          </Button>

          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ErrorPage;
