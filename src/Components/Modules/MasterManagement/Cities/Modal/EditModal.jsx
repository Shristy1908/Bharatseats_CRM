import React, { useState, useEffect } from "react";
import { Modal, Form } from "../../../../../Framework/Components/Layout";
import { Button } from "../../../../../Framework/Components/Widgets";
import { updateCity } from "../../../Services/Method";
import { AlertMessage } from "../../../../../Framework/Components/Widgets";

const EditModal = ({ handleEditClick, selectedRowData, updateEditedCity }) => {
  const setAlertMessage = AlertMessage();
  const [formValues, setFormValues] = useState({
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
    txtCity: selectedRowData.cityName,
    txtActive: selectedRowData.isActive,
  });

  const updateOnClick = async () => {
    try {
      const formdata = {
        cityId: selectedRowData.cityId,
        cityName: formValues.txtCity,
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
        isActive: formValues.txtActive,
      };
      const result = await updateCity(formdata);
      if (result.response.successCode === 1) {
        setAlertMessage({
          type: "success",
          message: result.response.successMsg,
        });
        selectedRowData.countryName = formValues.txtCountry.countryName;
        selectedRowData.stateName = formValues.txtState.stateName;
        selectedRowData.cityName = formValues.txtCity;
        selectedRowData.isActive = formValues.txtActive;
        updateEditedCity(selectedRowData);
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
    if (name === "txtActive") {
      setFormValues({
        ...formValues,
        [name]: value ? 1 : 0, // Convert boolean to 1 or 0
      });
    }
  };

  return (
    <Modal
      varient="center"
      title="Edit State"
      width="28vw"
      show={handleEditClick}
    >
      <Modal.Body>
        <Form>
          <Form.Group controlwidth="280px">
            <Form.InputGroup label="Country Name">
              <Form.InputControl
                control="select"
                value={formValues.txtCountry}
                options={formValues.txtCountry}
                getOptionLabel={(option) => `${option.countryName}`}
                getOptionValue={(option) => `${option}`}
                name="txtCountry"
                req="true"
                readonly
              ></Form.InputControl>
            </Form.InputGroup>
            <Form.InputGroup label="State Name">
              <Form.InputControl
                control="select"
                value={formValues.txtState}
                options={formValues.txtState}
                getOptionLabel={(option) => `${option.stateName}`}
                getOptionValue={(option) => `${option}`}
                name="txtState"
                req="true"
                readonly
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
                checked={formValues.txtActive === 1}
                name="txtActive"
                onChange={(e) => updateState("txtActive", e.target.checked)}
              />
            </Form.InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="button" varient="primary" onClick={() => updateOnClick()}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
