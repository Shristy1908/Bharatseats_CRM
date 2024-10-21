import React, { useState, useRef, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "../../SupplierManagement/SupplierPackingStandard/SupplierPackingStandard.css";
import { listOfPPM } from "../../Services/Method";
import { AlertMessage } from "../../../../Framework/Components/Widgets";
import { getSessionStorage } from "../../Common/Login/Auth/auth";

const PPM = () => {
  const users = getSessionStorage("user");
  const setAlertMessage = AlertMessage();
  const fileInputRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [fileName, setFileName] = useState("");
  const [PPMRowData, setPPMRowData] = useState([]);
  const getPPMList = async () => {
    debugger;
    try {
      const formdata = {
        filterBy: users.supplierId ? "SUPPLIER" : "ALL",
        supplierId: users.supplierId ? users.supplierId : 0,
      };
      const result = await listOfPPM(formdata);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.ppmList &&
          result.response.responseData.ppmList.length > 0
        ) {
          setPPMRowData(result.response.responseData.ppmList);
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
      field: "SrNo",
      valueGetter: (params) => params.node.rowIndex + 1,
      headerClass: "header",
      sortable: true,
      width: 100,
    },
    {
      headerName: "Plant",
      field: "plant.plantName",
      headerClass: "header",
      sortable: true,
      width: 120,
    },
    {
      headerName: "Supplier Code",
      field: "supplier.supplierCode",
      headerClass: "header",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Supplier Name",
      field: "supplier.supplierName",
      headerClass: "header",
      sortable: false,
      width: 150,
    },
    {
      headerName: "FinYear",
      field: "finYear",
      headerClass: "header",
      sortable: false,
      width: 120,
    },
    {
      headerName: "April",
      field: "april",
      headerClass: "header",
      sortable: false,
      width: 120,
    },
    {
      headerName: "May",
      field: "may",
      headerClass: "header",
      sortable: false,
      width: 120,
    },
    {
      headerName: "June",
      field: "june",
      headerClass: "header",
      sortable: false,
      width: 120,
    },
    {
      headerName: "July",
      field: "july",
      headerClass: "header",
      sortable: false,
      width: 120,
    },
    {
      headerName: "August",
      field: "august",
      headerClass: "header",
      sortable: false,
      width: 120,
    },
    {
      headerName: "September",
      field: "september",
      headerClass: "header",
      sortable: false,
      width: 120,
    },
    {
      headerName: "October",
      field: "october",
      headerClass: "header",
      sortable: false,
      width: 120,
    },
    {
      headerName: "November",
      field: "november",
      headerClass: "header",
      sortable: false,
      width: 120,
    },
    {
      headerName: "December",
      field: "december",
      headerClass: "header",
      sortable: false,
      width: 120,
    },
    {
      headerName: "January",
      field: "january",
      headerClass: "header",
      sortable: false,
      width: 120,
    },
    {
      headerName: "February",
      field: "feburary",
      headerClass: "header",
      sortable: false,
      width: 150,
    },
    {
      headerName: "March",
      field: "march",
      headerClass: "header",
      sortable: false,
      width: 120,
    },
    {
      headerName: "Cumm PPM",
      field: "cummPPM",
      headerClass: "header",
      sortable: false,
      width: 200,
    },
    {
      headerName: "Upload Date",
      field: "supplier.uploadedBy",
      headerClass: "header",
      sortable: false,
      width: 220,
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

  const handleSupplierChange = (e) => {
    setSelectedSupplier(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    gridApiRef.current.setQuickFilter(value);
  };

  useEffect(() => {
    getPPMList();
  }, []);

  return (
    <div className="packingStandardUploadContainer">
      <p>Quality Management - PPM</p>

      <div className="inputBox">
        <label>Search:</label>
        <input
          type="text"
          placeholder="Enter Text..."
          onChange={handleSearch}
        />
      </div>

      <div className="controlContainer">
        <div className="dropdownContainer">
          <label>Supplier&nbsp;&nbsp;</label>
          <select value={selectedSupplier} onChange={handleSupplierChange}>
            <option value="">--Select Supplier--</option>
            <option value="supplier1">Supplier 1</option>
            <option value="supplier2">Supplier 2</option>
            <option value="supplier3">Supplier 3</option>
            <option value="supplier4">Supplier 4</option>
            <option value="supplier5">Supplier 5</option>
            <option value="supplier6">Supplier 6</option>
            <option value="supplier7">Supplier 7</option>
            <option value="supplier8">Supplier 8</option>
            <option value="supplier9">Supplier 9</option>
            <option value="supplier10">Supplier 10</option>
            <option value="supplier11">Supplier 11</option>
            <option value="supplier12">Supplier 12</option>
          </select>
        </div>
      </div>

      <div className="outerContainer">
        <div className="ag-theme-alpine">
          <AgGridReact
            rowData={PPMRowData}
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

export default PPM;
