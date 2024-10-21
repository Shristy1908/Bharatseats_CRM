import React, { useEffect, useState } from "react";
import { Modal, Form } from "../../../../../Framework/Components/Layout";
import { Button } from "../../../../../Framework/Components/Widgets";
import "./CreateNewModal.css";
import { AlertMessage } from "../../../../../Framework/Components/Widgets";
import { addCity, locationDetailsData } from "../../../Services/Method";

const CreateNewModal = ({ handleAddNew, updateCityData }) => {
  const setAlertMessage = AlertMessage();
  const [formValues, setFormValues] = useState({
    txtCountry: null,
    txtState: null,
    txtCity: "",
    txtActive: 1,
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

  const updateState = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
    if (name === "txtCountry") {
      setFormValues({
        ...formValues,
        txtCountry: value,
        txtState: "",
      });
      setStateListData([]);
      if (value) {
        getStateListData(value.countryId);
      }
    }
  };

  const addNewCityOnClick = async () => {
    debugger;
    try {
      // if (!handleValidation()) {
      //   return;
      // }
      const formdata = {
        cityId: 0,
        cityName: formValues && formValues.txtCity ? formValues.txtCity : "",
        stateId:
          formValues && formValues.txtState && formValues.txtState.stateId
            ? formValues.txtState.stateId
            : "",
        stateName:
          formValues && formValues.txtState && formValues.txtState.stateName
            ? formValues.txtState.stateName
            : "",
        countryId:
          formValues && formValues.txtCountry && formValues.txtCountry.countryId
            ? formValues.txtCountry.countryId
            : "",
        countryName:
          formValues &&
          formValues.txtCountry &&
          formValues.txtCountry.countryName
            ? formValues.txtCountry.countryName
            : "",
        isActive: 1,
      };
      const result = await addCity(formdata);
      if (result.response.successCode === 1) {
        setAlertMessage({
          type: "success",
          message: result.response.successMsg,
        });
        const newlyAddedCity = [
          {
            cityName:
              formValues && formValues.txtCity ? formValues.txtCity : "",
            stateName:
              formValues && formValues.txtState && formValues.txtState.stateName
                ? formValues.txtState.stateName
                : "",
            countryName:
              formValues &&
              formValues.txtCountry &&
              formValues.txtCountry.countryName
                ? formValues.txtCountry.countryName
                : "",
          },
        ];
        console.log(newlyAddedCity);
        updateCityData(newlyAddedCity);
        handleAddNew();
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
  }, []);

  return (
    <Modal
      varient="center"
      title="Add City"
      width="28vw"
      show={handleAddNew}
      right="0"
    >
      <Modal.Body>
        <Form>
          <Form.Group controlwidth="280px">
            <Form.InputGroup label="Country Name">
              <Form.InputControl
                control="select"
                value={formValues.txtCountry}
                name="txtCountry"
                options={CountryListData}
                getOptionLabel={(option) => `${option.countryName}`}
                getOptionValue={(option) => `${option}`}
                req="true"
                onChange={(e) => updateState("txtCountry", e)}
              ></Form.InputControl>
            </Form.InputGroup>
            <Form.InputGroup label="State Name">
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
            <Form.InputGroup label="City Name">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtCity}
                name="txtCity"
                req="true"
                onChange={(e) => updateState("txtCity", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup label="Active">
              <input
                className="small-checkbox"
                type="checkbox"
                checked={formValues.txtActive}
                name="txtActive"
                onChange={(e) => updateState("txtActive", e.target.checked)}
              />
            </Form.InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="button" varient="secondary" onClick={addNewCityOnClick}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateNewModal;
