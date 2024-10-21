import React, { useState, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { FaPlus, FaEdit } from "react-icons/fa";
import AddNewModal from "./Modal/AddNewModal";
import EditModal from "./Modal/EditModal";
import "../Materials/Materials.css";
import {
  listOfMaterial,
  searchMaterial,
  searchMaterialFilter,
} from "../../Services/Method";
import { AlertMessage, Loader } from "../../../../Framework/Components/Widgets";

const Materials = () => {
  const [isLoadingDataList, setisLoadingDataList] = useState(false);
  const setAlertMessage = AlertMessage();

  const [formFilterValue, setFormFilterValue] = useState({
    txtMaterialFilterBy: null,
    txtSearch: "",
  });

  const [searchMaterialList, setSearchMaterialList] = useState([]);
  const getSearchMaterialList = async () => {
    debugger;
    try {
      const formdata = {};
      const result = await searchMaterialFilter(formdata);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.materialFilterList &&
          result.response.responseData.materialFilterList.length > 0
        ) {
          setSearchMaterialList(
            result.response.responseData.materialFilterList
          );
          setSearchMaterialList(
            result.response.responseData.materialFilterList
          );
          console.log("search List", searchMaterialList);
        } else {
          setSearchMaterialList([]);
        }
      } else {
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

  // list of material
  const [MaterialList, setMaterialList] = useState([]);
  const getMaterialList = async () => {
    debugger;
    try {
      const formdata = {};
      setisLoadingDataList(true);
      const result = await listOfMaterial(formdata);
      setisLoadingDataList(false);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.materials &&
          result.response.responseData.materials.length > 0
        ) {
          setMaterialList(result.response.responseData.materials);
        } else {
          setMaterialList([]);
        }
      } else {
        setMaterialList([]);
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

  const getSearchedFilteredList = async () => {
    try {
      const formdata = {
        filterBy: formFilterValue.txtMaterialFilterBy,
        value: formFilterValue.txtSearch,
      };
      const result = await searchMaterial(formdata);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.materials &&
          result.response.responseData.materials.length > 0
        ) {
          setMaterialList(result.response.responseData.materials);
        }
      } else {
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

  const columnDefs = [
    {
      headerName: "Material Code",
      field: "materialCode",
      headerClass: "header",
      width: 200,
    },
    {
      headerName: "Material Description",
      field: "materialDescription",
      headerClass: "header",
      width: 250,
    },
    {
      headerName: "Material Group",
      field: "materialGroup",
      headerClass: "header",
      width: 200,
    },
    { headerName: "Unit", field: "unit", headerClass: "header", width: 200 },
    { headerName: "SNP", field: "snp", headerClass: "header", width: 200 },
    {
      headerName: "Action",
      field: "action",
      headerClass: "header",
      width: 200,
      cellRendererFramework: (params) => (
        <div className="action-icons">
          <button title="Edit" onClick={() => handleEditClick(params)}>
            <FaEdit className="edit-icon" />
          </button>
          {/* <button title="Delete" onClick={() => handleDelete(params.data.srNo)}>
            <FaTrash className="delete-icon" />
          </button> */}
        </div>
      ),
    },
  ];

  const defaultColDef = useMemo(() => {
    return {
      initialWidth: 200,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    };
  }, []);

  const handleAddNew = () => {
    setAddNewModal(!addNewModal);
  };

  const [gridApi, setGridApi] = useState();
  const onGridReady = (params) => {
    console.log(params.api);
    setGridApi(params.api);
  };

  const updateMaterialData = (newlyAddedMaterial) => {
    debugger;
    console.log("newlyAddedMaterial", newlyAddedMaterial);
    if (gridApi) {
      const rowData = [];
      if (newlyAddedMaterial && newlyAddedMaterial.length > 0) {
        newlyAddedMaterial.forEach((data) => {
          rowData.push(data);
        });
      }
      gridApi.forEachNode((node) => rowData.push(node.data));
      gridApi.setRowData(rowData);
      MaterialList.unshift(newlyAddedMaterial);
      setMaterialList([]);
      setMaterialList(MaterialList);
      console.log(MaterialList);
    }
  };

  const [editModal, setEditModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const handleEditClick = (params) => {
    if (params) {
      setSelectedRowData(params.data);
    }
    setEditModal(!editModal);
  };

  const updateState = (name, value) => {
    setFormFilterValue({
      ...formFilterValue,
      [name]: value,
    });

    console.log(formFilterValue.txtMaterialFilterBy);
  };

  const updateEditedMaterial = (selectedRowData) => {
    debugger;
    const mappedData = MaterialList.map((data) => {
      if (data.materialId === selectedRowData.materialId) {
        data.materialCode = selectedRowData.materialCode;
        data.materialDescription = selectedRowData.materialDescription;
        data.materialGroup = selectedRowData.materialGroup;
        data.unit = selectedRowData.unit;
        data.snp = selectedRowData.snp;
        data.isActive = selectedRowData.isActive;
      }
      return data;
    });
    setMaterialList(mappedData);
  };

  const clearSearchedItem = () => {
    setFormFilterValue({
      ...formFilterValue,
      txtMaterialFilterBy: null,
      txtSearch: "",
    });
    getMaterialList();
  };

  useEffect(() => {
    getMaterialList();
    getSearchMaterialList();
  }, []);

  return (
    <>
      {addNewModal && (
        <AddNewModal
          handleAddNew={handleAddNew}
          updateMaterialData={updateMaterialData}
        />
      )}
      {editModal && (
        <EditModal
          handleEditClick={handleEditClick}
          selectedRowData={selectedRowData}
          updateEditedMaterial={updateEditedMaterial}
        />
      )}
      {isLoadingDataList ? (
        <Loader />
      ) : (
        <div className="materialsContainer table-box">
          <div className="header1">
            <span className="title1">Master Management - Material List</span>
            <button className="addButton" onClick={() => setAddNewModal(true)}>
              <FaPlus /> Add New
            </button>
          </div>
          <div className="searchContainer">
            <select
              className="searchDropdown"
              name="txtMaterialFilterBy"
              onChange={(e) =>
                updateState("txtMaterialFilterBy", e.target.value)
              }
              value={formFilterValue.txtMaterialFilterBy}
            >
              <option value=""> -- select --</option>
              {searchMaterialList.map((material, index) => (
                <option key={index} value={material}>
                  {material}
                </option>
              ))}
            </select>
            <input
              className="searchInput"
              type="text"
              name="txtSearch"
              placeholder={`Search by ${formFilterValue.txtMaterialFilterBy}`}
              value={formFilterValue.txtSearch}
              onChange={(e) => updateState("txtSearch", e.target.value)}
              // disabled={!searchColumn}
            />
            <button
              className="search-btn"
              onClick={() => getSearchedFilteredList()}
            >
              Search
            </button>
            <button className="clrBtn" onClick={() => clearSearchedItem()}>
              Clear
            </button>
          </div>

          <div className="outerContainer">
            <div className="ag-theme-alpine">
              <AgGridReact
                rowData={MaterialList}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                onGridReady={onGridReady}
                defaultColDef={defaultColDef}
                loader={isLoadingDataList ? <Loader /> : null}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Materials;
