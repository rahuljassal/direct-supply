import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthentication } from "../redux/slices/authSlice";
import logo from "../assets/images/direct-logo.svg";
import { Box } from "@mui/material";
const RootLayout = () => {
  const isAuth = useSelector(getAuthentication);
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      flexDirection={"column"}
      justifyContent={"center"}
      height={"100vh"}
    >
      <img src={logo} height={60} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </Box>
  );
};

export default RootLayout;
