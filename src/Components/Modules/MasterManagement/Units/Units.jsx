import React, { useState, useRef, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { FaPlus, FaEdit } from "react-icons/fa";
import CreateNewModal from "./Modal/CreateNewModal";
import EditModal from "./Modal/EditModal";
import { listOfUnits } from "../../Services/Method";
import { AlertMessage, Loader } from "../../../../Framework/Components/Widgets";
import "./Units.css";

const Units = () => {
  const setAlertMessage = AlertMessage();
   const [isLoadingDataList, setisLoadingDataList] = useState(false);
  const [addNewModal, setAddNewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [unitList, setUnitList] = useState([]);
  const getUnitList = async () => {
    debugger;
    try {
      const formdata = {};
      setisLoadingDataList(true);
      const result = await listOfUnits(formdata);
      setisLoadingDataList(false);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.length > 0
        ) {
          setUnitList(result.response.responseData);
        } else {
          setUnitList([]);
        }
      } else {
        setUnitList([]);
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

  const columnDefs = [
    {
      headerName: "Unit Code",
      field: "unitCode",
      headerClass: "header",
      width: 200,
      flex: 1,
    },
    {
      headerName: "Unit Description",
      field: "unitDescription",
      headerClass: "header",
      width: 200,
      flex: 1,
    },
    {
      headerName: "Active",
      field: "isActive",
      headerClass: "header",
      width: 200,
      flex: 1,
      valueGetter: (params) => {
        return params.data && params.data.isActive === 1
          ? "Active"
          : "Inactive";
      },
      cellClassRules: {
        Active: (params) => !!params.data.isActive,
        Inactive: (params) => !params.data.isActive,
      },
    },
    {
      headerName: "Action",
      field: "action",
      headerClass: "header",
      width: 100,
      flex: 1,
      cellRendererFramework: (params) => (
        <div className="action-icons">
          <button title="Edit" onClick={() => handleEditClick(params)}>
            <FaEdit className="edit-icon" />
          </button>
        </div>
      ),
    },
  ];

  const [gridApi, setGridApi] = useState();
  const onGridReady = (params) => {
    console.log(params.api);
    setGridApi(params.api);
  };

  const defaultColDef = useMemo(() => {
    return {
      initialWidth: 150,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    };
  }, []);

  const handleAddNew = () => {
    setAddNewModal(!addNewModal);
  };

  const updateUnitData = (selectedRowData) => {
    debugger;
    const mappedData = unitList.map((data) => {
      if (data.unitId === selectedRowData.unitId) {
        data.unitId = selectedRowData.unitId;
        data.unitDescription = selectedRowData.unitDescription;
        data.isActive = selectedRowData.isActive;
      }
      return data;
    });
    setUnitList(mappedData);
  };

  const updateNewlyAddedUnitData = (newlyAddedUnit) => {
    debugger;
    console.log("newlyAddedUnit", newlyAddedUnit);
    if (gridApi) {
      const rowData = [];
      if (newlyAddedUnit && newlyAddedUnit.length > 0) {
        newlyAddedUnit.forEach((data) => {
          rowData.push(data);
        });
      }
      gridApi.forEachNode((node) => rowData.push(node.data));
      gridApi.setRowData(rowData);
      unitList.unshift(newlyAddedUnit);
      setUnitList([]);
      setUnitList(unitList);
      console.log("unitList", unitList);
    }
  };

  const [selectedRowData, setSelectedRowData] = useState({});
  const handleEditClick = (params) => {
    debugger;
    if (params) {
      setSelectedRowData(params.data);
    }
    setEditModal(!editModal);
  };

  useEffect(() => {
    getUnitList();
  }, []);
  return (
    <>
      {addNewModal && (
        <CreateNewModal
          handleAddNew={handleAddNew}
          handleCancel={() => setAddNewModal(false)}
          updateNewlyAddedUnitData={updateNewlyAddedUnitData}
        />
      )}
      {/* {editModal && (
        <EditModal initialData={editData} handleEditSubmit={handleEditSubmit} />
      )} */}
      {editModal && (
        <EditModal
          handleEditClick={handleEditClick}
          selectedRowData={selectedRowData}
          updateUnitData={updateUnitData}
        />
      )}
      {isLoadingDataList ? (
        <Loader />
      ) : (
        <div className="plantsContainer table-box">
          <div className="header1">
            <span className="title1">Master Management - Unit List</span>
            <button className="addButton" onClick={() => setAddNewModal(true)}>
              <FaPlus /> Add New
            </button>
          </div>
          <div className="outerContainer">
            <div className="ag-theme-alpine">
              <AgGridReact
                rowData={unitList}
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

export default Units;
