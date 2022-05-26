import moment from "moment";
import React, { useRef, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { getCashInHandReport } from "../../../../../../redux/actions/reportActions";
import swal from "sweetalert";
import CashHashTable from "./CashHashTable";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const CashInHand = ({ show, onHide }) => {
  const [tableMOdal, setTableMOdal] = useState(false);
  const [dayDate, setDayDate] = useState("");
  const [monthDate, setMonthDate] = useState("");
  const [yearDate, setYearDate] = useState("");
  const [duration, setDuration] = useState("");

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { user: currentUser } = useSelector((state) => state.auth);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.access}`,
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const dataSubmit = () => {
      dispatch(getCashInHandReport(formData, headers));
      setTableMOdal(true);
    };

    if (dayDate && duration === "day") {
      formData.append("duration", duration);
      formData.append("date", dayDate);
      dataSubmit();
    } else if (monthDate && duration === "month") {
      formData.append("duration", duration);
      formData.append("date", monthDate);
      dataSubmit();
    } else if (yearDate && duration === "year") {
      formData.append("duration", duration);
      formData.append("date", yearDate);
      dataSubmit();
    } else {
      swal("Please select date, month or year!");
    }
  };

  const handleOnClose = () => {
    setDuration("");
    setDayDate("");
    setMonthDate("");
    setYearDate("");
  };

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
      onExit={handleOnClose}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
    >
      <Modal.Header className="background_and_table_header" closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          <div>
            <h4 className=" responsive-head">Cash In Hand Report</h4>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="background_and_table_header">
        {/* Company Add Form Start Here */}

        <form className="form-horizontal" onSubmit={submitHandler}>
          <div className="container productBox custom_modal_inner_content">
            <div className="row">
              <div className="col-md-12">
                {/* input for day */}

                <div className="row my-1">
                  <div className="col-md-12 col-lg-12 flex">
                    <div className="row align-items-center">
                      <input
                        type="radio"
                        name="duraton"
                        id=""
                        value={"day"}
                        className="col-1"
                        onChange={(e) => setDuration(e.target.value)}
                      />
                      <p className="col-2 m-0">Day</p>
                      {duration === "day" && (
                        <span className="col-9 input-group-sm">
                          <input
                            type="date"
                            className="form-control productInput"
                            onChange={(e) =>
                              setDayDate(
                                moment(e.target.value).format("YYYY-MM-DD")
                              )
                            }
                          />
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-8 col-lg-8 input-group-sm">
                    {/* Date input here */}
                  </div>
                </div>

                {/* input for month */}

                <div className="row my-1">
                  <div className="col-md-12 col-lg-12 flex">
                    <div className="row align-items-center">
                      <input
                        type="radio"
                        name="duraton"
                        id=""
                        value={"month"}
                        className="col-1"
                        onChange={(e) => setDuration(e.target.value)}
                      />
                      <p className="col-2 m-0">Month</p>
                      {duration === "month" && (
                        <span className="col-9 input-group-sm">
                          <input
                            type="date"
                            className="form-control productInput"
                            onChange={(e) =>
                              setMonthDate(
                                moment(e.target.value).format("YYYY-MM-DD")
                              )
                            }
                          />
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* input for yead*/}

                <div className="row my-1">
                  <div className="col-md-12 col-lg-12 flex">
                    <div className="row align-items-center">
                      <input
                        type="radio"
                        name="duraton"
                        id=""
                        value={"year"}
                        className="col-1"
                        onChange={(e) => setDuration(e.target.value)}
                      />
                      <p className="col-2 m-0">Year</p>
                      {duration === "year" && (
                        <span className="col-9 input-group-sm">
                          <input
                            type="date"
                            className="form-control productInput"
                            onChange={(e) =>
                              setYearDate(
                                moment(e.target.value).format("YYYY-MM-DD")
                              )
                            }
                          />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btnContainer companyBox custom_modal_inner_content">
            <div className="row">
              <div className="col-md-12 pull-right">
                <Button
                  className="saveCloseBtn closebtn border-0"
                  onClick={() => {
                    onHide(false);
                  }}
                >
                  Close
                </Button>
                <Button className="saveCloseBtn border-0" type="submit">
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </form>

        <CashHashTable
          show={tableMOdal}
          onHide={() => setTableMOdal(false)}
          handlePrint={handlePrint}
          ref={componentRef}
        />

        {/* Company Add Form End Here */}
      </Modal.Body>
    </Modal>
  );
};

export default CashInHand;
