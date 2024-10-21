import React, { useState, useRef, useMemo } from "react";
import DatePicker from "react-datepicker";
import { AgGridReact } from "ag-grid-react";
import "react-datepicker/dist/react-datepicker.css";
import "./Notification.css";

const Notification = () => {
  const [rowData, setRowData] = useState([
    {
      userCode: "201",
      message: "user a",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
    {
      userCode: "203",
      message: "user",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
    {
      userCode: "204",
      message: "user",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
    {
      userCode: "205",
      message: "user",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
    {
      userCode: "201",
      message: "user",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
    {
      userCode: "206",
      message: "user",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
    {
      userCode: "201",
      message: "user",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
    {
      userCode: "201",
      message: "user",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
    {
      userCode: "201",
      message: "user",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
    {
      userCode: "201",
      message: "user",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
    {
      userCode: "201",
      message: "user",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
    {
      userCode: "201",
      message: "user",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
    {
      userCode: "201",
      message: "user",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
    {
      userCode: "201",
      message: "user",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
    {
      userCode: "201",
      message: "user",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
    {
      userCode: "201",
      message: "user",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
    {
      userCode: "201",
      message: "user",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
    {
      userCode: "201",
      message: "user",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
    {
      userCode: "202",
      message: "user",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
    {
      userCode: "201",
      message: "user",
      startDate: "12/03/2023",
      endDate: "07/12/2024",
      uploadDate: "",
    },
  ]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [userCodes, setUserCodes] = useState("");
  const [message, setMessage] = useState("");
  const [searchText, setSearchText] = useState("");

  const columnDefs = [
    {
      headerName: "User Code",
      field: "userCode",
      headerClass: "header",
      sortable: true,
      width: 250,
    },
    {
      headerName: "Message",
      field: "message",
      headerClass: "header",
      sortable: true,
      width: 250,
    },
    {
      headerName: "Start Date",
      field: "startDate",
      headerClass: "header",
      sortable: true,
      width: 250,
    },
    {
      headerName: "End Date",
      field: "endDate",
      headerClass: "header",
      sortable: true,
      width: 250,
    },
    {
      headerName: "Upload Date",
      field: "startDate",
      headerClass: "header",
      sortable: true,
      width: 250,
    },
  ];

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
    // params.api.sizeColumnsToFit();
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

  const gridApiRef = useRef(null);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    alert("Submitted Successfully");
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    gridApiRef.current.setQuickFilter(value);
  };

  return (
    <div className="notificationContainer">
      <p>General - Notification</p>
      <div className="quickContainer">
        <div className="cContainer">
          <div className="dContainer">
            <label>Select User:</label>
            <select value={selectedUser} onChange={handleUserChange}>
              <option value="">--Select User--</option>
              <option value="user1">All Supplier</option>
              <option value="user2">All Buyer</option>
              <option value="user3">All User</option>
            </select>
          </div>
          <div className="fContainer">
            <label>Enter user codes separated by ;</label>
            <input
              type="textl"
              value={userCodes}
              onChange={handleUserCodesChange}
              placeholder="Enter user codes separated by ;"
            />
          </div>
        </div>

        <div className="reactdatepicker">
          <div className="r-datepicker">
            <label>Start Date:</label>
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              placeholderText="mm/dd/yyyy"
              className="fromDate"
            />
          </div>
          <div className="r-datepicker">
            <label>End Date:</label>
            <DatePicker
              selected={toDate}
              onChange={(date) => setToDate(date)}
              placeholderText="mm/dd/yyyy"
              className="toDate"
            />
          </div>
        </div>

        <div className="messagesContainer">
          <label>Message:</label>
          <input
            type="textl"
            value={message}
            onChange={handleMessageChange}
            placeholder="Enter Message"
          />
          <button onClick={handleSubmit} className="submitBtnn">
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
    </div>
  );
};

export default Notification;
