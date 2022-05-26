import React, { useState } from "react";

function Warrenty({
  warantyDataList,
  newWarrenty,
  addNewWarrentyHandler,
  editWarrentyLabelHandler,
  warrentyLabelChangeHandler,
  warrentyValueChangeHandler,
  warrentyDurationChangeHandler,
  deleteNewWarrentyHandler,
}) {
  const [compressorWaranty, setCompressorWaranty] = useState("0");
  const [compressorWarantyDuration, setCompressorWarantyDuration] =
    useState("");
  const [panelWaranty, setPanelWaranty] = useState("0");
  const [panelWarantyDuration, setPanelWarantyDuration] = useState("");
  const [motorWaranty, setMotorWaranty] = useState("0");
  const [motorWarantyDuration, setMotorWarantyDuration] = useState("");
  const [sparepartWaranty, setSparepartWaranty] = useState("0");
  const [sparepartWarantyDuration, setSparepartWarantyDuration] = useState("");
  const [serviceWaranty, setServiceWaranty] = useState("0");
  const [serviceWarantyDuration, setServiceWarantyDuration] = useState("");

  const waranty = {
    compressorWaranty: compressorWaranty,
    compressorWarantyDuration: compressorWarantyDuration,
    panelWaranty: panelWaranty,
    panelWarantyDuration: panelWarantyDuration,
    motorWaranty: motorWaranty,
    motorWarantyDuration: motorWarantyDuration,
    sparepartWaranty: sparepartWaranty,
    sparepartWarantyDuration: sparepartWarantyDuration,
    serviceWaranty: serviceWaranty,
    serviceWarantyDuration: serviceWarantyDuration,
  };

  // warantyDataList(compressorWaranty,compressorWarantyDuration,panelWaranty,panelWarantyDuration,motorWaranty,motorWarantyDuration,sparepartWaranty,sparepartWarantyDuration,serviceWaranty,serviceWarantyDuration)
  warantyDataList(waranty);
  //warantyDataList(compressorWarantyDuration)

  return (
    <>
      <h4 className="modalHeadTitle">Warrenty</h4>
      <div className="container productBox">
        <div className="row mb-2">
          <div className="col-md-12 col-lg-6">
            <div className="row">
              <div className="col-md-8 pb-2 col-sm-12 col-xs-12">
                <div className="row">
                  <div className=" col-md-5 input-group input-group-sm w-res-text">
                    <span className="spanTitle" htmlFor="warrenty">
                      Compressor
                    </span>
                  </div>
                  <div className="col-md-7 input-group input-group-sm px-0">
                    <input
                      type="number"
                      className="form-control productInput"
                      name="compressor_waranty"
                      onChange={(e) => setCompressorWaranty(e.target.value)}
                      placeholder="Ex 1/2/3"
                      value={compressorWaranty}
                    />
                  </div>
                </div>
              </div>

              <div 
              className="col-md-4 input-group 
              input-group-sm
              product-input-responsive
              col-sm-12 col-xs-12">
                <select
                  className="form-control productInput"
                  name="compressor_waranty_duration"
                  value={compressorWarantyDuration}
                  onChange={(e) => setCompressorWarantyDuration(e.target.value)}
                >
                  <option value="YEAR">Years</option>
                  <option value="MONTH">Months</option>
                  <option value="WEEK">Week</option>
                  <option value="DAY">Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* panel  */}
          <div className="col-md-12 col-lg-6" >
            <div className="row">
              <div className="col-md-8 pb-2">
                <div className="row">
                  <div className="col-md-5 input-group input-group-sm w-res-text">
                    <span className="spanTitle" htmlFor="warrenty">
                      Panel
                    </span>
                  </div>
                  <div className="col-md-7 input-group input-group-sm px-0">
                    <input
                      type="number"
                      className="form-control productInput"
                      onChange={(e) => setPanelWaranty(e.target.value)}
                      name="panel_waranty"
                      placeholder="Ex 1/2/3"
                      value={panelWaranty}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4 input-group input-group-sm product-input-responsive">
                <select
                  className="form-control"
                  name="panel_waranty"
                  value={panelWarantyDuration}
                  onChange={(e) => setPanelWarantyDuration(e.target.value)}
                >
                  <option value="YEAR">Years</option>
                  <option value="MONTH">Months</option>
                  <option value="WEEK">Week</option>
                  <option value="DAY">Days</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* motor  */}
        <div className="row mb-2">
          <div className="col-md-12 col-lg-6">
            <div className="row">
              <div className="col-md-8 pb-2">
                <div className="row">
                  <div className="col-md-5 input-group input-group-sm w-res-text">
                    <span className="spanTitle" htmlFor="warrenty">
                      Motor
                    </span>
                  </div>
                  <div className="col-md-7 input-group input-group-sm px-0">
                    <input
                      type="number"
                      className="form-control productInput"
                      onChange={(e) => setMotorWaranty(e.target.value)}
                      name="motor_waranty"
                      placeholder="Ex 1/2/3"
                      value={motorWaranty}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4 input-group input-group-sm product-input-responsive">
                <select
                  className="form-control"
                  name="motor_waranty_duration"
                  value={motorWarantyDuration}
                  onChange={(e) => setMotorWarantyDuration(e.target.value)}
                >
                  <option value="YEAR">Years</option>
                  <option value="MONTH">Months</option>
                  <option value="WEEK">Week</option>
                  <option value="DAY">Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Spareparts  */}
          <div className="col-md-12 col-lg-6">
            <div className="row">
              <div className="col-md-8 pb-2">
                <div className="row">
                  <div className="col-md-5 input-group input-group-sm w-res-text">
                    <span className="spanTitle" htmlFor="warrenty">
                      Spareparts
                    </span>
                  </div>
                  <div className="col-md-7 input-group input-group-sm px-0">
                    <input
                      type="number"
                      className="form-control productInput"
                      onChange={(e) => setSparepartWaranty(e.target.value)}
                      name="sparepart_waranty"
                      placeholder="Ex 1/2/3"
                      value={sparepartWaranty}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4 input-group input-group-sm product-input-responsive">
                <select
                  className="form-control"
                  name="sparepart_waranty_duration"
                  value={sparepartWarantyDuration}
                  onChange={(e) => setSparepartWarantyDuration(e.target.value)}
                >
                  <option value="YEAR">Years</option>
                  <option value="MONTH">Months</option>
                  <option value="WEEK">Week</option>
                  <option value="DAY">Days</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Service  */}
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-8 pb-2">
                <div className="row">
                  <div className="col-md-5 input-group input-group-sm w-res-text">
                    <span className="spanTitle" htmlFor="warrenty">
                      Service
                    </span>
                  </div>
                  <div className="col-md-7 input-group input-group-sm px-0">
                    <input
                      type="number"
                      className="form-control productInput"
                      name="service_waranty"
                      placeholder="Ex 1/2/3"
                      value={serviceWaranty}
                      onChange={(e) => setServiceWaranty(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4 input-group input-group-sm product-input-responsive">
                <select
                  className="form-control"
                  name="service_waranty_duration"
                  value={serviceWarantyDuration}
                  onChange={(e) => setServiceWarantyDuration(e.target.value)}
                >
                  <option value="YEAR">Years</option>
                  <option value="MONTH">Months</option>
                  <option value="WEEK">Week</option>
                  <option value="DAY">Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* add extra new warrenty  */}
          {newWarrenty.map((warrenty, index) => (
            <div className="col-md-6" key={index}>
              <div className="row">
                <div className="col-md-7">
                  <div className="row">
                    {/* label  */}
                    <div className="col-md-5 input-group input-group-sm spanTitle ">
                      {warrenty.status ? (
                        <span
                          onClick={() => editWarrentyLabelHandler(warrenty.id)}
                          className="text-capitalize"
                        >
                          {warrenty.label}
                        </span>
                      ) : (
                        <input
                          type="text"
                          onBlur={() => editWarrentyLabelHandler(warrenty.id)}
                          onChange={(e) =>
                            warrentyLabelChangeHandler(e, warrenty.id)
                          }
                          className="form-control productInput input-sm w-100 mb-2"
                          name="editable_label_name"
                          placeholder={warrenty.placeHolder1}
                        />
                      )}
                    </div>

                    {/* value  */}
                    <div className="col-md-7 input-group input-group-sm p-0">
                      <input
                        type="number"
                        onChange={(e) =>
                          warrentyValueChangeHandler(e, warrenty.id)
                        }
                        className="form-control productInput input-sm mb-2 "
                        id="warningQty"
                        name={warrenty.w_name}
                        placeholder={warrenty.placeHolder2}
                        defaultValue={warrenty.v_name}
                      />
                    </div>
                  </div>
                </div>

                {/* duration  */}
                <div className="col-md-4 input-group input-group-sm pr-0 
                product-input-responsive w-res-text" >
                  <select
                    className="form-control"
                    onChange={(e) =>
                      warrentyDurationChangeHandler(e, warrenty.id)
                    }
                    name={warrenty.w_duration_name}
                    value={warrenty.v_duration}
                  >
                    <option value="YEAR">Years</option>
                    <option value="MONTH">Months</option>
                    <option value="WEEK">Week</option>
                    <option value="DAY">Days</option>
                  </select>
                </div>

                {/* cross button  */}
                {warrenty.id !== 1 && (
                  <div className="col-md-1 input-group input-group-sm m-0 p-0 d-flex align-items-start">
                    <button
                      type="button"
                      style={{
                        backgroundColor: "transparent",
                      }}
                    >
                      <i
                        className="fa fa-close ml-0"
                        onClick={() => deleteNewWarrentyHandler(warrenty.id)}
                        style={{
                          cursor: "pointer",
                          padding: "5px",
                          backgroundColor: "white",
                          color: "black",
                          fontSize: "12px",
                          borderRadius: "50%",
                        }}
                      ></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={addNewWarrentyHandler}
          >
            + Add New
          </button>
        </div>
      </div>
    </>
  );
}

export default Warrenty;
