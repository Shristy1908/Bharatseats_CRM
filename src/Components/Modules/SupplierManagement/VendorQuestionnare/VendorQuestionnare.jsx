import React, { useState, useRef, useMemo, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { AgGridReact } from "ag-grid-react";
import { FaDownload, FaCheck, FaEyeSlash, FaEye } from "react-icons/fa";
import "../../../../../node_modules/ag-grid-community/src/styles/ag-grid.scss";
import "../../../../../node_modules/ag-grid-community/src/styles/ag-theme-alpine/sass/ag-theme-alpine.scss";
import "./VendorQuestionnare.css";
import { useNavigate } from "react-router-dom";
import EditModal from "./Modal/EditModal";
import { vendorQuestionaire } from "../../Services/Method";
import { AlertMessage } from "../../../../Framework/Components/Widgets";
import FinancialModal from "./Modal/FinancialModal";
import HRModal from "./Modal/HRModal";

const VendorQuestionnare = () => {
  const setAlertMessage = AlertMessage();
  const navigate = useNavigate();
  const gridApiRef = useRef(null);
  const CustomButtonComponent = (params) => {
    return (
      <>
        <div className="action-buttons">
          <button
            className="action-button"
            title="Approve"
            onClick={() => handleApprove()}
          >
            <FaCheck />
          </button>
          <button
            className="action-button"
            title="Disable"
            onClick={() => handleDisable()}
          >
            <FaEyeSlash />
          </button>
          <button
            className="action-button"
            title="Download"
            onClick={() => handleDownload()}
          >
            <FaDownload />
          </button>
          <button
            className="action-button"
            title="View"
            onClick={() => handleEdit(params.data)}
          >
            <FaEye />
          </button>
        </div>
      </>
    );
  };

  const handleDownload = () => {
    alert("Download Successfully");
  };

  const handleApprove = (data) => {
    console.log("Approve clicked for", data);
  };
  const handleDisable = (data) => {
    alert(`You Can't Change`);
  };

  // Company's Profile Data

  const [CmpnyProfileRowData, setCmpnyProfileRowData] = useState([]);
  const getCompanyProfileData = async () => {
    try {
      const formdata = {
        dataOf: "COMPANY_PROFILE",
        supplierId: 8,
        supplierCode: "A10020",
      };
      const result = await vendorQuestionaire(formdata);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.data &&
          result.response.responseData.data.length > 0
        ) {
          setCmpnyProfileRowData(result.response.responseData.data);
        } else {
          setAlertMessage({
            type: "success",
            message: result.response.successMsg,
          });
        }
      }
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: error.message,
      });
    }
  };

  const CmpnyProfileColumnDefs = [
    {
      headerName: "Sr. No.",
      field: "SrNo",
      valueGetter: (params) => params.node.rowIndex + 1,
      headerClass: "header",
      width: 100,
    },
    {
      headerName: "Supplier Code",
      field: "supplier.supplierCode",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "Supplier Name",
      field: "supplier.supplierName",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "Action/Status",
      field: "action",
      headerClass: "header",
      width: 230,
      cellRenderer: CustomButtonComponent,
    },

    {
      headerName: "Vendor Intro Name",
      field: "vendorName",
      headerClass: "header",
      width: 180,
    },
    {
      headerName: "Vendor Intro Designation",
      field: "vendorDesignation",
      headerClass: "header",
      width: 210,
    },
    {
      headerName: "Vendor Intro Date",
      field: "vendorDate",
      headerClass: "header",
      width: 190,
    },
    {
      headerName: "Name Of Company",
      field: "companyName",
      headerClass: "header",
      width: 190,
    },
  ];

  const [selectedUser, setSelectedUser] = useState(null);
  const [editModal, setEditModal] = useState(false);

  const handleEdit = (data) => {
    debugger;
    if (data) {
      setSelectedUser(data);
    }
    setEditModal(!editModal);
  };

  // Financial Details Data

  const [FinancialDetailsRowData, setFinancialDetailsRowData] = useState([]);

  const getFinancialDetailsData = async () => {
    try {
      const formdata = {
        dataOf: "FINANCIAL_DETAILS",
        supplierId: 8,
        supplierCode: "A10020",
      };
      const result = await vendorQuestionaire(formdata);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.data &&
          result.response.responseData.data.length > 0
        ) {
          setFinancialDetailsRowData(result.response.responseData.data);
        } else {
          setAlertMessage({
            type: "success",
            message: result.response.successMsg,
          });
        }
      }
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: error.message,
      });
    }
  };

  const [selectedFinancialDetail, setSelectedFinancialDetail] = useState(null);
  const [financialModal, setFinancialModal] = useState(false);

  const handleFinancial = (data) => {
    if (data) {
      setSelectedFinancialDetail(data);
    }
    setFinancialModal(!financialModal);
  };

  const FinancialDetailsColumnDefs = [
    {
      headerName: "Sr. No.",
      valueGetter: (params) => params.node.rowIndex + 1,
      headerClass: "header",
      width: 100,
    },
    {
      headerName: "Supplier Code",
      field: "supplier.supplierCode",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "Supplier Name",
      field: "supplier.supplierName",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "Balance Sheet",
      field: "balanceSheet",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "Action",
      field: "action",
      headerClass: "header",
      width: 150,
      flex: 1,
      cellRendererFramework: (params) => (
        <button
          className="action-button"
          title="View"
          onClick={() => handleFinancial(params.data)}
        >
          <FaEye />
        </button>
      ),
    },
  ];

  // Human Resources Details Data

  const [HrRowData, setHrRowData] = useState([]);

  const [selectedHRDetail, setSelectedHRDetail] = useState(null);
  const [hrModal, setHrModal] = useState(false);

  const getHRDetailsData = async () => {
    try {
      const formdata = {
        dataOf: "HR_DETAILS",
        supplierId: 8,
        supplierCode: "A10020",
      };
      const result = await vendorQuestionaire(formdata);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.data &&
          result.response.responseData.data.length > 0
        ) {
          setHrRowData(result.response.responseData.data);
        } else {
          setAlertMessage({
            type: "success",
            message: result.response.successMsg,
          });
        }
      }
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: error.message,
      });
    }
  };

  const handleHR = (data) => {
    if (data) {
      setSelectedHRDetail(data);
    }
    setHrModal(!hrModal);
  };

  const HRColumnDefs = [
    {
      headerName: "Sr. No.",
      field: "srNo",
      valueGetter: (params) => params.node.rowIndex + 1,
      headerClass: "header",
      width: 100,
      flex: 1,
    },
    {
      headerName: "Supplier Code",
      field: "supplier.supplierCode",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "Supplier Name",
      field: "supplier.supplierName",
      headerClass: "header",
      width: 150,
      flex: 1,
    },
    {
      headerName: "Action",
      field: "action",
      headerClass: "header",
      width: 150,
      flex: 1,
      cellRendererFramework: (params) => (
        <button
          className="action-button"
          title="View"
          onClick={() => handleHR(params.data)}
        >
          <FaEye />
        </button>
      ),
    },
  ];

  // Technical Details Data

  const [TechRowData, setTechRowData] = useState([
    {
      srNo: "1",
      supplierCode: "G10001",
      supplierName: "GANDHI SPRINGS-GURGAON",
      machineEquipmentSNo: "",
      machineEquipmentDescription: "",
      machineEquipmentQty: "",
      machineEquipmentType: "",
      machineEquipmentRemarks: "",
      otherMachineEquipmentFile: "",
      inhouseTestingSNo: "",
      inhouseTestingDescription: "",
      inhouseTestingQty: "",
      inhouseTestingReamrks: "",
      otherInhouseTestingFile: "",
      tracebility: "",
      reactionPlan: "",
      specialProcess: "",
      rejectionMonitoringSystem: "",
      customerSatisfactionIndex: "",
      inspectionProcedures: "",
      iso: "",
      isoRemarks: "",
      en: "",
      enRemarks: "",
      jis: "",
      jisRemarks: "",
      din: "",
      dinRemarks: "",
      anyOthers: "",
      anyOthersRemarks: "",
      action: "Approved",
    },
    {
      srNo: "1",
      supplierCode: "G10001",
      supplierName: "GANDHI SPRINGS-GURGAON",
      machineEquipmentSNo: "",
      machineEquipmentDescription: "",
      machineEquipmentQty: "",
      machineEquipmentType: "",
      machineEquipmentRemarks: "",
      otherMachineEquipmentFile: "",
      inhouseTestingSNo: "",
      inhouseTestingDescription: "",
      inhouseTestingQty: "",
      inhouseTestingReamrks: "",
      otherInhouseTestingFile: "",
      tracebility: "",
      reactionPlan: "",
      specialProcess: "",
      rejectionMonitoringSystem: "",
      customerSatisfactionIndex: "",
      inspectionProcedures: "",
      iso: "",
      isoRemarks: "",
      en: "",
      enRemarks: "",
      jis: "",
      jisRemarks: "",
      din: "",
      dinRemarks: "",
      anyOthers: "",
      anyOthersRemarks: "",
      action: "Approved",
    },
    {
      srNo: "1",
      supplierCode: "G10001",
      supplierName: "GANDHI SPRINGS-GURGAON",
      machineEquipmentSNo: "",
      machineEquipmentDescription: "",
      machineEquipmentQty: "",
      machineEquipmentType: "",
      machineEquipmentRemarks: "",
      otherMachineEquipmentFile: "",
      inhouseTestingSNo: "",
      inhouseTestingDescription: "",
      inhouseTestingQty: "",
      inhouseTestingReamrks: "",
      otherInhouseTestingFile: "",
      tracebility: "",
      reactionPlan: "",
      specialProcess: "",
      rejectionMonitoringSystem: "",
      customerSatisfactionIndex: "",
      inspectionProcedures: "",
      iso: "",
      isoRemarks: "",
      en: "",
      enRemarks: "",
      jis: "",
      jisRemarks: "",
      din: "",
      dinRemarks: "",
      anyOthers: "",
      anyOthersRemarks: "",
      action: "Approved",
    },
    {
      srNo: "1",
      supplierCode: "G10001",
      supplierName: "GANDHI SPRINGS-GURGAON",
      machineEquipmentSNo: "",
      machineEquipmentDescription: "",
      machineEquipmentQty: "",
      machineEquipmentType: "",
      machineEquipmentRemarks: "",
      otherMachineEquipmentFile: "",
      inhouseTestingSNo: "",
      inhouseTestingDescription: "",
      inhouseTestingQty: "",
      inhouseTestingReamrks: "",
      otherInhouseTestingFile: "",
      tracebility: "",
      reactionPlan: "",
      specialProcess: "",
      rejectionMonitoringSystem: "",
      customerSatisfactionIndex: "",
      inspectionProcedures: "",
      iso: "",
      isoRemarks: "",
      en: "",
      enRemarks: "",
      jis: "",
      jisRemarks: "",
      din: "",
      dinRemarks: "",
      anyOthers: "",
      anyOthersRemarks: "",
      action: "Approved",
    },
    {
      srNo: "1",
      supplierCode: "G10001",
      supplierName: "GANDHI SPRINGS-GURGAON",
      machineEquipmentSNo: "",
      machineEquipmentDescription: "",
      machineEquipmentQty: "",
      machineEquipmentType: "",
      machineEquipmentRemarks: "",
      otherMachineEquipmentFile: "",
      inhouseTestingSNo: "",
      inhouseTestingDescription: "",
      inhouseTestingQty: "",
      inhouseTestingReamrks: "",
      otherInhouseTestingFile: "",
      tracebility: "",
      reactionPlan: "",
      specialProcess: "",
      rejectionMonitoringSystem: "",
      customerSatisfactionIndex: "",
      inspectionProcedures: "",
      iso: "",
      isoRemarks: "",
      en: "",
      enRemarks: "",
      jis: "",
      jisRemarks: "",
      din: "",
      dinRemarks: "",
      anyOthers: "",
      anyOthersRemarks: "",
      action: "Approved",
    },
    {
      srNo: "1",
      supplierCode: "G10001",
      supplierName: "GANDHI SPRINGS-GURGAON",
      machineEquipmentSNo: "",
      machineEquipmentDescription: "",
      machineEquipmentQty: "",
      machineEquipmentType: "",
      machineEquipmentRemarks: "",
      otherMachineEquipmentFile: "",
      inhouseTestingSNo: "",
      inhouseTestingDescription: "",
      inhouseTestingQty: "",
      inhouseTestingReamrks: "",
      otherInhouseTestingFile: "",
      tracebility: "",
      reactionPlan: "",
      specialProcess: "",
      rejectionMonitoringSystem: "",
      customerSatisfactionIndex: "",
      inspectionProcedures: "",
      iso: "",
      isoRemarks: "",
      en: "",
      enRemarks: "",
      jis: "",
      jisRemarks: "",
      din: "",
      dinRemarks: "",
      anyOthers: "",
      anyOthersRemarks: "",
      action: "Approved",
    },
    {
      srNo: "1",
      supplierCode: "G10001",
      supplierName: "GANDHI SPRINGS-GURGAON",
      machineEquipmentSNo: "",
      machineEquipmentDescription: "",
      machineEquipmentQty: "",
      machineEquipmentType: "",
      machineEquipmentRemarks: "",
      otherMachineEquipmentFile: "",
      inhouseTestingSNo: "",
      inhouseTestingDescription: "",
      inhouseTestingQty: "",
      inhouseTestingReamrks: "",
      otherInhouseTestingFile: "",
      tracebility: "",
      reactionPlan: "",
      specialProcess: "",
      rejectionMonitoringSystem: "",
      customerSatisfactionIndex: "",
      inspectionProcedures: "",
      iso: "",
      isoRemarks: "",
      en: "",
      enRemarks: "",
      jis: "",
      jisRemarks: "",
      din: "",
      dinRemarks: "",
      anyOthers: "",
      anyOthersRemarks: "",
      action: "Approved",
    },
  ]);

  const TechColumnDefs = [
    {
      headerName: "Sr. No.",
      field: "srNo",
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
      width: 150,
    },
    {
      headerName: "Machine Equipment SNo",
      field: "machineEquipmentSNo",
      headerClass: "header",
      width: 200,
    },
    {
      headerName: "Machine Equipment Description",
      field: "machineEquipmentDescription",
      headerClass: "header",
      width: 250,
    },
    {
      headerName: "Machine Equipment Qty",
      field: "machineEquipmentQty",
      headerClass: "header",
      width: 200,
    },
    {
      headerName: "Machine Equipment Type",
      field: "machineEquipmentType",
      headerClass: "header",
      width: 210,
    },
    {
      headerName: "Machine Equipment Remarks",
      field: "machineEquipmentRemarks",
      headerClass: "header",
      width: 230,
    },
    {
      headerName: "Other Machine & Equipment File",
      field: "otherMachineEquipmentFile",
      headerClass: "header",
      width: 250,
    },
    {
      headerName: "Inhouse Testing SNo",
      field: "inhouseTestingSNo",
      headerClass: "header",
      width: 190,
    },
    {
      headerName: "Inhouse Testing Description",
      field: "inhouseTestingDescription",
      headerClass: "header",
      width: 230,
    },
    {
      headerName: "Inhouse Testing Qty",
      field: "inhouseTestingQty",
      headerClass: "header",
      width: 190,
    },
    {
      headerName: "Inhouse Testing Remarks",
      field: "inhouseTestingRemarks",
      headerClass: "header",
      width: 220,
    },
    {
      headerName: "Other Inhouse Testing File",
      field: "otherInhouseTestingFile",
      headerClass: "header",
      width: 220,
    },
    {
      headerName: "R&D Facility",
      field: "rdFacility",
      headerClass: "header",
      width: 160,
    },
    {
      headerName: "R&D File",
      field: "rdFile",
      headerClass: "header",
      width: 130,
    },
    {
      headerName: "Raw Material SNo",
      field: "rawMaterialSNo",
      headerClass: "header",
      width: 180,
    },
    {
      headerName: "Raw Material Description",
      field: "rawMaterialDescription",
      headerClass: "header",
      width: 210,
    },
    {
      headerName: "Raw Material Source",
      field: "rawMaterialSource",
      headerClass: "header",
      width: 200,
    },
    {
      headerName: "Raw Material Remarks",
      field: "rawMaterialRemarks",
      headerClass: "header",
      width: 200,
    },
    {
      headerName: "Other Raw Material File",
      field: "otherRawMaterialFile",
      headerClass: "header",
      width: 200,
    },
    {
      headerName: "Tracebility",
      field: "tracebility",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "Reaction Plan for Non-conforming products",
      field: "reactionPlan",
      headerClass: "header",
      width: 320,
    },
    {
      headerName: "Special Process / Facility",
      field: "specialProcess",
      headerClass: "header",
      width: 210,
    },
    {
      headerName: "Rejection Monitoring System",
      field: "rejectionMonitoringSystem",
      headerClass: "header",
      width: 230,
    },
    {
      headerName: "Customer Satisfaction Index / Trend",
      field: "customerSatisfactionIndex",
      headerClass: "header",
      width: 280,
    },
    {
      headerName: "Inspection Procedures",
      field: "inspectionProcedures",
      headerClass: "header",
      width: 200,
    },
    {
      headerName: "IS/ISO",
      field: "iso",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "IS/ISO Remarks",
      field: "isoRemarks",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "EN/BS",
      field: "en",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "EN/BS Remarks",
      field: "enRemarks",
      headerClass: "header",
      width: 190,
    },
    {
      headerName: "JIS/JASO",
      field: "jis",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "JIS/JASO Remarks",
      field: "jisRemarks",
      headerClass: "header",
      width: 180,
    },
    {
      headerName: "DIN",
      field: "din",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "DIN Remarks",
      field: "dinRemarks",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "Any Others",
      field: "anyOthers",
      headerClass: "header",
      width: 150,
    },
    {
      headerName: "Any Others Remarks",
      field: "anyOthersRemarks",
      headerClass: "header",
      width: 180,
    },
    {
      headerName: "Action/Status",
      field: "action",
      headerClass: "header",
      width: 180,
      cellRenderer: CustomButtonComponent,
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
    getCompanyProfileData();
    getFinancialDetailsData();
    getHRDetailsData();
  }, []);

  return (
    <>
      {editModal && (
        <EditModal handleEdit={handleEdit} selectedUser={selectedUser} />
      )}
      {financialModal && (
        <FinancialModal
          handleFinancial={handleFinancial}
          selectedFinancialDetail={selectedFinancialDetail}
        />
      )}
      {hrModal && (
        <HRModal handleHR={handleHR} selectedHRDetail={selectedHRDetail} />
      )}
      <div className="VQContainer">
        <div className="headerWithBtn">
          <p className="vendorTitle">
            Supplier Management - Vendor Questionnare
          </p>
          <button onClick={() => navigate("/SupplierManagement/Questionniare")}>
            ADD OR UPDATE (*until not approved)
          </button>
        </div>

        <div class="card card card-outline card-tabs">
          <div class="card-header cardHead p-0 pt-1 border-bottom-0">
            <ul class="nav nav-tabs" id="custom-tabs-three-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="custom-tabs-three-home-tab"
                  data-toggle="pill"
                  href="#custom-tabs-three-home"
                  role="tab"
                  aria-controls="custom-tabs-three-home"
                  aria-selected="true"
                >
                  Company's Profile
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="custom-tabs-three-profile-tab"
                  data-toggle="pill"
                  href="#custom-tabs-three-profile"
                  role="tab"
                  aria-controls="custom-tabs-three-profile"
                  aria-selected="false"
                >
                  Financial Details
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="custom-tabs-three-messages-tab"
                  data-toggle="pill"
                  href="#custom-tabs-three-messages"
                  role="tab"
                  aria-controls="custom-tabs-three-messages"
                  aria-selected="false"
                >
                  Human Resources Details
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="custom-tabs-three-settings-tab"
                  data-toggle="pill"
                  href="#custom-tabs-three-settings"
                  role="tab"
                  aria-controls="custom-tabs-three-settings"
                  aria-selected="false"
                >
                  Technical Details
                </a>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <div class="tab-content" id="custom-tabs-three-tabContent">
              {/* Company's Profile table Data */}

              <div
                class="tab-pane fade active show"
                id="custom-tabs-three-home"
                role="tabpanel"
                aria-labelledby="custom-tabs-three-home-tab"
              >
                <div className="CmpnyProfileTableContainer">
                  <div className="ag-theme-alpine ">
                    <AgGridReact
                      rowData={CmpnyProfileRowData}
                      columnDefs={CmpnyProfileColumnDefs}
                      pagination={true}
                      paginationPageSize={9}
                      onGridReady={onGridReady}
                      defaultColDef={defaultColDef}
                      domLayout="autoHeight"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Details table Data */}
              <div
                class="tab-pane fade"
                id="custom-tabs-three-profile"
                role="tabpanel"
                aria-labelledby="custom-tabs-three-profile-tab"
              >
                <div className="FinancialDetailsTableContainer">
                  <div className="ag-theme-alpine ">
                    <AgGridReact
                      rowData={FinancialDetailsRowData}
                      columnDefs={FinancialDetailsColumnDefs}
                      pagination={true}
                      paginationPageSize={9}
                      onGridReady={onGridReady}
                      defaultColDef={defaultColDef}
                      domLayout="autoHeight"
                    />
                  </div>
                </div>
              </div>

              {/* Human Resources Details table Data */}

              <div
                class="tab-pane fade"
                id="custom-tabs-three-messages"
                role="tabpanel"
                aria-labelledby="custom-tabs-three-messages-tab"
              >
                <div className="HRDetailsTableContainer">
                  <div className="ag-theme-alpine ">
                    <AgGridReact
                      rowData={HrRowData}
                      columnDefs={HRColumnDefs}
                      pagination={true}
                      paginationPageSize={9}
                      onGridReady={onGridReady}
                      defaultColDef={defaultColDef}
                      domLayout="autoHeight"
                    />
                  </div>
                </div>
              </div>

              {/* Technical Details table Data */}

              <div
                class="tab-pane fade"
                id="custom-tabs-three-settings"
                role="tabpanel"
                aria-labelledby="custom-tabs-three-settings-tab"
              >
                <div className="TechTableContainer">
                  <div className="ag-theme-alpine ">
                    <AgGridReact
                      rowData={TechRowData}
                      columnDefs={TechColumnDefs}
                      pagination={true}
                      paginationPageSize={9}
                      onGridReady={onGridReady}
                      defaultColDef={defaultColDef}
                      domLayout="autoHeight"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorQuestionnare;
