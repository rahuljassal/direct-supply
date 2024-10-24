import { Select } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const StyledDropDown = styled(Select)(({ theme }) => ({
  textAlign: "left",
  border: "1px solid #CCCCCC",
  borderRadius: "8px",
  transition: "border-color 0.2s ease-in-out",
  "& .MuiSvgIcon-root": {
    color: "#CCC",
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
}));

export default StyledDropDown;
