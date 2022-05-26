import React, { Fragment, useState } from "react";

function ProductList({ productList }) {
  const [searchProductData, setSearchProductData] = useState("");

  const handleClear = () => {
    setSearchProductData("");
  };

  //Product Data Show
  const productlists = productList.filter((search) => {
    return (
      search.productName
        .toLowerCase()
        .includes(searchProductData.toLowerCase()) ||
      search.compnayName.toLowerCase().includes(searchProductData.toLowerCase())
    );
  });
var count=0
  const companyData = productlists.map((data, index) => {
    ++count
    if (data) {
      return (
        <tr style={{ height: "5px", fontSize: "13px" }} key={index}>
          <td>{data.productName}</td>
          <td>{data.compnayName}</td>
          <td>{data.short}</td>
        </tr>
      );
    } else {
      return <tr>gdfgfg</tr>;
    }
  });

  return (
    <Fragment>
      <form onSubmit={(e) => e.preventDefault}>
        <div className="row">
          <div className="col-8  form-group">
            <input
              className="searchBox"
              onChange={(e) => setSearchProductData(e.target.value)}
              type="text"
              value={searchProductData}
              placeholder="Enter name or address"
            />
          </div>
          <div className="col-4">
            <button className="findBtn" type="submit">
              Find
            </button>
            <button className="clearBtn" type="reset" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
      </form>
      <div className="table-responsive-sm tableContainer table-wrapper-scroll-y my-custom-scrollbar">
        <table className="table table-bordered fixTableHead">
          <thead className="thead-dark ">
            <tr style={{ height: "5px", fontSize: "15px" }}>
              <th>Product Name</th>
              <th>Company Name</th>
              <th>Short</th>
            </tr>
          </thead>
          <tbody>{companyData}</tbody>
        </table>
      </div>

               
        <div className="printBtn pull-left">
            <button className=" btn btn-danger" type="button">
              Print
            </button>
            <span className="spanTitle" >Total: {count>9? `${count} rows` : `${count} row`} </span>
          </div>
    </Fragment>
  );
}

export default ProductList;
