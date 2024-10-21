import React, { useState, useEffect } from "react";
import { Modal, Form } from "../../../../Framework/Components/Layout";
import { Button } from "../../../../Framework/Components/Widgets";

const EditPopup = ({ handleEditClick, initialData }) => {
  const [formValues, setFormValues] = useState({
    editText: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormValues({
        editText: initialData.editText,
      });
    }
  }, [initialData]);

  const updateState = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    // handleEditSubmit({ ...formValues, srNo: initialData.srNo });
  };

  return (
    <Modal
      varient="center"
      title="Update"
      width="40vw"
      show={handleEditClick}
      right="0"
    >
      <Modal.Body>
        <div className="popupSet">
          <Form>
            <Form.Group controlwidth="500px">
              <Form.InputGroup label="Edit Text">
                <Form.InputControl
                  control="input"
                  type="text"
                  autoComplete="off"
                  value={formValues.matCode}
                  name="matCode"
                  req="true"
                  onChange={(e) => updateState("editText", e.target.value)}
                />
              </Form.InputGroup>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button type="button" varient="secondary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPopup;
