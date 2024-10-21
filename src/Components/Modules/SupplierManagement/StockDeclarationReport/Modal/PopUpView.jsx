import React, { useState, useRef, useMemo } from "react";
import { Modal } from "../../../../../Framework/Components/Layout";
import "react-datepicker/dist/react-datepicker.css";
import { AgGridReact } from "ag-grid-react";
import "../../../../../../node_modules/ag-grid-community/src/styles/ag-grid.scss";
import "../../../../../../node_modules/ag-grid-community/src/styles/ag-theme-alpine/sass/ag-theme-alpine.scss";
import "./PopUpView.css";

const PopUpView = ({ handleCancel }) => {
  const gridApiRef = useRef(null);

  const [SDRRowData, setSDRRowData] = useState([
    {
      poNo: "5500001747",
      supplierCode: "	G10001",
      supplierName: "GANDHI SPRINGS-GURGAON",
      materialCode: "AA12080",
      materialDescription: "WIRERR BACK FRAME NO 1 MODEL YSD",
      rawMaterial: "50",
      uom: "KG",
      wip: "10",
      wipUom: "KG",
      finishGoods: "500",
      finishGoodUom: "NOS",
      remark: "",
      PurchaseOrderDate: "19/06/2024",
      CreatedOnDate: "19/06/2024",
    },
    {
      poNo: "5500001747",
      supplierCode: "	G10001",
      supplierName: "GANDHI SPRINGS-GURGAON",
      materialCode: "AA12080",
      materialDescription: "WIRERR BACK FRAME NO 1 MODEL YSD",
      rawMaterial: "50",
      uom: "KG",
      wip: "10",
      wipUom: "KG",
      finishGoods: "500",
      finishGoodUom: "NOS",
      remark: "",
      PurchaseOrderDate: "19/06/2024",
      CreatedOnDate: "19/06/2024",
    },
    {
      poNo: "5500001747",
      supplierCode: "	G10001",
      supplierName: "GANDHI SPRINGS-GURGAON",
      materialCode: "AA12080",
      materialDescription: "WIRERR BACK FRAME NO 1 MODEL YSD",
      rawMaterial: "50",
      uom: "KG",
      wip: "10",
      wipUom: "KG",
      finishGoods: "500",
      finishGoodUom: "NOS",
      remark: "",
      PurchaseOrderDate: "19/06/2024",
      CreatedOnDate: "19/06/2024",
    },
    {
      poNo: "5500001747",
      supplierCode: "	G10001",
      supplierName: "GANDHI SPRINGS-GURGAON",
      materialCode: "AA12080",
      materialDescription: "WIRERR BACK FRAME NO 1 MODEL YSD",
      rawMaterial: "50",
      uom: "KG",
      wip: "10",
      wipUom: "KG",
      finishGoods: "500",
      finishGoodUom: "NOS",
      remark: "",
      PurchaseOrderDate: "19/06/2024",
      CreatedOnDate: "19/06/2024",
    },
    {
      poNo: "5500001747",
      supplierCode: "	G10001",
      supplierName: "GANDHI SPRINGS-GURGAON",
      materialCode: "AA12080",
      materialDescription: "WIRERR BACK FRAME NO 1 MODEL YSD",
      rawMaterial: "50",
      uom: "KG",
      wip: "10",
      wipUom: "KG",
      finishGoods: "500",
      finishGoodUom: "NOS",
      remark: "",
      PurchaseOrderDate: "19/06/2024",
      CreatedOnDate: "19/06/2024",
    },
    {
      poNo: "5500001747",
      supplierCode: "	G10001",
      supplierName: "GANDHI SPRINGS-GURGAON",
      materialCode: "AA12080",
      materialDescription: "WIRERR BACK FRAME NO 1 MODEL YSD",
      rawMaterial: "50",
      uom: "KG",
      wip: "10",
      wipUom: "KG",
      finishGoods: "500",
      finishGoodUom: "NOS",
      remark: "",
      PurchaseOrderDate: "19/06/2024",
      CreatedOnDate: "19/06/2024",
    },
    {
      poNo: "5500001747",
      supplierCode: "	G10001",
      supplierName: "GANDHI SPRINGS-GURGAON",
      materialCode: "AA12080",
      materialDescription: "WIRERR BACK FRAME NO 1 MODEL YSD",
      rawMaterial: "50",
      uom: "KG",
      wip: "10",
      wipUom: "KG",
      finishGoods: "500",
      finishGoodUom: "NOS",
      remark: "",
      PurchaseOrderDate: "19/06/2024",
      CreatedOnDate: "19/06/2024",
    },
    {
      poNo: "5500001747",
      supplierCode: "	G10001",
      supplierName: "GANDHI SPRINGS-GURGAON",
      materialCode: "AA12080",
      materialDescription: "WIRERR BACK FRAME NO 1 MODEL YSD",
      rawMaterial: "50",
      uom: "KG",
      wip: "10",
      wipUom: "KG",
      finishGoods: "500",
      finishGoodUom: "NOS",
      remark: "",
      PurchaseOrderDate: "19/06/2024",
      CreatedOnDate: "19/06/2024",
    },
  ]);

  const SDRColumnDefs = [
    {
      headerName: "PO Number",
      field: "poNo",
      headerClass: "header",
      width: 120,
    },

    {
      headerName: "Supplier Code",
      field: "supplierCode",
      headerClass: "header",
      width: 140,
    },
    {
      headerName: "Supplier Name",
      field: "supplierName",
      headerClass: "header",
      width: 140,
    },
    {
      headerName: "Material Code",
      field: "materialCode",
      headerClass: "header",
      width: 140,
    },
    {
      headerName: "Material Description",
      field: "materialDescription",
      headerClass: "header",
      width: 180,
    },
    {
      headerName: "Raw Material",
      field: "rawMaterial",
      headerClass: "header",
      width: 140,
    },
    {
      headerName: "UOM",
      field: "uom",
      headerClass: "header",
      width: 100,
    },
    {
      headerName: "WIP",
      field: "wip",
      headerClass: "header",
      width: 100,
    },
    {
      headerName: "WIP UOM",
      field: "wipUom",
      headerClass: "header",
      width: 130,
    },
    {
      headerName: "Finish Goods",
      field: "finishGoods",
      headerClass: "header",
      width: 140,
    },
    {
      headerName: "Finish Good UOM",
      field: "finishGoodUom",
      headerClass: "header",
      width: 160,
    },
    {
      headerName: "Remark",
      field: "remark",
      headerClass: "header",
      width: 140,
    },
    {
      headerName: "Purchase Order Date",
      field: "PurchaseOrderDate",
      headerClass: "header",
      width: 180,
    },
    {
      headerName: "Created On Date",
      field: "CreatedOnDate",
      headerClass: "header",
      width: 160,
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

  return (
    <div>
      <Modal
        varient="center"
        title="Stock Declaration List"
        show={handleCancel}
        width="88vw"
        right="0"
      >
        <Modal.Body>
          <div className="exportBtn">
            <button>Export To Excel</button>
          </div>
          <div className="popUpTableContainer">
            <div className="ag-theme-alpine">
              <AgGridReact
                rowData={SDRRowData}
                columnDefs={SDRColumnDefs}
                pagination={false}
                paginationPageSize={10}
                onGridReady={onGridReady}
                defaultColDef={defaultColDef}
                domLayout="autoHeight"
              />
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default PopUpView;