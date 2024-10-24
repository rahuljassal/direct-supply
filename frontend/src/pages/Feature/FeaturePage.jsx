import { Box, Button } from "@mui/material";
import React from "react";
import ToolHeader from "../../components/Header/ToolHeader";
import { useLocation } from "react-router-dom";
import {
  useProductsQuery,
  useUpdateProductsMutation,
} from "../../services/productsApiSlice";
import CommonTable from "../../components/Table/CommonTable";
import SkeletonArray from "../../components/common/SkeletonLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProducts,
  getToolHeaderSelection,
  getUpdatedProducts,
} from "../../redux/slices/selectionsSlice";
import { updateAlertInfo } from "../../redux/slices/alertSlice";
import { columns, constants } from "../../config/constants";
import { filterColumns } from "../../config/Utils";

function FeaturePage() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { data, isError, isFetching, isLoading, refetch } = useProductsQuery();
  const toolHeaderSelection = useSelector(getToolHeaderSelection);
  const updatedProducts = useSelector(getUpdatedProducts);
  const [updateProducts] = useUpdateProductsMutation();

  return (
    <Box>
      <ToolHeader />
      <Box margin={"20px"} borderRadius={"8px"}>
        {isLoading || isFetching || isError ? (
          <SkeletonArray height={50} />
        ) : (
          <>
            <CommonTable
              rows={data?.filter(
                (el) =>
                  el.name
                    .toLowerCase()
                    .includes(toolHeaderSelection.search_text.toLowerCase()) &&
                  (toolHeaderSelection.category.id === "all" ||
                    el.category_id === toolHeaderSelection.category.id)
              )}
              columns={
                pathname === "/productmanager"
                  ? filterColumns(
                      columns,
                      constants.productManagerArr,
                      toolHeaderSelection.show_demand_forecast
                    )
                  : filterColumns(columns, constants.priceOptimiserArr, false)
              }
            />
            {updatedProducts.length ? (
              <>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                  columnGap={"20px"}
                  my={1}
                >
                  <Button
                    sx={{
                      height: "32px",
                      borderRadius: "8px",
                      textWrap: "nowrap",
                      fontSize: "10px",
                      fontWeight: "600",
                    }}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{
                      height: "32px",
                      borderRadius: "8px",
                      textWrap: "nowrap",
                      fontSize: "10px",
                      fontWeight: "600",
                    }}
                    variant="contained"
                    onClick={async () => {
                      try {
                        const res = await updateProducts(
                          updatedProducts
                        ).unwrap();
                        dispatch(clearProducts());
                        await refetch();
                        dispatch(
                          updateAlertInfo({
                            open: true,
                            severity: "success",
                            message: "Products updated successfully",
                          })
                        );
                      } catch (error) {
                        dispatch(
                          updateAlertInfo({
                            open: true,
                            severity: "error",
                            message: error.data.error || `Something went wrong`,
                          })
                        );
                      }
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </>
            ) : null}
          </>
        )}
      </Box>
    </Box>
  );
}

export default FeaturePage;
