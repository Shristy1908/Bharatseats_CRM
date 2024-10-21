import React, { useState } from "react";
import "./SetUserRole.css";

const SetUserRole = ({ user, onSave, onBack }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [roles, setRoles] = useState([]);

  const handleAddRole = () => {
    if (selectedRole) {
      if (roles.includes(selectedRole)) {
        const updatedRoles = roles.map((role) =>
          role === selectedRole ? selectedRole : role
        );
        setRoles(updatedRoles);
      } else {
        setRoles([...roles, selectedRole]);
      }
    }
  };

  const handleDeleteRole = (roleToDelete) => {
    const updatedRoles = roles.filter((role) => role !== roleToDelete);
    setRoles(updatedRoles);
  };

  const handleSave = () => {
    onSave({ alias: user.alias, email: user.email, roles });
  };

  return (
    <div className="set-role-container">
      <h2>Set Role for {user.alias}</h2>
      <div className="inputBox input-role">
        <label>Role :</label>
        <div className="role-input">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="buyer">Buyer</option>
            <option value="BSLUser">BSLUser</option>
            <option value="R&D">R&D</option>
            <option value="visitor">Visitor</option>
            <option value="administrator">Administrator</option>
            <option value="quality">Quality</option>
          </select>
          <button onClick={handleAddRole} className="add-role-button">
            Add
          </button>
        </div>
      </div>
      <div className="role-list">
        <h3>Existing Roles:</h3>
        <ul>
          {roles.map((role, index) => (
            <li key={index}>
              {role}
              <button
                onClick={() => handleDeleteRole(role)}
                className="delete-role-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="buttonBox">
        <button onClick={handleSave} className="save-button">
          Save
        </button>
        <button onClick={onBack} className="back-button">
          Back
        </button>
      </div>
    </div>
  );
};

export default SetUserRole;
