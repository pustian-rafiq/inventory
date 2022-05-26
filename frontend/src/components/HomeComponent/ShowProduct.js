import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { getProductShortageList } from "../../redux/actions/productActions";
import { Skeleton } from "@mui/material";

const columns = [
  { id: "name", label: "Product Name", minWidth: 30 },
  { id: "company", label: "Company Name", minWidth: 30 },
  { id: "short", label: "Short", minWidth: 30 },
];

const ShowProduct = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [searchProductData, setSearchProductData] = useState("");

  const { user: currentUser } = useSelector((state) => state.auth);
  const { shortageProducts } = useSelector((state) => state.products);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductShortageList(headers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClear = () => {
    setSearchProductData("");
  };

  //Product Data Show
  const productlists = shortageProducts?.filter((search) => {
    return (
      search?.name?.toLowerCase().includes(searchProductData.toLowerCase()) ||
      search?.company
        ?.toLowerCase()
        .includes(searchProductData.toLowerCase()) ||
      search?.short?.toString().includes(searchProductData.toLowerCase())
    );
  });

  const productData = productlists
    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((product, i) => {
      if (product) {
        return (
          <TableRow hover tabIndex={-1} key={i}>
            {columns.map((column, i) => {
              const value = product[column.id];
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
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          border: "none",
          boxShadow: "0px 0px",
        }}
      >
        {/* search form  */}
        <form onSubmit={(e) => e.preventDefault} style={{ paddingTop: "10px" }}>
          <div className="row searchBox">
            <div className="searchInput ml-3 form-group">
              <input
                onChange={(e) => setSearchProductData(e.target.value)}
                type="text"
                value={searchProductData}
                placeholder="Search product......"
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

        {/* product table  */}
        <TableContainer
          sx={{ maxHeight: 440 }}
          style={{ paddingLeft: "0px", paddingRight: "0px" }}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            // sx={{ minWidth: 70 }}
            size="small"
          >
            <TableHead>
              <TableRow style={{ background: "red" }}>
                {columns.map((column, i) => (
                  <TableCell
                    key={i}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "rgb(69, 185, 224)",
                      color: "white",
                      fontSize: "14px",
                      textAlign: "left",
                      fontFamily: "Times New Roman",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {productData.length
                ? productData
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

        {/* pagination  */}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={productlists?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          className="product_pagination"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default ShowProduct;
