import React, { useState, useRef, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { FaEdit } from "react-icons/fa";
import EditModal from "./Modal/EditModal";
import "./Vendors.css";
import { listOfSupplier } from "../../Services/Method";
import { AlertMessage, Loader } from "../../../../Framework/Components/Widgets";

const Vendors = () => {
  const [isLoadingDataList, setisLoadingDataList] = useState(false);
  const setAlertMessage = AlertMessage();

  const [SupplierList, setSupplierList] = useState([]);
  const getSupplierList = async () => {
    debugger;
    try {
      const formdata = {};
      setisLoadingDataList(true);
      const result = await listOfSupplier(formdata);
      setisLoadingDataList(false);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.supplierList &&
          result.response.responseData.supplierList.length > 0
        ) {
          setSupplierList(result.response.responseData.supplierList);
        } else {
          setSupplierList([]);
        }
      } else {
        setSupplierList([]);
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
      field: "supplierId",
      headerClass: "header",
      width: 100,
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
      width: 200,
    },
    { headerName: "Email", field: "email", headerClass: "header", width: 250 },
    {
      headerName: "Contact",
      field: "mobileNumber",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "City",
      field: "cityName",
      headerClass: "header",
      width: 150,
    },
    { headerName: "GSTIN", field: "gstin", headerClass: "header", width: 150 },
    {
      headerName: "Action",
      field: "action",
      headerClass: "header",
      width: 150,
      cellRendererFramework: (params) => (
        <div className="action-icons">
          <button title="Edit" onClick={() => handleEditClick(params)}>
            <FaEdit className="edit-icon" />
          </button>
        </div>
      ),
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
    };
  }, []);

  const [editModal, setEditModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const handleEditClick = (params) => {
    if (params) {
      setSelectedRowData(params.data);
    }
    setEditModal(!editModal);
  };

  const updateEditedSupplier = (selectedRowData) => {
    debugger;
    const mappedData = SupplierList.map((data) => {
      if (data.supplierId === selectedRowData.supplierId) {
        data.supplierName = selectedRowData.supplierName;
        data.email = selectedRowData.email;
        data.mobileNumber = selectedRowData.mobileNumber;
        data.address1 = selectedRowData.address1;
        data.countryName = selectedRowData.countryName;
        data.stateName = selectedRowData.stateName;
        data.cityName = selectedRowData.cityName;
        data.pin = selectedRowData.pin;
        data.isActive = selectedRowData.isActive;
      }
      return data;
    });
    setSupplierList(mappedData);
  };

  useEffect(() => {
    getSupplierList();
  }, []);

  return (
    <>
      {editModal && (
        <EditModal
          handleEditClick={handleEditClick}
          selectedRowData={selectedRowData}
          updateEditedSupplier={updateEditedSupplier}
        />
      )}
      {isLoadingDataList ? (
        <Loader />
      ) : (
        <div className="vendorsContainer table-box">
          <div className="header1">
            <span className="title1">Master Management - Supplier List</span>
          </div>
          <div className="outerContainer">
            <div className="ag-theme-alpine">
              <AgGridReact
                rowData={SupplierList}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                onGridReady={onGridReady}
                defaultColDef={defaultColDef}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Vendors;
