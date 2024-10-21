/* import React, { useState, useRef, useMemo } from "react";
import "../BuyerAssociation/BuyerAssociation.css";
import { AgGridReact } from "ag-grid-react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AddNew from "./Modal/AddNewModal";
import Edit from "./Modal/EditModal";

const BuyerAssociation = () => {
  const [rowData, setRowData] = useState([
    {
      srNo: 1,
      supplierName: "Supplier A",
      vendorCode: "V001",
      userCode: "201",
    },
    {
      srNo: 2,
      supplierName: "Supplier B",
      vendorCode: "V002",
      userCode: "202",
    },
    {
      srNo: 3,
      supplierName: "Supplier C",
      vendorCode: "V003",
      userCode: "203",
    },
    {
      srNo: 4,
      supplierName: "Supplier D",
      vendorCode: "V004",
      userCode: "204",
    },
    {
      srNo: 5,
      supplierName: "Supplier E",
      vendorCode: "V005",
      userCode: "205",
    },
    {
      srNo: 6,
      supplierName: "Supplier F",
      vendorCode: "V006",
      userCode: "206",
    },
    {
      srNo: 7,
      supplierName: "Supplier G",
      vendorCode: "V007",
      userCode: "207",
    },
    {
      srNo: 8,
      supplierName: "Supplier H",
      vendorCode: "V008",
      userCode: "208",
    },
    {
      srNo: 9,
      supplierName: "Supplier I",
      vendorCode: "V009",
      userCode: "209",
    },
    {
      srNo: 10,
      supplierName: "Supplier J",
      vendorCode: "V010",
      userCode: "210",
    },
    {
      srNo: 11,
      supplierName: "Supplier K",
      vendorCode: "V011",
      userCode: "211",
    },
    {
      srNo: 12,
      supplierName: "Supplier L",
      vendorCode: "V012",
      userCode: "212",
    },
    {
      srNo: 13,
      supplierName: "Supplier M",
      vendorCode: "V013",
      userCode: "213",
    },
    {
      srNo: 14,
      supplierName: "Supplier N",
      vendorCode: "V014",
      userCode: "214",
    },
    {
      srNo: 15,
      supplierName: "Supplier O",
      vendorCode: "V015",
      userCode: "215",
    },
    {
      srNo: 16,
      supplierName: "Supplier P",
      vendorCode: "V016",
      userCode: "216",
    },
    {
      srNo: 17,
      supplierName: "Supplier Q",
      vendorCode: "V017",
      userCode: "217",
    },
    {
      srNo: 18,
      supplierName: "Supplier R",
      vendorCode: "V018",
      userCode: "218",
    },
    {
      srNo: 19,
      supplierName: "Supplier S",
      vendorCode: "V019",
      userCode: "219",
    },
    {
      srNo: 20,
      supplierName: "Supplier T",
      vendorCode: "V020",
      userCode: "220",
    },
    {
      srNo: 21,
      supplierName: "Supplier U",
      vendorCode: "V021",
      userCode: "221",
    },
    {
      srNo: 22,
      supplierName: "Supplier V",
      vendorCode: "V022",
      userCode: "222",
    },
    {
      srNo: 23,
      supplierName: "Supplier W",
      vendorCode: "V023",
      userCode: "223",
    },
    {
      srNo: 24,
      supplierName: "Supplier X",
      vendorCode: "V024",
      userCode: "224",
    },
    {
      srNo: 25,
      supplierName: "Supplier Y",
      vendorCode: "V025",
      userCode: "225",
    },
  ]);

  const gridApiRef = useRef(null);

  const columnDefs = [
    {
      headerName: "Sr No",
      field: "srNo",
      headerClass: "header",
      width: 100,
    },
    {
      headerName: "Supplier Name",
      field: "supplierName",
      headerClass: "header",
      width: 200,
    },
    {
      headerName: "Vendor/Supplier Code",
      field: "vendorCode",
      headerClass: "header",
      width: 200,
    },
    {
      headerName: "User Code",
      field: "userCode",
      headerClass: "header",
      width: 200,
    },
    {
      headerName: "Action",
      field: "action",
      headerClass: "header",
      width: 200,
      cellRendererFramework: (params) => (
        <div className="action-icons">
          <button title="Edit" onClick={() => alert(`Edit ${params.data.srNo}`)}>
            <FaEdit className="edit-icon" />
          </button>
          <button title="Delete" onClick={() => alert(`Delete ${params.data.srNo}`)}>
            <FaTrash className="delete-icon" />
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

  return (
    <>
      <div className="tableContainer table-box">
        <div className="header1 ">
          <span className="title1 ">List Vendor Association Data</span>
          <button className="addButton">
            <FaPlus /> Add New
          </button>
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
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerAssociation;
 */

import React, { useState, useRef, useMemo } from "react";
import "../BuyerAssociation/BuyerAssociation.css";
import { AgGridReact } from "ag-grid-react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AddNewModal from "./Modal/AddNewModal";
import EditModal from "./Modal/EditModal";

