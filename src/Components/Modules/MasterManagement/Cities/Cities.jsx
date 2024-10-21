import React, { useState, useRef, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import CreateNewModal from "./Modal/CreateNewModal";
import EditModal from "./Modal/EditModal";
import "./Cities.css";
import { AlertMessage, Loader } from "../../../../Framework/Components/Widgets";
import { listOfCities } from "../../Services/Method";

const Cities = () => {
  const setAlertMessage = AlertMessage();

  const [isLoadingDataList,setisLoadingDataList]=useState(false)
  const [cityList, setCityList] = useState([]);
  const getCityList = async () => {
    debugger;
    try {

      const formdata = {};
      setisLoadingDataList(true);
      const result = await listOfCities(formdata);
      setisLoadingDataList(false);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.length > 0
        ) {
          setCityList(result.response.responseData);
        } else {
          setCityList([]);
        }
      } else {
        setCityList([]);
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

  const [addNewModal, setAddNewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const columnDefs = [
    {
      headerName: "City Name",
      field: "cityName",
      headerClass: "header",
      flex: 1,
    },
    {
      headerName: "State",
      field: "stateName",
      headerClass: "header",
      flex: 1,
    },
    {
      headerName: "Country",
      field: "countryName",
      headerClass: "header",
      flex: 1,
    },
    {
      headerName: "Action",
      field: "action",
      headerClass: "header",
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

  const [selectedRowData, setSelectedRowData] = useState([]);
  const handleEditClick = (params) => {
    if (params) {
      setSelectedRowData(params.data);
    }
    setEditModal(!editModal);
  };

  const [gridApi, setGridApi] = useState();
  const onGridReady = (params) => {
    console.log(params.api);
    setGridApi(params.api);
  };

  const updateCityData = (newlyAddedCity) => {
    debugger;
    console.log("newlyAddedCity", newlyAddedCity);
    if (gridApi) {
      const rowData = [];
      if (newlyAddedCity && newlyAddedCity.length > 0) {
        newlyAddedCity.forEach((data) => {
          rowData.push(data);
        });
      }
      gridApi.forEachNode((node) => rowData.push(node.data));
      gridApi.setRowData(rowData);
      cityList.unshift(newlyAddedCity);
      setCityList([]);
      setCityList(cityList);
      console.log("plantList", cityList);
    }
  };

  const updateEditedCity = (selectedRowData) => {
    debugger;
    const mappedData = cityList.map((data) => {
      if (data.cityId === selectedRowData.cityId) {
        data.countryName = selectedRowData.countryName;
        data.stateName = selectedRowData.stateName;
        data.cityName = selectedRowData.cityName;
        data.isActive = selectedRowData.isActive;
      }
      return data;
    });
    setCityList(mappedData);
  };

  useEffect(() => {
    getCityList();
  }, []);

  return (
    <>
      {addNewModal && (
        <CreateNewModal
          handleAddNew={handleAddNew}
          updateCityData={updateCityData}
        />
      )}
      {editModal && (
        <EditModal
          handleEditClick={handleEditClick}
          selectedRowData={selectedRowData}
          updateEditedCity={updateEditedCity}
        />
      )}
      {isLoadingDataList ? (
        <Loader />
      ) : (
        <div className="citiesContainer table-box">
          <div className="header1">
            <span className="title1">Master Management - City List</span>
            <button className="addButton" onClick={() => setAddNewModal(true)}>
              <FaPlus /> Create New
            </button>
          </div>
          <div className="outerContainer">
            <div className="ag-theme-alpine">
              <AgGridReact
                rowData={cityList}
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

export default Cities;
