import React, { useState } from "react";
import { Modal, Form } from "../../../../../Framework/Components/Layout";
import { Button } from "../../../../../Framework/Components/Widgets";
import { addPlant } from "../../../Services/Method";
import { AlertMessage } from "../../../../../Framework/Components/Widgets";

const AddNewModal = ({ handleAddNew, updateNewlyPlantData }) => {
  const setAlertMessage = AlertMessage();

  const [formValues, setFormValues] = useState({
    txtPlantCode: "",
    txtPlantName: "",
    txtActive: 1,
  });

  const updateState = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const addPlantOnClick = async () => {
    debugger;
    try {
      // if (!handleValidation()) {
      //   return;
      // }
      const formdata = {
        plantId: 0,
        plantCode:
          formValues && formValues.txtPlantCode ? formValues.txtPlantCode : "",
        plantName:
          formValues && formValues.txtPlantName ? formValues.txtPlantName : "",
        isActive: 1,
      };
      const result = await addPlant(formdata);
      if (result.response.successCode === 1) {
        setAlertMessage({
          type: "success",
          message: result.response.successMsg,
        });
        const newlyAddedPlant = [
          {
            plantCode:
              formValues && formValues.txtPlantCode
                ? formValues.txtPlantCode
                : "",
            plantName:
              formValues && formValues.txtPlantName
                ? formValues.txtPlantName
                : "",
            isActive:
              formValues && formValues.txtActive ? formValues.txtActive : "",
          },
        ];
        console.log(newlyAddedPlant);
        updateNewlyPlantData(newlyAddedPlant);
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

  return (
    <Modal
      varient="center"
      title="Add New Plant"
      width="28vw"
      show={handleAddNew}
      right="0"
    >
      <Modal.Body>
        <Form>
          <Form.Group controlwidth="280px">
            <Form.InputGroup label="Plant Code">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtPlantCode}
                name="txtPlantCode"
                req="true"
                onChange={(e) => updateState("txtPlantCode", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup label="Plant Name">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtPlantName}
                name="txtPlantName"
                req="true"
                onChange={(e) => updateState("txtPlantName", e.target.value)}
              />
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
          onClick={() => addPlantOnClick()}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewModal;
