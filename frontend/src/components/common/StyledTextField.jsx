import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    // color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    // borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#CCCCCC",
      borderRadius: "8px",
      transition: "border-color 0.2s ease-in-out",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: "1.5px",
    },
  },
}));

export default StyledTextField;