const BuyerAssociation = () => {
  const [rowData, setRowData] = useState([
    {
      srNo: 1,
      supplierName: "Supplier A",
      vendorCode: "V001",
      userCode: "201",
    },
    {
      srNo: 2,
      supplierName: "Supplier B",
      vendorCode: "V002",
      userCode: "202",
    },
    {
      srNo: 3,
      supplierName: "Supplier C",
      vendorCode: "V003",
      userCode: "203",
    },
    {
      srNo: 4,
      supplierName: "Supplier D",
      vendorCode: "V004",
      userCode: "204",
    },
    {
      srNo: 5,
      supplierName: "Supplier E",
      vendorCode: "V005",
      userCode: "205",
    },
    {
      srNo: 6,
      supplierName: "Supplier F",
      vendorCode: "V006",
      userCode: "206",
    },
    {
      srNo: 7,
      supplierName: "Supplier G",
      vendorCode: "V007",
      userCode: "207",
    },
    {
      srNo: 8,
      supplierName: "Supplier H",
      vendorCode: "V008",
      userCode: "208",
    },
    {
      srNo: 9,
      supplierName: "Supplier I",
      vendorCode: "V009",
      userCode: "209",
    },
    {
      srNo: 10,
      supplierName: "Supplier J",
      vendorCode: "V010",
      userCode: "210",
    },
    {
      srNo: 11,
      supplierName: "Supplier K",
      vendorCode: "V011",
      userCode: "211",
    },
    {
      srNo: 12,
      supplierName: "Supplier L",
      vendorCode: "V012",
      userCode: "212",
    },
    {
      srNo: 13,
      supplierName: "Supplier M",
      vendorCode: "V013",
      userCode: "213",
    },
    {
      srNo: 14,
      supplierName: "Supplier N",
      vendorCode: "V014",
      userCode: "214",
    },
    {
      srNo: 15,
      supplierName: "Supplier O",
      vendorCode: "V015",
      userCode: "215",
    },
    {
      srNo: 16,
      supplierName: "Supplier P",
      vendorCode: "V016",
      userCode: "216",
    },
    {
      srNo: 17,
      supplierName: "Supplier Q",
      vendorCode: "V017",
      userCode: "217",
    },
    {
      srNo: 18,
      supplierName: "Supplier R",
      vendorCode: "V018",
      userCode: "218",
    },
    {
      srNo: 19,
      supplierName: "Supplier S",
      vendorCode: "V019",
      userCode: "219",
    },
    {
      srNo: 20,
      supplierName: "Supplier T",
      vendorCode: "V020",
      userCode: "220",
    },
    {
      srNo: 21,
      supplierName: "Supplier U",
      vendorCode: "V021",
      userCode: "221",
    },
    {
      srNo: 22,
      supplierName: "Supplier V",
      vendorCode: "V022",
      userCode: "222",
    },
    {
      srNo: 23,
      supplierName: "Supplier W",
      vendorCode: "V023",
      userCode: "223",
    },
    {
      srNo: 24,
      supplierName: "Supplier X",
      vendorCode: "V024",
      userCode: "224",
    },
    {
      srNo: 25,
      supplierName: "Supplier Y",
      vendorCode: "V025",
      userCode: "225",
    },
  ]);

  const [addNewModal, setAddNewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const gridApiRef = useRef(null);

  const columnDefs = [
    {
      headerName: "Sr No",
      field: "srNo",
      headerClass: "header",
      width: 100,
      flex: 1,
    },
    {
      headerName: "Supplier Name",
      field: "supplierName",
      headerClass: "header",
      width: 200,
      flex: 1,
    },
    {
      headerName: "Vendor/Supplier Code",
      field: "vendorCode",
      headerClass: "header",
      width: 200,
      flex: 1,
    },
    {
      headerName: "User Code",
      field: "userCode",
      headerClass: "header",
      width: 200,
      flex: 1,
    },
    {
      headerName: "Action",
      field: "action",
      headerClass: "header",
      width: 200,
      flex: 1,
      cellRendererFramework: (params) => (
        <div className="action-icons">
          <button
            title="Edit"
            onClick={() => {
              setSelectedSupplier(params.data);
              setEditModal(params.data);
            }}
          >
            <FaEdit className="edit-icon" />
          </button>
          <button title="Disable" onClick={() => handleDisable(params.data)}>
            <i class="fas fa-regular fa-eye-slash"></i>
          </button>
        </div>
      ),
    },
  ];

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
    // params.api.sizeColumnsToFit();
  };

  // const handleAddNew = (newData) => {
  //   setRowData([
  //     ...rowData,
  //     {
  //       ...newData,
  //       srNo: rowData.length + 1,
  //       supplierName: `Supplier ${String.fromCharCode(65 + rowData.length)}`,
  //     },
  //   ]);
  //   setAddNewModal(false);
  // };

  const handleAddNew = (data) => {
    setSelectedSupplier(data);
    setAddNewModal(!addNewModal);
  };

  const handleEdit = (data) => {
    setSelectedSupplier(data);
    setEditModal(!editModal);
  };
  // const handleEdit = (updatedData) => {
  //   setRowData(
  //     rowData.map((supplier) =>
  //       supplier.srNo === updatedData.srNo ? updatedData : supplier
  //     )
  //   );
  //   setEditModal(false);
  //   setSelectedSupplier(null);
  // };

  const handleDisable = (data) => {
    alert(`You Can't Change`);
  };

  const defaultColDef = useMemo(() => {
    return {
      initialWidth: 200,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    };
  }, []);

  return (
    <>
      {addNewModal && <AddNewModal handleAddNew={handleAddNew} />}
      {/* {addNewModal && <AddNewModal handleAddNew={handleAddNew} handleCancel={() => setAddNewModal(false)} />} */}
      {editModal && selectedSupplier && (
        <EditModal supplier={selectedSupplier} handleEdit={handleEdit} />
      )}
      <div className=" buyerassociationContainer table-box">
        <div className="header1">
          <span className="title1">
            User Management - List Vendor Association Data
          </span>
          <button className="addButton" onClick={() => setAddNewModal(true)}>
            <FaPlus /> Add New
          </button>
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
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerAssociation;
