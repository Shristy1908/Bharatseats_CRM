import React, { useState, useRef, useMemo, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AgGridReact } from "ag-grid-react";
import "../../../../../../node_modules//ag-grid-community/src/styles/ag-grid.scss";
import "../../../../../../node_modules/ag-grid-community/src/styles/ag-theme-alpine/sass/ag-theme-alpine.scss";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "./ViewModal.css";

const ViewModal = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [InvoiceViewDetails, setInvoiceViewDetails] = useState([]);
  const { rowData } = location.state || {};

  const mapDataForGrid = (data) => {
    if (data && data.invoiceDetails) {
      return data.invoiceDetails.map((detail) => ({
        materialCode: detail.material.materialCode,
        materialDescription: detail.material.materialDescription,
        hsnSACNo: data.hsnSACNo,
        quantity: detail.quantity,
        rate: detail.rate,
        amount: detail.amount,
        cgstAmount: detail.cgstAmount,
        igstAmount: detail.igstAmount,
        sgstAmount: detail.sgstAmount,
        modal: detail.modal,
        mfgDate: detail.mfgDate,
        batchCode: detail.batchCode,
      }));
    }
    return [];
  };

  const invoiceViewColumnDefs = [
    {
      headerName: "Sr. No.",
      field: "SrNo",
      valueGetter: (params) => params.node.rowIndex + 1,
      headerClass: "header",
      editable: true,
      width: 140,
    },
    {
      headerName: "Order No.",
      // field: "orderno",
      headerClass: "header",
      editable: true,
      width: 150,
    },
    {
      headerName: "MAT No.",
      field: "materialCode",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "MAT DESC.",
      field: "materialDescription",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "HSN/SAC NO",
      field: "hsnSACNo",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "Qty",
      field: "quantity",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "Rate",
      field: "rate",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "Basic VAL",
      field: "amount",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "CGST Amt.",
      field: "cgstAmount",
      headerClass: "header",
      width: 120,
    },
    {
      headerName: "SGST Amt.",
      field: "sgstAmount",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "IGST amt.",
      field: "igstAmount",
      headerClass: "header",
      width: 120,
    },
    {
      headerName: "Model",
      field: "modal",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "MFG Date",
      field: "mfgDate",
      headerClass: "header",
      width: 250,
    },
    {
      headerName: "Batch Code",
      field: "batchCode",
      headerClass: "header",
      width: 120,
    },
  ];

  const gridApiRef = useRef(null);

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

  useEffect(() => {
    if (rowData) {
      console.log("Received rowData:", rowData.data);
      const gridData = mapDataForGrid(rowData.data);
      setInvoiceViewDetails(gridData);
    }
  }, [rowData]);

  return (
    <div className="viewModalContainer">
      <div className="viewHeader">
        <span className="link">
          <span
            style={{ color: "#34bf60", cursor: "pointer" }}
            onClick={() => navigate("/BuyerManagement/ManageInvoice")}
          >
            <FaHome />
            &nbsp;Invoice / BuyerInvoice
          </span>
          <span>/Buyer Invoice Detail</span>
        </span>
        <span
          className="backBtn"
          onClick={() => navigate("/BuyerManagement/ManageInvoice")}
        >
          Back To List
        </span>
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
            rowData={InvoiceViewDetails}
            columnDefs={invoiceViewColumnDefs}
            pagination={true}
            paginationPageSize={10}
            onGridReady={onGridReady}
            defaultColDef={defaultColDef}
            domLayout="autoHeight"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
