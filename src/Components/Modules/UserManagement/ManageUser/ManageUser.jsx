import React, { useState, useRef, useMemo, useEffect } from "react";
import "../ManageUser/ManageUser.css";
import { AgGridReact } from "ag-grid-react";
import ChangePasswordModal from "./Modal/ChangePasswordModal";
import SetUserRoleModal from "./Modal/SetUserRoleModal";
import CreateNewModal from "./Modal/CreateNewModal";
import { FaEdit } from "react-icons/fa";
import EditUserModal from "./Modal/EditUserModal";
import { listOfUsers } from "../../Services/Method";
import { AlertMessage, Loader } from "../../../../Framework/Components/Widgets";

const ManageUser = () => {
  const setAlertMessage = AlertMessage();
  const [isLoadingDataList,setisLoadingDataList]=useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [setUserRoleModal, setSetUserRoleModal] = useState(false);
  const [createNewModal, setCreateNewModal] = useState(false);
  const gridApiRef = useRef(null);

  const [editUserModal, setEditUserModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const handleEditUser = (params) => {
    if (params) {
      setSelectedRowData(params.data);
    }
    setEditUserModal(!editUserModal);
  };

  const columnDefs = useMemo(() => [
    {
      headerName: "User Name",
      field: "userName",
      headerClass: "header",
      sortable: true,
      flex: 1,
    },
    {
      headerName: "Email",
      field: "email",
      headerClass: "header",
      sortable: true,
      width: "320",
    },
    {
      headerName: "Mobile No",
      field: "mobileNumber",
      headerClass: "header",
      sortable: true,
      flex: 1,
    },
    {
      headerName: "BR Head Type",
      field: "brHeadTypeName",
      headerClass: "header",
      sortable: true,
      flex: 1,
    },
    {
      headerName: "User Type",
      field: "userTypeName",
      headerClass: "header",
      sortable: true,
      flex: 1,
    },
    {
      headerName: "Action",
      field: "action",
      headerClass: "header",
      sortable: true,
      flex: 1,
      cellRendererFramework: (params) => (
        <div className="action-icons">
          <button title="Edit" onClick={() => handleEditUser(params)}>
            <FaEdit title="Edit" />
          </button>
          <button
            title="Change Password"
            onClick={() => handleChangePassword()}
          >
            <i className="fas fa-key"></i>
          </button>
          <button title="Set Role" onClick={() => handleSetRole()}>
            <i className="fas fa-user-cog"></i>
          </button>
        </div>
      ),
    },
  ]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    gridApiRef.current.setQuickFilter(value);
  };

  const handleChangePassword = (data) => {
    setSelectedUser(data);
    setChangePasswordModal(!changePasswordModal);
  };

  const handleSetRole = (data) => {
    setSelectedUser(data);
    setSetUserRoleModal(!setUserRoleModal);
  };

  const handleCreateNew = (data) => {
    setSelectedUser(data);
    setCreateNewModal(!createNewModal);
  };

  const defaultColDef = useMemo(() => {
    return {
      initialWidth: 200,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      resizable: true,
    };
  }, []);
  // const rowStyle = { textAlign: "center" };

  const [usersList, setUsersList] = useState([]);
  const getUsersList = async () => {
    try {
      const formdata = {
        action: "ALL",
        profileId: 0,
        profileName: "",
      };
      setisLoadingDataList(true);
      const result = await listOfUsers(formdata);
      setisLoadingDataList(false)
      if (result.response.successCode === 1) {
        if (result.response.responseData) {
          setUsersList(result.response.responseData);
        } else {
          setUsersList([]);
        }
      } else {
        setAlertMessage({
          type: "success",
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
  
  const [gridApi, setGridApi] = useState();
  const onGridReady = (params) => {
    console.log(params.api);
    setGridApi(params.api);
  };

  const updateNewlyUser = (newlyAddedUser) => {
    debugger;
    console.log("newlyAddedUser", newlyAddedUser);
    if (gridApi) {
      const rowData = [];
      if (newlyAddedUser && newlyAddedUser.length > 0) {
        newlyAddedUser.forEach((data) => {
          rowData.push(data);
        });
      }
      gridApi.forEachNode((node) => rowData.push(node.data));
      gridApi.setRowData(rowData);
      usersList.unshift(newlyAddedUser);
      setUsersList([]);
      setUsersList(usersList);
      console.log(usersList);
    }
  };

  const updateEditedUserData = () => {
    debugger;
    const mappedData = usersList.map((data) => {
      if (data.userId === selectedRowData.userId) {
        data.userName = selectedRowData.userName;
        data.email = selectedRowData.email;
        data.mobileNumber = selectedRowData.mobileNumber;
        data.stateName = selectedRowData.stateName;
        data.cityName = selectedRowData.cityName;
        data.brHeadTypeName = selectedRowData.brHeadTypeName;
        data.userTypeName = selectedRowData.userTypeName;
        data.isActive = selectedRowData.isActive;
      }
      return data;
    });
    setUsersList(mappedData);
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <>
      {editUserModal && (
        <EditUserModal
          selectedRowData={selectedRowData}
          handleEditUser={handleEditUser}
          updateEditedUserData={updateEditedUserData}
        />
      )}
      {changePasswordModal && (
        <ChangePasswordModal handleChangePassword={handleChangePassword} />
      )}
      {setUserRoleModal && selectedUser && (
        <SetUserRoleModal user={selectedUser} handleSetRole={handleSetRole} />
      )}
      {createNewModal && (
        <CreateNewModal
          handleCreateNew={handleCreateNew}
          updateNewlyUser={updateNewlyUser}
        />
      )}

      {isLoadingDataList ? (
        <Loader />
      ) : (
        <div className="manageuserContainer">
          <p className="title">User Management - Manage Users</p>
          <div className="inputBox">
            <label>Search:</label>
            <input
              type="text"
              placeholder="Enter Text..."
              onChange={handleSearch}
            />
          </div>
          <div className="createbuttonContainer">
            <button className="createButton" onClick={handleCreateNew}>
              Create New
            </button>
          </div>

          {/* <button
            className="editRoleButton"
            onClick={() => navigate("/UserManagement/ManageRoles")}
          >
            Edit Role
          </button> */}

          <div className="outerContainer">
            <div className="ag-theme-alpine">
              <AgGridReact
                rowData={usersList}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                onGridReady={onGridReady}
                defaultColDef={defaultColDef}
                domLayout="autoHeight"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageUser;
