import React, { Fragment, useState } from "react";
import { Button, Form, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import CustomModal from "../../../../CustomModal/CustomModal";

//import {SupplierData} from '../../../CustomerAndSupplier/Supplier/'

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

function IncomeHeadSearch({ ExpenseIncomeData }) {

  //Handle All Data .. this data will come from database and will update after new data addition

  const [allData] = useState(
    ExpenseIncomeData
      ? ExpenseIncomeData
      : {
        id: "1234",
        code: "1234",
        name: "Ehsan",
        status: "Expense",
      }
  );
  //State Management for Search btn
  const [showIncomeHeadSearchModal, setShowIncomeHeadSearchModal] = useState(false);


  const [searchIncomeHeadText, setSearchIncomeHeadText] = useState("");

  const handleClear = () => {
    setSearchIncomeHeadText("");
  };

  //Show Company data and searches real time
  const searchDatas = allData.filter((search) => {
    return (
      search.code.toLowerCase().includes(searchIncomeHeadText.toLowerCase()) ||
      search.name.toLowerCase().includes(searchIncomeHeadText.toLowerCase())

    );
  });

  const incomeHeadData = searchDatas.map((data, key) => {
    if (data) {
      return (
        <tr onDoubleClick={() => handleDbClick(data.code, data.name)}>
          <td>{data.id}</td>
          <td>{data.code}</td>
          <td>{data.name}</td>
          <td>{data.status}</td>

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
    status: ""
  });

  // When user double one row is selected and put the value in the form

  const handleDbClick = (code, name) => {
    const newObject = formData;
    newObject.code = code;
    newObject.name = name;
    setFormData(newObject);
    setShowIncomeHeadSearchModal(false);
  };

  return (
    <Fragment>

      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
        <div className="input-group input-group-sm">
          <span className="spanTitle">Income Head</span>
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
        className="col-xs-4 col-sm-1 col-md-1 col-lg-1 searchInput"
        style={{ cursor: "pointer" }}
        onClick={() => setShowIncomeHeadSearchModal(true)}
      >
        <span className="spanTitle" className="searchIcon">
          <i className="fa fa-search"></i>
        </span>
      </div>
      <div className="col-xs-4 col-sm-5 col-md-4 col-lg-4 input-group input-group-sm nameBox">
        <input
          className="form-control productInput"
          type="text"
          placeholder="Name"
          defaultValue={formData.name}
        />

      </div>
      {/***************************Product Show modal***************************** */}
      <CustomModal isOpen={showIncomeHeadSearchModal} setIsOpen={setShowIncomeHeadSearchModal} headline='Income Head'>
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
                          onChange={(e) => setSearchIncomeHeadText(e.target.value)}
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
                            SL No.
                          </th>
                          <th className="header" scope="col">
                            Code
                          </th>
                          <th className="header" scope="col">
                            Company Name
                          </th>
                          <th className="header" scope="col">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>

                        {/* Show Product List */}

                        {incomeHeadData ? incomeHeadData : "No Data Founds!"}

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
        <Button onClick={() => setShowIncomeHeadSearchModal(false)}>
          Close
        </Button>
      </CustomModal>
    </Fragment>
  );
}

export default IncomeHeadSearch;
