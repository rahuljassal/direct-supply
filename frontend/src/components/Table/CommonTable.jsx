import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Checkbox,
  IconButton,
  Modal,
  Typography,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsAllSelectedFlag,
  getSelectedProducts,
  getUpdatedProducts,
  selectAllProducts,
  selectProduct,
  selectProducts,
} from "../../redux/slices/selectionsSlice";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import {
  useDeleteProductMutation,
  useProductsQuery,
} from "../../services/productsApiSlice";
import { updateAlertInfo } from "../../redux/slices/alertSlice";
import AddEditProductForm from "../forms/ProductForm";
import { useUserInfoQuery } from "../../services/authApiSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderLeft: "1px solid #000",
  color: theme.palette.common.black,

  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: "pointer",
  backgroundColor: "#FFF",
  "&:nth-of-type(odd)": {
    backgroundColor: "#F2F2F2",
  },
}));
export default function StickyHeadTable({
  rows,
  columns,
  hidePagination,
  height,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const { data: user, isError } = useUserInfoQuery({});
  const dispatch = useDispatch();
  const seletedProducts = useSelector(getSelectedProducts);
  const isAllSelectedFlag = useSelector(getIsAllSelectedFlag);
  const updatedProducts = useSelector(getUpdatedProducts);
  const { refetch } = useProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [open, setOpen] = useState({ open: false, data: {}, type: "" });

  const handleOpen = (data, type) => setOpen({ open: true, data, type });
  const handleClose = () => setOpen({ open: false, data: {} });
  const deleteProductHandler = async (rowId) => {
    try {
      const res = await deleteProduct(rowId).unwrap();
      await refetch();
      dispatch(
        updateAlertInfo({
          open: true,
          severity: "success",
          message: res.message,
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
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: height || "65vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, textWrap: "nowrap" }}
                >
                  {column.id === "" ? (
                    <Checkbox
                      checked={isAllSelectedFlag}
                      onChange={() => {
                        dispatch(
                          selectAllProducts(rows.map((rows) => rows.id))
                        );
                      }}
                      sx={{
                        p: 0,
                        m: 0,
                        color: "primary.main",
                        "&.Mui-checked": {
                          color: "primary.main",
                        },
                      }}
                    />
                  ) : (
                    column.label
                  )}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow
                    hover
                    key={row.id}
                    onClick={() => {
                      dispatch(selectProducts(row.id));
                    }}
                  >
                    {columns.map((column) => {
                      const updatedRow = updatedProducts.find(
                        (product) => product.id === row.id
                      );
                      const value = updatedRow
                        ? updatedRow[column.id]
                        : row[column.id];
                      return (
                        <StyledTableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            color: updatedRow ? "primary.main" : "",

                            ...(column.id === "expected_demand" && {
                              bgcolor: "primary.main",
                              color: "primary.contrastText",
                              fontWeight: "600",
                            }),
                          }}
                        >
                          {column.id === "" ? (
                            <Checkbox
                              color="primary"
                              sx={{
                                p: 0,
                                m: 0,
                                ".MuiCheckbox-root": {
                                  border: "2px solid white", // Adjust the border width and color as needed
                                },
                              }}
                              checked={seletedProducts.includes(row.id)}
                            />
                          ) : column.id === "action" ? (
                            <Box
                              display={"flex"}
                              columnGap={"5px"}
                              alignItems={"center"}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <IconButton
                                onClick={async () => {
                                  handleOpen(updatedRow || row, "view");
                                }}
                              >
                                <RemoveRedEyeRoundedIcon
                                  color="action"
                                  fontSize="small"
                                />
                              </IconButton>
                              {user?.role === "admin" ? (
                                <>
                                  <IconButton
                                    onClick={async () => {
                                      handleOpen(updatedRow || row, "edit");
                                    }}
                                  >
                                    <EditRoundedIcon
                                      color="action"
                                      fontSize="small"
                                    />
                                  </IconButton>
                                  <IconButton
                                    onClick={async () =>
                                      deleteProductHandler(row.id)
                                    }
                                  >
                                    <DeleteForeverRoundedIcon
                                      color="error"
                                      fontSize="small"
                                    />
                                  </IconButton>
                                </>
                              ) : null}
                            </Box>
                          ) : column.id === "optimized_price" ? (
                            <Box
                              display={"flex"}
                              justifyContent={"space-between"}
                            >
                              <Typography
                                fontWeight={"600"}
                                color="secondary.light"
                              >
                                {column.format(row.selling_price)}
                              </Typography>
                              <Typography
                                fontWeight={"600"}
                                color="primary.main"
                              >
                                {column.format(value)}
                              </Typography>
                            </Box>
                          ) : column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {hidePagination ? null : (
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
      <Modal open={open.open}>
        <AddEditProductForm open={open} handleClose={handleClose} />
      </Modal>
    </Paper>
  );
}
