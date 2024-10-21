import React, { useState, useRef, useMemo, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ManageSchedule.css";
import { AgGridReact } from "ag-grid-react";
import "../../../../../node_modules/ag-grid-community/src/styles/ag-grid.scss";
import "../../../../../node_modules/ag-grid-community/src/styles/ag-theme-alpine/sass/ag-theme-alpine.scss";
import { useNavigate } from "react-router-dom";
import { AlertMessage, Loader } from "../../../../Framework/Components/Widgets";
import { manageSchedule } from "../../Services/Method";

const ManageSchedule = () => {
  const setAlertMessage = AlertMessage();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const navigate = useNavigate();

  const [PendingRowData, setPendingRowData] = useState([
    {
      SrNo: "001",
      scheduleType: "Active",
      dispatchPlantLocation: "Delhi",
      uploadBy: "07/07/2021",
      supplierCode: "2000138AD",
      action: "",
    },
    {
      SrNo: "002",
      scheduleType: "InActive",
      dispatchPlantLocation: "Delhi",
      uploadBy: "07/07/2021",
      supplierCode: "2000138AD",
      action: "",
    },
    {
      SrNo: "003",
      scheduleType: "InActive",
      dispatchPlantLocation: "Delhi",
      uploadBy: "07/07/2021",
      supplierCode: "2000138AD",
      action: "",
    },
    {
      SrNo: "004",
      scheduleType: "Active",
      dispatchPlantLocation: "Delhi",
      uploadBy: "07/07/2021",
      supplierCode: "2000138AD",
      action: "",
    },
    {
      SrNo: "005",
      scheduleType: "Active",
      dispatchPlantLocation: "Delhi",
      uploadBy: "07/07/2021",
      supplierCode: "2000138AD",
      action: "",
    },
    {
      SrNo: "001",
      scheduleType: "Active",
      dispatchPlantLocation: "Delhi",
      uploadBy: "07/07/2021",
      supplierCode: "2000138AD",
      action: "",
    },
    {
      SrNo: "001",
      scheduleType: "Active",
      dispatchPlantLocation: "Delhi",
      uploadBy: "07/07/2021",
      supplierCode: "2000138AD",
      action: "",
    },
    {
      SrNo: "001",
      scheduleType: "Active",
      dispatchPlantLocation: "Delhi",
      uploadBy: "07/07/2021",
      supplierCode: "2000138AD",
      action: "",
    },
  ]);

  // const [isLoadingDataList, setisLoadingDataList] = useState(false);
  const [AcknowledgedRowData, setAcknowledgedRowData] = useState([]);

  const getAckMSList = async () => {
    debugger;

    try {
      const formdata = {};
      // setisLoadingDataList(true);
      const result = await manageSchedule(formdata);
      // setisLoadingDataList(false);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.scheduleList &&
          result.response.responseData.scheduleList.length > 0
        ) {
          setAcknowledgedRowData(result.response.responseData.scheduleList);
        } else {
          setAcknowledgedRowData([]);
        }
      } else {
        setAcknowledgedRowData([]);
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

  const [DeclinedRowData, setDeclinedRowData] = useState([
    {
      SrNo: "001",
      scheduleType: "Active",
      dispatchPlantLocation: "Delhi",
      uploadBy: "07/07/2021",
      supplierCode: "2000138AD",
      action: "",
    },
    {
      SrNo: "002",
      scheduleType: "InActive",
      dispatchPlantLocation: "Delhi",
      uploadBy: "07/07/2021",
      supplierCode: "2000138AD",
      action: "",
    },
    {
      SrNo: "003",
      scheduleType: "InActive",
      dispatchPlantLocation: "Delhi",
      uploadBy: "07/07/2021",
      supplierCode: "2000138AD",
      action: "",
    },
    {
      SrNo: "004",
      scheduleType: "Active",
      dispatchPlantLocation: "Delhi",
      uploadBy: "07/07/2021",
      supplierCode: "2000138AD",
      action: "",
    },
    {
      SrNo: "005",
      scheduleType: "Active",
      dispatchPlantLocation: "Delhi",
      uploadBy: "07/07/2021",
      supplierCode: "2000138AD",
      action: "",
    },
    {
      SrNo: "001",
      scheduleType: "Active",
      dispatchPlantLocation: "Delhi",
      uploadBy: "07/07/2021",
      supplierCode: "2000138AD",
      action: "",
    },
    {
      SrNo: "001",
      scheduleType: "Active",
      dispatchPlantLocation: "Delhi",
      uploadBy: "07/07/2021",
      supplierCode: "2000138AD",
      action: "",
    },
    {
      SrNo: "001",
      scheduleType: "Active",
      dispatchPlantLocation: "Delhi",
      uploadBy: "07/07/2021",
      supplierCode: "2000138AD",
      action: "",
    },
  ]);

  const gridApiRef = useRef(null);

  const PendingColumnDefs = [
    {
      headerName: "Sr. No.",
      field: "SrNo",
      headerClass: "header",
      editable: true,
      width: 150,
      flex: 1,
    },
    {
      headerName: "Schedule Type",
      field: "scheduleType",
      headerClass: "header",
      editable: true,
      width: 150,
      flex: 1,
    },
    {
      headerName: "Dispatch Plant Location",
      field: "dispatchPlantLocation",
      headerClass: "header",
      width: 300,
      flex: 1,
    },
    {
      headerName: "Upload By",
      field: "uploadBy",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "Supplier Code",
      field: "supplierCode",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "Action",
      field: "action",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
  ];
  console.log(AcknowledgedRowData);

  const CustomButtonComponent = (params) => {
    debugger;
    const rowData = params;

    const handleViewClick = () => {
      debugger;
      navigate("/BuyerManagement/MSViewModal",{state : { rowData }});
    };

    return (
      <>
        <button
          onClick={handleViewClick}
          style={{
            backgroundColor: "#3d8bda",
            height: "35px",
            color: "#fff",
            padding: "0px 15px",
            textAlign: "center",
            borderRadius: "10px",
          }}
        >
          View
        </button>
      </>
    );
  };

  const AcknowledgedcolumnDefs = [
    {
      headerName: "Sr. No.",
      valueGetter: (params) => params.node.rowIndex + 1,
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "Schedule Type",
      field: "scheduleType",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "Dispatch Plant Location",
      field: "plant.plantName",
      // valueGetter: (params) => plant.plantName,
      headerClass: "header",
      tooltipField: "headerName",
      width: 300,
      flex: 1,
    },
    {
      headerName: "Upload By",
      field: "supplier.uploadedBy",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "Supplier Code",
      field: "supplier.supplierCode",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "Action",
      field: "action",
      headerClass: "header",
      width: 150,
      flex: 1,
      cellRenderer: CustomButtonComponent,
    },
  ];

  const DeclinedcolumnDefs = [
    {
      headerName: "Sr. No.",
      field: "SrNo",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "Schedule Type",
      field: "scheduleType",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "Dispatch Plant Location",
      field: "dispatchPlantLocation",
      headerClass: "header",
      tooltipField: "headerName",
      width: 300,
      flex: 1,
    },
    {
      headerName: "Upload By",
      field: "uploadBy",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "Supplier Code",
      field: "supplierCode",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "Action",
      field: "action",
      headerClass: "header",
      width: 150,
      flex: 1,
      //  cellRenderer: CustomButtonComponent,
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
    };
  }, []);

  useEffect(() => {
    getAckMSList();
  }, []);

  return (
    <>
      <div className="manageScheduleContainer">
        <p className="pageTitle">
          Buyer Management - Manage Schedule/View Supplier PO
        </p>
        <div class="card card-tabs mt-3 tabContainer">
          <div class="card-header p-0 pt-1">
            <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="custom-tabs-one-home-tab"
                  data-toggle="pill"
                  href="#custom-tabs-one-home"
                  role="tab"
                  aria-controls="custom-tabs-one-home"
                  aria-selected="true"
                >
                  Pending
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="custom-tabs-one-profile-tab"
                  data-toggle="pill"
                  href="#custom-tabs-one-profile"
                  role="tab"
                  aria-controls="custom-tabs-one-profile"
                  aria-selected="false"
                >
                  Acknowledged
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="custom-tabs-one-messages-tab"
                  data-toggle="pill"
                  href="#custom-tabs-one-messages"
                  role="tab"
                  aria-controls="custom-tabs-one-messages"
                  aria-selected="false"
                >
                  Declined
                </a>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <div class="tab-content" id="custom-tabs-one-tabContent">
              {/* Pending tab content container */}

              <div
                class="tab-pane fade active show"
                id="custom-tabs-one-home"
                role="tabpanel"
                aria-labelledby="custom-tabs-one-home-tab"
              >
                <div className="DropdownContainer">
                  <select
                    className="dropDown"
                    //   value={selectedPlant}
                    //   onChange={(e) => setSelectedPlant(e.target.value)}
                  >
                    <option value="">--Select--</option>
                    <option value="">Supplier Code</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="searchInputText"
                  />
                  <button className="searchBtn">Search</button>
                </div>
                <div className="DateAndBtnContainer">
                  <div className="react-datepicker-wrapper">
                    <DatePicker
                      selected={fromDate}
                      onChange={(date) => setFromDate(date)}
                      placeholderText="From Date"
                      className="fromDate"
                    />
                  </div>

                  <div className="react-datepicker-wrapper">
                    <DatePicker
                      selected={toDate}
                      onChange={(date) => setToDate(date)}
                      placeholderText="To Date"
                      className="toDate"
                    />
                  </div>

                  <button className="searchBtn">Search</button>
                  <button className="clearBtn">Clear</button>
                </div>

                <div className="MSTableContainer">
                  <div className="ag-theme-alpine">
                    <AgGridReact
                      rowData={PendingRowData}
                      columnDefs={PendingColumnDefs}
                      pagination={true}
                      paginationPageSize={10}
                      onGridReady={onGridReady}
                      defaultColDef={defaultColDef}
                      domLayout="autoHeight"
                    />
                  </div>
                </div>
              </div>

              {/* Acknowledged tab content container */}

              <div
                class="tab-pane fade"
                id="custom-tabs-one-profile"
                role="tabpanel"
                aria-labelledby="custom-tabs-one-profile-tab"
              >
                {/* {isLoadingDataList ? (
                  <Loader />
                ) : ( */}
                <>
                  <div className="DropdownContainer">
                    <select
                      className="dropDown"
                      //   value={selectedPlant}
                      //   onChange={(e) => setSelectedPlant(e.target.value)}
                    >
                      <option value="">--Select--</option>
                      <option valur="">Supplier Code</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="searchInputText"
                    />
                    <button className="searchBtn">Search</button>
                  </div>
                  <div className="DateAndBtnContainer">
                    <div className="react-datepicker-wrapper">
                      <DatePicker
                        selected={fromDate}
                        onChange={(date) => setFromDate(date)}
                        placeholderText="From Date"
                        className="fromDate"
                      />
                    </div>

                    <div className="react-datepicker-wrapper">
                      <DatePicker
                        selected={toDate}
                        onChange={(date) => setToDate(date)}
                        placeholderText="To Date"
                        className="toDate"
                      />
                    </div>

                    <button className="searchBtn">Search</button>
                    <button className="clearBtn">Clear</button>
                  </div>
                  <div className="MSTableContainer">
                    <div className="ag-theme-alpine">
                      <AgGridReact
                        rowData={AcknowledgedRowData}
                        columnDefs={AcknowledgedcolumnDefs}
                        pagination={true}
                        paginationPageSize={10}
                        onGridReady={onGridReady}
                        defaultColDef={defaultColDef}
                        domLayout="autoHeight"
                      />
                    </div>
                  </div>
                </>
                {/* )} */}
              </div>

              {/* Declined tab content container */}

              <div
                class="tab-pane fade"
                id="custom-tabs-one-messages"
                role="tabpanel"
                aria-labelledby="custom-tabs-one-messages-tab"
              >
                <div className="DropdownContainer">
                  <select
                    className="dropDown"
                    //   value={selectedPlant}
                    //   onChange={(e) => setSelectedPlant(e.target.value)}
                  >
                    <option value="">--Select--</option>
                    <option valur="">Supplier Code</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="searchInputText"
                  />
                  <button className="searchBtn">Search</button>
                </div>

                <div className="DateAndBtnContainer">
                  <div className="react-datepicker-wrapper">
                    <DatePicker
                      selected={fromDate}
                      onChange={(date) => setFromDate(date)}
                      placeholderText="From Date"
                      className="fromDate"
                    />
                  </div>

                  <div className="react-datepicker-wrapper">
                    <DatePicker
                      selected={toDate}
                      onChange={(date) => setToDate(date)}
                      placeholderText="To Date"
                      className="toDate"
                    />
                  </div>

                  <button className="searchBtn">Search</button>
                  <button className="clearBtn">Clear</button>
                </div>
                <div className="MSTableContainer">
                  <div className="ag-theme-alpine">
                    <AgGridReact
                      rowData={DeclinedRowData}
                      columnDefs={DeclinedcolumnDefs}
                      pagination={true}
                      paginationPageSize={10}
                      onGridReady={onGridReady}
                      defaultColDef={defaultColDef}
                      domLayout="autoHeight"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageSchedule;
