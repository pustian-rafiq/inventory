import React from "react";

const EditProductWarrenty = ({ product, register }) => {
  return (
    <>
      <h4 className="modalHeadTitle">Warrenty</h4>
      <div className="container productBox">
        {/* compresor  */}
        <div className="row mb-2">
          <div className="col-md-12 col-lg-6">
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-8 pb-2">
                <div className="row">
                  <div className=" col-md-5 input-group input-group-sm">
                    <span className="spanTitle" htmlFor="warrenty">
                      Compressor
                    </span>
                  </div>

                  <div className="col-md-7 input-group input-group-sm">
                    <input
                      type="text"
                      className="form-control productInput"
                      name="compressor_waranty"
                      {...register("compressor_warrenty")}
                      defaultValue={product && product.compressor_warrenty}
                      placeholder="compressor_waranty"
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-xs-12 col-sm-6 col-md-4 input-group input-group-sm">
               
              

                  <div className="col-md-4 input-group input-group-sm p-0">
                    <select
                      className="form-control productInput product-input-responsive"
                      name="compressor_waranty_duration"
                      defaultValue={
                        product && product.compressor_warrenty_duration
                      }
                      {...register("compressor_warrenty_duration")}
                    >
                      <option
                        value={product && product.compressor_warrenty_duration}
                      >
                        {product && product.compressor_warrenty_duration}
                      </option>
                      <option value="YEAR">Years</option>
                      <option value="MONTH">Months</option>
                      <option value="WEEK">Week</option>
                      <option value="DAY">Days</option>
                    </select>
                  </div>
 
              </div>
            </div>
          </div>

          {/* panel  */}
          <div className="col-md-12 col-lg-6">
            <div className="row">
              <div className="col-md-8 pb-2">
                <div className="row">
                  <div className="col-md-5 input-group input-group-sm">
                    <span className="spanTitle" htmlFor="warrenty">
                      Panel
                    </span>
                  </div>

                  <div className="col-md-7 input-group input-group-sm">
                    <input
                      type="text"
                      className="form-control productInput"
                      {...register("panel_warrenty")}
                      defaultValue={product && product.panel_warrenty}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 input-group input-group-sm">
                <select
                  className="form-control"
                  name="panel_warrenty_duration"
                  defaultValue={product && product.panel_warrenty_duration}
                  {...register("panel_warrenty_duration")}
                >
                  <option value={product && product.panel_warrenty_duration}>
                    {product && product.panel_warrenty_duration}
                  </option>
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
                  <div className="col-md-5 input-group input-group-sm">
                    <span className="spanTitle" htmlFor="warrenty">
                      Motor
                    </span>
                  </div>

                  <div className="col-md-7 input-group input-group-sm">
                    <input
                      type="text"
                      className="form-control productInput"
                      {...register("motor_warrenty")}
                      defaultValue={product && product.motor_warrenty}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 input-group input-group-sm">
                <select
                  className="form-control"
                  {...register("motor_warrenty_duration")}
                  defaultValue={product && product.motor_warrenty_duration}
                >
                  <option value={product && product.motor_warrenty_duration}>
                    {product && product.motor_warrenty_duration}
                  </option>
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
                  <div className="col-md-5 input-group input-group-sm">
                    <span className="spanTitle" htmlFor="warrenty">
                      Spareparts
                    </span>
                  </div>
                  <div className="col-md-7 input-group input-group-sm">
                    <input
                      type="text"
                      className="form-control productInput"
                      {...register("spare_parts_warrenty")}
                      defaultValue={product && product.spare_parts_warrenty}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 input-group input-group-sm">
                <select
                  className="form-control"
                  {...register("spare_warrenty_duration")}
                  defaultValue={product && product.spare_warrenty_duration}
                >
                  <option value={product && product.spare_warrenty_duration}>
                    {product && product.spare_warrenty_duration}
                  </option>
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
                  <div className="col-md-5 input-group input-group-sm">
                    <span className="spanTitle" htmlFor="warrenty">
                      Service
                    </span>
                  </div>
                  <div className="col-md-7 input-group input-group-sm">
                    <input
                      type="text"
                      className="form-control productInput"
                      defaultValue={product && product.service_warrenty}
                      {...register("service_warrenty")}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 input-group input-group-sm">
                <select
                  className="form-control"
                  defaultValue={product && product.service_warrenty_duration}
                  {...register("service_warrenty_duration")}
                >
                  <option>
                    {product && product.service_warrenty_duration}
                  </option>

                  <option value={product && product.service_warrenty_duration}>
                    {(product && product.service_warrenty_duration === "") ||
                    (product && product.service_warrenty_duration === null)
                      ? "--Select--"
                      : product && product.service_warrenty_duration}
                  </option>

                  <option value="MONTH">Months</option>
                  <option value="WEEK">Week</option>
                  <option value="DAY">Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Extra warrenty Field  */}
          {product && Array.isArray(product.extra_warrenty)
            ? product.extra_warrenty.map((ewf, index) => (
                <div className="col-md-6" key={index}>
                  <div className="row">
                    <div className="col-md-8 pb-2">
                      <div className="row">
                        <div className="col-md-5 input-group input-group-sm">
                          <span className="spanTitle" htmlFor="warrenty">
                            {ewf.label}
                          </span>
                        </div>
                        <div className="col-md-7 input-group input-group-sm">
                          <input
                            type="number"
                            className="form-control productInput"
                            defaultValue={ewf.v_name}
                            {...register(`${ewf.w_name}`)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 input-group input-group-sm">
                      <select
                        className="form-control"
                        defaultValue={ewf.v_duration}
                        {...register(`${ewf.w_duration_name}`)}
                      >
                        <option value={ewf.v_duration}>
                          {ewf.v_duration == "" || ewf.v_duration == null
                            ? "--Select--"
                            : ewf.v_duration}
                        </option>
                        <option value="MONTH">Months</option>
                        <option value="WEEK">Week</option>
                        <option value="DAY">Days</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </>
  );
};

export default EditProductWarrenty;
