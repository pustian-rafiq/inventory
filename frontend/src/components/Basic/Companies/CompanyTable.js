import React, { useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import { Skeleton, Table, TableBody, TableCell, TableRow } from "@mui/material";

const CompanyTable = React.forwardRef((props, ref) => {
  const {
    companyLists,
    isActive,
    setIsActive,
    setIsSelect,
    isSelect,
    setSelectId,
    setSingleCompany,
    searchCompanyText,
  } = props;

  // Show company data
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const columns = [
    { id: "code", label: "Code", minWidth: 30 },
    { id: "name", label: "Company Name", minWidth: 30 },
  ];

  const CompanyListData = companyLists?.filter((search) => {
    return (
      search?.name.toLowerCase().includes(searchCompanyText.toLowerCase()) ||
      search?.code.toLowerCase().includes(searchCompanyText.toLowerCase())
    );
  });

  const companyData = CompanyListData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  ).map((company, index) => {
    if (company) {
      return (
        <TableRow
          hover
          tabIndex={-1}
          key={index}
          style={
            isActive === index ? {background: "rgba(180, 216, 255, 1)"}
            : { background: "" }
          }
          onClick={() => companyActive(index, company.id)}
        >
          {columns.map((column, i) => {
            const value = company[column.id];
            return (
              <TableCell
                key={i}
                style={
                  isActive === index
                  ? {
                    color: "#000",
                    fontSize: "16px",
                    fontFamily: "Times New Roman",
                  
                  
                  }
                : {
                    color: "black",
                    fontSize: "16px",
                    fontFamily: "Times New Roman",
                   
                    
                  }
                }
              >
                {value}
              </TableCell>
            );
          })}
        </TableRow>
      );
    } else {
      return "";
    }
  });
  const companyActive = (index, id) => {
    if (isActive === index) {
      setIsActive(null);
      setIsSelect(!isSelect);
    } else {
      setIsActive(index);
      setSelectId(parseInt(id));
      setIsSelect(true);
    }

    const com = companyLists.find((c) => c.id === id);

    setSingleCompany(com);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      {/* table  section is starting */}

      <TableContainer
        sx={{ maxHeight: 440 }}
        style={{ paddingLeft: "0px", paddingRight: "0px" }}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{ minWidth: 200 }}
          size="small"
        >
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "rgb(221, 221, 221)",
                    color: "#000",
                    fontSize: "16px",
                    fontFamily: "Times New Roman",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {companyData.length
              ? companyData
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
        rowsPerPageOptions={[10, 25, 100, 500, 1000]}
        component="div"
        count={CompanyListData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelRowsPerPage="Rows"
        className="product_pagination px-2"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
});

export default CompanyTable;
