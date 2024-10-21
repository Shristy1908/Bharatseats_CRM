import React, { useState } from "react";
import { Modal, Form } from "../../../../../Framework/Components/Layout";
import { Button } from "../../../../../Framework/Components/Widgets";
import { AlertMessage } from "../../../../../Framework/Components/Widgets";
import { updateUnit } from "../../../Services/Method";

const EditModal = ({ handleEditClick, selectedRowData, updateUnitData }) => {
  console.log(selectedRowData.isActive);
  const setAlertMessage = AlertMessage();
  const [formValues, setFormValues] = useState({
    txtUnitId:selectedRowData.unitId,
    txtUnitCode: selectedRowData.unitCode,
    txtUnitDescription: selectedRowData.unitDescription,
    txtActive: selectedRowData.isActive,
  });

  const updateState = (name, value) => {
    if (name === "txtActive") {
      setFormValues({
        ...formValues,
        [name]: value ? 1 : 0, // Convert boolean to 1 or 0
      });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const UpdateOnClick = async () => {
    debugger;
    try {
      const formdata = {
        unitId: selectedRowData.unitId,
        unitCode: formValues.txtUnitCode,
        unitDescription: formValues.txtUnitDescription,
        isActive: formValues.txtActive,
      };
      const result = await updateUnit(formdata);
      if (result.response.successCode === 1) {
        setAlertMessage({
          type: "success",
          message: result.response.successMsg,
        });
        selectedRowData.unitDescription = formValues.txtUnitDescription;
        selectedRowData.isActive = formValues.txtActive;
        updateUnitData(selectedRowData);
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
      title="Edit Unit"
      width="28vw"
      show={handleEditClick}
    >
      <Modal.Body>
        <Form>
          <Form.Group controlwidth="280px">
            <Form.InputGroup label="Unit Code">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtUnitCode}
                name="txtUnitCode"
                req="true"
                // onChange={(e) => updateState("txtPlantCode", e.target.value)}
                readonly
              />
            </Form.InputGroup>
            <Form.InputGroup label="Unit Description">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtUnitDescription}
                name="txtUnitDescription"
                req="true"
                onChange={(e) =>
                  updateState("txtUnitDescription", e.target.value)
                }
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
        <Button
          type="button"
          varient="secondary"
          onClick={() => UpdateOnClick()}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
