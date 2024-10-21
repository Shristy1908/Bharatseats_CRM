import React, { useEffect, useState } from "react";
import "../ManageRoles/ManageRoles.css";
import { getbrHeadTypeList } from "../../Services/Method";
import { AlertMessage } from "../../../../Framework/Components/Widgets";

const ManageRoles = () => {
  const setAlertMessage = AlertMessage();
  const [roles, setRoles] = useState([
    { name: "Buyer", disabled: false },
    { name: "Supplier", disabled: false },
    { name: "BSLUser", disabled: false },
    { name: "R&D", disabled: false },
    { name: "Visitor", disabled: false },
    { name: "Administrator", disabled: false },
    { name: "Quality", disabled: false },
  ]);
  const [newRole, setNewRole] = useState("");

  const handleAddRole = () => {
    if (newRole.trim()) {
      setRoles([...roles, { name: newRole, disabled: false }]);
      setNewRole("");
    }
  };
  const handleDisable = (data) => {
    alert(`You Can't Change`);
  };

  const [roleList, setRoleList] = useState([]);

  const getRoleList = async () => {
    try {
      const formdata = {};
      const result = await getbrHeadTypeList(formdata);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.length > 0
        ) {
          setRoleList(result.response.responseData);
        } else {
          setRoleList([]);
        }
      } else {
        setRoleList([]);
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

  useEffect(() => {
    getRoleList();
    console.log(roleList);
  }, []);

  return (
    <div className="manageRoles">
      <p className="card-title title">User Management - Manage Roles</p>
      <div className="card-body">
        <div className="role-box">
          <div className="container">
            <div className="roleInputBox">
              <input
                type="text"
                className="roleInput"
                placeholder="Enter New Role"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              />
              <button className="addRoleButton" onClick={handleAddRole}>
                Add Role
              </button>
            </div>
          </div>
          <table className="roleTable">
            <thead>
              <tr>
                <th>Role Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {roleList.map((role, index) => (
                <tr key={index}>
                  <td>{role.brHeadTypeName}</td>
                  <td>
                    <button title="Disable" onClick={() => handleDisable()}>
                      <i class="fas fa-regular fa-eye-slash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageRoles;
