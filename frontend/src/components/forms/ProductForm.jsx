import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Grid,
  InputLabel,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StyledTextField from "../common/StyledTextField";
import StyledDropDown from "../common/StyledDropDown";
import StyledMenuItem from "../common/StyledMenuItem";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedProduct,
  updateProducts,
} from "../../redux/slices/selectionsSlice";
import {
  useAddProductMutation,
  useProductsQuery,
} from "../../services/productsApiSlice";
import { updateAlertInfo } from "../../redux/slices/alertSlice";
import { style } from "../../config/constants";
import { validateProductForm } from "../../config/Utils";

const categoryArr = [
  {
    id: 1,
    name: "Outdoor & Sports",
  },
  {
    id: 2,
    name: "Electronics",
  },
  {
    id: 3,
    name: "Apparel",
  },
  {
    id: 4,
    name: "Home Automation",
  },
  {
    id: 5,
    name: "Transportation",
  },
  {
    id: 6,
    name: "Wearables",
  },
];

const AddEditProductForm = ({ open, handleClose }) => {
  const [productDetails, setProductDetails] = useState(open.data);
  const dispatch = useDispatch();
  const [addProduct] = useAddProductMutation();
  const { refetch } = useProductsQuery();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category_name") {
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        category_name: value.name,
        category_id: value.id,
      }));
    } else {
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    const { isValid, errors } = validateProductForm(productDetails);
    if (isValid) {
      if (open.type === "edit") {
        dispatch(updateProducts(productDetails));
        handleClose(); // Close the modal
      } else {
        try {
          const res = await addProduct(productDetails).unwrap();
          await refetch();
          dispatch(
            updateAlertInfo({
              open: true,
              severity: "success",
              message: res.message || "Product added successfully",
            })
          );
          handleClose(); // Close the modal
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
    } else {
      dispatch(
        updateAlertInfo({
          open: true,
          severity: "error",
          message: Object.values(errors).join("\n"),
        })
      );
    }
  };
  return (
    <Box
      sx={{ ...style, pointerEvents: open.type === "view" ? "none" : "all" }}
      display={"flex"}
      flexDirection={"column"}
      rowGap={"5px"}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          {open.type === "add"
            ? "Add New Products"
            : `Product #${productDetails.id}`}
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{
            color: "primary.main",
            fontWeight: "bold",
            pointerEvents: "all",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <InputLabel sx={{ color: "white" }}>Product Name:</InputLabel>
      <StyledTextField
        fullWidth
        name="name"
        value={productDetails.name}
        onChange={handleChange}
      />
      <InputLabel sx={{ color: "white" }}>Category:</InputLabel>
      <StyledDropDown
        placeholder="Add Category"
        required
        fullWidth
        renderValue={(value) => value.name}
        name="category_name"
        value={{
          name: productDetails.category_name,
          id: productDetails.category_id,
        }}
        onChange={handleChange}
      >
        {categoryArr.map((category) => (
          <StyledMenuItem value={category} key={category.id}>
            {category.name}
          </StyledMenuItem>
        ))}
      </StyledDropDown>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <InputLabel sx={{ color: "white" }}>Cost Price:</InputLabel>
          <StyledTextField
            fullWidth
            name="cost_price"
            value={productDetails.cost_price}
            onChange={handleChange}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel sx={{ color: "white" }}>Selling Price:</InputLabel>
          <StyledTextField
            fullWidth
            name="selling_price"
            value={productDetails.selling_price}
            onChange={handleChange}
            type="number"
          />
        </Grid>
      </Grid>
      <InputLabel sx={{ color: "white" }}>Description:</InputLabel>
      <StyledTextField
        fullWidth
        name="description"
        value={productDetails.description}
        onChange={handleChange}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <InputLabel sx={{ color: "white" }}>Available Stock:</InputLabel>
          <StyledTextField
            fullWidth
            name="stock_available"
            value={productDetails.stock_available}
            onChange={handleChange}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel sx={{ color: "white" }}>Units Sold:</InputLabel>
          <StyledTextField
            fullWidth
            name="units_sold"
            value={productDetails.units_sold}
            onChange={handleChange}
            type="number"
          />
        </Grid>
      </Grid>
      {open.type === "view" ? null : (
        <Box mt={2} display="flex" justifyContent="flex-end" columnGap={"10px"}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {open.type === "edit" ? "Update" : "Add"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddEditProductForm;
