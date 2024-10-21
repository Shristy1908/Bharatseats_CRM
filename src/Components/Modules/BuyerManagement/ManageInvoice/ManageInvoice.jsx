import React, { useState, useRef, useMemo, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ManageInvoice.css";
import { AgGridReact } from "ag-grid-react";
import "../../../../../node_modules/ag-grid-community/src/styles/ag-grid.scss";
import "../../../../../node_modules/ag-grid-community/src/styles/ag-theme-alpine/sass/ag-theme-alpine.scss";
import { useNavigate } from "react-router-dom";
import { AlertMessage, Loader } from "../../../../Framework/Components/Widgets";
import { manageInvoice } from "../../Services/Method";

const ManageInvoice = () => {
  const setAlertMessage = AlertMessage();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const navigate = useNavigate();
  const [isLoadingDataList, setisLoadingDataList] = useState(false);

  const [rowData, setRowData] = useState([]);

  const getInvoiceDetails = async () => {
    try {
      const formdata = {};
      setisLoadingDataList(true);
      const result = await manageInvoice(formdata);
      setisLoadingDataList(false);
      if (result.response.successCode === 1) {
        if (
          result.response &&
          result.response.responseData &&
          result.response.responseData.invoiceList &&
          result.response.responseData.invoiceList.length > 0
        ) {
          setRowData(result.response.responseData.invoiceList);
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
        message: error.message,
      });
    }
  };

  const gridApiRef = useRef(null);

  const CustomButtonComponent = (params) => {
    debugger;
    const rowData = params;

    return (
      <button
        onClick={() =>
          navigate("/BuyerManagement/ViewModall", { state: { rowData } })
        }
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
    );
  };

  const columnDefs = [
    {
      headerName: "Sr.No.",
      headerClass: "header",
      valueGetter: (params) => params.node.rowIndex + 1,
      sortable: true,
      width: 100,
      flex: 1,
    },

    {
      headerName: "SUPPLIER CODE",
      field: "supplier.supplierCode",
      headerClass: "header",
      sortable: true,
      width: 150,
      flex: 1,
    },
    {
      headerName: "Supplier Name",
      field: "supplier.supplierName",
      headerClass: "header",
      sortable: true,
      width: 150,
      flex: 1,
    },
    {
      headerName: "Invoice No.",
      field: "invoiceNumber",
      headerClass: "header",
      sortable: true,
      width: 150,
      flex: 1,
    },
    {
      headerName: "Invoice Date",
      field: "invoiceDate",
      headerClass: "header",
      sortable: true,
      width: 150,
      flex: 1,
    },
    {
      headerName: "Quantity",
      // valueGetter: (params) => params.data.invoiceDetails[0].quantity,
      headerClass: "header",
      sortable: true,
      width: 130,
      flex: 1,
    },
    {
      headerName: "Total Amount",
      // field: "totalamount",
      // valueGetter: (params) => params.data.invoiceDetails[0].amount,
      headerClass: "header",
      sortable: true,
      width: 150,
      flex: 1,
    },
    {
      headerName: "Action",
      field: "action",
      headerClass: "header",
      sortable: true,
      width: 100,
      flex: 1,
      cellRenderer: CustomButtonComponent,
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
    };
  }, []);

  useEffect(() => {
    getInvoiceDetails();
  }, []);

  return (
    <>
      {isLoadingDataList ? (
        <Loader />
      ) : (
        <div className="manageInvoice">
          <p className="pageTitles">
            Buyer Management - Manage Invoice/View Buyer Invoice
          </p>
          <div className="DropdownContainer">
            <select className="dropDown">
              <option value="">--Select--</option>
              <option value="">Invoice Number</option>
              <option value="">Supplier Code</option>
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
                rowData={rowData}
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

export default ManageInvoice;
