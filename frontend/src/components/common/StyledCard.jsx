import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { Link } from "react-router-dom";

const CustomCard = ({ title, subTitle, path, img }) => (
  <React.Fragment>
    <CardContent
      sx={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        justifyContent: "space-between",
        flexGrow: 1,
      }}
    >
      <img src={img} alt={title} />
      <Box>
        <Typography
          gutterBottom
          sx={{
            color: "text.secondary",
            fontSize: 25,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>

        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {subTitle}
        </Typography>
      </Box>
    </CardContent>
    <CardActions>
      <Link to={path}>
        <IconButton>
          <EastIcon sx={{ color: "text.secondary" }} fontSize="large" />
        </IconButton>
      </Link>
    </CardActions>
  </React.Fragment>
);

export default function StyledCard(props) {
  return (
    <Link to={props.path} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          width: 380,
          textAlign: "left",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <Card
          variant="elevation"
          sx={{
            background: "#fff",
            height: 450,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "flex-start",
            cursor: "pointer",
            borderRadius: "10px",
          }}
        >
          <CustomCard {...props} />
        </Card>
      </Box>
    </Link>
  );
}
