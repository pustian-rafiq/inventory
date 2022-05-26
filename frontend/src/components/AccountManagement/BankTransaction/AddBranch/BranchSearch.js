import React, { Fragment, useState } from "react";
import { Button, Form } from "react-bootstrap";
import CustomModal from "../../../CustomModal/CustomModal";

function AddSupplier({ SupplierData }) {
  //Handle All Data .. this data will come from database and will update after new data addition

  const [allData] = useState(
    SupplierData
      ? SupplierData
      : {
          id: "1",
          code: "1234",
          name: "Rahima",
          address: "",
          contactNo: "",
          totalDue: "",
        }
  );
  //State Management for Search btn
  const [showSupplierSearchModal, setShowSupplierSearchModal] = useState(false);

  const [searchSupplierText, setSearchSupplierText] = useState("");

  const handleClear = () => {
    setSearchSupplierText({ searchText: "" });
  };

  //Show Company data and searches real time
  const searchDatas = allData.filter((search) => {
    return search.name.toLowerCase().includes(searchSupplierText.toLowerCase());
  });

  const supplierData = searchDatas.map((data, index) => {
    if (data) {
      return (
        <tr onDoubleClick={() => handleDbClick(data.code, data.name)} key={index}>
          <td>{data.code}</td>
          <td>{data.name}</td>
          <td>{data.address}</td>
          <td>{data.contactNo}</td>
          <td>{data.totalDue}</td>
        </tr>
      );
    } else {
      return <p style={{ background: "red" }}>No data found</p>;
    }
  });

  //Main Form state management
  const [formData, setFormData] = useState({
    id: "",
    code: "",
    name: "",
    address: "",
    contactNo: "",
    totalDue: "",
  });

  // When user double one row is selected and put the value in the form

  const handleDbClick = (code, name) => {
    const newObject = formData;
    newObject.code = code;
    newObject.name = name;
    setFormData(newObject);
    setShowSupplierSearchModal(false);
  };

  return (
    <Fragment>
      <div className="col-lg-3">
        <div className="input-group input-group-sm">
          <span className="spanTitle">Supplier</span>
        </div>
      </div>
      <div className="col-xs-3 col-sm-3 col-lg-3 input-group input-group-sm codeBox">
        <input
          type="text"
          placeholder="Code"
          defaultValue={formData.code}
          className="form-control productInput input-group input-group-sm"
        />
      </div>
      <div
        className="col-xs-3 col-sm-1 col-lg-1 searchInput"
        style={{ cursor: "pointer" }}
        onClick={() => setShowSupplierSearchModal(true)}
      >
        <span className="searchIcon">
          <i className="fa fa-search"></i>
        </span>
      </div>
      <div className="col-xs-3 col-sm-4 col-lg-5 input-group input-group-sm nameBox">
        <input
          className="form-control productInput"
          type="text"
          placeholder="Name"
          defaultValue={formData.name}
        />
      </div>
      {/* Search supplier modal */}
      <CustomModal
        isOpen={showSupplierSearchModal}
        setIsOpen={setShowSupplierSearchModal}
        headline="All Suppliers"
      >
        <div style={{ background: "var(--modalBodyColor)" }}>
          <Form>
            <div className="container-fluid ">
              <div className="row">
                <div className="col-md-12 pt-3 ml-1 showBox1">
                  <form onSubmit={(e) => e.preventDefault}>
                    <div className="row">
                      <div className="col-8  form-group">
                        <input
                          className="searchBox form-control"
                          placeholder="Enter name or address"
                          onChange={(e) =>
                            setSearchSupplierText(e.target.value)
                          }
                          type="text"
                        />
                      </div>
                      <div className="col-4">
                        <button className="findBtn" type="submit">
                          Find
                        </button>
                        <button
                          className="clearBtn"
                          type="reset"
                          onClick={handleClear}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="tableContainer table-responsive">
                    <table className="table">
                      <thead
                        style={{ position: "sticky", top: 0 }}
                        className="thead-dark"
                      >
                        <tr style={{ height: "5px", fontSize: "12px" }}>
                          <th className="header" scope="col">
                            Code
                          </th>
                          <th className="header" scope="col">
                            Name
                          </th>
                          <th className="header" scope="col">
                            Address
                          </th>
                          <th className="header" scope="col">
                            Contact No
                          </th>
                          <th className="header" scope="col">
                            Total Due
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show Company List */}
                        {supplierData ? supplierData : "No Data Founds!"}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
        <Button onClick={() => setShowSupplierSearchModal(false)}>Close</Button>
      </CustomModal>
    </Fragment>
  );
}

export default AddSupplier;
