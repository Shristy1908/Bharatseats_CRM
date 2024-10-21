import React, { useState, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { FaUpload, FaPlus, FaCheck, FaTrash } from "react-icons/fa";
import "../SupplierPackingStandard/SupplierPackingStandard.css";

const QualitySystemCertificate = () => {
  const fileInputRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedFileType, setSelectedFileType] = useState("");
  const [fileName, setFileName] = useState("");
  const [rowData, setRowData] = useState([
    {
      SrNo: "01",
      supplierCode: "SUP001",
      iatf: "Yes",
      iso: "Yes",
      ohsas: "No",
      environment: "Yes",
      other1: "N/A",
      other2: "N/A",
      other3: "N/A",
      uploadDate: "12/03/2023",
    },
    {
      SrNo: "02",
      supplierCode: "SUP002",
      iatf: "No",
      iso: "Yes",
      ohsas: "Yes",
      environment: "No",
      other1: "N/A",
      other2: "N/A",
      other3: "N/A",
      uploadDate: "15/04/2023",
    },
    {
      SrNo: "03",
      supplierCode: "SUP003",
      iatf: "Yes",
      iso: "Yes",
      ohsas: "Yes",
      environment: "Yes",
      other1: "N/A",
      other2: "N/A",
      other3: "N/A",
      uploadDate: "20/05/2023",
    },
    {
      SrNo: "03",
      supplierCode: "SUP003",
      iatf: "Yes",
      iso: "Yes",
      ohsas: "Yes",
      environment: "Yes",
      other1: "N/A",
      other2: "N/A",
      other3: "N/A",
      uploadDate: "20/05/2023",
    },
    {
      SrNo: "03",
      supplierCode: "SUP003",
      iatf: "Yes",
      iso: "Yes",
      ohsas: "Yes",
      environment: "Yes",
      other1: "N/A",
      other2: "N/A",
      other3: "N/A",
      uploadDate: "20/05/2023",
    },
    {
      SrNo: "03",
      supplierCode: "SUP003",
      iatf: "Yes",
      iso: "Yes",
      ohsas: "Yes",
      environment: "Yes",
      other1: "N/A",
      other2: "N/A",
      other3: "N/A",
      uploadDate: "20/05/2023",
    },
    {
      SrNo: "03",
      supplierCode: "SUP003",
      iatf: "Yes",
      iso: "Yes",
      ohsas: "Yes",
      environment: "Yes",
      other1: "N/A",
      other2: "N/A",
      other3: "N/A",
      uploadDate: "20/05/2023",
    },
    {
      SrNo: "03",
      supplierCode: "SUP003",
      iatf: "Yes",
      iso: "Yes",
      ohsas: "Yes",
      environment: "Yes",
      other1: "N/A",
      other2: "N/A",
      other3: "N/A",
      uploadDate: "20/05/2023",
    },
    {
      SrNo: "03",
      supplierCode: "SUP003",
      iatf: "Yes",
      iso: "Yes",
      ohsas: "Yes",
      environment: "Yes",
      other1: "N/A",
      other2: "N/A",
      other3: "N/A",
      uploadDate: "20/05/2023",
    },
    {
      SrNo: "03",
      supplierCode: "SUP003",
      iatf: "Yes",
      iso: "Yes",
      ohsas: "Yes",
      environment: "Yes",
      other1: "N/A",
      other2: "N/A",
      other3: "N/A",
      uploadDate: "20/05/2023",
    },
    {
      SrNo: "03",
      supplierCode: "SUP003",
      iatf: "Yes",
      iso: "Yes",
      ohsas: "Yes",
      environment: "Yes",
      other1: "N/A",
      other2: "N/A",
      other3: "N/A",
      uploadDate: "20/05/2023",
    },
    {
      SrNo: "03",
      supplierCode: "SUP003",
      iatf: "Yes",
      iso: "Yes",
      ohsas: "Yes",
      environment: "Yes",
      other1: "N/A",
      other2: "N/A",
      other3: "N/A",
      uploadDate: "20/05/2023",
    },
  ]);

  const gridApiRef = useRef(null);

  const CustomButtonComponent = ({ data }) => {
    return (
      <div className="action-buttons">
        <button
          className="action-button"
          title="Approve"
          onClick={() => handleApprove(data)}
        >
          <FaCheck />
        </button>
      </div>
    );
  };

  const columnDefs = [
    {
      headerName: "Sr. No.",
      field: "SrNo",
      headerClass: "header",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Supplier Code",
      field: "supplierCode",
      headerClass: "header",
      sortable: true,
      width: 150,
    },
    {
      headerName: "IATF/TS",
      field: "iatf",
      headerClass: "header",
      sortable: true,
      width: 150,
    },
    {
      headerName: "ISO",
      field: "iso",
      headerClass: "header",
      sortable: true,
      width: 150,
    },
    {
      headerName: "OHSAS",
      field: "ohsas",
      headerClass: "header",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Environment",
      field: "environment",
      headerClass: "header",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Other1",
      field: "other1",
      headerClass: "header",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Other2",
      field: "other2",
      headerClass: "header",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Other3",
      field: "other3",
      headerClass: "header",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Upload Date",
      field: "uploadDate",
      headerClass: "header",
      sortable: true,
      width: 150,
    },
    {
      headerName: "Actions",
      field: "actions",
      headerClass: "header",
      sortable: false,
      width: 150,
      cellRenderer: CustomButtonComponent,
    },
  ];

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
    // params.api.sizeColumnsToFit();
  };

  const defaultColDef = useMemo(() => {
    return {
      initialwidth: 150,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      resizable: true,
    };
  }, []);

  const handleSupplierChange = (e) => {
    setSelectedSupplier(e.target.value);
  };

  const handleFileTypeChange = (e) => {
    setSelectedFileType(e.target.value);
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
    alert("Upload clicked");
  };

  const handleApprove = (data) => {
    console.log("Approve clicked for", data);
  };

  const handleDelete = (data) => {
    setRowData((prevData) => prevData.filter((row) => row.SrNo !== data.SrNo));
  };

  return (
    <div className="packingStandardUploadContainer">
      <p>Supplier Management - Quality System Certificate</p>

      <div className="controlContainer">
        <div className="dropdownContainer">
          <label>Supplier&nbsp;&nbsp;</label>
          <select value={selectedSupplier} onChange={handleSupplierChange}>
            <option value="">--Select Supplier--</option>
            <option value="supplier1">Supplier 1</option>
            <option value="supplier2">Supplier 2</option>
            <option value="supplier3">Supplier 3</option>
          </select>
        </div>
        <div className="dropdownContainer">
          <label>File Type&nbsp;&nbsp;</label>
          <select value={selectedFileType} onChange={handleFileTypeChange}>
            <option value="">--Select File Type--</option>
            <option value="iatf/ts">IATF/TS</option>
            <option value="iso">ISO</option>
            <option value="ohsas">OHSAS</option>
            <option value="environment">Environment</option>
            <option value="other1">Other 1</option>
            <option value="other2">Other 2</option>
            <option value="other3">Other 3</option>
          </select>
        </div>
        <div className="fileQSystemContainer">
          <input
            type="text"
            value={fileName}
            placeholder="No file chosen"
            disabled="disabled"
            className="btn-default"
          />
          <button onClick={handleBrowseClick} className="browseBtn">
            <FaPlus />
            &nbsp;Browse
          </button>
          <button onClick={handleUpload} className="uploadBtn">
            <FaUpload />
            &nbsp;Upload
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

export default QualitySystemCertificate;
