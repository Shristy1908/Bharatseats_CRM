import React, { useRef, useMemo, useState, useEffect } from "react";
import { Modal, Form } from "../../../../../Framework/Components/Layout";
import { AgGridReact } from "ag-grid-react";
import "../../../../../../node_modules/ag-grid-community/src/styles/ag-grid.scss";
import "../../../../../../node_modules/ag-grid-community/src/styles/ag-theme-alpine/sass/ag-theme-alpine.scss";
import BizClass from "./EditModal.module.scss";

const EditModal = ({ handleEdit, selectedUser }) => {
  const gridApiRef = useRef(null);

  const [CompanyAddress, setCompanyAddress] = useState([]);

  const [ContactRowData, setContactRowData] = useState([]);
  const ContactColumnDefs = [
    {
      headerName: "Contact Person Name",
      field: "personName",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
    {
      headerName: "Contact Person Designation",
      field: "designation",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
    {
      headerName: "Contact Person Office No",
      field: "officeContactNo",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
    {
      headerName: "Contact Person Residence No",
      field: "residenceContactNo",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
  ];

  const [ProductRowData, setProductRowData] = useState([]);
  const ProductColumnDefs = [
    {
      headerName: "Name Of Product",
      field: "productName",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
    {
      headerName: "Main Customer",
      field: "mainCustomer",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
    {
      headerName: "Commencement Of Supply",
      field: "comOfSupply",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
    {
      headerName: "% Of Annual Turn Over",
      field: "annualTurnOver",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
  ];

  const [CertifiedRowData, setCertifiedRowData] = useState([]);
  const CertifiedColumnDefs = [
    {
      headerName: "Name Of Quality Systems",
      field: "nameOfQualitySystem",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
    {
      headerName: "Certifying Agency",
      field: "certifyingAgency",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
    {
      headerName: "Year Of Certification",
      field: "yearOfCertification",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
  ];

  const [partnershipRowData, setPartnershipRowData] = useState([]);
  const partnershipColumnDefs = [
    {
      headerName: "Tie-Up Description & Name",
      field: "partnerDescName",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
    {
      headerName: "Tie-up Date Of Association",
      field: "dateOfAssociation",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
    {
      headerName: "Tie-up Partnership",
      field: "partnership",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
    {
      headerName: "Tie-up Remark",
      field: "remarks",
      headerClass: "header",
      width: 180,
      flex: 1,
    },
  ];

  useEffect(() => {
    debugger;
    if (selectedUser && selectedUser.companyAddresses) {
      setCompanyAddress(selectedUser.companyAddresses);
    }
    if (selectedUser && selectedUser.contactPersons) {
      setContactRowData(selectedUser.contactPersons);
    }
    if (selectedUser && selectedUser.productManufactures) {
      setProductRowData(selectedUser.productManufactures);
    }
    if (selectedUser && selectedUser.certificates) {
      setCertifiedRowData(selectedUser.certificates);
    }
    if (selectedUser && selectedUser.partnershipDetails) {
      setPartnershipRowData(selectedUser.partnershipDetails);
    }
  }, [selectedUser]);

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
    <Modal
      varient="center"
      title="Details"
      width="95vw"
      show={handleEdit}
      right="0"
    >
      <Modal.Body>
        <div className={BizClass.ticketHistoryDetail}>
          <div className={BizClass.TicketDetails}>
            <h5>Company Details</h5>
            <hr style={{ marginTop: "5px", borderTop: "#adacac" }} />
            <div className="CompanyAddress">
              <hr />

              <div className="companyAddressFrom">
                {CompanyAddress.length > 0 && (
                  <>
                    <div className="registeredOffice">
                      <label>
                        Registered Office Address<span>*</span>
                        <br />
                        <textarea
                          className="enterInput"
                          value={CompanyAddress[0]?.officeAddress || ""}
                        ></textarea>
                      </label>
                      <label>
                        Registered Office Telephone No<span>*</span>
                        <br />
                        <input
                          className="enterInput"
                          value={CompanyAddress[0]?.telephoneNo || ""}
                        />
                      </label>
                      <label>
                        Registered Office Fax No
                        <br />
                        <input
                          className="enterInput"
                          value={CompanyAddress[0]?.faxNo || ""}
                        />
                      </label>
                      <label>
                        Registered Office Email Id<span>*</span>
                        <br />
                        <input
                          className="enterInput"
                          value={CompanyAddress[0]?.emailId || ""}
                        />
                      </label>
                    </div>

                    <div className="vertical-divider"></div>
                    <div className="headOffice">
                      <label>
                        Head Office Address<span>*</span>
                        <br />
                        <textarea
                          className="enterInput"
                          value={CompanyAddress[1]?.officeAddress || ""}
                        ></textarea>
                      </label>
                      <label>
                        Head Office Fax No
                        <br />
                        <input
                          className="enterInput"
                          value={CompanyAddress[1]?.faxNo || ""}
                        />
                      </label>
                      <label>
                        Head Office Telephone No
                        <br />
                        <input
                          className="enterInput"
                          value={CompanyAddress[1]?.telephoneNo || ""}
                        />
                      </label>
                      <label>
                        Head Office Email Id
                        <br />
                        <input
                          className="enterInput"
                          value={CompanyAddress[1]?.emailId || ""}
                        />
                      </label>
                    </div>
                    <div className="vertical-divider"></div>
                    <div className="plant">
                      <label>
                        Plant Address<span>*</span>
                        <br />
                        <textarea
                          className="enterInput"
                          value={CompanyAddress[2]?.officeAddress || ""}
                        ></textarea>
                      </label>
                      <label>
                        Plant Fax No
                        <br />
                        <input
                          className="enterInput"
                          value={CompanyAddress[2]?.faxNo || ""}
                        />
                      </label>
                      <label>
                        Plant Telephone No
                        <br />
                        <input
                          className="enterInput"
                          value={CompanyAddress[2]?.telephoneNo || ""}
                        />
                      </label>
                      <label>
                        Plant Email Id
                        <br />
                        <input
                          className="enterInput"
                          value={CompanyAddress[2]?.emailId || ""}
                        />
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
            <hr />
            <table className={BizClass.table}>
              <tr>
                <td>
                  Company Certified:{" "}
                  <span className={BizClass.value}>
                    {selectedUser.companyName}
                  </span>
                </td>
                <td>
                  Bar Coding System:{" "}
                  <span className={BizClass.value}>
                    {selectedUser.isBarCode}
                  </span>
                </td>
                <td>
                  Year Of Bar-Coding:{" "}
                  <span className={BizClass.value}>
                    {selectedUser.barCodeYear}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  Plant Total Area(sq-mts):{" "}
                  <span className={BizClass.value}>
                    {selectedUser.totalArea}
                  </span>
                </td>
                <td>
                  Plant Total Covered Area(sq-mts):{" "}
                  <span className={BizClass.value}>
                    {selectedUser.totalCoveredArea}
                  </span>
                </td>
                <td>
                  Plant Connected Electrical Load(kva):{" "}
                  <span className={BizClass.value}>
                    {selectedUser.connectedElectricalLoad}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  Plant Alternate Source Of Electricity:{" "}
                  <span className={BizClass.value}>{selectedUser.aoasoec}</span>
                </td>
                <td>
                  Installed Capacity Per Annum(w.r.t BSL's Parts):{" "}
                  <span className={BizClass.value}>{selectedUser.icpa}</span>
                </td>
                <td>
                  Spare Capacity Available For BSL(in %):{" "}
                  <span className={BizClass.value}>{selectedUser.scafbsl}</span>
                </td>
              </tr>
              <tr>
                <td>
                  Mode Of Material Transport:{" "}
                  <span className={BizClass.value}>{selectedUser.momt}</span>
                </td>
                <td>
                  Details Of Plan:{" "}
                  <span className={BizClass.value}>
                    {selectedUser.detailsOfPlanTargetDate}
                  </span>
                </td>
                <td>
                  File Of Plan: <span className={BizClass.value}></span>
                </td>
              </tr>
            </table>
          </div>
          <div className={BizClass.CustomerDetails}>
            <h5>Contact Details</h5>
            <hr style={{ marginTop: "5px", borderTop: "#adacac" }} />
            <div className="ag-theme-alpine">
              <AgGridReact
                rowData={ContactRowData}
                columnDefs={ContactColumnDefs}
                pagination={false}
                paginationPageSize={10}
                onGridReady={onGridReady}
                defaultColDef={defaultColDef}
                domLayout="autoHeight"
              />
            </div>
          </div>
          <div className={BizClass.CustomerDetails}>
            <h5>Product Details</h5>
            <hr style={{ marginTop: "5px", borderTop: "#adacac" }} />
            <div className="ag-theme-alpine">
              <AgGridReact
                rowData={ProductRowData}
                columnDefs={ProductColumnDefs}
                pagination={false}
                paginationPageSize={10}
                onGridReady={onGridReady}
                defaultColDef={defaultColDef}
                domLayout="autoHeight"
              />
            </div>
          </div>

          <div className={BizClass.CustomerDetails}>
            <h5>Certified Agency Details</h5>
            <hr style={{ marginTop: "5px", borderTop: "#adacac" }} />
            <div className="ag-theme-alpine">
              <AgGridReact
                rowData={CertifiedRowData}
                columnDefs={CertifiedColumnDefs}
                pagination={false}
                paginationPageSize={10}
                onGridReady={onGridReady}
                defaultColDef={defaultColDef}
                domLayout="autoHeight"
              />
            </div>
          </div>

          <div className={BizClass.CustomerDetails}>
            <h5>Tie Up Details</h5>
            <hr style={{ marginTop: "5px", borderTop: "#adacac" }} />
            <div className="ag-theme-alpine">
              <AgGridReact
                rowData={partnershipRowData}
                columnDefs={partnershipColumnDefs}
                pagination={false}
                paginationPageSize={10}
                onGridReady={onGridReady}
                defaultColDef={defaultColDef}
                domLayout="autoHeight"
              />
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        {/* <Button type="button" varient="secondary" onClick={handleEdit}>
          OK
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
