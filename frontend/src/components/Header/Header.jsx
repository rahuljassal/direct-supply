import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import logo from "../../assets/images/direct-logo.svg";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useUserInfoQuery } from "../../services/authApiSlice";

const settings = ["Logout"];

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user, isError } = useUserInfoQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ color: "primary.main", backgroundColor: "secondary.dark" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={"/home"}>
            <img src={logo} height={40} width={60} />
          </Link>
          {/* <Typography
            variant="h6"
            noWrap
            sx={{
              ml: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              height: "38px",
            }}
          >
            Direct Supply
          </Typography> */}

          <Box flexGrow={1} display={"flex"} justifyContent={"end"}>
            <Typography
              noWrap
              sx={{
                display: { xs: "none", md: "flex" },
                fontWeight: 600,
                color: "secondary.light",
                fontSize: "12px",
                textDecoration: "none",
                textAlign: "right",
              }}
            >
              Welcome,
            </Typography>
            <Typography
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 600,
                color: "inherit",
                fontSize: "12px",
                textDecoration: "none",
                textAlign: "right",
              }}
            >
              {user?.name}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={user?.name.toUpperCase()}
                  src="/static/images/avatar/2.jpg"
                  sx={{
                    height: 30,
                    width: 30,
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
