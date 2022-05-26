import React from "react";

function Reference() {
  return (
    <>
      <h4 className="modalHeadTitle">Reference Information</h4>
      <div className="container productBox">
        <div className="row ">
          <div className="col-md-12 col-lg-6">
            <div className="row mb-2">
              <div className="col-md-12 col-lg-4 input-group input-group-sm">
                <span className="spanTitle" for="warningQty">
                  Ref. Name
                </span>
              </div>
              <div className="col-md-12 col-lg-8 input-group input-group-sm">
                <input
                  type="text"
                  className="form-control productInput  "
                  id="warningQty"
                  placeholder="Enter address"
                />
              </div>
            </div>
          </div>

          <div className="col-md-12 col-lg-6">
            <div className="row mb-2">
              <div className="col-md-12 col-lg-4 input-group input-group-sm">
                <span className="spanTitle" for="warningQty">
                  Contact
                </span>
              </div>
              <div className="col-md-12 col-lg-8 input-group input-group-sm">
                <input
                  type="text"
                  className="form-control productInput input-sm"
                  id="warningQty"
                  placeholder="Enter contact"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 col-lg-6">
            <div className="row mb-2">
              <div className="col-md-12 col-lg-4 input-group input-group-sm">
                <span className="spanTitle" for="warningQty">
                  Father Name
                </span>
              </div>
              <div className="col-md-12 col-lg-8 input-group input-group-sm">
                <input
                  type="text"
                  className="form-control productInput input-sm"
                  id="warningQty"
                  placeholder="Enter father name"
                />
              </div>
            </div>
          </div>

          <div className="col-md-12 col-lg-6"></div>
        </div>

        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="row mb-2">
              <div className="col-md-12 col-lg-2 input-group input-group-sm">
                <span className="spanTitle" for="warningQty">
                  Address
                </span>
              </div>
              <div className="col-md-12 col-lg-10 input-group input-group-sm">
                <textarea
                  type="text"
                  className="form-control productInput input-sm"
                  style={{
                    border: "1px solid none",
                    padding: "10px",
                    resize: "both",
                    overflow: "auto",
                  }}
                  id="warningQty"
                  placeholder="Enter address"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reference;
