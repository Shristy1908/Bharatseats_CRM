import React, { useState, useRef, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { FaUpload, FaPlus, FaCheck, FaTrash } from "react-icons/fa";
import "../../SupplierManagement/SupplierPackingStandard/SupplierPackingStandard.css";

const Warranty = () => {
  const fileInputRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [fileName, setFileName] = useState("");
  const [rowData, setRowData] = useState([
    {
      SrNo: "1",
      date: "12/07/2024",
      plant: "CC",
      suppliercode: "M2007",
      suppliername: "Prabhu",
      modal: "cc7891z",
      partcode: "853c30cc",
      warrantydescription: "ok",
      warrantycost: "1000",
      uploaddate: "12/07/2024",
    },
    {
      SrNo: "1",
      date: "12/07/2024",
      plant: "CC",
      suppliercode: "M2007",
      suppliername: "Prabhu",
      modal: "cc7891z",
      partcode: "853c30cc",
      warrantydescription: "ok",
      warrantycost: "1000",
      uploaddate: "12/07/2024",
    },
    {
      SrNo: "1",
      date: "12/07/2024",
      plant: "CC",
      suppliercode: "M2007",
      suppliername: "Prabhu",
      modal: "cc7891z",
      partcode: "853c30cc",
      warrantydescription: "ok",
      warrantycost: "1000",
      uploaddate: "12/07/2024",
    },
    {
      SrNo: "1",
      date: "12/07/2024",
      plant: "CC",
      suppliercode: "M2007",
      suppliername: "Prabhu",
      modal: "cc7891z",
      partcode: "853c30cc",
      warrantydescription: "ok",
      warrantycost: "1000",
      uploaddate: "12/07/2024",
    },
    {
      SrNo: "1",
      date: "12/07/2024",
      plant: "CC",
      suppliercode: "M2007",
      suppliername: "Prabhu",
      modal: "cc7891z",
      partcode: "853c30cc",
      warrantydescription: "ok",
      warrantycost: "1000",
      uploaddate: "12/07/2024",
    },
    {
      SrNo: "1",
      date: "12/07/2024",
      plant: "CC",
      suppliercode: "M2007",
      suppliername: "Prabhu",
      modal: "cc7891z",
      partcode: "853c30cc",
      warrantydescription: "ok",
      warrantycost: "1000",
      uploaddate: "12/07/2024",
    },
    {
      SrNo: "1",
      date: "12/07/2024",
      plant: "CC",
      suppliercode: "M2007",
      suppliername: "Prabhu",
      modal: "cc7891z",
      partcode: "853c30cc",
      warrantydescription: "ok",
      warrantycost: "1000",
      uploaddate: "12/07/2024",
    },
  ]);

  const gridApiRef = useRef(null);

  const columnDefs = [
    {
      headerName: "Sr. No.",
      field: "SrNo",
      headerClass: "header",
      sortable: true,
      width: 170,
    },
    {
      headerName: "Date",
      field: "date",
      headerClass: "header",
      sortable: true,
      width: 170,
    },
    {
      headerName: "Plant",
      field: "plant",
      headerClass: "header",
      sortable: true,
      width: 170,
    },
    {
      headerName: "Supplier Code",
      field: "suppliercode",
      headerClass: "header",
      sortable: true,
      width: 170,
    },
    {
      headerName: "Supplier Name",
      field: "suppliername",
      headerClass: "header",
      sortable: false,
      width: 170,
    },
    {
      headerName: "Modal",
      field: "modal",
      headerClass: "header",
      sortable: false,
      width: 170,
    },
    {
      headerName: "Part Code",
      field: "partcode",
      headerClass: "header",
      sortable: false,
      width: 170,
    },
    {
      headerName: "Warranty Description",
      field: "warrantydescription",
      headerClass: "header",
      sortable: false,
      width: 170,
    },
    {
      headerName: "Warranty Cost(INR)",
      field: "warrantycost",
      headerClass: "header",
      sortable: false,
      width: 170,
    },
    {
      headerName: "Upload Date",
      field: "uploaddate",
      headerClass: "header",
      sortable: false,
      width: 170,
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
      resizable: true,
    };
  }, []);

  const handleSupplierChange = (e) => {
    setSelectedSupplier(e.target.value);
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFileName(file.name);
  //   }
  // };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    gridApiRef.current.setQuickFilter(value);
  };

  return (
    <div className="packingStandardUploadContainer">
      <p>Quality Management - Warranty</p>

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

export default Warranty;
