import React, { useState } from "react";
import { Modal, Form } from "../../../../../Framework/Components/Layout";
import { Button } from "../../../../../Framework/Components/Widgets";

const ChangePasswordModal = ({ handleChangePassword }) => {
  const [formValues, setFormValues] = useState({
    txtUserName: "",
    txtEmail: "",
    txtPassword: "",
  });
  const updateState = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <Modal
      varient="center"
      title="Change Password"
      width="28vw"
      show={handleChangePassword}
      right="0"
    >
      <Modal.Body>
        <Form>
          <Form.Group controlwidth="280px">
            <Form.InputGroup label="User Name">
              <Form.InputControl
                control="input"
                type="txt"
                autoComplete="off"
                value={formValues.txtUserName}
                name="txtUserName"
                req="true"
                onChange={(e) => updateState("txtUserName", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup label="Email">
              <Form.InputControl
                control="input"
                type="mail"
                autoComplete="off"
                value={formValues.txtEmail}
                name="txtEmail"
                req="true"
                onChange={(e) => updateState("txtEmail", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup label="Password">
              <Form.InputControl
                control="input"
                type="password"
                autoComplete="off"
                value={formValues.txtPassword}
                name="txtPassword"
                req="true"
                onChange={(e) => updateState("txtPassword", e.target.value)}
              />
            </Form.InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="button" varient="secondary">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
