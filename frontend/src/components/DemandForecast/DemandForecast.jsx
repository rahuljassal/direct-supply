import { Box, IconButton, Typography, alpha } from "@mui/material";
import React from "react";
import { columns, constants, style } from "../../config/constants";
import CloseIcon from "@mui/icons-material/Close";
import {
  getSelectedProducts,
  getToolHeaderSelection,
} from "../../redux/slices/selectionsSlice";
import {
  useGenerateDemandForecastQuery,
  useProductsQuery,
} from "../../services/productsApiSlice";
import { useSelector } from "react-redux";
import CommonTable from "../Table/CommonTable";
import PriceDemandChart from "./PriceDemandChart";
import { filterColumns } from "../../config/Utils";
function DemandForecast({ open, handleClose }) {
  const { data } = useProductsQuery();
  const tableData = data.filter((el) =>
    useSelector(getSelectedProducts).includes(el.id)
  );
  return (
    <Box
      sx={{
        ...style,
        width: "80%",
        height: "80%",
        p: 0,
        bgcolor: "secondary.dark",
      }}
    >
      <Box
        padding={"5px 15px"}
        sx={{ background: "#000" }}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        {" "}
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Demand Forecast
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{
            color: "#fff",
            fontWeight: "bold",
            ":hover": {
              background: alpha("#fff", 0.2),
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box p={"10px"} display={"flex"} flexDirection={"column"} rowGap={"10px"}>
        <Box sx={{ background: "#000", height: "40vh", borderRadius: 2 }}>
          <PriceDemandChart />
        </Box>
        <Box sx={{ background: "#000", height: "30vh", borderRadius: 2 }}>
          {" "}
          <CommonTable
            rows={tableData}
            columns={filterColumns(columns, constants.demandForcastArr, true)}
            hidePagination={true}
            height={"30vh"}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default DemandForecast;
