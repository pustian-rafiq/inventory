import React, { useEffect, useState } from "react";
import ShowProduct from "./ShowProduct";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { getCreditSaleCustomer } from "../../redux/actions/creditSales";
import { Skeleton } from "@mui/material";

const columns = [
  { id: "credit_sale__customer__code", label: "Code", minWidth: 30 },
  { id: "credit_sale__customer__name", label: "Customer Name", minWidth: 30 },
  { id: "credit_sale__customer__contact_no", label: "Contact", minWidth: 30 },
  { id: "credit_sale__customer__address", label: "Address", minWidth: 30 },
  {
    id: "amount",
    label: "Amount",
    minWidth: 30,
    format: (value) => value.toFixed(2),
  },
  { id: "type", label: "S.Type", minWidth: 30 },
];

const ShowCustomer = () => {
  const [searchTextData, setSearchText] = useState("");

  const { user: currentUser } = useSelector((state) => state.auth);

  const { creditsales_customer_list } = useSelector(
    (state) => state.creditsales
  );

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCreditSaleCustomer(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClear = () => {
    setSearchText("");
  };

  //Show Customer data and searches real time
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Product Data Show
  const customerlists = creditsales_customer_list[0]?.filter((search) => {
    return (
      search?.credit_sale__customer__name
        ?.toLowerCase()
        .includes(searchTextData.toLowerCase()) ||
      search?.credit_sale__customer__code
        ?.toLowerCase()
        .includes(searchTextData.toLowerCase()) ||
      search?.type?.toLowerCase().includes(searchTextData.toLowerCase())
    );
  });

  const customerData = customerlists
    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((customer, i) => {
      if (customer) {
        return (
          <TableRow hover tabIndex={-1} key={i}>
            {columns.map((column, i) => {
              const value = customer[column.id];
              return (
                <TableCell
                  key={i}
                  style={{ fontSize: "14px", fontFamily: "Times New Roman" }}
                >
                  {column.format && typeof value === "number"
                    ? column.format(value)
                    : value}
                </TableCell>
              );
            })}
          </TableRow>
        );
      } else {
        return "";
      }
    });

  return (
    <div>
      <div
        className="row mx-0 justify-content-center"
        style={{ backgroundColor: "#DDDDDD" }}
      >
        <div className="p-3 showBox1 mx-2 my-5">
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              border: "none",
              boxShadow: "0px 0px",
            }}
          >
            <form
              onSubmit={(e) => e.preventDefault}
              style={{ paddingTop: "10px" }}
            >
              <div className="row searchBox">
                <div className="searchInput ml-3 form-group">
                  <input
                    className=""
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    value={searchTextData}
                    placeholder="Search customer......"
                  />
                </div>
                <div className="clearBtn">
                  <button
                    type="reset"
                    onClick={handleClear}
                    className="rounded-pill bg-warning text-dark"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </form>

            <TableContainer
              sx={{ maxHeight: 440 }}
              style={{
                paddingLeft: "0px",
                paddingRight: "0px",
                border: "none",
              }}
            >
              <Table
                stickyHeader
                aria-label="a dense table"
                sx={{ minWidth: 600 }}
                size="small"
              >
                <TableHead>
                  <TableRow>
                    {columns.map((column, i) => (
                      <TableCell
                        key={i}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          backgroundColor: "rgb(69,184,224)",
                          color: "white",
                          fontSize: "15px",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customerData
                    ? customerData
                    : columns.map((column, i) => (
                        <TableCell key={i} align={column.align}>
                          <Skeleton animation="wave" />
                          <Skeleton animation="wave" />
                          <Skeleton animation="wave" />
                        </TableCell>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={customerlists?.length ? customerlists?.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              className="product_pagination"
              style={{
                paddingLeft: "0px",
                paddingRight: "0px",
                border: "none",
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>

        {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="https://imsmedia.s3.ap-south-1.amazonaws.com/media/assets/loading_icon.svg"
              alt=""
            />
          </div> */}

        <div className="p-3 showBox2 mx-2 my-5">
          <ShowProduct />
        </div>
      </div>
    </div>
  );
};

export default ShowCustomer;
