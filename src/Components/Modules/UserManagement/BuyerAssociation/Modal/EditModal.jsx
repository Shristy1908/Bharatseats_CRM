import React, { useState, useEffect } from "react";
import { Modal, Form } from "../../../../../Framework/Components/Layout";
import { Button } from "../../../../../Framework/Components/Widgets";

const EditModal = ({ supplier, handleEdit}) => {
  const [formValues, setFormValues] = useState({
    vendorCode: supplier.vendorCode,
    userCode: supplier.userCode,
  });

  const vendorCodes = [
    "V001", "V002", "V003", "V004", "V005",
    "V006", "V007", "V008", "V009", "V010",
  ];

  const updateState = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    handleEdit({supplier, formValues });
  };

  return (
    <Modal varient="center" title="Edit Supplier" width="28vw" show={handleEdit} right="0">
      <Modal.Body>
        <Form>
          <Form.Group controlwidth="280px">
            <Form.InputGroup label="Vendor Code">
              <Form.InputControl
                control="select"
                value={formValues.vendorCode}
                name="vendorCode"
                req="true"
                onChange={(e) => updateState("vendorCode", e.target.value)}
              >
                <option value="" disabled>Select Vendor Code</option>
                {vendorCodes.map((code) => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </Form.InputControl>
            </Form.InputGroup>
            <Form.InputGroup label="User Code">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.userCode}
                name="userCode"
                req="true"
                onChange={(e) => updateState("userCode", e.target.value)}
              />
            </Form.InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="button" varient="secondary" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
