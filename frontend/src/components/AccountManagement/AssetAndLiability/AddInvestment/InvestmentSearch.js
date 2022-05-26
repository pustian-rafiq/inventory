import React, { Fragment, useState } from "react";
import { Button, Form } from "react-bootstrap";
import CustomModal from "../../../CustomModal/CustomModal";

function InvestmentSearch({ InvestmentHeadData }) {
  //Handle All Data .. this data will come from database and will update after new data addition

  const [allData] = useState(
    InvestmentHeadData
      ? InvestmentHeadData
      : {
          id: "1",
          code: "1234",
          name: "Rahima",
        }
  );
  //State Management for Search btn
  const [showInvestmentSearchModal, setShowInvestmentSearchModal] =
    useState(false);

  const [searchInvestmentText, setSearchInvestmentText] = useState("");

  const handleClear = () => {
    setSearchInvestmentText({ searchText: "" });
  };

  //Show Company data and searches real time
  const searchDatas = allData.filter((search) => {
    return search.name
      .toLowerCase()
      .includes(searchInvestmentText.toLowerCase());
  });

  const supplierData = searchDatas.map((data, key) => {
    if (data) {
      return (
        <tr onDoubleClick={() => handleDbClick(data.code, data.name)}>
          <td>{data.code}</td>
          <td>{data.name}</td>
        </tr>
      );
    } else {
      return <p style={{ background: "red" }}>No data found</p>;
    }
  });

  //Main Form state management
  const [formData, setFormData] = useState({
    id: "1",
    code: "666",
    name: "",
  });

  // When user double one row is selected and put the value in the form

  const handleDbClick = (code, name) => {
    const newObject = formData;
    newObject.code = code;
    newObject.name = name;
    setFormData(newObject);
    setShowInvestmentSearchModal(false);
  };

  return (
    <Fragment>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
        <div className="input-group input-group-sm">
          <span className="spanTitle">Investment</span>
        </div>
      </div>
      <div className="col-xs-5 col-sm-5 col-md-3 col-lg-3 input-group input-group-sm codeBox">
        <input
          type="text"
          placeholder="Code"
          defaultValue={formData.code}
          className="form-control productInput input-group input-group-sm"
        />
      </div>
      <div
        className="col-xs-1 col-sm-1 col-md-1 col-lg-1 searchInput"
        style={{ cursor: "pointer" }}
        onClick={() => setShowInvestmentSearchModal(true)}
      >
        <span className="spanTitle searchIcon">
          <i className="fa fa-search"></i>
        </span>
      </div>
      <div className="col-xs-6 col-sm-5 col-md-4 col-lg-4 input-group input-group-sm nameBox">
        <input
          className="form-control productInput"
          type="text"
          placeholder="Name"
          defaultValue={formData.name}
        />
      </div>
      {/* Search supplier modal */}
      <CustomModal
        isOpen={showInvestmentSearchModal}
        setIsOpen={setShowInvestmentSearchModal}
        headline="Investment"
      >
        <div>
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
                            setSearchInvestmentText(e.target.value)
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
        <Button onClick={() => setShowInvestmentSearchModal(false)}>
          Close
        </Button>
      </CustomModal>
    </Fragment>
  );
}

export default InvestmentSearch;
