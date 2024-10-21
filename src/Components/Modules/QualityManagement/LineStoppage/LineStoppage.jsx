import React, { useState, useRef, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { FaUpload, FaPlus, FaCheck, FaTrash } from "react-icons/fa";
import "../../SupplierManagement/SupplierPackingStandard/SupplierPackingStandard.css";

const LineStoppage = () => {
  const fileInputRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [fileName, setFileName] = useState("");
  const [rowData, setRowData] = useState([
    {
      srNo: "01",
      plant: "KK",
      date: "03/11/2022",
      lineNo: "202325",
      supplierCode: "6165",
      suppliername: "Aditya",
      materialcode: "523",
      materialdesc: "LKLLK",
      instance: "hj",
      durationform: "2",
      durationto: "3",
      stoptime: "march",
      reasonno: "4556",
      reasondesc: "kjscf",
      remark: "Activated",
      uploaddate: "19/05/2023",
    },
    {
      srNo: "01",
      plant: "KK",
      date: "03/11/2022",
      lineNo: "202325",
      supplierCode: "6165",
      suppliername: "Aditya",
      materialcode: "523",
      materialdesc: "LKLLK",
      instance: "hj",
      durationform: "2",
      durationto: "3",
      stoptime: "march",
      reasonno: "4556",
      reasondesc: "kjscf",
      remark: "Activated",
      uploaddate: "19/05/2023",
    },
    {
      srNo: "01",
      plant: "KK",
      date: "03/11/2022",
      lineNo: "202325",
      supplierCode: "6165",
      suppliername: "Aditya",
      materialcode: "523",
      materialdesc: "LKLLK",
      instance: "hj",
      durationform: "2",
      durationto: "3",
      stoptime: "march",
      reasonno: "4556",
      reasondesc: "kjscf",
      remark: "Activated",
      uploaddate: "19/05/2023",
    },
    {
      srNo: "01",
      plant: "KK",
      date: "03/11/2022",
      lineNo: "202325",
      supplierCode: "6165",
      suppliername: "Aditya",
      materialcode: "523",
      materialdesc: "LKLLK",
      instance: "hj",
      durationform: "2",
      durationto: "3",
      stoptime: "march",
      reasonno: "4556",
      reasondesc: "kjscf",
      remark: "Activated",
      uploaddate: "19/05/2023",
    },
    {
      srNo: "01",
      plant: "KK",
      date: "03/11/2022",
      lineNo: "202325",
      supplierCode: "6165",
      suppliername: "Aditya",
      materialcode: "523",
      materialdesc: "LKLLK",
      instance: "hj",
      durationform: "2",
      durationto: "3",
      stoptime: "march",
      reasonno: "4556",
      reasondesc: "kjscf",
      remark: "Activated",
      uploaddate: "19/05/2023",
    },
    {
      srNo: "01",
      plant: "KK",
      date: "03/11/2022",
      lineNo: "202325",
      supplierCode: "6165",
      suppliername: "Aditya",
      materialcode: "523",
      materialdesc: "LKLLK",
      instance: "hj",
      durationform: "2",
      durationto: "3",
      stoptime: "march",
      reasonno: "4556",
      reasondesc: "kjscf",
      remark: "Activated",
      uploaddate: "19/05/2023",
    },
  ]);

  const gridApiRef = useRef(null);

  // const CustomButtonComponent = () => {
  //   return (
  //     <>
  //       <div className="action-buttons">
  //         <button
  //           className="action-button"
  //           title="Approve"
  //           onClick={() => handleApprove()}
  //         >
  //           <FaCheck />
  //         </button>
  //         <button
  //           className="action-button"
  //           title="Delete"
  //           onClick={() => handleDelete()}
  //         >
  //           <FaTrash />
  //         </button>
  //       </div>
  //     </>
  //   );
  // };

  const columnDefs = [
    {
      headerName: "Sr. No.",
      field: "srNo",
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
      headerName: "Date",
      field: "date",
      headerClass: "header",
      sortable: true,
      width: 170,
    },
    {
      headerName: "Line No",
      field: "lineNo",
      headerClass: "header",
      sortable: false,
      width: 170,
    },
    {
      headerName: "Supplier Code ",
      field: "supplierCode",
      headerClass: "header",
      sortable: false,
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
      headerName: "Material Code",
      field: "materialcode",
      headerClass: "header",
      sortable: false,
      width: 170,
    },
    {
      headerName: "Material Desc.",
      field: "materialdesc",
      headerClass: "header",
      sortable: false,
      width: 170,
    },
    {
      headerName: "Instance",
      field: "instance",
      headerClass: "header",
      sortable: false,
      width: 170,
    },
    {
      headerName: "Duration Form",
      field: "durationform",
      headerClass: "header",
      sortable: false,
      width: 170,
    },
    {
      headerName: "Duration To",
      field: "durationto",
      headerClass: "header",
      sortable: false,
      width: 170,
    },
    {
      headerName: "Stop Time",
      field: "stoptime",
      headerClass: "header",
      sortable: false,
      width: 170,
    },
    {
      headerName: "Reason No",
      field: "reasonno",
      headerClass: "header",
      sortable: false,
      width: 170,
    },
    {
      headerName: "Reason Description",
      field: "reasondesc",
      headerClass: "header",
      sortable: false,
      width: 170,
    },
    {
      headerName: "Remark",
      field: "remark",
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleApprove = (data) => {
    console.log("Approve clicked for", data);
  };

  const handleDelete = (data) => {
    console.log("Delete clicked for", data);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    gridApiRef.current.setQuickFilter(value);
  };

  return (
    <div className="packingStandardUploadContainer">
      <p>Quality Management - Line Stoppage</p>

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

export default LineStoppage;
