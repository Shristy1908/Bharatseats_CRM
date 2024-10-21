import React, { useState, useRef, useMemo, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ManagePO.css";
import { AgGridReact } from "ag-grid-react";
import "../../../../../node_modules/ag-grid-community/src/styles/ag-grid.scss";
import "../../../../../node_modules/ag-grid-community/src/styles/ag-theme-alpine/sass/ag-theme-alpine.scss";
import { useNavigate } from "react-router-dom";
import { managePO } from "../../Services/Method";
import { AlertMessage, Loader } from "../../../../Framework/Components/Widgets";

const ManagePO = () => {
  const setAlertMessage = AlertMessage();
  const [isLoadingDataList, setisLoadingDataList] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const navigate = useNavigate();

  const [PendingRowData, setPendingRowData] = useState([
    {
      srNo: "1",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "2",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "3",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "4",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "5",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "6",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "7",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "8",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "9",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "10",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "11",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "12",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "13",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "14",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
  ]);

  const [AcknowledgedRowData, setAcknowledgedRowData] = useState([]);
  const getAckManagePOList = async () => {
    try {
      const formdata = {};
      setisLoadingDataList(true);
      const result = await managePO(formdata);
      setisLoadingDataList(false);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.poList &&
          result.response.responseData.poList.length > 0
        ) {
          setAcknowledgedRowData(result.response.responseData.poList);
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
      srNo: "1",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "2",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "3",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "4",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "5",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "6",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "7",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "8",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "9",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "10",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
    {
      srNo: "11",
      poNumber: "566265265526",
      poDate: "12/02/2002",
      supplierNo: "58556635",
      supplierName: "abcs",
      totalQuantity: "2",
      action: "",
    },
  ]);

  const gridApiRef = useRef(null);

  const CustomButtonComponent = (params) => {
    debugger;
    const rowData = params;

    const handleViewClick = () => {
      navigate("/BuyerManagement/ViewModal", { state: { rowData } });
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

  const PendingColumnDefs = [
    {
      headerName: "Sr. No.",
      field: "srNo",
      headerClass: "header",
      sortable: true,
      width: 100,
      flex: 1,
    },
    {
      headerName: "PO NUMBER",
      field: "poNumber",
      headerClass: "header",
      sortable: true,
      width: 150,
      flex: 1,
    },
    {
      headerName: "PO DATE",
      field: "poDate",
      headerClass: "header",
      sortable: true,
      width: 150,
      flex: 1,
    },
    {
      headerName: "Supplier No.",
      field: "supplierNo",
      headerClass: "header",
      sortable: true,
      width: 150,
      flex: 1,
    },
    {
      headerName: "Supplier Name",
      field: "supplierName",
      headerClass: "header",
      sortable: true,
      width: 150,
      flex: 1,
    },
    {
      headerName: "TOTAL QUANTITY",
      field: "totalQuantity",
      headerClass: "header",
      sortable: true,
      width: 160,
      flex: 1,
    },
    {
      headerName: "Action",
      field: "action",
      headerClass: "header",
      sortable: true,
      width: 150,
      flex: 1,
      cellRenderer: CustomButtonComponent,
    },
  ];

  const AcknowledgedcolumnDefs = [
    {
      headerName: "Sr. No.",
      valueGetter: (params) => params.node.rowIndex + 1,
      headerClass: "header",
      width: 100,
      flex: 1,
    },
    {
      headerName: "PO NUMBER",
      field: "poNumber",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "PO DATE",
      field: "poDate",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "Supplier No.",
      field: "supplier.supplierCode",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "Supplier Name",
      field: `supplier.supplierName`,
      headerClass: "header",
      width: 200,
      flex: 1,
    },
    {
      headerName: "TOTAL QUANTITY",
      field: "totalQuantity",
      headerClass: "header",
      width: 160,
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
      field: "srNo",
      headerClass: "header",
      width: 100,
      flex: 1,
    },
    {
      headerName: "PO NUMBER",
      field: "poNumber",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "PO DATE",
      field: "poDate",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "Supplier No.",
      field: "supplierNo",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "Supplier Name",
      field: "supplierName",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "TOTAL QUANTITY",
      field: "totalQuantity",
      headerClass: "header",
      width: 160,
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

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
    // params.api.sizeColumnsToFit();
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    gridApiRef.current.setQuickFilter(value);
  };

  const defaultColDef = useMemo(() => {
    return {
      initialWidth: 200,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    };
  }, []);

  useEffect(() => {
    getAckManagePOList();
  }, []);

  return (
    <div className="managePoContainer">
      <p className="pageTitle">Buyer Management - Manage PO/Buyer PO</p>
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
                  <option value="">PO Number</option>
                  <option value="">Supplier Number</option>
                  <option value="">Supplier Name</option>
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
              {isLoadingDataList ? (
                <Loader />
              ) : (
                <>
                  <div className="DropdownContainer">
                    <select
                      className="dropDown"
                      //   value={selectedPlant}
                      //   onChange={(e) => setSelectedPlant(e.target.value)}
                    >
                      <option value="">--Select--</option>
                      <option value="">PO Number</option>
                      <option value="">Supplier Number</option>
                      <option value="">Supplier Name</option>
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
              )}
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
                  <option value="">PO Number</option>
                  <option value="">Supplier Number</option>
                  <option value="">Supplier Name</option>
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
              <div className="outerContainer">
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
  );
};

export default ManagePO;
