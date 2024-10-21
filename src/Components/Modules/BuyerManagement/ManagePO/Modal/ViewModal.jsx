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
  const [ackRowData, setAckRowData] = useState([]);
  const location = useLocation();

  const { rowData } = location.state || {};

  const mapDataForGrid = (data) => {
    if (data && data.poDetails) {
      return data.poDetails.map((detail) => ({
        plantName: detail.plant.plantName,
        poNumber: data.poNumber,
        poDate: data.poDate,
        materialCode: detail.material.materialCode,
        materialDescription: detail.material.materialDescription,
        hsnSAC: detail.hsnSAC,
        quantity: detail.quantity,
        unitCode: detail.uom.unitCode,
        unitRate: detail.unitRate,
        discount: detail.discount,
        netAmount: detail.netAmount,
        totalValueInc: detail.totalValueInc,
        freight: detail.freight,
        pf: detail.pf,
        sgst: detail.sgst,
        cgst: detail.cgst,
        igst: detail.igst,
        cess: detail.cess,
        totalValueExc: detail.totalValueExc,
      }));
    }
    return [];
  };

  const AckViewColumnDefs = [
    {
      headerName: "Sr. No.",
      valueGetter: (params) => params.node.rowIndex + 1,
      headerClass: "header",
      width: 120,
    },
    {
      headerName: "Plant Name",
      field: "plantName",
      headerClass: "header",
      editable: true,
      width: 150,
    },
    {
      headerName: "PO Date",
      field: "poDate",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "Item Code",
      field: "materialCode",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "Item Desc.",
      field: "materialDescription",
      headerClass: "header",
      width: 250,
    },
    {
      headerName: "HSN/SAC",
      field: "hsnSAC",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "Quantity",
      field: "quantity",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "UOM",
      field: "unitCode",
      headerClass: "header",
      width: 120,
    },
    {
      headerName: "Unit Rate",
      field: "unitRate",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "Discount",
      field: "discount",
      headerClass: "header",
      width: 120,
    },
    {
      headerName: "Net Amount",
      field: "netAmount",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "Total Value(Without Tax)",
      field: "totalValueInc",
      headerClass: "header",
      width: 250,
    },
    {
      headerName: "Freight",
      field: "freight",
      headerClass: "header",
      width: 120,
    },
    {
      headerName: "PF",
      field: "pf",
      headerClass: "header",
      width: 100,
    },
    {
      headerName: "SGST",
      field: "sgst",
      headerClass: "header",
      width: 120,
    },
    {
      headerName: "CGST",
      field: "cgst",
      headerClass: "header",
      width: 120,
    },
    {
      headerName: "IGST",
      field: "igst",
      headerClass: "header",
      width: 120,
    },
    {
      headerName: "CESS",
      field: "cess",
      headerClass: "header",
      width: 120,
    },
    {
      headerName: "Total Value(With Tax)",
      field: "totalValueExc",
      headerClass: "header",
      width: 250,
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
      setAckRowData(gridData);
    }
  }, [rowData]);

  return (
    <div className="viewModallContainer">
      <div className="viewHeader">
        <span className="link">
          <span
            style={{ color: "#34bf60", cursor: "pointer" }}
            onClick={() => navigate("/BuyerManagement/ManagePO")}
          >
            <FaHome />
            &nbsp; Buyer PO &nbsp;
          </span>
          <span>/ACKNOWLEDGE/DECLINE Scheduler &nbsp;</span>
        </span>
        <span
          className="backBtn"
          onClick={() => navigate("/BuyerManagement/ManagePO")}
        >
          Back To List
        </span>
      </div>

      <div className="DropdownContainer">
        <select
          className="dropDown"
          //   value={selectedPlant}
          //   onChange={(e) => setSelectedPlant(e.target.value)}
        >
          <option value="">--Select--</option>
          <option valur="">Plant Name</option>
          <option valur="">PO Number</option>
          <option valur="">Material Code</option>
          <option valur="">Material Description</option>
          <option valur="">HSN/SAC</option>
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
            rowData={ackRowData}
            columnDefs={AckViewColumnDefs}
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
