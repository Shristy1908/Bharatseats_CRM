import React, { useState, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { FaUpload } from "react-icons/fa";
import "./VendorOverallRating.css";

const VendorOverallRating = () => {
  const [searchText, setSearchText] = useState("");
  const [rowData, setRowData] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const gridApiRef = useRef(null);

  const handleSupplierChange = (e) => {
    setSelectedSupplier(e.target.value);
  };

  const CustomButtonComponent = () => {
    return (
      <>
        <div className="action-buttons">
          <button className="action-button" onClick={() => handleUpload()}>
            <FaUpload />
          </button>
        </div>
      </>
    );
  };

  const columnDefs = [
    {
      headerName: "Sr. No.",
      headerClass: "header",
      field: "SrNo",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Rating Month",
      headerClass: "header",
      field: "ratingMonth",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Financial Year",
      headerClass: "header",
      field: "financialYear",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Plant",
      headerClass: "header",
      field: "plant",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Cumm. Ranking",
      headerClass: "header",
      field: "cummRanking",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Supplier Code",
      headerClass: "header",
      field: "supplierCode",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Supplier Name",
      headerClass: "header",
      field: "supplierName",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Monthly Delivery Rating",
      headerClass: "header",
      field: "monthlyDeliveryRating",
      sortable: true,
      width: 195,
    },
    {
      headerName: "Monthly Quality Rating",
      headerClass: "header",
      field: "monthlyQualityRating",
      sortable: true,
      width: 190,
    },
    {
      headerName: "Monthly Overall Rating",
      headerClass: "header",
      field: "monthlyOverallRating",
      sortable: true,
      width: 190,
    },
    {
      headerName: "Cumm. Delivery Rating",
      headerClass: "header",
      field: "cummDeliveryRating",
      sortable: true,
      width: 190,
    },
    {
      headerName: "Cumm. Quality Rating",
      headerClass: "header",
      field: "cummQualityRating",
      sortable: true,
      width: 190,
    },
    {
      headerName: "Cumm. Overall Rating",
      headerClass: "header",
      field: "cummOverallRating",
      sortable: true,
      width: 190,
    },
    {
      headerName: "Grade",
      headerClass: "header",
      field: "grade",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Upload Date",
      headerClass: "header",
      field: "uploadDate",
      sortable: true,
      width: 150,
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

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleUpload = (data) => {
    alert("Upload clicked for", data);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    gridApiRef.current.setQuickFilter(value);
  };

  return (
    <div className="fOCContainer">
      <p>Quality Management - Rating</p>

      <div className="inputBox">
        <label>Search:</label>
        <input
          type="text"
          placeholder="Enter Text..."
          onChange={handleSearch}
        />
      </div>

      <div className="outerContainer">
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
        <div className="ag-theme-alpine">
          <label className="blue">
            &nbsp;&nbsp;* Color Blue - Grade A 95.01 To 100% Rating &nbsp;&nbsp;
          </label>
          <label className="yellow">
            &nbsp;&nbsp;Color Yellow - Grade B 90.00 To 95.00% Rating
            &nbsp;&nbsp;{" "}
          </label>
          <label className="red">
            &nbsp;&nbsp;Color Red - Grade C Below 90.00% Rating &nbsp;&nbsp;
          </label>
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
  );
};

export default VendorOverallRating;
