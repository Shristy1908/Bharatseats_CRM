import React, { useState, useRef, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { FaUpload, FaPlus, FaCheck, FaEyeSlash } from "react-icons/fa";
import "./QualityManual.css";

const QualityManual = () => {
  const fileInputRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [fileName, setFileName] = useState("");
  const [rowData, setRowData] = useState([
    {
      SrNo: "01",
      supplierCode: "SUP001",
      file: "file1.pdf",
      uploadDate: "12/03/2023",
    },
    {
      SrNo: "02",
      supplierCode: "SUP002",
      file: "file2.pdf",
      uploadDate: "15/04/2023",
    },
    {
      SrNo: "03",
      supplierCode: "SUP003",
      file: "file3.pdf",
      uploadDate: "20/05/2023",
    },
    {
      SrNo: "03",
      supplierCode: "SUP003",
      file: "file3.pdf",
      uploadDate: "20/05/2023",
    },
    {
      SrNo: "03",
      supplierCode: "SUP003",
      file: "file3.pdf",
      uploadDate: "20/05/2023",
    },
    {
      SrNo: "03",
      supplierCode: "SUP003",
      file: "file3.pdf",
      uploadDate: "20/05/2023",
    },
    {
      SrNo: "03",
      supplierCode: "SUP003",
      file: "file3.pdf",
      uploadDate: "20/05/2023",
    },
  ]);

  const gridApiRef = useRef(null);

  const CustomButtonComponent = () => {
    return (
      <>
        <div className="action-buttons">
          <button
            className="action-button"
            title="Disable"
            onClick={() => handleDisable()}
          >
            <FaEyeSlash />
          </button>
        </div>
      </>
    );
  };

  const columnDefs = [
    {
      headerName: "Sr. No.",
      field: "SrNo",
      headerClass: "header",
      sortable: true,
      width: 200,
      flex: 1,
    },
    {
      headerName: "File",
      field: "file",
      headerClass: "header",
      sortable: true,
      width: 200,
      flex: 1,
    },
    {
      headerName: "Upload Date",
      field: "uploadDate",
      headerClass: "header",
      sortable: true,
      width: 210,
      flex: 1,
    },
    {
      headerName: "Action",
      field: "action",
      headerClass: "header",
      sortable: false,
      width: 200,
      flex: 1,
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

  const handleSupplierChange = (e) => {
    setSelectedSupplier(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    alert("Upload Successfully");
  };

  const handleDisable = (data) => {
    alert(`You Can't Change`);
  };
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    gridApiRef.current.setQuickFilter(value);
  };

  return (
    <div className="packingStandardUploadContainer">
      <p>Quality Management - Quality Manual</p>

      <div className="inputBox">
        <label>Search:</label>
        <input
          type="text"
          placeholder="Enter Text..."
          onChange={handleSearch}
        />
      </div>
      <div className="controlContainer">
        <div className="qmfileContainer">
          <input
            type="text"
            value={fileName}
            placeholder="No file chosen"
            disabled="disabled"
            className="btn-default"
          />
          <button onClick={handleBrowseClick} className="browseBtn">
            <FaPlus />
            Browse
          </button>
          <button onClick={handleUpload} className="uploadBtn">
            <FaUpload />
            Upload
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
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

export default QualityManual;
