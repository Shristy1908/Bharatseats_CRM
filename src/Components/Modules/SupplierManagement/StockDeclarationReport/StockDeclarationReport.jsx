import React, { useState, useRef, useMemo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { AgGridReact } from "ag-grid-react";
import "../../../../../node_modules/ag-grid-community/src/styles/ag-grid.scss";
import "../../../../../node_modules/ag-grid-community/src/styles/ag-theme-alpine/sass/ag-theme-alpine.scss";
import "./StockDeclarationReport.css";
import { FaEye } from "react-icons/fa";
import PopUpView from "./Modal/PopUpView";

const StockDeclarationReport = () => {
  const gridApiRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const CustomButtonComponent = () => {
    return (
      <>
        <button className="SDRViewBtn" onClick={() => setIsModalOpen(true)}>
          <FaEye title="View" />
        </button>
      </>
    );
  };

  const [SDRRowData, setSDRRowData] = useState([
    {
      uploadDate: "14/06/2024",
      action: "",
    },
    {
      uploadDate: "14/06/2024",
      action: "",
    },
    {
      uploadDate: "14/06/2024",
      action: "",
    },
    {
      uploadDate: "14/06/2024",
      action: "",
    },
    {
      uploadDate: "14/06/2024",
      action: "",
    },
    {
      uploadDate: "14/06/2024",
      action: "",
    },
    {
      uploadDate: "14/06/2024",
      action: "",
    },
    {
      uploadDate: "14/06/2024",
      action: "",
    },
    {
      uploadDate: "14/06/2024",
      action: "",
    },
    {
      uploadDate: "14/06/2024",
      action: "",
    },
    {
      uploadDate: "14/06/2024",
      action: "",
    },
    {
      uploadDate: "14/06/2024",
      action: "",
    },
  ]);

  const SDRColumnDefs = [
    {
      headerName: "Upload Date",
      field: "uploadDate",
      headerClass: "header",
      width: 250,
      flex: 1,
    },

    {
      headerName: "Action",
      field: "action",
      headerClass: "header",
      cellRenderer: CustomButtonComponent,
      width: 250,
      flex: 1,
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

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && <PopUpView handleCancel={handleCancel} />}
      <div className="sDRContainer">
        <p>Supplier Management - Stock Declaration Report</p>
        <div className="SDRTableContainer">
          <div className="ag-theme-alpine ">
            <AgGridReact
              rowData={SDRRowData}
              columnDefs={SDRColumnDefs}
              pagination={true}
              paginationPageSize={9}
              onGridReady={onGridReady}
              defaultColDef={defaultColDef}
              domLayout="autoHeight"
            />
          </div>
        </div>
        <h5>Record Found : {SDRRowData.length}</h5>
      </div>
    </>
  );
};

export default StockDeclarationReport;
