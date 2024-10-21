import React, { useState } from "react";
import { Modal, Form } from "../../../../../Framework/Components/Layout";
import { Button } from "../../../../../Framework/Components/Widgets";
import "./SetUserRole1.css";

const SetUserRoleModal = ({ user, handleSetRole }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [roles, setRoles] = useState([]);

  const handleAddRole = () => {
    if (selectedRole) {
      if (!roles.includes(selectedRole)) {
        setRoles([...roles, selectedRole]);
      }
    }
  };

  const handleDeleteRole = (roleToDelete) => {
    const updatedRoles = roles.filter((role) => role !== roleToDelete);
    setRoles(updatedRoles);
  };

  const handleSave = () => {
    // handleSetUserRole({ alias: user.alias, email: user.email, roles });
  };

  return (
    <Modal
      varient="center"
      className="popUpContainer"
      title={`Set Role for ${user.alias}`}
      show={handleSetRole}
      right="0"
    >
      <Modal.Body>
        <Form>
          <Form.Group controlwidth="280px">
            <Form.InputGroup label="Role">
              <div className="role-input">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="">---Select Role---</option>
                  <option value="Buyer">Buyer</option>
                  <option value="BSLUser">BSLUser</option>
                  <option value="R&D">R&D</option>
                  <option value="Visitor">Visitor</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Quality">Quality</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddRole}
                  className="add-role-button"
                >
                  Add
                </button>
              </div>
            </Form.InputGroup>
          </Form.Group>
          <div className="role-list">
            <h3>Existing Roles:</h3>
            <ul>
              {roles.map((role, index) => (
                <li key={index}>
                  {role}
                  <button
                    type="button"
                    onClick={() => handleDeleteRole(role)}
                    className="delete-role-button"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" varient="secondary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SetUserRoleModal;
