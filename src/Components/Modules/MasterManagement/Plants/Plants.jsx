import React, { useState, useRef, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import CreateNewModal from "./Modal/CreateNewModal";
import EditModal from "./Modal/EditModal";
import "./Plants.css";
import { listOfPlant } from "../../Services/Method";
import { AlertMessage, Loader } from "../../../../Framework/Components/Widgets";

const PlantList = () => {
  const setAlertMessage = AlertMessage();
  const [isLoadingDataList, setisLoadingDataList] = useState(false);

  const [plantList, setPlantList] = useState([]);
  const getPlantList = async () => {
    debugger;
    try {
      const formdata = {};
      setisLoadingDataList(true);
      const result = await listOfPlant(formdata);
      setisLoadingDataList(false);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.length > 0
        ) {
          setPlantList(result.response.responseData);
        } else {
          setPlantList([]);
        }
      } else {
        setPlantList([]);
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
      headerName: "Plant Code",
      field: "plantCode",
      headerClass: "header",
      width: 200,
      flex: 1,
    },
    {
      headerName: "Plant Name",
      field: "plantName",
      headerClass: "header",
      width: 200,
      flex: 1,
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

  const [addNewModal, setAddNewModal] = useState(false);
  const handleAddNew = () => {
    setAddNewModal(!addNewModal);
  };

  const updatePlantData = (selectedRowData) => {
    debugger;
    const mappedData = plantList.map((data) => {
      if (data.plantId === selectedRowData.plantId) {
        data.plantName = selectedRowData.plantName;
        data.active = selectedRowData.active;
      }
      return data;
    });
    setPlantList(mappedData);
  };

  const updateNewlyPlantData = (newlyAddedPlant) => {
    debugger;
    console.log("newlyAddedPlant", newlyAddedPlant);
    if (gridApi) {
      const rowData = [];
      if (newlyAddedPlant && newlyAddedPlant.length > 0) {
        newlyAddedPlant.forEach((data) => {
          rowData.push(data);
        });
      }
      gridApi.forEachNode((node) => rowData.push(node.data));
      gridApi.setRowData(rowData);
      plantList.unshift(newlyAddedPlant);
      setPlantList([]);
      setPlantList(plantList);
      console.log("plantList", plantList);
    }
  };

  const [editModal, setEditModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const handleEditClick = (params) => {
    if (params) {
      setSelectedRowData(params.data);
    }
    setEditModal(!editModal);
  };

  useEffect(() => {
    getPlantList();
  }, []);

  return (
    <>
      {addNewModal && (
        <CreateNewModal
          handleAddNew={handleAddNew}
          updateNewlyPlantData={updateNewlyPlantData}
        />
      )}
      {/* {editModal && (
        <EditModal initialData={editData} handleEditSubmit={handleEditSubmit} />
      )} */}
      {editModal && (
        <EditModal
          handleEditClick={handleEditClick}
          selectedRowData={selectedRowData}
          updatePlantData={updatePlantData}
        />
      )}

      {isLoadingDataList ? (
        <Loader />
      ) : (
        <div className="plantsContainer table-box">
          <div className="header1">
            <span className="title1">Master Management - Plant List</span>
            <button className="addButton" onClick={() => setAddNewModal(true)}>
              <FaPlus /> Create New
            </button>
          </div>
          <div className="outerContainer">
            <div className="ag-theme-alpine">
              <AgGridReact
                rowData={plantList}
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

export default PlantList;
