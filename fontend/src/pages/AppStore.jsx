import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  TextField
} from "@mui/material";
import axios from "axios";
import { tokens } from "../theme";
import { useTheme } from "@mui/material/styles";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";

const AppStore = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [tableHead, setTableHead] = useState([]);
  const [tableBody, setTableBody] = useState([]);
  const [Update, setUpdate] = useState(true);
  const [insert, setInsert] = useState(false);
  const [name, setName] = useState("");
  const [Qty, setQty] = useState("");
  const [Price, setPrice] = useState("");

  const username = "Merlinz";
  const password = "1234toei";
  const basicAuthHeader = "Basic " + btoa(username + ":" + password);

  useEffect(() => {
    if (Update) {
      fetchData();
    }
  }, [Update]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.153:5001/api/tabledata",
        {
          headers: {
            Authorization: basicAuthHeader
          }
        }
      );
      setTableHead(response.data.tableHead);
      setTableBody(response.data.tableBody);
      setUpdate(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUpdateClick = (row) => {
    setRowData(row);
    setOpen(true);
  };

  const handleInsert = async () => {
    try {
      // ตรวจสอบว่าข้อมูลถูกกรอกครบหรือไม่
      if (!name || !Qty || !Price) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all fields!"
        });
        return;
      }
      const response = await axios.post(
        "http://192.168.1.153:5001/api/Insert",
        {
          name: name,
          Qty: Qty,
          Price: Price
        },
        {
          headers: {
            Authorization: basicAuthHeader
          }
        }
      );
      if (response.status === 200) {
        fetchData();
        setInsert(false);
        setName("");
        setQty("");
        setPrice("");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data inserted successfully"
        });
      }
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  const handleUpdate = async () => {
    if (rowData) {
      try {
        const response = await axios.put(
          `http://192.168.1.153:5001/api/Update/${rowData.id}`,
          {
            name: rowData.name,
            Qty: rowData.Qty,
            Price: rowData.Price
          },
          {
            headers: {
              Authorization: basicAuthHeader
            }
          }
        );
        if (response.status === 200) {
          updateRowData(rowData);
          setOpen(false);
          setRowData(null);
          setUpdate(true);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Data updated successfully"
          });
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  const updateRowData = (updatedRowData) => {
    const updatedRows = tableBody.map((row) =>
      row.name === updatedRowData.name ? updatedRowData : row
    );
    setTableBody(updatedRows);
  };

  const handleCancel = () => {
    setOpen(false);
    setInsert(false);
  };

  const handleDelete = async (row) => {
    try {
      const response = await axios.delete(
        `http://192.168.1.153:5001/api/Delete/${row.id}`,
        {
          headers: {
            Authorization: basicAuthHeader
          }
        }
      );
      if (response.status === 200) {
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data deleted successfully"
        });
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="app">
      <main className="content">
        <div className="m-3">
          <div className="grid grid-rows-auto gap-3">
            <div className="self-center">Store Data</div>
            <div className="grid xs:grid-cols-5 sm:grid-cols-7 md:grid-cols-8  lg:grid-cols-10">
              <div className=" col-start-1">
                <Button
                  sx={{
                    backgroundColor: "green",
                    color: "white",
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "10px 20px"
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => setInsert(true)}
                >
                  <AddIcon sx={{ mr: "10px" }} />
                  Insert
                </Button>
              </div>
              <div className="col-start-2 col-span-2">
                <Button
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: "white",
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "10px 20px"
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={fetchData}
                >
                  <RefreshIcon sx={{ mr: "10px" }} />
                  Refresh Store
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12">
                <Box>
                  <Paper sx={{ width: "100%" }}>
                    <TableContainer sx={{ maxHeight: 500 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {tableHead.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{
                                  backgroundColor: colors.tableColor[200],
                                  border: "1px solid #ddd",
                                  color: colors.tableColor[100]
                                }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tableBody
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={row.name}
                                >
                                  {tableHead.map((column) => {
                                    const value = row[column.id];
                                    return (
                                      <TableCell
                                        key={column.id}
                                        align={column.align}
                                        sx={{
                                          width: "100px",
                                          backgroundColor:
                                            column.id === "name"
                                              ? colors.tableColor[300]
                                              : "white",
                                          color:
                                            column.id === "name"
                                              ? colors.tableColor[100]
                                              : "black",
                                          border: "1px solid #ddd"
                                        }}
                                      >
                                        {column.id === "Update" ? (
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={() =>
                                              handleUpdateClick(row)
                                            }
                                          >
                                            {column.label}
                                          </Button>
                                        ) : column.id === "Delete" ? (
                                          <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDelete(row)}
                                          >
                                            {column.label}
                                          </Button>
                                        ) : (
                                          value
                                        )}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={tableBody.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      sx={{
                        backgroundColor: "white",
                        color: "black",
                        "& .MuiToolbar-root": {
                          paddingTop: "1px"
                        },
                        "& .MuiTablePagination-selectLabel": {
                          paddingTop: "14px !important"
                        },
                        "& .MuiTablePagination-displayedRows": {
                          paddingTop: "16px !important"
                        },
                        "& .MuiSelect-select": {
                          backgroundColor: "#e8e8e8 !important"
                        }
                      }}
                      style={{ border: "1px solid #ddd" }}
                    />
                  </Paper>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Edit Data</DialogTitle>
        <DialogContent>
          {rowData ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                width: 200,
                paddingTop: 2
              }}
            >
              <TextField
                label="Name"
                value={rowData.name}
                onChange={(e) =>
                  setRowData({ ...rowData, name: e.target.value })
                }
              />
              <TextField
                label="Qty"
                value={rowData.Qty}
                onChange={(e) =>
                  setRowData({ ...rowData, Qty: e.target.value })
                }
              />
              <TextField
                label="Price"
                value={rowData.Price}
                onChange={(e) =>
                  setRowData({ ...rowData, Price: e.target.value })
                }
              />
            </Box>
          ) : (
            <Typography variant="body1">No Data</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
          <Button onClick={handleCancel} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={insert} onClose={handleCancel}>
        <DialogTitle>Insert Data</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: 200,
              paddingTop: 2
            }}
          >
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Qty"
              value={Qty}
              onChange={(e) => setQty(e.target.value)}
            />

            <TextField
              label="Price"
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInsert} color="primary">
            Insert
          </Button>
          <Button onClick={handleCancel} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AppStore;
