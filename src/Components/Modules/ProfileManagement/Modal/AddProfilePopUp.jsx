import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AlertMessage } from "../../../../Framework/Components/Widgets/Notification/NotificationProvider";
import { Button } from "../../../../Framework/Components/Widgets";
import { Form, Modal } from "../../../../Framework/Components/Layout";
import {
  addProfile,
  getbrHeadTypeList,
  getUserTypeList,
} from "../../Services/Method";
import { getSessionStorage } from "../../Common/Login/Auth/auth";

function AddProfilePopUp({ toggleAddProfile, updateProfileData }) {
  const user = getSessionStorage("user");
  const setAlertMessage = AlertMessage();
  const [formValues, setFormValues] = useState({
    txtProfileName: "",
    txtProfileDescription: "",
    txtBrHeadType: null,
    txtUserType: null,
  });

  const validateField = (name, value) => {
    let errorsMsg = "";
    if (name === "txtProfileName") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Cannot be empty";
      }
    }
    if (name === "txtProfileDescription") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Cannot be empty";
      }
    }
    if (name === "txtBrHeadType") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Cannot be empty";
      }
    }
    return errorsMsg;
  };

  const [formValidationError] = useState({});
  const updateState = (name, value) => {
    debugger;
    setFormValues({ ...formValues, [name]: value });
    formValidationError[name] = validateField(name, value);
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

  const addProfileOnClick = async () => {
    debugger;
    try {
      const formdata = {
        profileName:
          formValues && formValues.txtProfileName
            ? formValues.txtProfileName
            : "",
        profileDescription:
          formValues && formValues.txtProfileDescription
            ? formValues.txtProfileDescription
            : "",
        brHeadTypeId:
          formValues && formValues.txtBrHeadType.brHeadTypeId
            ? formValues.txtBrHeadType.brHeadTypeId
            : null,
        brHeadType:
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
        userType:
          formValues &&
          formValues.txtUserType &&
          formValues.txtUserType.userTypeName
            ? formValues.txtUserType.userTypeName
            : null,
      };
      const result = await addProfile(formdata);
      if (result.response.successCode === 1) {
        setAlertMessage({
          type: "success",
          message: result.response.successMsg,
        });
        const newlyAddedProfile = [
          {
            profileName:
              formValues && formValues.txtProfileName
                ? formValues.txtProfileName
                : "",
            profileDescription:
              formValues && formValues.txtProfileDescription
                ? formValues.txtProfileDescription
                : "",
            brHeadType:
              formValues && formValues.txtBrHeadType.brHeadTypeName
                ? formValues.txtBrHeadType.brHeadTypeName
                : null,
            userType:
              formValues && formValues.txtUserType.userTypeName
                ? formValues.txtUserType.userTypeName
                : null,
          },
        ];
        console.log(newlyAddedProfile);
        updateProfileData(newlyAddedProfile);
        toggleAddProfile();
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
    brHeadTypeList();
    userTypeList();
  }, []);

  return (
    <Modal
      varient="center"
      title="Add Profile"
      show={toggleAddProfile}
      width="27vw"
      right="0"
    >
      <Modal.Body>
        <div>
          <Form>
            <Form.Group column={1} controlwidth="250px">
              <Form.InputGroup
                label="Profile Name"
                errorMsg={formValidationError["txtProfileName"]}
                req="true"
              >
                <Form.InputControl
                  control="input"
                  type="text"
                  maxLength="20"
                  autoComplete="off"
                  value={formValues.txtProfileName}
                  name="txtProfileName"
                  onChange={(e) =>
                    updateState("txtProfileName", e.target.value)
                  }
                />
              </Form.InputGroup>
              <Form.InputGroup
                label="Profile Description"
                errorMsg={formValidationError["txtProfileDescription"]}
                req="true"
              >
                <Form.InputControl
                  control="input"
                  type="text"
                  maxLength="80"
                  autoComplete="off"
                  value={formValues.txtProfileDescription}
                  name="txtProfileDescription"
                  onChange={(e) =>
                    updateState("txtProfileDescription", e.target.value)
                  }
                />
              </Form.InputGroup>
              <Form.InputGroup
                label="BR Head Type"
                errorMsg={formValidationError["txtBrHeadType"]}
                req="true"
              >
                <Form.InputControl
                  control="select"
                  name="txtBrHeadType"
                  // A loader={isLoadingUserType ? <Loader /> : null}
                  onChange={(e) => updateState("txtBrHeadType", e)}
                  value={formValues.txtBrHeadType}
                  options={brHeadType}
                  getOptionLabel={(option) => `${option.brHeadTypeName}`}
                  getOptionValue={(option) => `${option}`}
                />
              </Form.InputGroup>
              <Form.InputGroup
                label="User Type"
                errorMsg={formValidationError["txtUserType"]}
                req="true"
              >
                <Form.InputControl
                  control="select"
                  name="txtUserType"
                  // A loader={isLoadingUserType ? <Loader /> : null}
                  value={formValues.txtUserType}
                  options={userType}
                  getOptionLabel={(option) => `${option.userTypeName}`}
                  getOptionValue={(option) => `${option}`}
                  onChange={(e) => updateState("txtUserType", e)}
                />
              </Form.InputGroup>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          varient="secondary"
          onClick={() => addProfileOnClick()}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddProfilePopUp;

AddProfilePopUp.propTypes = {
  toggleAddProfile: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired,
};
