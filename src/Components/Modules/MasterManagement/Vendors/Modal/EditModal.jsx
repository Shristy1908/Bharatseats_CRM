import React, { useState, useEffect } from "react";
import "./EditModal.css"; // Import the CSS file
import { Modal, Form } from "../../../../../Framework/Components/Layout";
import { Button } from "../../../../../Framework/Components/Widgets";
import { locationDetailsData, updateSupplier } from "../../../Services/Method";
import { AlertMessage } from "../../../../../Framework/Components/Widgets";

const EditNewModal = ({
  handleEditClick,
  selectedRowData,
  updateEditedSupplier,
}) => {
  const setAlertMessage = AlertMessage();
  const [formValues, setFormValues] = useState({
    txtSupplierCode: selectedRowData.supplierCode,
    txtSupplierType: selectedRowData.supplierType,
    txtSupplierName: selectedRowData.supplierName,
    txtEmail: selectedRowData.email,
    txtMobile: selectedRowData.mobileNumber,
    txtAddress1: selectedRowData.address1,
    txtAddress2: selectedRowData.address2,
    txtAddress3: selectedRowData.address3,
    txtCountry:
      selectedRowData.countryId && selectedRowData.countryName
        ? {
            countryId: selectedRowData.countryId,
            countryName: selectedRowData.countryName,
          }
        : null,
    txtState:
      selectedRowData.stateId && selectedRowData.stateName
        ? {
            stateId: selectedRowData.stateId,
            stateName: selectedRowData.stateName,
          }
        : null,
    txtCity:
      selectedRowData.cityId && selectedRowData.cityName
        ? {
            cityId: selectedRowData.cityId,
            cityName: selectedRowData.cityName,
          }
        : null,
    txtDistrict: selectedRowData.district,
    txtPinCode: selectedRowData.pin,
    txtGSTIN: selectedRowData.gstin,
    txtActive: selectedRowData.isActive,
  });

  const [CountryListData, setCountryListData] = useState([]);
  const getCountryListData = async () => {
    try {
      const formdata = {
        locationFilter: "COUNTRY",
        countryId: "",
        stateId: "",
      };
      const result = await locationDetailsData(formdata);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.dataList &&
          result.response.responseData.dataList.length > 0
        ) {
          setCountryListData(result.response.responseData.dataList);
          console.log(result.response.responseData.dataList);
        } else {
          setCountryListData([]);
        }
      } else {
        setCountryListData([]);
        setAlertMessage({
          type: "error",
          message: result.response.successMsg,
        });
      }
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: error,
      });
    }
  };

  const [StateListData, setStateListData] = useState([]);
  const getStateListData = async (pCountryId) => {
    try {
      const formdata = {
        locationFilter: "STATE",
        countryId: pCountryId,
        stateId: "",
      };
      const result = await locationDetailsData(formdata);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.dataList &&
          result.response.responseData.dataList.length > 0
        ) {
          setStateListData(result.response.responseData.dataList);
          console.log(result.response.responseData.dataList);
        } else {
          setStateListData([]);
        }
      } else {
        setStateListData([]);
        setAlertMessage({
          type: "error",
          message: result.response.successMsg,
        });
      }
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: error,
      });
    }
  };

  const [cityListData, setCityListData] = useState([]);
  const getCityListData = async (pCountryId, pStateId) => {
    try {
      const formdata = {
        locationFilter: "City",
        countryId: pCountryId,
        stateId: pStateId,
      };
      const result = await locationDetailsData(formdata);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.dataList &&
          result.response.responseData.dataList.length > 0
        ) {
          setCityListData(result.response.responseData.dataList);
        } else {
          setCityListData([]);
        }
      } else {
        setCityListData([]);
        setAlertMessage({
          type: "error",
          message: result.response.successMsg,
        });
      }
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: error,
      });
    }
  };

  const updateOnClick = async () => {
    debugger;
    try {
      const formdata = {
        supplierId: selectedRowData.supplierId,
        supplierCode: formValues.txtSupplierCode,
        supplierType: formValues.txtSupplierType,
        supplierName: formValues.txtSupplierName,
        email: formValues.txtEmail,
        mobileNumber: formValues.txtMobile,
        address1: formValues.txtAddress1,
        address2: formValues.txtAddress2,
        address3: formValues.txtAddress3,
        cityId:
          formValues.txtCity && formValues.txtCity.cityId
            ? formValues.txtCity.cityId
            : "",
        cityName:
          formValues.txtCity && formValues.txtCity.cityName
            ? formValues.txtCity.cityName
            : "",
        stateId:
          formValues.txtState && formValues.txtState.stateId
            ? formValues.txtState.stateId
            : "",
        stateName:
          formValues.txtState && formValues.txtState.stateName
            ? formValues.txtState.stateName
            : "",
        countryId:
          formValues.txtCountry && formValues.txtCountry.countryId
            ? formValues.txtCountry.countryId
            : "",
        countryName:
          formValues.txtCountry && formValues.txtCountry.countryName
            ? formValues.txtCountry.countryName
            : "",
        district: formValues.txtDistrict,
        pin: formValues.txtPinCode,
        gstin: formValues.txtGSTIN,
        isActive: formValues.txtActive,
      };
      const result = await updateSupplier(formdata);
      if (result.response.successCode === 1) {
        setAlertMessage({
          type: "success",
          message: result.response.successMsg,
        });
        debugger;
        selectedRowData.supplierName = formValues.txtSupplierName;
        selectedRowData.email = formValues.txtEmail;
        selectedRowData.mobileNumber = formValues.txtMobile;
        selectedRowData.address1 = formValues.txtAddress1;
        selectedRowData.countryName =
          formValues &&
          formValues.txtCountry &&
          formValues.txtCountry.countryName
            ? formValues.txtCountry.countryName
            : "";
        selectedRowData.stateName =
          formValues && formValues.txtState && formValues.txtState.stateName
            ? formValues.txtState.stateName
            : "";
        selectedRowData.cityName =
          formValues && formValues.txtCity && formValues.txtCity.cityName
            ? formValues.txtCity.cityName
            : "";
        selectedRowData.pin = formValues.txtPinCode;
        selectedRowData.isActive = formValues.txtActive;
        updateEditedSupplier(selectedRowData);
        handleEditClick();
      } else {
        setAlertMessage({
          type: "error",
          message: result.response.successMsg,
        });
      }
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: error,
      });
    }
  };

  const updateState = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
    if (name === "txtCountry") {
      setFormValues({
        ...formValues,
        txtCountry: value,
        txtState: "",
        txtCity: "",
      });
      setStateListData([]);
      if (value) {
        getStateListData(value.countryId);
      }
    }
    if (name === "txtState") {
      setFormValues({
        ...formValues,
        txtState: value,
        txtCity: "",
      });
      setCityListData([]);
      if (value) {
        getCityListData(formValues.txtCountry.countryId, value.stateId);
      }
    }
    if (name === "txtActive") {
      setFormValues({
        ...formValues,
        [name]: value ? 1 : 0, // Convert boolean to 1 or 0
      });
    }
  };

  useEffect(() => {
    getCountryListData();
  }, [1]);

  return (
    <Modal
      varient="center"
      width="50vw"
      title="Edit Supplier"
      show={handleEditClick}
      right="0"
    >
      <Modal.Body>
        <Form>
          <Form.Group controlwidth="250px" column={2}>
            <Form.InputGroup label="Supplier Code" req="true">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtSupplierCode}
                name="txtSupplierCode"
                req="true"
                readonly
              />
            </Form.InputGroup>
            <Form.InputGroup label="Supplier Type">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtSupplierType}
                name="txtSupplierType"
                onChange={(e) => updateState("txtSupplierType", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup label="Supplier Name" req="true">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtSupplierName}
                name="txtSupplierName"
                onChange={(e) => updateState("txtSupplierName", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup label="Email" req="true">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtEmail}
                name="txtEmail"
                onChange={(e) => updateState("txtEmail", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup label="Mobile No.">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtMobile}
                name="txtMobile"
                req="true"
                onChange={(e) => updateState("txtMobile", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup label="Address 1" req="true">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtAddress1}
                name="txtAddress1"
                onChange={(e) => updateState("txtAddress1", e.target.value)}
              />
            </Form.InputGroup>{" "}
            <Form.InputGroup label="Address 2">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtAddress2}
                name="txtAddress2"
                onChange={(e) => updateState("txtAddress2", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup label="Address 3">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtAddress3}
                name="txtAddress3"
                onChange={(e) => updateState("txtAddress3", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup label="Country">
              <Form.InputControl
                control="select"
                value={formValues.txtCountry}
                name="txtCountry"
                options={CountryListData}
                getOptionLabel={(option) => `${option.countryName}`}
                getOptionValue={(option) => `${option}`}
                onChange={(e) => updateState("txtCountry", e)}
              ></Form.InputControl>
            </Form.InputGroup>
            <Form.InputGroup label="State">
              <Form.InputControl
                control="select"
                value={formValues.txtState}
                name="txtState"
                options={StateListData}
                getOptionLabel={(option) => `${option.stateName}`}
                getOptionValue={(option) => `${option}`}
                onChange={(e) => updateState("txtState", e)}
              ></Form.InputControl>
            </Form.InputGroup>
            <Form.InputGroup label="City">
              <Form.InputControl
                control="select"
                value={formValues.txtCity}
                name="txtCity"
                options={cityListData}
                getOptionLabel={(option) => `${option.cityName}`}
                getOptionValue={(option) => `${option}`}
                onChange={(e) => updateState("txtCity", e)}
              ></Form.InputControl>
            </Form.InputGroup>
            <Form.InputGroup label="District">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtDistrict}
                name="txtDistrict"
                onChange={(e) => updateState("txtDistrict", e.target.value)}
              ></Form.InputControl>
            </Form.InputGroup>
            <Form.InputGroup label="Pin Code" req="true">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtPinCode}
                name="txtPinCode"
                req="true"
                onChange={(e) => updateState("txtPinCode", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup label="GSTIN" req="true">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtGSTIN}
                name="txtGSTIN"
                req="true"
                readonly
                //  onChange={(e) => updateState("txtGSTIN", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup label="Active" req="true">
              <input
                className="small-checkbox"
                type="checkbox"
                checked={formValues.txtActive === 1}
                name="txtActive"
                onChange={(e) => updateState("txtActive", e.target.checked)}
              />
            </Form.InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button varient="primary" type="button" onClick={updateOnClick}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditNewModal;
