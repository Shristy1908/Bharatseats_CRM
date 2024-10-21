import React, { useState, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { FaUpload, FaPlus, FaEyeSlash } from "react-icons/fa";
import "../FortnightPlan/FortnightPlan.css";

const FortnightPlan = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const [rowData, setRowData] = useState([
    {
      SrNo: "01",
      month: "January",
      file: "file1.pdf",
      uploadDate: "12/03/2023",
    },
    {
      SrNo: "02",
      month: "February",
      file: "file2.pdf",
      uploadDate: "15/04/2023",
    },
    {
      SrNo: "03",
      month: "March",
      file: "file3.pdf",
      uploadDate: "20/05/2023",
    },
    {
      SrNo: "04",
      month: "April",
      file: "file4.pdf",
      uploadDate: "22/06/2023",
    },
    {
      SrNo: "05",
      month: "May",
      file: "file5.pdf",
      uploadDate: "25/07/2023",
    },
    {
      SrNo: "01",
      month: "January",
      file: "file1.pdf",
      uploadDate: "12/03/2023",
    },
    {
      SrNo: "02",
      month: "February",
      file: "file2.pdf",
      uploadDate: "15/04/2023",
    },
    {
      SrNo: "03",
      month: "March",
      file: "file3.pdf",
      uploadDate: "20/05/2023",
    },
    {
      SrNo: "04",
      month: "April",
      file: "file4.pdf",
      uploadDate: "22/06/2023",
    },
    {
      SrNo: "05",
      month: "May",
      file: "file5.pdf",
      uploadDate: "25/07/2023",
    },
  ]);

  const gridApiRef = useRef(null);

  const CustomButtonComponent = ({ data }) => {
    return (
      <div className="action-buttons">
        <button
          className="action-button"
          title="Disable"
          onClick={() => handleDisable()}
        >
          <FaEyeSlash />
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
      width: 200,
      flex: 1,
    },
    {
      headerName: "Month",
      field: "month",
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
      width: 200,
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
      initialWidth: 150,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      resizable: true,
    };
  }, []);

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

  return (
    <div className="packingStandardUploadContainer">
      <p>Delivery Management - KIT Plan</p>

      <div className="controlContainer">
        <div className="fileContainer">
          <label>
            Select KIT Plan File And Wait Until Clear File Name&nbsp;&nbsp;
          </label>
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
            domLayout="autoHeight"
          />
        </div>
      </div>
    </div>
  );
};

export default FortnightPlan;
