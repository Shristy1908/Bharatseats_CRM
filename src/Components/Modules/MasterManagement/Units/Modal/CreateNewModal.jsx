import React, { useEffect, useState } from "react";
import { Modal, Form } from "../../../../../Framework/Components/Layout";
import { Button } from "../../../../../Framework/Components/Widgets";
import { addUnit, listOfUnits } from "../../../Services/Method";
import { AlertMessage } from "../../../../../Framework/Components/Widgets";

const CreateNewModal = ({
  handleAddNew,
  handleCancel,
  updateNewlyAddedUnitData,
}) => {
  const setAlertMessage = AlertMessage();
  const [formValues, setFormValues] = useState({
    txtUnitCode: "",
    txtUnitDescription: "",
  });

  const updateState = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const addUnitOnClick = async () => {
    debugger;
    try {
      // if (!handleValidation()) {
      //   return;
      // }
      const formdata = {
        unitCode:
          formValues && formValues.txtUnitCode ? formValues.txtUnitCode : "",
        unitDescription:
          formValues && formValues.txtUnitDescription
            ? formValues.txtUnitDescription
            : "",
      };
      const result = await addUnit(formdata);
      if (result.response.successCode === 1) {
        setAlertMessage({
          type: "success",
          message: result.response.successMsg,
        });
        const newlyAddedUnit = [
          {
            unitCode:
              formValues && formValues.txtUnitCode
                ? formValues.txtUnitCode
                : "",
            unitDescription:
              formValues && formValues.txtUnitDescription
                ? formValues.txtUnitDescription
                : "",
            isActive: 1,
          },
        ];
        console.log(newlyAddedUnit);
        updateNewlyAddedUnitData(newlyAddedUnit);
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
      title="Add New Unit"
      width="28vw"
      show={handleAddNew}
      hide={handleCancel}
      right="0"
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
                onChange={(e) => updateState("txtUnitCode", e.target.value)}
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
                checked={true}
                name="txtActive"
                // onChange={(e) => updateState("txtActive", true)}
              />
            </Form.InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          varient="secondary"
          onClick={() => addUnitOnClick()}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateNewModal;
