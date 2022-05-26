/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addProductData,
  getProductLists,
} from "../../../redux/actions/productActions";
import CategoryShowModal from "./SearchCategory/CategoryShowModal";
import ColorShowModal from "./SearchColor.js/ColorShowModal";
import CompanyShowModal from "./SearchCompany/CompanyShowModal";
import Warrenty from "./Warrenty";

class DraggableModal extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

const AddProduct = ({ show, onHide }) => {
 // var autoIncrementCode = Math.floor(Math.random() * 10000) + 1;
  //console.log(autoIncrementCode)

 // const { products } = useSelector((state) => state.products);
  //Get the last id for product data
  // const len = products.length;
  // const lastId = products.slice(0, len - (len - 1)).map((data) => {
  //   return data.id;
  // });
  
  // Declare product filed state
  const [getCompnayId, setGetCompnayId] = useState("");
  const [getCompnayName, setGetCompnayName] = useState("");
  const [getCategoryId, setGetCategoryId] = useState("");
  const [getCategoryName, setGetCategoryName] = useState("");
  const [getColorId, setGetColorId] = useState("");

  const [code, setCode] = useState(Math.floor(Math.random() * 10000) + 1);
  const [productType, setProductType] = useState("Serial_No");
  const [name, setName] = useState("");
  const [warningQty, setWarningQty] = useState("");
  const [picturePath, setPicturePath] = useState("");

  //Waranty Information state
  const [compressorWaranty, setCompressorWaranty] = useState("");
  const [compressorWarantyDuration, setCompressorWarantyDuration] =
    useState("");
  const [panelWaranty, setPanelWaranty] = useState("");
  const [panelWarantyDuration, setPanelWarantyDuration] = useState("");
  const [motorWaranty, setMotorWaranty] = useState("");
  const [motorWarantyDuration, setMotorWarantyDuration] = useState("");
  const [sparepartWaranty, setSparepartWaranty] = useState("");
  const [sparepartWarantyDuration, setSparepartWarantyDuration] = useState("");
  const [serviceWaranty, setServiceWaranty] = useState("");
  const [serviceWarantyDuration, setServiceWarantyDuration] = useState("");
  const [newFeatures, setNewFeatures] = useState([
    {
      id: 1,
      label: "New Feature 1",
      name: "new_feature_1",
      placeHolder1: "Feature Name",
      placeHolder2: "Feature Value",
      value: "",
      status: true,
    },
  ]);

  const [newWarrenty, setNewWarrenty] = useState([
    {
      id: 1,
      label: "Warrenty 1",
      w_name: "w_name_1",
      w_duration_name: "w_duration_name_1",
      placeHolder1: "Warrenty Name",
      placeHolder2: "Ex 1/2/3",
      v_name: "",
      v_duration: "",
      status: true,
    },
  ]);
  useEffect(() => {
    dispatch(getProductLists(headers));  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();

  //Pass headers for authorized user access
  const { user: currentUser } = useSelector((state) => state.auth);

  // Pass multipart/form-data for file uploading
  const headers = {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${currentUser.access}`,
  };

  // new features handler
  const addNewFeaturesHandler = () => {
    setNewFeatures([
      ...newFeatures,
      {
        id: newFeatures.length + 1,
        label: `New Feature ${newFeatures.length + 1}`,
        name: `new_feature_${newFeatures.length + 1}`,
        placeHolder1: "Feature Name",
        placeHolder2: "Feature Value",
        value: "",
        status: true,
      },
    ]);
  };

  // edit label handler
  const editLabelHandler = (id) => {
    let index = newFeatures.findIndex((item) => item.id == id);
    const againNewFt = [...newFeatures];

    if (againNewFt[index].status === true) {
      againNewFt[index].status = false;
    } else {
      againNewFt[index].status = true;
    }

    setNewFeatures([...againNewFt]);
  };

  // label change handler
  const labelChangeHandler = (e, id) => {
    let labelIndex = newFeatures.findIndex((item) => item.id == id);
    const againNewFeat = [...newFeatures];
    againNewFeat[labelIndex].label = e.target.value;
    setNewFeatures([...againNewFeat]);
  };

  // new features value change handler
  const valueChangeHandler = (e, id) => {
    let valueIndex = newFeatures.findIndex((item) => item.id == id);
    const newFeatValue = [...newFeatures];
    newFeatValue[valueIndex].value = e.target.value;
    setNewFeatures([...newFeatValue]);
  };

  // delete new features handler
  const deleteNewFeaturesHandler = (id) => {
    //console.log("delete new features :: ", id);
    let featuresAfterDelete = newFeatures.filter((item) => item.id !== id);

   // console.log("array after delete :: ", featuresAfterDelete);

    featuresAfterDelete.forEach((item) => {
      if (item.id > id) {
        item.id = item.id - 1;
        item.label = `New Feature ${item.id}`;
        item.name = `new_feature_${item.id}`;
      }
    });

    setNewFeatures([...featuresAfterDelete]);
  };

  // new warrenty handler
  const addNewWarrentyHandler = () => {
    setNewWarrenty([
      ...newWarrenty,
      {
        id: newWarrenty.length + 1,
        label: `Warrenty ${newWarrenty.length + 1}`,
        w_name: `w_name_${newWarrenty.length + 1}`,
        w_duration_name: `w_name_duration_${newWarrenty.length + 1}`,
        placeHolder1: "warrenty name",
        placeHolder2: "Ex 1/2/3",
        v_name: "",
        v_duration: "",
        status: true,
      },
    ]);
  };

  // edit warrenty label handler
  const editWarrentyLabelHandler = (id) => {
    //console.log("edit warrenty handler", id);

    let W_index = newWarrenty.findIndex((item) => item.id == id);
    const againNewWarrenty = [...newWarrenty];

    if (againNewWarrenty[W_index].status === true) {
      againNewWarrenty[W_index].status = false;
    } else {
      againNewWarrenty[W_index].status = true;
    }

    setNewWarrenty([...againNewWarrenty]);
  };

  // warrenty label change handler
  const warrentyLabelChangeHandler = (e, id) => {
    console.log("warrenty label change handler");

    let w_labelIndex = newWarrenty.findIndex((item) => item.id == id);
    const againNewWarr = [...newWarrenty];
    againNewWarr[w_labelIndex].label = e.target.value;
    setNewWarrenty([...againNewWarr]);
  };

  // warrenty value change handler
  const warrentyValueChangeHandler = (e, id) => {
    //console.log("value", id, e.target.value);

    let vNameIndex = newWarrenty.findIndex((item) => item.id == id);
    const newWarrentyValue = [...newWarrenty];
    newWarrentyValue[vNameIndex].v_name = e.target.value;
    setNewWarrenty([...newWarrentyValue]);
  };

  // warrenty duration value change handler
  const warrentyDurationChangeHandler = (e, id) => {
    console.log("duration", id, e.target.value);

    let vDurationIndex = newWarrenty.findIndex((item) => item.id == id);
    const newWarrentyDuration = [...newWarrenty];
    newWarrentyDuration[vDurationIndex].v_duration = e.target.value;
    setNewWarrenty([...newWarrentyDuration]);
  };

  // delete warrenty handler
  const deleteNewWarrentyHandler = (id) => {
    //console.log("delete new warrenty :: ", id);
    let warrentyAfterDelete = newWarrenty.filter((item) => item.id !== id);

   // console.log("array after delete :: ", warrentyAfterDelete);

    warrentyAfterDelete.forEach((item) => {
      if (item.id > id) {
        item.id = item.id - 1;
        item.label = `Warrenty ${item.id}`;
        item.w_name = `w_name_${item.id}`;
        item.w_duration_name = `w_name_duration_${item.id}`;
      }
    });

    setNewWarrenty([...warrentyAfterDelete]);
  };

  //Create form data object and append all field value into its
  const formData = new FormData();

  formData.append("code", 'pc-'+code);
  formData.append("company", getCompnayId);
  formData.append("comp_name", getCompnayName);
  formData.append("category", getCategoryId);
  formData.append("categ_name", getCategoryName);
  formData.append("color", getColorId);
  formData.append("product_type", productType);
  formData.append("name", name);
  formData.append("warning_qty", warningQty);
  formData.append("picture_path", picturePath);
  formData.append("compressor_warrenty", compressorWaranty);
  formData.append("compressor_warrenty_duration", compressorWarantyDuration);
  formData.append("panel_warrenty", panelWaranty);
  formData.append("panel_warrenty_duration", panelWarantyDuration);
  formData.append("motor_warrenty", motorWaranty);
  formData.append("moto_warrenty_duration", motorWarantyDuration);
  formData.append("spare_parts_warrenty", sparepartWaranty);
  formData.append("spare_warrenty_duration", sparepartWarantyDuration);
  formData.append("service_warrenty", serviceWaranty);
  formData.append("service_warrenty_duration", serviceWarantyDuration);

  // new features
  formData.append("extra_field", JSON.stringify(newFeatures));
  formData.append("extra_warrenty", JSON.stringify(newWarrenty));

  //Get product code for validation
 // const productCode = products.find((b) => b.code === code);
  const productHandleSubmit = (e) => {
    e.preventDefault();
    if (!code) {
      toast.warn("Product code must be selected!");
    } else if (!getCompnayId || !getCategoryId || !getColorId) {
      toast.warn("Company, Category and Color msut be selected!");
    }else if(!name){
      toast.warn("Product name must be selected!");
    }else if(!productType){
      toast.warn("Please select product type!");
    } else {
      dispatch(addProductData(formData, headers));
      toast.success("Product is adding...");
      reset();
      onHide();
    }
  };

  // Image Preview code
  const [imagePreview, setImagePreview] = useState({ file: null });
  const handleChange = (event) => {
    setPicturePath(event.target.files[0]);
    setImagePreview({
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  // Get id from the child component
  const companyIdHandler = (compnayID, companyName) => {
    setGetCompnayId(compnayID);
    setGetCompnayName(companyName);
  };
  const categoryIdHandler = (categoryId, categoryName) => {
    setGetCategoryId(categoryId);
    setGetCategoryName(categoryName);
  };
  const colorIdHandler = (colorId) => {
    setGetColorId(colorId);
  };
 // Product code handler 
  const codeHandler = (e) => {
    setCode(e.target.value)
    //const prodCode = e.target.value
   // const checkCode = prodCode ? prodCode : code;
    // const code = products.find(
    //   (b) => b.code === prodCode
    // );
    // if (code && code.code === prodCode) {
    //   toast.warn("This product code already exists!");
    // }
  };

  // Get form field data from the child component --- Warrenty.js
  const warantyHandler = (warantyDataList) => {
    setCompressorWaranty(warantyDataList.compressorWaranty);
    setCompressorWarantyDuration(warantyDataList.compressorWarantyDuration);
    setPanelWaranty(warantyDataList.panelWaranty);
    setPanelWarantyDuration(warantyDataList.panelWarantyDuration);
    setMotorWaranty(warantyDataList.motorWaranty);
    setMotorWarantyDuration(warantyDataList.motorWarantyDuration);
    setSparepartWaranty(warantyDataList.sparepartWaranty);
    setSparepartWarantyDuration(warantyDataList.sparepartWarantyDuration);
    setServiceWaranty(warantyDataList.serviceWaranty);
    setServiceWarantyDuration(warantyDataList.serviceWarantyDuration);
  };

 
  const reset = () => {
     setProductType("Serial_No")
     setWarningQty("")
     setName("")
     setCode(Math.floor(Math.random() * 10000) + 1)
  };
  
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      backdrop="static"
      keyboard="false"
      dialogAs={DraggableModal}
    >
   
        <Modal.Header style={{ cursor: "move" }} className="background_and_table_header">
          <div >
            <h4 className="responsive-head">Add Product</h4>
          </div>
          <div className="pull-right">
            <i
              className="fa fa-close"
              onClick={onHide}
              style={{ cursor: "pointer", padding: "2px" }}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body className="background_and_table_header">
          <div className="custom_modal_inner_content">
          {/***************** Company Add Form Start Here ***************************/}

          <form className="form-horizontal">
            <div className="container productBox">
              <div className="row">
                <div className="col-md-12 col-lg-9">
                  <div className="row  mb-2">
                    <div className="col-md-3">
                      <span className="spanTitle" htmlFor="code">
                        Code *
                      </span>
                    </div>
                    <div className="col-md-9 input-group input-group-sm">
                      <input
                        type="text"
                        required
                        className="form-control productInput"
                        id="code"
                        placeholder="Enter product code"
                        name="code"
                        onChange={codeHandler}
                        value={code}
                      />
                    </div>
                  </div>
                  {/***************** Show Company Search Component--- get the companyID ***************************/}
                  <div className="row mb-2">
                    <div className="col-md-3 ">
                      <span className="spanTitle" htmlFor="company">
                        Company *
                      </span>
                    </div>

                    <div className="col-md-9">
                      {/* Show Company Search Component */}
                      <CompanyShowModal companyId={companyIdHandler} />
                    </div>
                  </div>

                  {/****************Show Category Add and Search Component --- get categoryId ***************/}
                  <div className="row mb-2">
                    <div className="col-md-3">
                      <span className="spanTitle" htmlFor="category">
                        Category *
                      </span>
                    </div>
                    <div className="col-md-9  input-group input-group-sm">
                      <CategoryShowModal categoryId={categoryIdHandler} />
                    </div>
                  </div>

                  {/*************** Show Color Add and Search Component-- get colorId ********************/}
                  <div className="row mb-2">
                    <div className="col-md-3">
                      <span className="spanTitle" htmlFor="category">
                        Color
                      </span>
                    </div>
                    <div className="col-md-9  input-group input-group-sm">
                      <ColorShowModal colorId={colorIdHandler} />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-md-3 input-group input-group-sm">
                      <span className="spanTitle" htmlFor="text">
                        Product Type *
                      </span>
                    </div>
                    <div className="col-md-9  input-group input-group-sm">
                      <select
                        className="form-control productInput input-sm"
                        name="product_type"
                        required
                         value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                      >
                        {/* <option value="" selected="selected" hidden="hidden">
                          Choose here
                        </option> */}
                        <option value="Serial_No">SerialNo</option>
                        <option value="Bar_Code">BarCode</option>
                        <option value="No_Bar_Code">NoBarCode</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-md-3 input-group input-group-sm">
                      <span className="spanTitle" htmlFor="modelName">
                        Product Name *
                      </span>
                    </div>
                    <div className="col-md-9  input-group input-group-sm">
                      <input
                        type="text"
                        required
                        className="form-control productInput input-sm"
                        id="modelName"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Product Name"
                      />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-md-3 input-group input-group-sm">
                      <span className="spanTitle" htmlFor="warningQty">
                        Warning Qty *
                      </span>
                    </div>
                    <div className="col-md-9 input-group input-group-sm">
                      <input
                        type="number"
                        required
                        className="form-control productInput input-sm"
                        id="warningQty"
                        name="warning_qty"
                        onChange={(e) => setWarningQty(e.target.value)}
                        value={warningQty}
                        placeholder="Ex 100"
                      />
                    </div>
                  </div>

                  {/* new features  */}
                  {newFeatures.map((newInputField, index) => (
                    <div className="row mb-2" key={index}>
                      {/* label  */}
                      <div className="col-md-3 input-group input-group-sm">
                        {newInputField.status ? (
                          <span
                            onClick={() => editLabelHandler(newInputField.id)}
                            className="spanTitle text-capitalize"
                          >
                            {newInputField.label}
                          </span>
                        ) : (
                          <input
                            type="text"
                            onBlur={() => editLabelHandler(newInputField.id)}
                            onChange={(e) =>
                              labelChangeHandler(e, newInputField.id)
                            }
                            className="form-control productInput input-sm"
                            name="editable_label_name"
                            placeholder={newInputField.placeHolder1}
                          />
                        )}
                      </div>

                      {/* input field  */}
                      <div
                        className={
                          newInputField.id === 1
                            ? "col-md-9 input-group input-group-sm"
                            : "col-md-8 input-group input-group-sm"
                        }
                      >
                        <input
                          type="text"
                          onChange={(e) =>
                            valueChangeHandler(e, newInputField.id)
                          }
                          className="form-control productInput input-sm"
                          id="warningQty"
                          name={newInputField.name}
                          placeholder={newInputField.placeHolder2}
                          defaultValue={newInputField.value}
                        />
                      </div>

                      {/* cross button  */}
                      {newInputField.id !== 1 && (
                        <div className="col-md-1 input-group input-group-sm m-0 p-0">
                          <button
                            type="button"
                            style={{
                              backgroundColor: "transparent",
                            }}
                          >
                            <i
                              className="fa fa-close ml-0"
                              onClick={() =>
                                deleteNewFeaturesHandler(newInputField.id)
                              }
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
                  ))}

                  <div className="my-2">
                    <button
                      type="button"
                      className="btn btn-info btn-sm"
                      onClick={addNewFeaturesHandler}
                    >
                      + Add New
                    </button>
                  </div>
                  {/* end new features  */}
                </div>
                <div className="col-md-12 col-lg-3 imageContainer">
                  <div className="row ">
                    <div className="col-md-12 col-lg-12 imageBox">
                      <p>
                        {imagePreview.file ? (
                          <img
                            style={{ width: "100%", height: "100%" }}
                            src={imagePreview.file}
                            alt=""
                          />
                        ) : (
                          <img
                            style={{ width: "100%", height: "100%" }}
                            src="https://lindsaykphoto.com/wp-content/uploads/2021/04/los_angeles_stop_motion_lindsay_kreighbaum_banza_macaroni.gif"
                            alt="default"
                          />
                        )}
                      </p>
                    </div>
                    <div className="col-md-12 col-lg-12 fileBrowse">
                      <input
                        type="file"
                        hidden
                        // required
                        id="file"
                        onChange={handleChange}
                        name="picture_path"
                      />
                      <label htmlFor="file" className="">
                        Browse
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/***************** Warrenty Form ***********************/}
              <Warrenty
                warantyDataList={warantyHandler}
                newWarrenty={newWarrenty}
                addNewWarrentyHandler={addNewWarrentyHandler}
                editWarrentyLabelHandler={editWarrentyLabelHandler}
                warrentyLabelChangeHandler={warrentyLabelChangeHandler}
                warrentyValueChangeHandler={warrentyValueChangeHandler}
                warrentyDurationChangeHandler={warrentyDurationChangeHandler}
                deleteNewWarrentyHandler={deleteNewWarrentyHandler}
              />
            </div>

            <div className="btnContainer companyBox">
              <div className="row">
                <div className="col-md-12 pull-right responsive-btn">
                  <Button className="saveCloseBtn border border-none closebtn" onClick={onHide}>
                    Close
                  </Button>
                  <Button type="submit" className="saveCloseBtn border border-none" onClick={productHandleSubmit}>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </form>
          </div>
          {/* Company Add Form End Here */}
        </Modal.Body>
    </Modal>
  );
};

export default AddProduct;
