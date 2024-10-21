import React, { useState, useRef, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { FaPlus, FaUpload, FaCheck, FaEyeSlash, FaEdit } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import "./ECN.css";
import EditPopup from "./Modal/EditPopup";
import { listOfECN } from "../Services/Method";
import { AlertMessage } from "../../../Framework/Components/Widgets";

const ECN = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [userCodes, setUserCodes] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const fileInputRef = useRef(null);

  const setAlertMessage = AlertMessage();

  const getECNList = async () => {
    try {
      const formdata = {};
      const result = await listOfECN(formdata);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.ecns &&
          result.response.responseData.ecns.length > 0
        ) {
          setRowData(result.response.responseData.ecns);
        }
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

  const CustomButtonComponent = () => {
    return (
      <>
        <div className="action-buttons">
          <button
            className="action-button"
            title="Approve"
            onClick={() => handleApprove()}
          >
            <FaCheck />
          </button>
          <button
            className="action-button"
            title="Disable"
            onClick={() => handleDisable()}
          >
            <FaEyeSlash />
          </button>
          <button
            className="action-button"
            title="Upload"
            onClick={() => handleUpload()}
          >
            <FaUpload />
          </button>
        </div>
      </>
    );
  };

  const CustomButtonComponentt = () => {
    return (
      <>
        <div className="action-buttons">
          <button
            className="action-button"
            title="Disable"
            onClick={() => handleDisable()}
          >
            <FaEyeSlash />
          </button>
        </div>
      </>
    );
  };

  const columnDefs = [
    {
      headerName: "Sr. No.",
      headerClass: "header",
      field: "srNO",
      valueGetter: (params) => params.node.rowIndex + 1,
      sortable: true,
      width: 150,
    },
    {
      headerName: "Model",
      headerClass: "header",
      field: "model",
      sortable: true,
      width: 150,
    },
    {
      headerName: "ECR & ECNNo.",
      headerClass: "header",
      field: "ecrECNNo",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Change Description",
      headerClass: "header",
      field: "changeDescription",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Supplier/In house",
      headerClass: "header",
      field: "supplier.supplierName",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Vendor Code",
      headerClass: "header",
      field: "supplier.supplierCode",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Date of data & format shared with Supplier",
      headerClass: "header",
      field: "dateofdata",
      sortable: true,
      width: 200,
    },
    {
      headerName: "S.No.",
      headerClass: "header",
      valueGetter: (params) => params.node.rowIndex + 1,
      sortable: true,
      width: 150,
    },

    {
      headerName: "Supplier ECR/ECN filled form with date",
      headerClass: "header",
      field: "supplierEcrEcn",
      sortable: true,
      width: 200,
      cellRenderer: CustomButtonComponent,
    },
    {
      headerName: "Supplier Feasibility Response And File",
      headerClass: "header",
      field: "suppFeaResFile",
      sortable: true,
      width: 200,
    },
    {
      headerName: "BSL Go Ahead 1",
      headerClass: "header",
      field: "bSLGo1",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Supplier Dimensional Response And File",
      headerClass: "header",
      field: "suppDimResFile",
      sortable: true,
      width: 200,
    },
    {
      headerName: "BSL Go Ahead 2",
      headerClass: "header",
      field: "bSLGo2",
      sortable: true,
      width: 150,
    },
    {
      headerName: "S.No.",
      headerClass: "header",
      valueGetter: (params) => params.node.rowIndex + 1,
      sortable: true,
      width: 150,
    },
    {
      headerName: "Under Progress/Complete",
      headerClass: "header",
      field: "underProcess",
      sortable: true,
      width: 200,
      cellRendererFramework: (params) => (
        <div className="action-icons">
          <button title="Edit" onClick={() => handleEditClick(params.data)}>
            <FaEdit className="edit-icon" />
          </button>
        </div>
      ),
    },
    {
      headerName: "Remarks",
      headerClass: "header",
      field: "remarks",
      sortable: true,
      width: 150,
      cellRendererFramework: (params) => (
        <div className="action-icons">
          <button title="Edit" onClick={() => handleEditClick(params.data)}>
            <FaEdit className="edit-icon" />
          </button>
        </div>
      ),
    },
    {
      headerName: "Action",
      headerClass: "header",
      field: "actionStatus",
      sortable: true,
      width: 150,
      cellRenderer: CustomButtonComponentt,
    },
  ];

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
  };

  const defaultColDef = useMemo(() => {
    return {
      initialWidth: 200,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      resizable: true,
    };
  }, []);

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleUserCodesChange = (e) => {
    setUserCodes(e.target.value);
  };

  const handleEditClick = (data) => {
    debugger;
    setEditData(data);
    setEditModal(!editModal);
  };

  const gridApiRef = useRef(null);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    alert("Submitted Successfully");
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    gridApiRef.current.setQuickFilter(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleUpload = (data) => {
    alert("Upload clicked for", data);
  };

  const handleApprove = (data) => {
    console.log("Approve clicked for", data);
  };

  const handleDisable = (data) => {
    alert(`You Can't Change`);
  };

  useEffect(() => {
    getECNList();
  }, []);

  return (
    <>
      {editModal && (
        <EditPopup handleEditClick={handleEditClick} initialData={editData} />
      )}
      <div className="ecnContainer">
        <p>R&D - ECN</p>
        <div className="ecContainer">
          <div className="modelContainer">
            <label>Model</label>
            <input
              type="text"
              value={userCodes}
              onChange={handleUserCodesChange}
              placeholder="Model"
            />
          </div>
          <div className="modelContainer">
            <label>ECR & ECN No. :</label>
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              placeholder="ECN"
            />
          </div>
          <div className="modelContainer">
            <label>Change Description :</label>
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              placeholder="Change Description"
            />
          </div>
        </div>

        <div className="aContainer">
          <div className="d0Container">
            <label>Supplier Type: &nbsp;&nbsp;</label>
            <select value={selectedUser} onChange={handleUserChange}>
              <option value="">--Select User--</option>
              <option value="supplier">Supplier</option>
              <option value="inHouse">In House</option>
            </select>
          </div>
          <div className="d0Container">
            <label>Select Supplier: &nbsp;&nbsp;</label>
            <select value={selectedUser} onChange={handleUserChange}>
              <option value="">--Select User--</option>
              <option value="">--Select User--</option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
              <option value="user3">User 3</option>
              <option value="user4">User 4</option>
              <option value="user5">User 5</option>
              <option value="user6">User 6</option>
              <option value="user7">User 7</option>
            </select>
          </div>
          <div className="d0Container">
            <label>Vendor Code : &nbsp;&nbsp;</label>
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              placeholder="Vendor Code"
            />
          </div>
        </div>

        <div className="fileContainer">
          <input
            type="text"
            value={fileName}
            placeholder="No file chosen"
            disabled="disabled"
            className="btn-default"
          />
          <button onClick={handleBrowseClick} className="ecnbrowseBtn">
            <FaPlus />
            &nbsp;Browse
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button onClick={handleSubmit} className="submitBtn">
            Submit
          </button>
        </div>

        <div className="inputBox">
          <label>Search</label>
          <input
            type="text"
            placeholder="Enter Text..."
            onChange={handleSearch}
          />
        </div>
        <div className="outerContainer">
          <div className="ag-theme-alpine">
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
              onGridReady={onGridReady}
              defaultColDef={defaultColDef}
              quickFilterText={searchText}
              domLayout="autoHeight"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ECN;
