import React, { useState, useRef, useMemo, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AgGridReact } from "ag-grid-react";
import "../../../../../node_modules/ag-grid-community/src/styles/ag-grid.scss";
import "../../../../../node_modules/ag-grid-community/src/styles/ag-theme-alpine/sass/ag-theme-alpine.scss";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "../ManagePO/Modal/ViewModal.css";

const MSViewModal = () => {
  const location = useLocation();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const navigate = useNavigate();
  const [ackRowData, setAckRowData] = useState([]);
  const { rowData } = location.state || {};

  const mapDataForGrid = (data) => {
    if (data && data.scheduleDetails) {
      return data.scheduleDetails.map((detail) => ({
        plantName: data.plant.plantName, 
        poNumber: data.po.poNumber,
        supplierCode: data.supplier.supplierCode,
        supplierName: data.supplier.supplierName,
        materialCode: detail.material.materialCode,
        materialDescription: detail.material.materialDescription,
        unit: detail.material.unit,
        quantity: detail.quantity,
        position: detail.position,
        scheduleNo: data.scheduleNo,
        deliverydate: detail.deliverydate,
        remarks: detail.remarks,
      }));
    }
    return [];
  };

  const AckViewColumnDefs = [
    {
      headerName: "Sr. No.",
      valueGetter: (params) => params.node.rowIndex + 1,
      headerClass: "header",
      editable: true,
      width: 100,
    },
    {
      headerName: "Plant Name",
      field: "plantName",
      headerClass: "header",
      editable: true,
      width: 150,
    },
    {
      headerName: "PO Number",
      field: "poNumber",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "Supplier Code",
      field: "supplierCode",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "Supplier Name",
      field: "supplierName",
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
      width: 180,
    },
    {
      headerName: "UOM",
      field: "unit",
      headerClass: "header",
      width: 120,
    },
    {
      headerName: "Quantity",
      field: "quantity",
      headerClass: "header",
      width: 150,
    },

    {
      headerName: "Position No.",
      field: "position",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "Schedule No.",
      field: "scheduleNo",
      headerClass: "header",
      width: 120,
    },
    {
      headerName: "Delv. Date",
      field: "deliverydate",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "Remark",
      field: "remarks",
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
            onClick={() => navigate("/BuyerManagement/ManageSchedule")}
          >
            <FaHome />
            &nbsp; Buyer Schedular &nbsp;
          </span>
          <span>/ACKNOWLEDGE/DECLINE Scheduler &nbsp;</span>
        </span>
        <span
          className="backBtn"
          onClick={() => navigate("/BuyerManagement/ManageSchedule")}
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

export default MSViewModal;
