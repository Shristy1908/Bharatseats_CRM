import React, { useState, useRef, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { FaUpload, FaCheck, FaEyeSlash } from "react-icons/fa";
import "./FOC.css";
import { AlertMessage } from "../../../../Framework/Components/Widgets";
import { listOfFoc } from "../../Services/Method";

const FOC = () => {
  const setAlertMessage = AlertMessage();
  const [searchText, setSearchText] = useState("");
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

  const handleUpload = () => {
    alert("Upload Successfully");
  };

  const handleApprove = (data) => {
    console.log("Approve clicked for", data);
  };
  const handleDisable = (data) => {
    alert(`You Can't Change`);
  };

  const [FOCRowData, setFOCRowData] = useState([]);

  const getFOCList = async () => {
    debugger;
    try {
      const formdata = {};
      const result = await listOfFoc(formdata);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.foc &&
          result.response.responseData.foc.length > 0
        ) {
          setFOCRowData(result.response.responseData.foc);
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

  const gridApiRef = useRef(null);

  const columnDefs = [
    {
      headerName: "Sr. No.",
      headerClass: "header",
      field: "SrNo",
      valueGetter: (params) => params.node.rowIndex + 1,
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
      headerName: "Vendor Name",
      headerClass: "header",
      field: "supplier.supplierName",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Plant",
      headerClass: "header",
      field: "plant.plantName",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Material Code",
      headerClass: "header",
      field: "material.materialCode",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Material Name",
      headerClass: "header",
      field: "material.materialDescription",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Fin Year",
      headerClass: "header",
      field: "finalYear",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Month",
      headerClass: "header",
      field: "month",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Opening Balance",
      headerClass: "header",
      field: "openingBalance",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Issue Qty.",
      headerClass: "header",
      field: "issueQty",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Received Qty.",
      headerClass: "header",
      field: "receivedQty",
      sortable: true,
      width: 150,
    },
    {
      headerName: "BSL Closing Balance",
      headerClass: "header",
      field: "bslClosingBalance",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Supplier Stock in Hand",
      headerClass: "header",
      field: "supplierStockInHand",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Supplier Rejected Qty.",
      headerClass: "header",
      field: "supplierRejectedQty",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Supplier Closing Balance",
      headerClass: "header",
      field: "supplierClosingBalance",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Difference",
      headerClass: "header",
      field: "difference",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Action/Status",
      headerClass: "header",
      field: "actionStatus",
      sortable: true,
      width: 180,
      cellRenderer: CustomButtonComponent,
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

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    gridApiRef.current.setQuickFilter(value);
  };

  useEffect(() => {
    getFOCList();
  }, []);

  return (
    <div className="fOCContainer">
      <p>Delivery Management - FOC</p>
      <div className="inputBox">
        <label>Enter any text from below records for filter records :</label>
        <input
          type="text"
          placeholder="Enter Text..."
          onChange={handleSearch}
        />
      </div>

      <div className="outerContainer">
        <div className="ag-theme-alpine">
          <AgGridReact
            rowData={FOCRowData}
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
  );
};

export default FOC;
