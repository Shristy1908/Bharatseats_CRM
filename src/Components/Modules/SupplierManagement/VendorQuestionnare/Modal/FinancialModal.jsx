import React, { useState, useRef, useMemo, useEffect } from "react";
import { Modal, Form } from "../../../../../Framework/Components/Layout";
import { AgGridReact } from "ag-grid-react";
import "../../../../../../node_modules/ag-grid-community/src/styles/ag-grid.scss";
import "../../../../../../node_modules/ag-grid-community/src/styles/ag-theme-alpine/sass/ag-theme-alpine.scss";
import BizClass from "./EditModal.module.scss";
import "./FinancialModal.css";

const FinancialModal = ({ handleFinancial, selectedFinancialDetail }) => {
  const gridApiRef = useRef(null);

  const [BankRowData, setBankRowData] = useState([]);
  const BankColumnDefs = [
    {
      headerName: "Name Of Bank",
      field: "nameOfBank",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
    {
      headerName: "Address Of Bank",
      field: "address",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
    {
      headerName: "Bank Telephone No",
      field: "telephoneNo",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
  ];

  const [CustomerRowData, setCustomerRowData] = useState([]);
  const CustomerColumnDefs = [
    {
      headerName: "Customer Name",
      field: "nameOfCustomer",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
    {
      headerName: "TurnOver",
      field: "turnoverInRS",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
    {
      headerName: "Remark",
      field: "remarks",
      headerClass: "header",
      width: 180,
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

  useEffect(() => {
    if (selectedFinancialDetail && selectedFinancialDetail.bankDetails) {
      setBankRowData(selectedFinancialDetail.bankDetails);
    }
    if (selectedFinancialDetail && selectedFinancialDetail.turnoverDetails) {
      setCustomerRowData(selectedFinancialDetail.turnoverDetails);
    }
  }, [selectedFinancialDetail]);

  return (
    <Modal
      varient="center"
      title="Details"
      width="95vw"
      show={handleFinancial}
      right="0"
    >
      <Modal.Body>
        <div className={BizClass.ticketHistoryDetail}>
          <div className={BizClass.TicketDetails}>
            <hr style={{ marginTop: "5px", borderTop: "#adacac" }} />
            <div className={BizClass.CustomerDetails}>
              <h5>Financial Details</h5>
              <table className={BizClass.table}>
                <tr>
                  <td>
                    GST No :{" "}
                    <span className={BizClass.value}>
                      {selectedFinancialDetail.gstNo}
                    </span>
                  </td>
                  <td>
                    TIN No :{" "}
                    <span className={BizClass.value}>
                      {selectedFinancialDetail.tinNo}
                    </span>
                  </td>
                  <td>
                    Sales Tax No :{" "}
                    <span className={BizClass.value}>
                      {selectedFinancialDetail.salesTaxNo}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    Excise Reg. No :{" "}
                    <span className={BizClass.value}>
                      {selectedFinancialDetail.exciseRegistrationNo}
                    </span>
                  </td>
                  <td>
                    PAN :{" "}
                    <span className={BizClass.value}>
                      {selectedFinancialDetail.pan}
                    </span>
                  </td>
                  <td>
                    TDS :{" "}
                    <span className={BizClass.value}>
                      {selectedFinancialDetail.tdsAcctNo}
                    </span>
                  </td>
                </tr>
              </table>
            </div>
            {/* <div className="CompanyAddress"> */}
            <hr />
            <div className={BizClass.CustomerDetails}>
              <h5>Bank Details</h5>
              <hr style={{ marginTop: "5px", borderTop: "#adacac" }} />
              <div className="ag-theme-alpine">
                <AgGridReact
                  rowData={BankRowData}
                  columnDefs={BankColumnDefs}
                  pagination={false}
                  paginationPageSize={10}
                  onGridReady={onGridReady}
                  defaultColDef={defaultColDef}
                  domLayout="autoHeight"
                />
              </div>
            </div>
            <div className={BizClass.CustomerDetails}>
              <h5>Customer Turnover Details</h5>
              <hr style={{ marginTop: "5px", borderTop: "#adacac" }} />
              <div className="ag-theme-alpine">
                <AgGridReact
                  rowData={CustomerRowData}
                  columnDefs={CustomerColumnDefs}
                  pagination={false}
                  paginationPageSize={10}
                  onGridReady={onGridReady}
                  defaultColDef={defaultColDef}
                  domLayout="autoHeight"
                />
              </div>
            </div>
            <hr />
          </div>
        </div>
        {/* </div> */}
      </Modal.Body>
      <Modal.Footer>
        {/* <Button type="button" varient="secondary" onClick={handleEdit}>
          OK
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default FinancialModal;
