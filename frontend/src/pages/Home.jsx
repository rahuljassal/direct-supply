import { Box, Typography } from "@mui/material";
import logo from "../assets/images/direct-logo.svg";
import StyledCard from "../components/common/StyledCard";
import { cardArr } from "../config/constants";

const Home = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Box>
        <img src={logo} height={60} />
        {/* <Typography sx={{ fontSize: "40px", fontWeight: "500" }}>
          Direct Supply
        </Typography> */}
        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
          This app streamlines product management, offering features for
          creating products, forecasting demand, optimizing pricing, managing
          inventory, and analyzing performance.
        </Typography>
        <Box
          display={"flex"}
          justifyContent={"center"}
          gap={"20px"}
          marginTop={"50px"}
          flexWrap={"wrap"}
        >
          {cardArr.map((card) => (
            <StyledCard {...card} key={card.title} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
