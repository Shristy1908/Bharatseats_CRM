import React, { useState } from "react";
import { Modal, Form } from "../../../../../Framework/Components/Layout";
import { Button } from "../../../../../Framework/Components/Widgets";
import { updatePlant } from "../../../Services/Method";
import { AlertMessage } from "../../../../../Framework/Components/Widgets";

const EditModal = ({ handleEditClick, selectedRowData, updatePlantData }) => {
  const setAlertMessage = AlertMessage();
  const [formValues, setFormValues] = useState({
    txtPlantCode: selectedRowData.plantCode,
    txtPlantName: selectedRowData.plantName,
    txtActive: selectedRowData.isActive,
  });

  console.log("selected value", selectedRowData);

  const updateState = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
    if (name === "txtActive") {
      setFormValues({
        ...formValues,
        [name]: value ? 1 : 0, // Convert boolean to 1 or 0
      });
    }
  };

  const updateOnClick = async () => {
    try {
      const formdata = {
        plantId: selectedRowData.plantId,
        plantCode: formValues.txtPlantCode,
        plantName: formValues.txtPlantName,
        isActive: formValues.txtActive,
      };
      const result = await updatePlant(formdata);
      if (result.response.successCode === 1) {
        setAlertMessage({
          type: "success",
          message: result.response.successMsg,
        });
        selectedRowData.plantName = formValues.txtPlantName;
        selectedRowData.isActive = formValues.txtActive;
        updatePlantData(selectedRowData);
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

  return (
    <Modal
      varient="center"
      title="Edit Plant"
      width="28vw"
      show={handleEditClick}
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
                // onChange={(e) => updateState("txtPlantCode", e.target.value)}
                readonly
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
          onClick={() => updateOnClick()}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
