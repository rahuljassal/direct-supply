import { MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  textAlign: "left",
  border: "1px solid #CCCCCC",
  background: theme.palette.primary.contrastText,
  color: theme.palette.primary.main,
  borderRadius: "1px",
  transition: "border-color 0.2s ease-in-out",
  "& .MuiSvgIcon-root": {
    color: "#CCC",
  },
}));

export default StyledMenuItem;
