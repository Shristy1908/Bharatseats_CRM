import React, { useEffect, useState } from "react";
import { Modal, Form } from "../../../../../Framework/Components/Layout";
import { Button } from "../../../../../Framework/Components/Widgets";
import { AlertMessage } from "../../../../../Framework/Components/Widgets";
import { locationDetailsData, updateUser } from "../../../Services/Method";

const EditUserModal = ({
  handleEditUser,
  selectedRowData,
  updateEditedUserData,
}) => {
  const setAlertMessage = AlertMessage();
  console.log(selectedRowData);
  const [formValues, setFormValues] = useState({
    txtFirstName: selectedRowData.firstName,
    txtLastName: selectedRowData.lastName,
    txtUserName: selectedRowData.userName,
    txtMobileNumber: selectedRowData.mobileNumber,
    txtEmail: selectedRowData.email,
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
    txtUserType:
      selectedRowData.userTypeId && selectedRowData.userTypeName
        ? {
            userTypeId: selectedRowData.userTypeId,
            userTypeName: selectedRowData.userTypeName,
          }
        : null,
    txtBrHeadType:
      selectedRowData.brHeadTypeId && selectedRowData.brHeadTypeName
        ? {
            brHeadTypeId: selectedRowData.brHeadTypeId,
            brHeadTypeName: selectedRowData.brHeadTypeName,
          }
        : null,
    txtActive: selectedRowData.isActive,
  });

  const [StateListData, setStateListData] = useState([]);
  const getStateListData = async () => {
    try {
      const formdata = {
        locationFilter: "STATE",
        countryId: 1,
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
  const getCityListData = async (pStateId) => {
    try {
      const formdata = {
        locationFilter: "City",
        countryId: 1,
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

  const [formUserValidationError, setFormUserValidationError] = useState({});
  const validateFieldUsers = (name, value) => {
    let errorsMsg = "";

    if (name === "txtMobileNumber") {
      const regex = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$");
      if (!value || typeof value === "undefined") {
        errorsMsg = "Mobile Number is required!";
      } else if (value) {
        if (!regex.test(value)) {
          errorsMsg = "Mobile Number is not valid!";
        } else if (value.length !== 10) {
          errorsMsg = "Enter Valid 10 digit Mobile Number!";
        }
      }
    }
    if (name === "txtEmail") {
      const regex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
      if (value) {
        if (!regex.test(value)) {
          errorsMsg = "Email ID is not valid!";
        }
      }
      if (!value || typeof value === "undefined") {
        errorsMsg = "Email ID is required!";
      }
    }
    if (name === "txtCity") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "City is required!";
      }
    }
    if (name === "txtState") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "State is required!";
      }
    }
    return errorsMsg;
  };

  const handleValidation = () => {
    try {
      const errors = {};
      let formIsValid = true;

      errors["txtMobileNumber"] = validateFieldUsers(
        "txtMobileNumber",
        formValues.txtMobileNumber
      );
      errors["txtEmail"] = validateFieldUsers("txtEmail", formValues.txtEmail);
      errors["txtCountry"] = validateFieldUsers(
        "txtCountry",
        formValues.txtCountry
      );
      errors["txtState"] = validateFieldUsers("txtState", formValues.txtState);
      errors["txtCity"] = validateFieldUsers("txtCity", formValues.txtCity);
      if (Object.values(errors).join("").toString()) {
        formIsValid = false;
      }
      console.log("errors", errors);

      setFormUserValidationError(errors);
      return formIsValid;
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: "Something Went Wrong",
      });
      return false;
    }
  };

  const updateState = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
    formUserValidationError[name] = validateFieldUsers(name, value);
    if (name === "txtState") {
      setFormValues({
        ...formValues,
        txtState: value,
        txtCity: "",
      });
      setCityListData([]);
      if (value) {
        getCityListData(value.stateId);
      }
    }
    if (name === "txtActive") {
      setFormValues({ ...formValues, [name]: value ? 1 : 0 });
    }
  };

  const onClickUpdate = async () => {
    debugger;
    try {
      if (!handleValidation) {
        return;
      }
      const formdata = {
        userId: selectedRowData.userId,
        firstName: formValues.txtLastName,
        lastName: formValues.txtLastName,
        userName: formValues.txtUserName,
        password: "",
        email: formValues.txtEmail,
        countryId:
          formValues.txtCountry && formValues.txtCountry.countryId
            ? formValues.txtCountry.countryId
            : "",
        countryName:
          formValues.txtCountry && formValues.txtCountry.countryName
            ? formValues.txtCountry.countryName
            : "",
        stateId:
          formValues.txtState && formValues.txtState.stateId
            ? formValues.txtState.stateId
            : "",
        stateName:
          formValues.txtState && formValues.txtState.stateName
            ? formValues.txtState.stateName
            : "",
        cityId:
          formValues.txtCity && formValues.txtCity.cityId
            ? formValues.txtCity.cityId
            : "",
        cityName:
          formValues.txtCity && formValues.txtCity.cityName
            ? formValues.txtCity.cityName
            : "",
        mobileNumber: formValues.txtMobileNumber,
        brHeadTypeId:
          formValues.txtBrHeadType && formValues.txtBrHeadType.brHeadTypeId
            ? formValues.txtBrHeadType.brHeadTypeId
            : "",
        brHeadTypeName:
          formValues.txtBrHeadType && formValues.txtBrHeadType.brHeadTypeName
            ? formValues.txtBrHeadType.brHeadTypeName
            : "",
        userTypeId:
          formValues.txtUserType && formValues.txtUserType.userTypeId
            ? formValues.txtUserType.userTypeId
            : "",
        userTypeName:
          formValues.txtUserType && formValues.txtUserType.userTypeName
            ? formValues.txtUserType.userTypeName
            : "",
        isActive: formValues.txtActive,
      };
      const result = await updateUser(formdata);
      if (result.response.successCode === 1) {
        selectedRowData.userName = formValues.txtUserName;
        selectedRowData.email = formValues.txtEmail;
        selectedRowData.stateName = formValues.txtState.stateName;
        selectedRowData.cityName = formValues.txtCity.cityName;
        selectedRowData.mobileNumber = formValues.txtMobileNumber;
        selectedRowData.brHeadTypeName =
          formValues.txtBrHeadType.brHeadTypeName;
        selectedRowData.userTypeName = formValues.txtUserType.userTypeName;
        selectedRowData.isActive = formValues.txtActive;
        updateEditedUserData(selectedRowData);
        handleEditUser();
        setAlertMessage({
          type: "success",
          message: result.response.successMsg,
        });
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

  useEffect(() => {
    getStateListData();
  }, []);

  return (
    <>
      <Modal
        varient="center"
        title="Edit User"
        show={handleEditUser}
        width="55vw"
      >
        <Modal.Body>
          <Form>
            <Form.Group controlwidth="250px" column={2}>
              <Form.InputGroup label="First Name" req="true">
                <Form.InputControl
                  control="input"
                  type="text"
                  autoComplete="off"
                  value={formValues.txtFirstName}
                  name="txtfirstName"
                  readonly
                />
              </Form.InputGroup>
              <Form.InputGroup label="Last Name" req="true">
                <Form.InputControl
                  control="input"
                  type="text"
                  autoComplete="off"
                  value={formValues.txtLastName}
                  name="txtlastName"
                  req="true"
                  readonly
                />
              </Form.InputGroup>
              <Form.InputGroup label="User Name" req="true">
                <Form.InputControl
                  control="input"
                  type="text"
                  autoComplete="off"
                  value={formValues.txtUserName}
                  name="txtuserName"
                  req="true"
                  readonly
                />
              </Form.InputGroup>
              <Form.InputGroup
                label="Email"
                req="true"
                errorMsg={formUserValidationError["txtEmail"]}
              >
                <Form.InputControl
                  control="input"
                  type="email"
                  autoComplete="off"
                  value={formValues.txtEmail}
                  name="txtEmail"
                  req="true"
                  onChange={(e) => updateState("txtEmail", e.target.value)}
                />
              </Form.InputGroup>
              <Form.InputGroup label="Country" req="true">
                <Form.InputControl
                  control="select"
                  name="txtCountry"
                  value={formValues.txtCountry}
                  options={formValues.txtCountry}
                  getOptionLabel={(option) => `${option.countryName}`}
                  getOptionValue={(option) => `${option}`}
                  // onChange={(e) => updateState("txtCountry", e)}
                ></Form.InputControl>
              </Form.InputGroup>

              <Form.InputGroup
                label="State"
                req="true"
                errorMsg={formUserValidationError["txtState"]}
              >
                <Form.InputControl
                  control="select"
                  value={formValues.txtState}
                  name="txtState"
                  options={StateListData}
                  getOptionLabel={(option) => `${option.stateName}`}
                  getOptionValue={(option) => `${option}`}
                  req="true"
                  onChange={(e) => updateState("txtState", e)}
                ></Form.InputControl>
              </Form.InputGroup>
              <Form.InputGroup
                label="City"
                req="true"
                errorMsg={formUserValidationError["txtCity"]}
              >
                <Form.InputControl
                  control="select"
                  value={formValues.txtCity}
                  name="txtCity"
                  options={cityListData}
                  getOptionLabel={(option) => `${option.cityName}`}
                  getOptionValue={(option) => `${option}`}
                  req="true"
                  onChange={(e) => updateState("txtCity", e)}
                ></Form.InputControl>
              </Form.InputGroup>
              <Form.InputGroup
                label="Mobile Number"
                req="true"
                errorMsg={formUserValidationError["txtMobileNumber"]}
              >
                <Form.InputControl
                  control="input"
                  type="text"
                  autoComplete="off"
                  value={formValues.txtMobileNumber}
                  name="txtMobileNumber"
                  req="true"
                  onChange={(e) =>
                    updateState("txtMobileNumber", e.target.value)
                  }
                />
              </Form.InputGroup>
              <Form.InputGroup label="User Type" req="true" readonly>
                <Form.InputControl
                  control="select"
                  name="userType"
                  value={formValues.txtUserType}
                  options={formValues.txtUserType}
                  getOptionLabel={(option) => `${option.userTypeName}`}
                  getOptionValue={(option) => `${option}`}
                  req="true"
                  // onChange={(e) => updateState("userType", e.target.value)}
                ></Form.InputControl>
              </Form.InputGroup>
              <Form.InputGroup label="BR Head Type" req="true" readonly>
                <Form.InputControl
                  control="select"
                  name="brHeadType"
                  value={formValues.txtBrHeadType}
                  options={formValues.txtBrHeadType}
                  getOptionLabel={(option) => `${option.brHeadTypeName}`}
                  getOptionValue={(option) => `${option}`}
                  req="true"
                ></Form.InputControl>
              </Form.InputGroup>
              <Form.InputGroup label="Active">
                <input
                  className="small-checkbox"
                  type="checkbox"
                  checked={formValues.txtActive === 1}
                  name="txtActive"
                  onChange={(e) => updateState("txtActive", e.target.checked)}
                />
                {/* <span>{formValues.active ? "Active" : "Inactive"}</span>{" "} */}
              </Form.InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            varient="secondary"
            onClick={() => onClickUpdate()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditUserModal;
