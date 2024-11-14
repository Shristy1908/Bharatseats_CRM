import React, { useEffect, useState } from "react";
import "../ManageRoles/ManageRoles.css";
import { addRole, getbrHeadTypeList } from "../../Services/Method";
import { AlertMessage } from "../../../../Framework/Components/Widgets";

const ManageRoles = () => {
  const setAlertMessage = AlertMessage();
  const [newRole, setNewRole] = useState("");
  const handleDisable = (data) => {
    alert(`You Can't Change`);
  };

  const [formValues, setFormValues] = useState({
    txtRoleName: "",
  });

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

  const updateState = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };
  // const handleUserChange = (e) => {
  //   setSelectedUser(e.target.value);
  // };

  // const updateNewlyUser = (newlyAddedUser) => {
  //   debugger;
  //   console.log("newlyAddedUser", newlyAddedUser);
  //   if (gridApi) {
  //     const rowData = [];
  //     if (newlyAddedUser && newlyAddedUser.length > 0) {
  //       newlyAddedUser.forEach((data) => {
  //         rowData.push(data);
  //       });
  //     }
  //     gridApi.forEachNode((node) => rowData.push(node.data));
  //     gridApi.setRowData(rowData);
  //     usersList.unshift(newlyAddedUser);
  //     setUsersList([]);
  //     setUsersList(usersList);
  //     console.log(usersList);
  //   }
  // };

  const handleAddRole = async () => {
    debugger;
    console.log("function call");
    try {
      const formdata = {
        roleId: 0,
        roleName:
          formValues && formValues.txtRoleName ? formValues.txtRoleName : "",
        isActive: "",
      };
      const result = await addRole(formdata);
      if (result.response.successCode === 1) {
        setAlertMessage({
          type: "success",
          message: result.response.successMsg,
        });
        // const newlyAddedUser = [
        //   {
        //     roleName:
        //       formValues && formValues.txtRoleName
        //         ? formValues.txtRoleName
        //         : "",
        //   },
        // ];
        // console.log(newlyAddedUser);
        // updateNewlyUser(newlyAddedUser);
        // handleCreateNew();
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
                className="txtRoleName"
                name="txtRoleName"
                placeholder="Enter New Role"
                value={formValues.txtRoleName}
                onChange={(e) => updateState("txtRoleName", e.target.value)}
              />
              <button className="addRoleButton" onClick={() => handleAddRole()}>
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
