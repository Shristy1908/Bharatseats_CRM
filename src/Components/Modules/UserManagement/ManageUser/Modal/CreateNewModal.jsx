import React, { useEffect, useState } from "react";
import { Modal, Form } from "../../../../../Framework/Components/Layout";
import {
  AlertMessage,
  Button,
} from "../../../../../Framework/Components/Widgets";
import {
  getbrHeadTypeList,
  getUserTypeList,
  locationDetailsData,
  addUser,
} from "../../../Services/Method";
import { getSessionStorage } from "../../../Common/Login/Auth/auth";
import { encryptStringData } from "../../../../../Service/Utilities/encodeDecode";

const CreateNewModal = ({ handleCreateNew, updateNewlyUser }) => {
  const setAlertMessage = AlertMessage();
  const [formValues, setFormValues] = useState({
    txtFirstName: "",
    txtLastName: "",
    txtUserName: "",
    txtMobileNumber: "",
    txtEmail: "",
    txtCountry: null,
    txtState: null,
    txtCity: null,
    txtPassword: "",
    txtConfirmPassword: "",
    txtUserType: null,
    txtBrHeadType: null,
    txtActive: true,
  });
  // const [selectedUser, setSelectedUser] = useState("");
  const user = getSessionStorage("user");

  const [formUserValidationError, setFormUserValidationError] = useState({});
  const validateFieldUsers = (name, value) => {
    let errorsMsg = "";

    if (name === "txtFirstName") {
      const nameRegex = new RegExp("^[a-zA-Z]+$");

      if (!value || typeof value === "undefined") {
        errorsMsg = "User First Name is required!";
      } else if (value && !nameRegex.test(value)) {
        errorsMsg = "First Name must contain only alphabetic characters!";
      }
    }
    if (name === "txtLastName") {
      const nameRegex = new RegExp("^[a-zA-Z]+$");

      if (!value || typeof value === "undefined") {
        errorsMsg = "User Last Name is required!";
      } else if (value && !nameRegex.test(value)) {
        errorsMsg = "Last Name must contain only alphabetic characters!";
      }
    }
    if (name === "txtUserName") {
      const nameRegex = new RegExp("^[a-zA-Z0-9]+$");

      if (!value || typeof value === "undefined") {
        errorsMsg = "User Name is required!";
      } else if (value && !nameRegex.test(value)) {
        errorsMsg = "User Name must contain only alphanumeric characters!";
      }
    }

    const regex = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$");
    if (name === "txtMobileNumber") {
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
    if (name === "txtPassword") {
      const lowerCaseLetters = new RegExp(/[a-z]/g);
      const regex = new RegExp(/[!@#$%^&*(),.?":{}|<>]/g);
      const upperCaseLetters = new RegExp(/[A-Z]/g);
      const numbers = new RegExp(/[0-9]/g);
      const whiteSpace = new RegExp(/\s/);

      if (whiteSpace.test(value)) {
        errorsMsg = "Password should not contain white space";
      } else if (!lowerCaseLetters.test(value)) {
        errorsMsg = "Password must contain at least one lowercase letter";
      } else if (!upperCaseLetters.test(value)) {
        errorsMsg = "Password must contain at least one uppercase letter";
      } else if (!numbers.test(value)) {
        errorsMsg = "Password must contain at least one digit";
      } else if (!regex.test(value)) {
        errorsMsg = "Password must contain at least one symbol character";
      } else if (value.length < 8) {
        errorsMsg = "Password must be 8 characters.";
      } else if (value.length > 16) {
        errorsMsg = "Password must be 16 characters.";
      }
    }
    if (name === "txtConfirmPassword") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Cannot be empty";
      } else if (value) {
        if (formValues.txtPassword !== value) {
          errorsMsg = "Password and Confirm Password does not match";
        }
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
    if (name === "txtCountry") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Country is required!";
      }
    }

    if (name === "txtUserType") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "User Type is required!";
      }
    }

    if (name === "txtBrHeadType") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "BR Head Type is required!";
      }
    }

    return errorsMsg;
  };

  const handleValidation = () => {
    try {
      const errors = {};
      let formIsValid = true;

      errors["txtFirstName"] = validateFieldUsers(
        "txtFirstName",
        formValues.txtFirstName
      );
      errors["txtLastName"] = validateFieldUsers(
        "txtLastName",
        formValues.txtLastName
      );
      errors["txtUserName"] = validateFieldUsers(
        "txtUserName",
        formValues.txtUserName
      );
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
      errors["txtPassword"] = validateFieldUsers(
        "txtPassword",
        formValues.txtPassword
      );
      errors["txtConfirmPassword"] = validateFieldUsers(
        "txtConfirmPassword",
        formValues.txtConfirmPassword
      );
      errors["txtUserType"] = validateFieldUsers(
        "txtUserType",
        formValues.txtUserType
      );
      errors["txtBrHeadType"] = validateFieldUsers(
        "txtBrHeadType",
        formValues.txtBrHeadType
      );
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

  const [brHeadType, setBrHeadType] = useState([]);
  const brHeadTypeList = async () => {
    debugger;
    try {
      const formdata = {};
      const result = await getbrHeadTypeList(formdata);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.length > 0
        ) {
          setBrHeadType(result.response.responseData);
          console.log(result.response.responseData);
        } else {
          setBrHeadType([]);
        }
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

  const [userType, setUserType] = useState([]);
  const userTypeList = async () => {
    debugger;
    try {
      const formdata = {
        userTypeId: user.userTypeId,
      };
      const result = await getUserTypeList(formdata);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.length > 0
        ) {
          setUserType(result.response.responseData);
          console.log(result.response.responseData);
        } else {
          setUserType([]);
        }
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
    formUserValidationError[name] = validateFieldUsers(name, value);
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
  };
  // const handleUserChange = (e) => {
  //   setSelectedUser(e.target.value);
  // };

  const addUserOnClick = async () => {
    debugger;
    try {
      if (!handleValidation()) {
        return;
      }
      const formdata = {
        firstName:
          formValues && formValues.txtFirstName ? formValues.txtFirstName : "",
        lastName:
          formValues && formValues.txtLastName ? formValues.txtLastName : "",
        userName:
          formValues && formValues.txtUserName ? formValues.txtUserName : "",
        password: encryptStringData(
          formValues && formValues.txtPassword ? formValues.txtPassword : ""
        ),
        email: formValues && formValues.txtEmail ? formValues.txtEmail : "",
        countryId:
          formValues && formValues.txtCountry && formValues.txtCountry.countryId
            ? formValues.txtCountry.countryId
            : null,
        countryName:
          formValues &&
          formValues.txtCountry &&
          formValues.txtCountry.countryName
            ? formValues.txtCountry.countryName
            : null,
        stateId:
          formValues && formValues.txtState && formValues.txtState.stateId
            ? formValues.txtState.stateId
            : null,
        stateName:
          formValues && formValues.txtState && formValues.txtState.stateName
            ? formValues.txtState.stateName
            : null,
        cityId:
          formValues && formValues.txtCity && formValues.txtCity.cityId
            ? formValues.txtCity.cityId
            : null,
        cityName:
          formValues && formValues.txtCity && formValues.txtCity.cityName
            ? formValues.txtCity.cityName
            : null,
        mobileNumber:
          formValues && formValues.txtMobileNumber
            ? formValues.txtMobileNumber
            : "",
        brHeadTypeId:
          formValues &&
          formValues.txtBrHeadType &&
          formValues.txtBrHeadType.brHeadTypeId
            ? formValues.txtBrHeadType.brHeadTypeId
            : null,
        brHeadTypeName:
          formValues &&
          formValues.txtBrHeadType &&
          formValues.txtBrHeadType.brHeadTypeName
            ? formValues.txtBrHeadType.brHeadTypeName
            : null,
        userTypeId:
          formValues &&
          formValues.txtUserType &&
          formValues.txtUserType.userTypeId
            ? formValues.txtUserType.userTypeId
            : null,
        userTypeName:
          formValues &&
          formValues.txtUserType &&
          formValues.txtUserType.userTypeName
            ? formValues.txtUserType.userTypeName
            : null,
      };
      const result = await addUser(formdata);
      if (result.response.successCode === 1) {
        setAlertMessage({
          type: "success",
          message: result.response.successMsg,
        });
        const newlyAddedUser = [
          {
            firstName:
              formValues && formValues.txtFirstName
                ? formValues.txtFirstName
                : "",
            lastName:
              formValues && formValues.txtLastName
                ? formValues.txtLastName
                : "",
            userName:
              formValues && formValues.txtUserName
                ? formValues.txtUserName
                : "",
            password:
              formValues && formValues.txtPassword
                ? formValues.txtPassword
                : "",
            email: formValues && formValues.txtEmail ? formValues.txtEmail : "",
            countryName:
              formValues &&
              formValues.txtCountry &&
              formValues.txtCountry.countryName
                ? formValues.txtCountry.countryName
                : null,
            stateName:
              formValues && formValues.txtState && formValues.txtState.stateName
                ? formValues.txtState.stateName
                : null,
            cityName:
              formValues && formValues.txtCity && formValues.txtCity.cityName
                ? formValues.txtCity.cityName
                : null,
            mobileNumber:
              formValues && formValues.txtMobileNumber
                ? formValues.txtMobileNumber
                : "",
            brHeadTypeName:
              formValues &&
              formValues.txtBrHeadType &&
              formValues.txtBrHeadType.brHeadTypeName
                ? formValues.txtBrHeadType.brHeadTypeName
                : null,
            userTypeName:
              formValues &&
              formValues.txtUserType &&
              formValues.txtUserType.userTypeName
                ? formValues.txtUserType.userTypeName
                : null,
          },
        ];
        console.log(newlyAddedUser);
        updateNewlyUser(newlyAddedUser);
        handleCreateNew();
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
    getCountryListData();
    brHeadTypeList();
    userTypeList();
  }, []);

  return (
    <Modal
      varient="center"
      title="Create New"
      width="50vw"
      show={handleCreateNew}
      right="0"
    >
      <Modal.Body>
        <Form>
          <Form.Group controlwidth="360px" column={2}>
            <Form.InputGroup
              label="First Name"
              req="true"
              errorMsg={formUserValidationError["txtFirstName"]}
            >
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtFirstName}
                name="txtFirstName"
                onChange={(e) => updateState("txtFirstName", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup
              label="Last Name"
              req="true"
              errorMsg={formUserValidationError["txtLastName"]}
            >
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtLastName}
                name="txtLastName"
                onChange={(e) => updateState("txtLastName", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup
              label="User Name"
              req="true"
              errorMsg={formUserValidationError["txtUserName"]}
            >
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtUserName}
                name="txtUserName"
                onChange={(e) => updateState("txtUserName", e.target.value)}
              />
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
                onChange={(e) => updateState("txtMobileNumber", e.target.value)}
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
                onChange={(e) => updateState("txtEmail", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup
              label="Country"
              req="true"
              errorMsg={formUserValidationError["txtCountry"]}
            >
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
                onChange={(e) => updateState("txtCity", e)}
              ></Form.InputControl>
            </Form.InputGroup>
            <Form.InputGroup
              label="Password"
              req="true"
              errorMsg={formUserValidationError["txtPassword"]}
            >
              <Form.InputControl
                control="input"
                type="password"
                autoComplete="off"
                value={formValues.txtPassword}
                name="txtPassword"
                onChange={(e) => updateState("txtPassword", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup
              label="Confirm Password"
              req="true"
              errorMsg={formUserValidationError["txtConfirmPassword"]}
            >
              <Form.InputControl
                control="input"
                type="password"
                autoComplete="off"
                value={formValues.txtConfirmPassword}
                name="txtConfirmPassword"
                onChange={(e) =>
                  updateState("txtConfirmPassword", e.target.value)
                }
              />
            </Form.InputGroup>
            <Form.InputGroup
              label="User Type"
              req="true"
              errorMsg={formUserValidationError["txtUserType"]}
            >
              <Form.InputControl
                control="select"
                name="txtUserType"
                value={formValues.txtUserType}
                options={userType}
                getOptionLabel={(option) => `${option.userTypeName}`}
                getOptionValue={(option) => `${option}`}
                onChange={(e) => updateState("txtUserType", e)}
                // onChange={(e) => updateState("userType", e.target.value)}
              ></Form.InputControl>
            </Form.InputGroup>
            <Form.InputGroup
              label="BR Head Type"
              req="true"
              errorMsg={formUserValidationError["txtBrHeadType"]}
            >
              <Form.InputControl
                control="select"
                name="txtBrHeadType"
                value={formValues.txtBrHeadType}
                options={brHeadType}
                getOptionLabel={(option) => `${option.brHeadTypeName}`}
                getOptionValue={(option) => `${option}`}
                onChange={(e) => updateState("txtBrHeadType", e)}
              ></Form.InputControl>
            </Form.InputGroup>
            <Form.InputGroup label="Active">
              <input
                className="small-checkbox"
                type="checkbox"
                checked={true}
                name="txtActive"
                onChange={(e) => updateState("txtActive", true)}
              />
            </Form.InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          type="button"
          varient="secondary"
          onClick={() => addUserOnClick()}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateNewModal;
