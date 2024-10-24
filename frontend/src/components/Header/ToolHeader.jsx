import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, FormControlLabel, Modal, useTheme } from "@mui/material";
import StyledSwitch from "../common/StyledSwitch";
import StyledSearchBar from "../common/StyledSearchBar";
import StyledDropDown from "../common/StyledDropDown";
import StyledMenuItem from "../common/StyledMenuItem";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import {
  getSelectedProducts,
  getToolHeaderSelection,
  updateToolHeaderSelection,
} from "../../redux/slices/selectionsSlice";
import AddEditProductForm from "../forms/ProductForm";
import DemandForecast from "../DemandForecast/DemandForecast";
import { useUserInfoQuery } from "../../services/authApiSlice";

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

function ToolHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useTheme();
  const toolHeaderSelections = useSelector(getToolHeaderSelection);
  const [filterState, setFilterState] = useState({
    search_text: toolHeaderSelections.search_text,
    category: toolHeaderSelections.category,
  });
  const { data: user, isError } = useUserInfoQuery({});
  const handleChange = (key, data) => {
    setFilterState((prev) => ({ ...prev, [key]: data }));
  };
  const selectedProducts = useSelector(getSelectedProducts);
  const [open, setOpen] = useState({ open: false, data: {}, type: "" });

  const handleOpen = (data, type) => setOpen({ open: true, data, type });
  const handleClose = () => setOpen({ open: false, data: {} });
  return (
    <AppBar
      position="static"
      sx={{ color: "primary.main", backgroundColor: "#000", width: "100%" }}
    >
      <Container width="100%" maxWidth="100%">
        <Toolbar disableGutters>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            columnGap={"10px"}
            width={"100%"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <Button
                variant="text"
                startIcon={
                  <KeyboardDoubleArrowLeftIcon sx={{ color: "primary.main" }} />
                }
                onClick={() => navigate(-1)}
                sx={{ py: 0, textTransform: "none", color: "#FFF" }}
              >
                Back
              </Button>
              <Divider
                orientation="vertical"
                flexItem
                variant="middle"
                sx={{ height: "25px", color: "secondary.dark" }}
              />
            </Box>

            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              columnGap={"10px"}
              flexGrow={2}
            >
              <Typography
                noWrap
                sx={{
                  // ml: 2,
                  display: { xs: "none", md: "flex" },
                  color: "common.white",
                  textDecoration: "none",
                }}
              >
                {pathname === "/productmanager"
                  ? "Create and Manage Products"
                  : "Price optimization"}
              </Typography>
              <Box display={"flex"}>
                <FormControlLabel
                  sx={{ marginLeft: 0 }}
                  control={
                    <StyledSwitch
                      checked={toolHeaderSelections.show_demand_forecast}
                      onChange={() => {
                        dispatch(
                          updateToolHeaderSelection({
                            key: "show_demand_forecast",
                            data: !toolHeaderSelections.show_demand_forecast,
                          })
                        );
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{ fontSize: "12px", color: "common.white" }}
                    >
                      With Demand Forecast
                    </Typography>
                  }
                />
                <Divider
                  orientation="vertical"
                  flexItem
                  variant="middle"
                  sx={{ height: "25px", color: "secondary.dark" }}
                />
              </Box>
            </Box>
            <Box display={"flex"} alignItems={"center"} columnGap={"10px"}>
              <StyledSearchBar
                value={filterState.search_text}
                onChange={(e) => {
                  handleChange("search_text", e.target.value);
                }}
              />
              <Box display={"flex"} alignItems={"center"} columnGap={"10px"}>
                <Typography
                  sx={{
                    color: "secondary.light",
                    fontSize: "13px",
                  }}
                >
                  Category:
                </Typography>
                <StyledDropDown
                  id="category"
                  name="category"
                  placeholder="Add Category"
                  required
                  fullWidth
                  value={filterState.category}
                  renderValue={(value) => value.name}
                  onChange={(e) => {
                    handleChange("category", e.target.value);
                  }}
                  sx={{
                    height: "32px",
                    border: `1px solid ${theme.palette.primary.main}`,
                    width: "150px",
                  }}
                >
                  <StyledMenuItem value={{ name: "All", id: "all" }}>
                    All
                  </StyledMenuItem>
                  {categoryArr.map((category) => (
                    <StyledMenuItem value={category} key={category.id}>
                      {category.name}
                    </StyledMenuItem>
                  ))}
                </StyledDropDown>
                <Button
                  variant="outlined"
                  sx={{ height: "32px", borderRadius: "8px" }}
                  startIcon={<FilterAltIcon />}
                  onClick={() => {
                    dispatch(
                      updateToolHeaderSelection({
                        key: "all",
                        data: filterState,
                      })
                    );
                  }}
                >
                  {" "}
                  Filter
                </Button>
              </Box>
            </Box>
            {pathname === "/productmanager" ? (
              <Box
                display={"flex"}
                alignItems={"center"}
                columnGap={"10px"}
                flexGrow={1}
              >
                <Divider
                  orientation="vertical"
                  flexItem
                  variant="middle"
                  sx={{ height: "25px", color: "secondary.dark" }}
                />
                <Button
                  variant="contained"
                  sx={{
                    height: "32px",
                    borderRadius: "8px",
                    textWrap: "nowrap",
                    fontSize: "10px",
                    fontWeight: "600",
                  }}
                  startIcon={<AddCircleRoundedIcon />}
                  onClick={() => {
                    handleOpen({}, "add");
                  }}
                  disabled={user?.role !== "admin"}
                >
                  Add New Prodcuts
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    height: "32px",
                    borderRadius: "8px",
                    textWrap: "nowrap",
                    fontSize: "10px",
                    fontWeight: "600",
                  }}
                  disabled={!selectedProducts.length}
                  startIcon={<AssessmentRoundedIcon />}
                  onClick={() => {
                    handleOpen(selectedProducts, "forecast");
                  }}
                >
                  Demand Forecast
                </Button>
              </Box>
            ) : null}
          </Box>
        </Toolbar>
      </Container>
      <Modal open={open.open}>
        {open.type === "forecast" ? (
          <DemandForecast open={open} handleClose={handleClose} />
        ) : (
          <AddEditProductForm open={open} handleClose={handleClose} />
        )}
      </Modal>
    </AppBar>
  );
}
export default ToolHeader;
