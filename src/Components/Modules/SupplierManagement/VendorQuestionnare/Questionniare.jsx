import React, { useEffect, useState } from "react";
import "./Questionniare.css";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  addCompanyProfile,
  addFinancialDetails,
  addHRDetails,
  addTechnicalDetails,
  companyProfiles,
} from "../../Services/Method";
import { AlertMessage } from "../../../../Framework/Components/Widgets";

const Questionniare = () => {
  const navigate = useNavigate();
  const setAlertMessage = AlertMessage();

  const [formValues, setFormValues] = useState({
    txtName: "",
    txtDesignation: "",
    txtDate: null,
    txtCName: "",
    txtROAddress: "",
    txtROMobile: "",
    txtROFaxNo: "",
    txtROEmail: "",
    txtHOFaxNo: "",
    txtHeadOffice: "",
    txtHOTelNo: "",
    txtHOEmail: "",
    txtPlant: "",
    txtPlantFax: "",
    txtPlantTel: "",
    txtPlantEmail: "",
    txtPlantArea: "",
    txtPlantCoveredArea: "",
    txtCEL: "",
    txtAltrSource: "",
    txtInstalledCapicity: "",
    txtSpareCapicity: "",
    txtMaterialTransportMode: "Own",
    txtPlanDetail: "",
    txtGSTNo: "",
    txtTinNo: "",
    txtSalesTax: "",
    txtExciseRegNo: "",
    txtPANNo: "",
    txtTDSNo: "",
    txtPermanent: "",
    txtUnionised: "",
    txtNonUnionised: "",
    txtCasuals: "",
    txtManager: "",
    txtSupervisors: "",
    txtDegreeHolder: "",
    txtDiplomaHolder: "",
    txtOthers: "",
    txtProduction: "",
    txtDirect: "",
    txtDirectITI: "",
    txtDirectNITI: "",
    txtIndirect: "",
    txtIndirectITI: "",
    txtIndirectNITI: "",
    txtQA: "",
    txtAdministratio: "",
    txtWorkerUnion: "Yes",
    txtSettlement: "Yes",
    txtStrikeDetail: "",
    txtIRSituation: "",
    txtShiftsTimimng: "",
    txtAnnualTrainingPlan: "Yes",
    txtTrainingProgramPlan: "Internal",
    txtConductedLastYear: "",
    txtSubjectCovered: "",
    txtManagers: "",
    txtStaff: "",
    txtWorkmen: "",
    txtEquipSNo: "",
    txtEquipDescrption: "",
    txtEquipQty: "",
    txtEquipType: "",
    txtEquipRemark: "",
    txtInhouseSNo: "",
    txtInhouseDesc: "",
    txtInhouseQty: "",
    txtInhouseType: "",
    txtInhouseRemark: "",
    txtRDFacility: "yes",
    txtRawMatSNo: "",
    txtRawMatDesc: "",
    txtRawMatSource: "",
    txtRawMatRemarks: "",
    txtTracebility: "",
    txtSpecialFacility: "yes",
    txtRejectionMS: "yes",
    txtCustomerSatisfaction: "yes",
    txtHRCompanyProfileName: null,
    txtFDCompanyProfileName: null,
    txtTDCompanyProfileName: null,
  });

  const [standards, setStandards] = useState({
    ISISO: { checked: "yes", value: "" },
    ENBS: { checked: "yes", value: "" },
    JISJASO: { checked: "yes", value: "" },
    DIN: { checked: "yes", value: "" },
    Others: { checked: "yes", value: "" },
  });

  const handleRadioChange = (e, key) => {
    const { value } = e.target;
    setStandards((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        checked: value,
      },
    }));
  };

  // Handle text input change
  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setStandards((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        value,
      },
    }));
  };

  // Contact Person
  const [contacts, setContacts] = useState([
    { name: "", designation: "", officeContact: "", residenceContact: "" },
  ]);

  // Handle input field change
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newContacts = [...contacts];
    newContacts[index][name] = value;
    setContacts(newContacts);
  };

  // Add a new contact field set
  const handleAddContact = () => {
    setContacts([
      ...contacts,
      { name: "", designation: "", officeContact: "", residenceContact: "" },
    ]);
  };

  // Remove a contact field set
  const handleRemoveContact = (index) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
  };

  // Product Section
  const [productRows, setProductRows] = useState([
    { productName: "", mainCustomer: "", supplyYear: "", annualTurnover: "" },
  ]);

  const handleAddProductRow = () => {
    setProductRows([
      ...productRows,
      { productName: "", mainCustomer: "", supplyYear: "", annualTurnover: "" },
    ]);
  };

  const handleProductInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...productRows];
    updatedRows[index][name] = value;
    setProductRows(updatedRows);
  };

  const handleRemoveProductRow = (index) => {
    if (productRows.length > 1) {
      const updatedRows = productRows.filter((_, i) => i !== index);
      setProductRows(updatedRows);
    }
  };

  //Certification
  const [isCertified, setIsCertified] = useState("No"); // Default to "No"
  const [certificationRows, setCertificationRows] = useState([
    {
      qualitySystem: "",
      certifyingAgency: "",
      certificationYear: "",
      annualTurnover: "",
    },
  ]);

  const handleAddCertificationRow = () => {
    setCertificationRows([
      ...certificationRows,
      {
        qualitySystem: "",
        certifyingAgency: "",
        certificationYear: "",
        annualTurnover: "",
      },
    ]);
  };

  const handleCertificationInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...certificationRows];
    updatedRows[index][name] = value;
    setCertificationRows(updatedRows);
  };

  const handleCertificationStatusChange = (event) => {
    setIsCertified(event.target.value);
  };
  const handleRemoveCertificationRow = (index) => {
    if (certificationRows.length > 1) {
      const updatedRows = certificationRows.filter((_, i) => i !== index);
      setCertificationRows(updatedRows);
    }
  };

  //Barcode
  const [hasBarCoding, setHasBarCoding] = useState("No");
  const [establishmentYear, setEstablishmentYear] = useState("");

  const handleSelectChange = (event) => {
    setHasBarCoding(event.target.value);
    if (event.target.value === "No") {
      setEstablishmentYear("");
    }
  };

  //Partnership Tie Up
  const [partnershipRows, setPartnershipRows] = useState([
    { description: "", dateOfAssociation: null, partnership: "", remarks: "" },
  ]);

  const addNewPartnershipRow = () => {
    setPartnershipRows([
      ...partnershipRows,
      {
        description: "",
        dateOfAssociation: null,
        partnership: "",
        remarks: "",
      },
    ]);
  };

  const updatePartnershipRow = (index, event, field) => {
    const updatedRows = [...partnershipRows];

    if (field === "dateOfAssociation") {
      // If it's the DatePicker, directly set the date
      updatedRows[index].dateOfAssociation = event; // 'event' is a Date object here
    } else {
      // For normal inputs, update based on event.target.value
      const { name, value } = event.target;
      updatedRows[index][name] = value;
    }

    setPartnershipRows(updatedRows);
  };

  const handleRemovePartnershipRow = (index) => {
    if (partnershipRows.length > 1) {
      const updatedRows = partnershipRows.filter((_, i) => i !== index);
      setPartnershipRows(updatedRows);
    }
  };

  //Financial Details Define :

  const [bankersRows, setBankersRows] = useState([
    { bankName: "", address: "", telephoneNo: "" },
  ]);

  const addNewBankersRow = () => {
    setBankersRows([
      ...bankersRows,
      { bankName: "", address: "", telephoneNo: "" },
    ]);
  };

  const updateBankersRow = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...bankersRows];
    updatedRows[index][name] = value;
    setBankersRows(updatedRows);
  };
  const handleBankerRemoveRow = (index) => {
    if (bankersRows.length > 1) {
      const updatedRows = bankersRows.filter((_, i) => i !== index);
      setBankersRows(updatedRows);
    }
  };
  //turnover
  const [turnoverRows, setTurnoverRows] = useState([
    { customerName: "", turnover: "", remarks: "" },
  ]);

  const addNewTurnoverRow = () => {
    setTurnoverRows([
      ...turnoverRows,
      { customerName: "", turnover: "", remarks: "" },
    ]);
  };

  const updateTurnoverRow = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...turnoverRows];
    updatedRows[index][name] = value;
    setTurnoverRows(updatedRows);
  };
  const handleRemoveTurnoverRow = (index) => {
    if (turnoverRows.length > 1) {
      const updatedRows = turnoverRows.filter((_, i) => i !== index);
      setTurnoverRows(updatedRows);
    }
  };

  const [companyProfileList, setCompanyProfileList] = useState([]);
  const getCompanyProfile = async () => {
    debugger;
    try {
      const formdata = {
        supplierId: 8,
        supplierCode: "A10020",
      };
      const result = await companyProfiles(formdata);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.companyList &&
          result.response.responseData.companyList.length > 0
        ) {
          setCompanyProfileList(result.response.responseData.companyList);
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
        message: error.message,
      });
    }
  };

  const onClickSubmitForm = async () => {
    debugger;
    try {
      const formdata = {
        companyProfileId: 0,
        supplier: {
          supplierId: 0,
          supplierCode: "A10020",
          supplierType: "",
          supplierName: "",
          email: "",
          mobileNumber: "",
          address1: "",
          address2: "",
          address3: "",
          countryId: 0,
          countryName: "",
          stateId: 0,
          stateName: "",
          cityId: 0,
          cityName: "",
          district: "",
          pin: "",
          gstin: "",
          isActive: 0,
          uploadedBy: "",
        },
        vendorName: formValues.txtName,
        vendorDesignation: formValues.txtDesignation,
        vendorDate: formValues.txtDate,
        companyName: formValues.txtCName,
        companyAddresses: [
          {
            companyAddressId: 0,
            officeName: "RO",
            officeAddress: formValues.txtROAddress,
            telephoneNo: formValues.txtROMobile,
            faxNo: formValues.txtROFaxNo,
            emailId: formValues.txtROEmail,
          },
          {
            companyAddressId: 0,
            officeName: "HO",
            officeAddress: formValues.txtHeadOffice,
            telephoneNo: formValues.txtHOTelNo,
            faxNo: formValues.txtHOFaxNo,
            emailId: formValues.txtHOEmail,
          },
          {
            companyAddressId: 0,
            officeName: "Plant",
            officeAddress: formValues.txtPlant,
            telephoneNo: formValues.txtPlantTel,
            faxNo: formValues.txtPlantFax,
            emailId: formValues.txtPlantEmail,
          },
        ],
        contactPersons: contacts.map((contact) => ({
          contactPersonId: 0,
          personName: contact.name,
          designation: contact.designation,
          officeContactNo: contact.officeContact,
          residenceContactNo: contact.residenceContact,
        })),
        productManufactures: productRows.map((product) => ({
          productManId: 0,
          productName: product.productName,
          mainCustomer: product.mainCustomer,
          comOfSupply: product.supplyYear,
          annualTurnOver: product.annualTurnover,
        })),
        isCompanyCertified: isCertified,
        certificates: certificationRows.map((certificate) => ({
          certificateId: 0,
          nameOfQualitySystem: certificate.qualitySystem,
          certifyingAgency: certificate.certifyingAgency,
          yearOfCertification: certificate.certificationYear,
          perAnnualTurnover: certificate.annualTurnover,
        })),
        isBarCode: hasBarCoding,
        barCodeYear: establishmentYear,
        totalArea: formValues.txtPlantArea,
        totalCoveredArea: formValues.txtPlantCoveredArea,
        connectedElectricalLoad: formValues.txtCEL,
        aoasoec: formValues.txtAltrSource,
        partnershipDetails: partnershipRows.map((partnership) => ({
          partnerId: 0,
          partnerDescName: partnership.description,
          dateOfAssociation: partnership.dateOfAssociation,
          partnership: partnership.partnership,
          remarks: partnership.remarks,
        })),
        icpa: formValues.txtInstalledCapicity,
        scafbsl: formValues.txtSpareCapicity,
        momt: formValues.txtMaterialTransportMode,
        detailsOfPlanTargetDate: formValues.txtPlanDetail,
        filePlanAttachment: "",
        filePlanName: "",
      };
      const result = await addCompanyProfile(formdata);
      if (result.response.successCode === 1) {
        setAlertMessage({
          type: "success",
          message: result.response.successMsg,
        });
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

  const onClickAddFinancialDetail = async () => {
    debugger;
    try {
      const formdata = {
        financialDetailsId: 0,
        companyProfileId:
          formValues.txtFDCompanyProfileName &&
          formValues.txtFDCompanyProfileName.companyProfileId
            ? formValues.txtFDCompanyProfileName.companyProfileId
            : "",
        supplier: {
          supplierId: 0,
          supplierCode: "A10020",
          supplierType: "",
          supplierName: "",
          email: "",
          mobileNumber: "",
          address1: "",
          address2: "",
          address3: "",
          countryId: 0,
          countryName: "",
          stateId: 0,
          stateName: "",
          cityId: 0,
          cityName: "",
          district: "",
          pin: "",
          gstin: "",
          isActive: 0,
          uploadedBy: "",
        },
        gstNo: formValues.txtGSTNo,
        tinNo: formValues.txtTinNo,
        salesTaxNo: formValues.txtSalesTax,
        exciseRegistrationNo: formValues.txtExciseRegNo,
        pan: formValues.txtPANNo,
        tdsAcctNo: formValues.txtTDSNo,
        bankDetails: bankersRows.map((banker) => ({
          bankDetailsId: 0,
          nameOfBank: banker.bankName,
          address: banker.address,
          telephoneNo: banker.telephoneNo,
        })),
        turnoverDetails: turnoverRows.map((turnover) => ({
          turnoverId: 0,
          nameOfCustomer: turnover.customerName,
          turnoverInRS: turnover.turnover,
          remarks: turnover.remarks,
        })),
      };
      const result = await addFinancialDetails(formdata);
      if (result.response.successCode === 1) {
        setAlertMessage({
          type: "success",
          message: result.response.successMsg,
        });
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

  const onClickAddHRDetails = async () => {
    debugger;
    try {
      const formdata = {
        hrDetailsId: 0,
        companyProfileId:
          formValues.txtHRCompanyProfileName &&
          formValues.txtHRCompanyProfileName.companyProfileId
            ? formValues.txtHRCompanyProfileName.companyProfileId
            : "",
        supplier: {
          supplierId: 0,
          supplierCode: "A10020",
          supplierType: "",
          supplierName: "",
          email: "",
          mobileNumber: "",
          address1: "",
          address2: "",
          address3: "",
          countryId: 0,
          countryName: "",
          stateId: 0,
          stateName: "",
          cityId: 0,
          cityName: "",
          district: "",
          pin: "",
          gstin: "",
          isActive: 0,
          uploadedBy: "",
        },
        permanentEmp: formValues.txtPermanent,
        unionisedEmp: formValues.txtUnionised,
        nonIonisedEmp: formValues.txtNonUnionised,
        casualEmp: formValues.txtCasuals,
        managersEmp: formValues.txtManager,
        supervisiorsEmp: formValues.txtSupervisors,
        degreeHoldersEmp: formValues.txtDegreeHolder,
        diplomaHoldersEmp: formValues.txtDiplomaHolder,
        othersEmp: formValues.txtOthers,
        productionEmp: formValues.txtProduction,
        directEmp: formValues.txtDirect,
        directITIEmp: formValues.txtDirectITI,
        directNONITIEmp: formValues.txtDirectNITI,
        indirectEmp: formValues.txtIndirect,
        indirectITIEmp: formValues.txtIndirectITI,
        indirectNONITIEmp: formValues.txtIndirectNITI,
        qaEmp: formValues.txtQA,
        administrationEmp: formValues.txtAdministratio,
        workersUnion: formValues.txtWorkerUnion,
        longTermSettleUnion: formValues.txtSettlement,
        strike: formValues.txtStrikeDetail,
        IRSituation: formValues.txtIRSituation,
        shiftTimings: formValues.txtShiftsTimimng,
        annualTrainingPlan: formValues.txtAnnualTrainingPlan,
        trainingProgBeingPlanned: formValues.txtTrainingProgramPlan,
        trainingConductedLastYear: formValues.txtConductedLastYear,
        foreignTrainingSubCovered: formValues.txtSubjectCovered,
        foreignTrainingManagers: formValues.txtManagers,
        foreignTrainingStaff: formValues.txtStaff,
        foreignTrainingWorkmen: formValues.txtWorkmen,
      };
      const result = await addHRDetails(formdata);
      if (result.response.successCode === 1) {
        setAlertMessage({
          type: "success",
          message: result.response.successMsg,
        });
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

  const onClickAddTechnicalDetails = async () => {
    debugger;
    try {
      const formdata = {
        technicalDetailsId: 0,
        companyProfileId:
          formValues.txtTDCompanyProfileName &&
          formValues.txtTDCompanyProfileName.companyProfileId
            ? formValues.txtTDCompanyProfileName.companyProfileId
            : "",
        supplier: {
          supplierId: 0,
          supplierCode: "A10020",
          supplierType: "",
          supplierName: "",
          email: "",
          mobileNumber: "",
          address1: "",
          address2: "",
          address3: "",
          countryId: 0,
          countryName: "",
          stateId: 0,
          stateName: "",
          cityId: 0,
          cityName: "",
          district: "",
          pin: "",
          gstin: "",
          isActive: 0,
          uploadedBy: "",
        },
        machineEquipSNo: formValues.txtEquipSNo,
        machineEquipDesc: formValues.txtEquipDescrption,
        machineEquipQty: formValues.txtEquipQty,
        machineEquipType: formValues.txtEquipType,
        machineEquipRemarks: formValues.txtEquipRemark,
        machineEquipAttachment: "",
        machineEquipFileName: "",
        inHouseSNo: formValues.txtInhouseSNo,
        inHouseDesc: formValues.txtInhouseDesc,
        inHouseQty: formValues.txtInhouseQty,
        inHouseType: formValues.txtInhouseType,
        inHouseRemarks: formValues.txtInhouseRemark,
        inHouseAttachment: "",
        inHouseFileName: "",
        rdFacility: formValues.txtRDFacility,
        rdAttachment: "",
        rdFileName: "",
        rawMaterialSNo: formValues.txtRawMatSNo,
        rawMaterialDesc: formValues.txtRawMatDesc,
        rawMaterialSource: formValues.txtRawMatSource,
        rawMaterialRemarks: formValues.txtRawMatRemarks,
        rawMaterialAttachment: "",
        rawMaterialFileName: "",
        tracebility: formValues.txtTracebility,
        reactionPlanNCAttachment: "",
        reactionPlanNCFileName: "",
        specialFacility: formValues.txtSpecialFacility,
        rejectionMontoringSystem: formValues.txtRejectionMS,
        customerSatisfactionIndex: formValues.txtCustomerSatisfaction,
        inspectionProcedureAttachment: "",
        inspectionProcedureFileName: "",
        iSISO: standards.ISISO.checked,
        iSISORemarks: standards.ISISO.value,
        eNBS: standards.ENBS.checked,
        eNBSRemarks: standards.ENBS.value,
        jISJASO: "No",
        jISJASORemarks: "NULL",
        dIN: "No",
        dINRemarks: "NULL",
        anyOthers: "No",
        anyOthersRemarks: "NULL",
      };
      const result = await addTechnicalDetails(formdata);
      if (result.response.successCode === 1) {
        setAlertMessage({
          type: "success",
          message: result.response.successMsg,
        });
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

  const updateSate = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    getCompanyProfile();
    console.log("useEffect", companyProfileList);
  }, []);

  useEffect(() => {
    console.log("Updated CompanyProfile List: ", companyProfileList);
  }, [companyProfileList]);

  useEffect(() => {
    console.log("Updated CompanyProfile List: ", companyProfileList);
  }, [companyProfileList]);

  return (
    <div className="QuestionniareContainer">
      <div className="headerWithBtn">
        <p>Questionniare</p>
        <button
          className="backBtn"
          onClick={() => navigate("/SupplierManagement/VendorQuestionnare")}
        >
          Back To List
        </button>
      </div>

      <div className="BharatSeatsHeader">BHARAT SEATS LIMITED</div>

      <div class="card card card-outline card-tabs">
        <div class="card-header p-0 pt-1 border-bottom-0">
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
            <div
              class="tab-pane fade active show"
              id="custom-tabs-three-home"
              role="tabpanel"
              aria-labelledby="custom-tabs-three-home-tab"
            >
              <div className="CompanyProfileForm">
                <div className="VendorIntro">
                  <p>Vendor Introduced by:</p>
                  <hr />
                  <div className="vendorIntroInputContainer">
                    <div className="name">
                      <label>Name </label>{" "}
                      <input
                        type="text"
                        placeholder="Name"
                        className="enterInput"
                        name="txtName"
                        value={formValues.txtName}
                        onChange={(e) => updateSate("txtName", e.target.value)}
                      />
                    </div>
                    <div className="designation">
                      <label>Designation </label>{" "}
                      <input
                        type="text"
                        placeholder="Designation"
                        className="enterInput"
                        name="txtDesignation"
                        value={formValues.txtDesignation}
                        onChange={(e) =>
                          updateSate("txtDesignation", e.target.value)
                        }
                      />
                    </div>
                    <div className="date">
                      <label>Date </label>{" "}
                      <DatePicker
                        placeholderText="Date"
                        className="enterInput"
                        name="txtDate"
                        selected={formValues.txtDate}
                        onChange={(e) => updateSate("txtDate", e)}
                      />
                    </div>
                  </div>
                </div>

                <div className="CompanyName">
                  <p>1.1 Name of Company:</p>
                  <hr />
                  <div className="innerCompanyName">
                    <label>Name </label>
                    <input
                      type="text"
                      placeholder="txtCName"
                      className="enterInput"
                      name="txtCName"
                      value={formValues.txtCName}
                      onChange={(e) => updateSate("txtCName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="CompanyAddress">
                  <p>1.2 Address of Company:</p>
                  <hr />

                  <div className="companyAddressFrom">
                    <div className="registeredOffice">
                      <label>
                        Registered Office<span>*</span>
                        <br />
                        <textarea
                          placeholder="Address"
                          className="enterInput"
                          name="txtROAddress"
                          value={formValues.txtROAddress}
                          onChange={(e) =>
                            updateSate("txtROAddress", e.target.value)
                          }
                        ></textarea>
                      </label>
                      <label>
                        Telephone No<span>*</span>
                        <br />
                        <input
                          type="number"
                          placeholder="Telephone No"
                          className="enterInput"
                          name="txtROMobile"
                          value={formValues.txtROMobile}
                          onChange={(e) =>
                            updateSate("txtROMobile", e.target.value)
                          }
                        />
                      </label>
                      <label>
                        Fax No
                        <br />
                        <input
                          placeholder="Fax No"
                          className="enterInput"
                          name="txtROFaxNo"
                          value={formValues.txtROFaxNo}
                          onChange={(e) =>
                            updateSate("txtROFaxNo", e.target.value)
                          }
                        />
                      </label>
                      <label>
                        Email Id<span>*</span>
                        <br />
                        <input
                          placeholder="Email Id"
                          className="enterInput"
                          name="txtROEmail"
                          value={formValues.txtROEmail}
                          onChange={(e) =>
                            updateSate("txtROEmail", e.target.value)
                          }
                        />
                      </label>
                    </div>
                    <div className="vertical-divider"></div>
                    <div className="headOffice">
                      <label>
                        Head Office<span>*</span>
                        <br />
                        <textarea
                          placeholder="Address"
                          className="enterInput"
                          name="txtHeadOffice"
                          value={formValues.txtHeadOffice}
                          onChange={(e) =>
                            updateSate("txtHeadOffice", e.target.value)
                          }
                        ></textarea>
                      </label>
                      <label>
                        Fax No
                        <br />
                        <input
                          placeholder="Fax No"
                          className="enterInput"
                          name="txtHOFaxNo"
                          value={formValues.txtHOFaxNo}
                          onChange={(e) =>
                            updateSate("txtHOFaxNo", e.target.value)
                          }
                        />
                      </label>
                      <label>
                        Telephone No
                        <br />
                        <input
                          placeholder="Fax No"
                          className="enterInput"
                          name="txtHOTelNo"
                          value={formValues.txtHOTelNo}
                          onChange={(e) =>
                            updateSate("txtHOTelNo", e.target.value)
                          }
                        />
                      </label>
                      <label>
                        Email Id
                        <br />
                        <input
                          placeholder="Email Id"
                          className="enterInput"
                          name="txtHOEmail"
                          value={formValues.txtHOEmail}
                          onChange={(e) =>
                            updateSate("txtHOEmail", e.target.value)
                          }
                        />
                      </label>
                    </div>
                    <div className="vertical-divider"></div>
                    <div className="plant">
                      <label>
                        Plant<span>*</span>
                        <br />
                        <textarea
                          placeholder="Address"
                          className="enterInput"
                          name="txtPlant"
                          value={formValues.txtPlant}
                          onChange={(e) =>
                            updateSate("txtPlant", e.target.value)
                          }
                        ></textarea>
                      </label>
                      <label>
                        Fax No
                        <br />
                        <input
                          placeholder="Fax No"
                          className="enterInput"
                          name="txtPlantFax"
                          value={formValues.txtPlantFax}
                          onChange={(e) =>
                            updateSate("txtPlantFax", e.target.value)
                          }
                        />
                      </label>
                      <label>
                        Telephone No
                        <br />
                        <input
                          placeholder="TelePhone No"
                          className="enterInput"
                          name="txtPlantTel"
                          value={formValues.txtPlantTel}
                          onChange={(e) =>
                            updateSate("txtPlantTel", e.target.value)
                          }
                        />
                      </label>
                      <label>
                        Email Id
                        <br />
                        <input
                          placeholder="Email Id"
                          className="enterInput"
                          name="txtPlantEmail"
                          value={formValues.txtPlantEmail}
                          onChange={(e) =>
                            updateSate("txtPlantEmail", e.target.value)
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="ContactPerson">
                  <p>1.3 Contact Person:</p>
                  <hr />

                  <div className="ContactPersonForm">
                    {contacts.map((contact, index) => (
                      <div key={index} className="contactRow">
                        <div className="inputField">
                          <label>
                            Name<span>*</span>
                            <br />
                            <input
                              type="text"
                              name="name"
                              value={contact.name}
                              placeholder="Name"
                              className="enterInput"
                              onChange={(e) => handleChange(index, e)}
                            />
                          </label>
                        </div>

                        <div className="inputField">
                          <label>
                            Designation<span>*</span>
                            <br />
                            <input
                              type="text"
                              name="designation"
                              value={contact.designation}
                              placeholder="Designation"
                              className="enterInput"
                              onChange={(e) => handleChange(index, e)}
                            />
                          </label>
                        </div>

                        <div className="inputField">
                          <label>
                            Office Contact Number
                            <br />
                            <input
                              type="number"
                              name="officeContact"
                              value={contact.officeContact}
                              placeholder="Office Contact Number"
                              className="enterInput"
                              onChange={(e) => handleChange(index, e)}
                            />
                          </label>
                        </div>

                        <div className="inputField">
                          <label>
                            Residence Contact Number
                            <br />
                            <input
                              type="number"
                              name="residenceContact"
                              value={contact.residenceContact}
                              placeholder="Residence Contact Number"
                              className="enterInput"
                              onChange={(e) => handleChange(index, e)}
                            />
                          </label>
                        </div>

                        {/* Remove Button */}
                        {index > 0 && (
                          <i
                            className="fas fa-times removeIcon"
                            onClick={() => handleRemoveContact(index)}
                            style={{
                              cursor: "pointer",
                              color: "#ff4d4d",
                              fontSize: "20px",
                              marginLeft: "-5px",
                              marginTop: "30px",
                            }}
                            title="Remove"
                          ></i>
                        )}
                      </div>
                    ))}

                    {/* Add Button */}
                    <button
                      type="button"
                      className="addNewButton"
                      onClick={handleAddContact}
                    >
                      Add More
                    </button>
                  </div>
                </div>

                <div className="ManufacturedProducts">
                  <p>1.4 Products manufactured by Company :</p>
                  <hr />

                  <div className="ManufacturedForm">
                    {productRows.map((row, index) => (
                      <div key={index} className="productRow">
                        <div className="inputField">
                          <label>
                            Name of Product<span>*</span>
                            <br />
                            <input
                              type="text"
                              name="productName"
                              placeholder="Name of Product"
                              className="enterInput"
                              value={row.productName}
                              onChange={(e) =>
                                handleProductInputChange(index, e)
                              }
                            />
                          </label>
                        </div>

                        <div className="inputField">
                          <label>
                            Main Customer (to whom you supply)
                            <br />
                            <input
                              type="text"
                              name="mainCustomer"
                              placeholder="Main Customer"
                              className="enterInput"
                              value={row.mainCustomer}
                              onChange={(e) =>
                                handleProductInputChange(index, e)
                              }
                            />
                          </label>
                        </div>

                        <div className="inputField">
                          <label>
                            Commencement of Supply (year)
                            <br />
                            <input
                              type="text"
                              name="supplyYear"
                              placeholder="Supply Year"
                              className="enterInput"
                              value={row.supplyYear}
                              onChange={(e) =>
                                handleProductInputChange(index, e)
                              }
                            />
                          </label>
                        </div>

                        <div className="inputField">
                          <label>
                            % of Annual Turnover
                            <br />
                            <input
                              type="text"
                              name="annualTurnover"
                              placeholder="% of Annual Turnover"
                              className="enterInput"
                              value={row.annualTurnover}
                              onChange={(e) =>
                                handleProductInputChange(index, e)
                              }
                            />
                          </label>
                        </div>
                        {index > 0 && (
                          <i
                            className="fas fa-times removeIcon"
                            onClick={() => handleRemoveProductRow(index)}
                            style={{
                              cursor: "pointer",
                              color: "#ff4d4d",
                              fontSize: "20px",
                              marginLeft: "-5px",
                              marginTop: "30px",
                            }}
                            title="Remove"
                          ></i>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="addNewButton"
                    onClick={handleAddProductRow}
                  >
                    Add New
                  </button>
                </div>

                <div className="CertificateDetails">
                  <p>
                    1.5 Certification Details (Please attach copies of
                    certificates):
                  </p>
                  <hr />
                  <div className="CertificationHeader">
                    <h6>
                      Is your company certified for ISO / QS / TS / TPM / Any
                      other Quality Systems? (If yes, furnish the below
                      details):
                    </h6>
                    <select
                      value={isCertified}
                      onChange={handleCertificationStatusChange}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <br />
                  {isCertified === "Yes" && (
                    <div className="CertificationForm">
                      {certificationRows.map((row, index) => (
                        <div key={index} className="certificationRow">
                          <div className="inputField">
                            <label>
                              Name of Quality Systems{" "}
                              <span>(If yes in above option, then *)</span>
                              <br />
                              <input
                                type="text"
                                name="qualitySystem"
                                placeholder="Name of Quality Systems"
                                className="enterInput"
                                value={row.qualitySystem}
                                onChange={(e) =>
                                  handleCertificationInputChange(index, e)
                                }
                              />
                            </label>
                          </div>

                          <div className="inputField">
                            <label>
                              Certifying Agency{" "}
                              <span>(If yes in above option, then *)</span>
                              <br />
                              <input
                                type="text"
                                name="certifyingAgency"
                                placeholder="Certifying Agency"
                                className="enterInput"
                                value={row.certifyingAgency}
                                onChange={(e) =>
                                  handleCertificationInputChange(index, e)
                                }
                              />
                            </label>
                          </div>

                          <div className="inputField">
                            <label>
                              Year of Certification{" "}
                              <span>(If yes in above option, then *)</span>
                              <br />
                              <input
                                type="text"
                                name="certificationYear"
                                placeholder="Year of Certification"
                                className="enterInput"
                                value={row.certificationYear}
                                onChange={(e) =>
                                  handleCertificationInputChange(index, e)
                                }
                              />
                            </label>
                          </div>

                          <div className="inputField">
                            <label>
                              % of Annual Turn Over{" "}
                              <span>(If yes in above option, then *)</span>
                              <br />
                              <input
                                type="text"
                                name="annualTurnover"
                                placeholder="% of Annual Turn Over"
                                className="enterInput"
                                value={row.annualTurnover}
                                onChange={(e) =>
                                  handleCertificationInputChange(index, e)
                                }
                              />
                            </label>
                          </div>
                          {index > 0 && (
                            <i
                              className="fas fa-times removeIcon"
                              onClick={() =>
                                handleRemoveCertificationRow(index)
                              }
                              style={{
                                cursor: "pointer",
                                color: "#ff4d4d",
                                fontSize: "20px",
                                marginLeft: "-5px",
                                marginTop: "55px",
                              }}
                              title="Remove"
                            ></i>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        className="addNewButton"
                        onClick={handleAddCertificationRow}
                      >
                        Add New Certification
                      </button>
                    </div>
                  )}
                </div>

                <div className="BarCodingDetails">
                  <div className="BarCodingHeader">
                    <p>
                      1.6 Do you have a Bar-coding System for Material Supply?
                      (If yes, since which year):
                    </p>
                    <select value={hasBarCoding} onChange={handleSelectChange}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <br />
                  <hr />

                  {/* Conditionally render the input field based on selection */}
                  {hasBarCoding === "Yes" && (
                    <div className="YearBarcodingForm">
                      <div className="yearForBarCoding">
                        <label>
                          Establishment Year of Bar-coding
                          <br />
                          <span>(If yes in above option, then *)</span>
                          <br />
                          <input
                            type="number"
                            placeholder="Establishment Year of Bar-coding"
                            className="enterInput"
                            value={establishmentYear}
                            onChange={(e) =>
                              setEstablishmentYear(e.target.value)
                            }
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="PlantDetail">
                  <p>1.7 Detail of Plant :</p>
                  <hr />
                  <div className="PlantDetilInputForm">
                    <div className="totalArea">
                      <label>Total Area (sq-mts)</label>
                      <input
                        type="number"
                        placeholder="Total Area (sq-mts)"
                        className="enterInput"
                        name="txtPlantArea"
                        value={formValues.txtPlantArea}
                        onChange={(e) => {
                          updateSate("txtPlantArea", e.target.value);
                        }}
                      />
                    </div>
                    <div className="TotalCoveredArea">
                      <label>Total Covered Area (sq-mts)</label>
                      <input
                        type="number"
                        placeholder="Total Covered Area (sq-mts)"
                        className="enterInput"
                        name="txtPlantCoveredArea"
                        value={formValues.txtPlantCoveredArea}
                        onChange={(e) => {
                          updateSate("txtPlantCoveredArea", e.target.value);
                        }}
                      />
                    </div>
                    <div className="ConnectedElectricalLoad">
                      <label>Connected Electrical Load (Kva)</label>
                      <input
                        type="number"
                        placeholder="Connected Electrical Load (Kva)"
                        className="enterInput"
                        name="txtCEL"
                        value={formValues.txtCEL}
                        onChange={(e) => {
                          updateSate("txtCEL", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="alternateSource">
                    <label>
                      Availability of alternate source of Electricity (In-house)
                      & Capacity (Kva)
                    </label>
                    <br />
                    <input
                      type="text"
                      placeholder="Availability of alternate source of Electricity (In-house) & Capacity (Kva)"
                      className="enterInput "
                      name="txtAltrSource"
                      value={formValues.txtAltrSource}
                      onChange={(e) => {
                        updateSate("txtAltrSource", e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="PartnerShipTieUp">
                  <p>
                    1.8 Partnership / Joint-venture / foreign collaboration /
                    technical Tie-up :
                  </p>
                  <hr />

                  <div className="partnerShipForm">
                    {partnershipRows.map((row, index) => (
                      <div key={index} className="partnerRow">
                        <div className="inputField">
                          <label>
                            Description & Name
                            <br />
                            <input
                              type="text"
                              name="description"
                              placeholder="Description & Name"
                              className="enterInput"
                              value={row.description}
                              onChange={(e) => updatePartnershipRow(index, e)}
                            />
                          </label>
                        </div>

                        <div className="inputField">
                          <label>
                            Date of Association
                            <br />
                            <DatePicker
                              placeholderText="Date of Association"
                              className="enterInput"
                              name="dateOfAssociation"
                              selected={row.dateOfAssociation}
                              onChange={(e) =>
                                updatePartnershipRow(
                                  index,
                                  e,
                                  "dateOfAssociation"
                                )
                              }
                            />
                          </label>
                        </div>

                        <div className="inputField">
                          <label>
                            Partnership
                            <br />
                            <input
                              type="text"
                              name="partnership"
                              placeholder="Partnership"
                              className="enterInput"
                              value={row.partnership}
                              onChange={(e) => updatePartnershipRow(index, e)}
                            />
                          </label>
                        </div>

                        <div className="inputField">
                          <label>
                            Remarks
                            <br />
                            <input
                              type="text"
                              name="remarks"
                              placeholder="Remarks"
                              className="enterInput"
                              value={row.remarks}
                              onChange={(e) => updatePartnershipRow(index, e)}
                            />
                          </label>
                        </div>
                        {index > 0 && (
                          <i
                            className="fas fa-times removeIcon"
                            onClick={() => handleRemovePartnershipRow(index)}
                            style={{
                              cursor: "pointer",
                              color: "#ff4d4d",
                              fontSize: "20px",
                              marginLeft: "5px",
                              marginTop: "30px",
                            }}
                            title="Remove"
                          ></i>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="addNewButton"
                    onClick={addNewPartnershipRow}
                  >
                    Add New
                  </button>
                </div>

                <div className="otherDetails">
                  <p>1.9 Other Details :</p>
                  <hr />
                  <div className="OtherDetailForm">
                    <div className="installedCapacity">
                      <label>
                        Installed Capacity per annum (w.r.t BSL's Parts)
                        <span>*</span>
                      </label>
                      <br />
                      <input
                        type="number"
                        placeholder="Installed Capacity per annum (w.r.t BSL's Parts)"
                        className="enterInput"
                        name="txtInstalledCapicity"
                        value={formValues.txtInstalledCapicity}
                        onChange={(e) => {
                          updateSate("txtInstalledCapicity", e.target.value);
                        }}
                      />
                    </div>
                    <div className="spareCapacity">
                      <label>
                        Spare Capacity available for BSL (in %)<span>*</span>
                      </label>
                      <br />
                      <input
                        type="number"
                        placeholder="Spare Capacity available for BSL (in %)"
                        className="enterInput"
                        name="txtSpareCapicity"
                        value={formValues.txtSpareCapicity}
                        onChange={(e) => {
                          updateSate("txtSpareCapicity", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="MaterialTransportMode">
                  <p>1.10 Mode of Material Transport :</p>
                  <select
                    name="txtMaterialTransportMode"
                    value={formValues.txtMaterialTransportMode}
                    onChange={(e) =>
                      updateSate("txtMaterialTransportMode", e.target.value)
                    }
                  >
                    <option value="Own">Own</option>
                    <option value="Hired">Hired</option>
                  </select>
                </div>

                <div className="futureExpansions">
                  <p>1.11 Future Expansion Plans :</p>
                  <hr />
                  <div className="futureExpansionsForm">
                    <div className="planDetails">
                      <label>
                        Details of Plan with Target Date (Please give in
                        separate sheet)
                        <span>*</span>
                      </label>
                      <br />
                      <input
                        type="text"
                        placeholder="Details of Plan with Target Date (Please give in separate sheet)"
                        className="enterInput"
                        name="txtPlanDetail"
                        value={formValues.txtPlanDetail}
                        onChange={(e) => {
                          updateSate("txtPlanDetail", e.target.value);
                        }}
                      />
                    </div>
                    <div className="attachFile">
                      <label>Attach file of Plan</label>
                      <br />
                      <input type="file" className="enterInput" />
                    </div>
                  </div>
                </div>

                <div className="submitBtn1">
                  <button onClick={onClickSubmitForm}>SUBMIT</button>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="custom-tabs-three-profile"
              role="tabpanel"
              aria-labelledby="custom-tabs-three-profile-tab"
            >
              <div className="FinancialDetailForm">
                <div className="selectCompany">
                  <p>Company's Profile</p>
                  <select
                    name="txtFDCompanyProfileName"
                    onChange={(e) =>
                      updateSate("txtFDCompanyProfileName", e.target.value)
                    }
                    value={formValues.txtFDCompanyProfileName}
                  >
                    <option value="">--Select--</option>
                    {companyProfileList.map((company, index) => (
                      <option key={index} value={company.companyName}>
                        {company.companyName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="attachBalanceSheet">
                  <p>2.1 Attach Balance Sheet for last 3 years :</p>
                  <hr />
                  <div className="attachFile">
                    <label>Attach file of Plan</label>
                    <br />
                    <input type="file" className="enterInput" />
                  </div>
                </div>

                <div className="CompanyBankersDetails">
                  <p>2.2 Company's Bankers Details:</p>
                  <hr />

                  <div className="bankerDetailsForm">
                    {bankersRows.map((row, index) => (
                      <div key={index} className="bankerRow">
                        <div className="inputField">
                          <label>
                            Name Of Bank<span>*</span>
                            <br />
                            <input
                              type="text"
                              name="bankName"
                              placeholder="Name Of Bank"
                              className="enterInput"
                              value={row.bankName}
                              onChange={(e) => updateBankersRow(index, e)}
                            />
                          </label>
                        </div>

                        <div className="inputField">
                          <label>
                            Address<span>*</span>
                            <br />
                            <input
                              type="text"
                              name="address"
                              placeholder="Address"
                              className="enterInput"
                              value={row.address}
                              onChange={(e) => updateBankersRow(index, e)}
                            />
                          </label>
                        </div>

                        <div className="inputField">
                          <label>
                            Telephone No<span>*</span>
                            <br />
                            <input
                              type="text"
                              name="telephoneNo"
                              placeholder="Telephone No"
                              className="enterInput"
                              value={row.telephoneNo}
                              onChange={(e) => updateBankersRow(index, e)}
                            />
                          </label>
                        </div>
                        {index > 0 && (
                          <i
                            className="fas fa-times removeIcon"
                            onClick={() => handleBankerRemoveRow(index)}
                            style={{
                              cursor: "pointer",
                              color: "#ff4d4d",
                              fontSize: "20px",
                              marginLeft: "10px",
                              marginTop: "32px",
                            }}
                            title="Remove"
                          ></i>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="addNewButton"
                    onClick={addNewBankersRow}
                  >
                    Add New
                  </button>
                </div>

                <div className="turnOverDetails">
                  <p>2.3 Turnover Details of Previous Year:</p>
                  <hr />

                  <div className="turnOverDetailsForm">
                    {turnoverRows.map((row, index) => (
                      <div key={index} className="turnoverRow">
                        <div className="inputField">
                          <label>
                            Name of Customer<span>*</span>
                            <br />
                            <input
                              type="text"
                              name="customerName"
                              placeholder="Name of Customer"
                              className="enterInput"
                              value={row.customerName}
                              onChange={(e) => updateTurnoverRow(index, e)}
                            />
                          </label>
                        </div>

                        <div className="inputField">
                          <label>
                            Turnover (in Rs. Lacs)<span>*</span>
                            <br />
                            <input
                              type="text"
                              name="turnover"
                              placeholder="Turnover"
                              className="enterInput"
                              value={row.turnover}
                              onChange={(e) => updateTurnoverRow(index, e)}
                            />
                          </label>
                        </div>

                        <div className="inputField">
                          <label>
                            Remarks
                            <br />
                            <input
                              type="text"
                              name="remarks"
                              placeholder="Remarks"
                              className="enterInput"
                              value={row.remarks}
                              onChange={(e) => updateTurnoverRow(index, e)}
                            />
                          </label>
                        </div>
                        {index > 0 && (
                          <i
                            className="fas fa-times removeIcon"
                            onClick={() => handleRemoveTurnoverRow(index)}
                            style={{
                              cursor: "pointer",
                              color: "#ff4d4d",
                              fontSize: "20px",
                              marginLeft: "10px",
                              marginTop: "32px",
                            }}
                            title="Remove"
                          ></i>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="addNewButton"
                    onClick={addNewTurnoverRow}
                  >
                    Add New
                  </button>
                </div>

                <div className="GSTNo">
                  <p>2.4 GST No.</p>
                  <input
                    type="text"
                    placeholder="GST No."
                    name="txtGSTNo"
                    value={formValues.txtGSTNo}
                    onChange={(e) => updateSate("txtGSTNo", e.target.value)}
                  />
                </div>
                <div className="TINNo">
                  <p>2.5 TIN No.</p>
                  <input
                    type="text"
                    placeholder="GST NO."
                    name="txtTinNo"
                    value={formValues.txtTinNo}
                    onChange={(e) => updateSate("txtTinNo", e.target.value)}
                  />
                </div>
                <div className="SalesTax">
                  <p>2.6 Sales Tax No.</p>
                  <input
                    type="text"
                    placeholder="Sales Tax No."
                    name="txtSalesTax"
                    value={formValues.txtSalesTax}
                    onChange={(e) => updateSate("txtSalesTax", e.target.value)}
                  />
                </div>
                <div className="ExciseRegistrationNo">
                  <p>2.7 Excise Registration No.</p>
                  <input
                    type="text"
                    placeholder="Excise Registration No."
                    name="txtExciseRegNo"
                    value={formValues.txtExciseRegNo}
                    onChange={(e) =>
                      updateSate("txtExciseRegNo", e.target.value)
                    }
                  />
                </div>
                <div className="PermanentAccountNo">
                  <p>
                    2.8 Permanent A/C No. (PAN)<span>*</span>
                  </p>
                  <input
                    type="text"
                    placeholder="Permanent A/C No. (PAN)"
                    name="txtPANNo"
                    value={formValues.txtPANNo}
                    onChange={(e) => updateSate("txtPANNo", e.target.value)}
                  />
                </div>
                <div className="TDSAccountNo">
                  <p>2.9 TDS A/C No.</p>
                  <input
                    type="text"
                    placeholder="TDS A/C No."
                    name="txtTDSNo"
                    value={formValues.txtTDSNo}
                    onChange={(e) => updateSate("txtTDSNo", e.target.value)}
                  />
                </div>

                <div className="submitBtn1">
                  <button onClick={() => onClickAddFinancialDetail()}>
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="custom-tabs-three-messages"
              role="tabpanel"
              aria-labelledby="custom-tabs-three-messages-tab"
            >
              <div className="HRDetails">
                <div className="selectCompany">
                  <p>Company's Profile</p>
                  <select
                    name="txtHRCompanyProfileName"
                    onChange={(e) =>
                      updateSate("txtHRCompanyProfileName", e.target.value)
                    }
                    value={formValues.txtHRCompanyProfileName}
                  >
                    <option value="">--Select--</option>
                    {companyProfileList.map((company, index) => (
                      <option key={index} value={company.companyName}>
                        {company.companyName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="TtlEmployee">
                  <p>3.1 Total Employees:</p>
                  <hr />
                  <div className="EmpInputContainer">
                    <div className="row1">
                      <div className="permanent">
                        <label>Permanent </label>
                        <br />
                        <input
                          type="number"
                          placeholder="Permanent"
                          className="enterInput"
                          name="txtPermanent"
                          value={formValues.txtPermanent}
                          onChange={(e) =>
                            updateSate("txtPermanent", e.target.value)
                          }
                        />
                      </div>

                      <div className="unionised">
                        <label>Unionised</label>
                        <br />
                        <input
                          type="number"
                          placeholder="Unionised"
                          className="enterInput"
                          name="txtUnionised"
                          value={formValues.txtUnionised}
                          onChange={(e) =>
                            updateSate("txtUnionised", e.target.value)
                          }
                        />
                      </div>

                      <div className="nonUnionised">
                        <label>Non-Unionised</label>
                        <br />
                        <input
                          type="number"
                          placeholder="Non-Unionised"
                          className="enterInput"
                          name="txtNonUnionised"
                          value={formValues.txtNonUnionised}
                          onChange={(e) =>
                            updateSate("txtNonUnionised", e.target.value)
                          }
                        />
                      </div>

                      <div className="Casuals">
                        <label>Casuals</label>
                        <br />
                        <input
                          type="number"
                          placeholder="Casuals"
                          className="enterInput"
                          name="txtCasuals"
                          value={formValues.txtCasuals}
                          onChange={(e) =>
                            updateSate("txtCasuals", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="row2">
                      <div className="manager">
                        <label>(i) Managers: &nbsp;</label>
                        <input
                          type="number"
                          placeholder="managers"
                          className="enterInput"
                          name="txtManager"
                          value={formValues.txtManager}
                          onChange={(e) =>
                            updateSate("txtManager", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="row3">
                      <div className="Supervisors">
                        <label>(ii) Supervisors </label>
                        <br />
                        <input
                          type="number"
                          placeholder="Supervisors"
                          className="enterInput"
                          name="txtSupervisors"
                          value={formValues.txtSupervisors}
                          onChange={(e) =>
                            updateSate("txtSupervisors", e.target.value)
                          }
                        />
                      </div>

                      <div className="degreeHolders">
                        <label>Degree Holders</label>
                        <br />
                        <input
                          type="number"
                          placeholder="Degree Holders"
                          className="enterInput"
                          name="txtDegreeHolder"
                          value={formValues.txtDegreeHolder}
                          onChange={(e) =>
                            updateSate("txtDegreeHolder", e.target.value)
                          }
                        />
                      </div>
                      <div className="diplomaHolders">
                        <label>Diploma Holders</label>
                        <br />
                        <input
                          type="number"
                          placeholder="Diploma Holders"
                          className="enterInput"
                          name="txtDiplomaHolder"
                          value={formValues.txtDiplomaHolder}
                          onChange={(e) =>
                            updateSate("txtDiplomaHolder", e.target.value)
                          }
                        />
                      </div>
                      <div className="Others">
                        <label>Others</label>
                        <br />
                        <input
                          type="number"
                          placeholder="Others"
                          className="enterInput"
                          name="txtOthers"
                          value={formValues.txtOthers}
                          onChange={(e) =>
                            updateSate("txtOthers", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="row4">
                      <div className="Production">
                        <label>(iii) Production</label>
                        <br />
                        <input
                          type="number"
                          placeholder="Production"
                          className="enterInput"
                          name="txtProduction"
                          value={formValues.txtProduction}
                          onChange={(e) =>
                            updateSate("txtProduction", e.target.value)
                          }
                        />
                      </div>

                      <div className="direct">
                        <label>(a) Direct</label>
                        <br />
                        <input
                          type="number"
                          placeholder="Direct"
                          className="enterInput"
                          name="txtDirect"
                          value={formValues.txtDirect}
                          onChange={(e) =>
                            updateSate("txtDirect", e.target.value)
                          }
                        />
                        <div className="subCat">
                          <div className="iti">
                            <label>ITI</label>
                            <br />
                            <input
                              type="number"
                              placeholder="ITI"
                              className="enterSubCatInput"
                              name="txtDirectITI"
                              value={formValues.txtDirectITI}
                              onChange={(e) =>
                                updateSate("txtDirectITI", e.target.value)
                              }
                            />
                          </div>
                          <div className="non-iti">
                            <label>Non-ITI</label>
                            <br />
                            <input
                              type="number"
                              placeholder="Non-ITI"
                              className="enterSubCatInput"
                              name="txtDirectNITI"
                              value={formValues.txtDirectNITI}
                              onChange={(e) =>
                                updateSate("txtDirectNITI", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="indirect">
                        <label>(b) Indirect</label>
                        <br />
                        <input
                          type="number"
                          placeholder="Indirect"
                          className="enterInput"
                          name="txtIndirect"
                          value={formValues.txtIndirect}
                          onChange={(e) =>
                            updateSate("txtIndirect", e.target.value)
                          }
                        />
                        <div className="subCat">
                          <div className="iti">
                            <label>ITI</label>
                            <br />
                            <input
                              type="number"
                              placeholder="ITI"
                              className="enterSubCatInput"
                              name="txtIndirectITI"
                              value={formValues.txtIndirectITI}
                              onChange={(e) =>
                                updateSate("txtIndirectITI", e.target.value)
                              }
                            />
                          </div>
                          <div className="non-iti">
                            <label>Non-ITI</label>
                            <br />
                            <input
                              type="number"
                              placeholder="Non-ITI"
                              className="enterSubCatInput"
                              name="txtIndirectNITI"
                              value={formValues.txtIndirectNITI}
                              onChange={(e) =>
                                updateSate("txtIndirectNITI", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row5">
                      <div className="qa">
                        <label>(iv) QA &nbsp; </label>
                        <input
                          type="text"
                          placeholder="QA"
                          className="enterInput"
                          name="txtQA"
                          value={formValues.txtQA}
                          onChange={(e) => updateSate("txtQA", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row6">
                      <div className="administratio">
                        <label>(v) Administratio &nbsp;</label>
                        <input
                          type="number"
                          placeholder="Administratio"
                          className="enterInput"
                          name="txtAdministratio"
                          value={formValues.txtAdministratio}
                          onChange={(e) =>
                            updateSate("txtAdministratio", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="WorkerUnion">
                  <p>
                    3.2 Do you have a worker's union? (If yes, give affiliation
                    details in separate sheets):&nbsp;
                  </p>
                  <select
                    name="txtWorkerUnion"
                    value={formValues.txtWorkerUnion}
                    onChange={(e) =>
                      updateSate("txtWorkerUnion", e.target.value)
                    }
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="LongTermSettlement">
                  <p>
                    3.3 Is there any long-term settlement with the union? (Give
                    Date of Expiry):&nbsp;
                  </p>
                  <select
                    name="txtSettlement"
                    value={formValues.txtSettlement}
                    onChange={(e) =>
                      updateSate("txtSettlement", e.target.value)
                    }
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="StrikeDetails">
                  <p>
                    3.4 Give details of Strike, Lock out, go slow, etc, during
                    the last 3 years, if any:
                  </p>
                  <input
                    type="text"
                    className="enterInput"
                    name="txtStrikeDetail"
                    value={formValues.txtStrikeDetail}
                    onChange={(e) =>
                      updateSate("txtStrikeDetail", e.target.value)
                    }
                  />
                </div>
                <div className="IRSituation">
                  <p>3.5 How is the IR situation?:</p>
                  <input
                    type="text"
                    className="enterInput"
                    name="txtIRSituation"
                    value={formValues.txtIRSituation}
                    onChange={(e) =>
                      updateSate("txtIRSituation", e.target.value)
                    }
                  />
                </div>
                <div className="shiftsTimings">
                  <p>3.6 Number of shifts timings:</p>
                  <input
                    type="number"
                    className="enterInput"
                    name="txtShiftsTimimng"
                    value={formValues.txtShiftsTimimng}
                    onChange={(e) =>
                      updateSate("txtShiftsTimimng", e.target.value)
                    }
                  />
                </div>

                <div className="TrainingProgramsDetails">
                  <p>
                    3.7 Details of Training Programmes: <span>*</span>
                  </p>
                  <div className="TrainingProgrammes">
                    <div className="row1">
                      <div className="annualTrainingPlan">
                        <label>(a) Annual Training Plan? :</label>
                        <br />
                        <select
                          name="txtAnnualTrainingPlan"
                          value={formValues.txtAnnualTrainingPlan}
                          onChange={(e) =>
                            updateSate("txtAnnualTrainingPlan", e.target.value)
                          }
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>

                      <div className="TrainingProgrammesbeingplanned">
                        <label>
                          (b) Training Programmes being planned (yearly Target):
                        </label>
                        <br />
                        <select
                          name="txtTrainingProgramPlan"
                          value={formValues.txtTrainingProgramPlan}
                          onChange={(e) =>
                            updateSate("txtTrainingProgramPlan", e.target.value)
                          }
                        >
                          <option value="Internal">Internal</option>
                          <option value="External">External</option>
                        </select>
                      </div>

                      <div className="TrainingConductedLastyear">
                        <label>
                          (c) Training Conducted Last year (in NOS):
                        </label>
                        <br />
                        <input
                          type="number"
                          placeholder="Training Conducted Last year (in NOS):"
                          className="enterInput"
                          name="txtConductedLastYear"
                          value={formValues.txtConductedLastYear}
                          onChange={(e) =>
                            updateSate("txtConductedLastYear", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="row2">
                      <div className="foreignTrainingPlan">
                        <label>(d) Foreign Training, If any:</label>
                        <br />
                        <div className="subCovered">
                          <label>Subject Covered:</label>
                          <br />
                          <input
                            type="number"
                            placeholder="Training Conducted Last year (in NOS):"
                            className="enterInput"
                            name="txtSubjectCovered"
                            value={formValues.txtSubjectCovered}
                            onChange={(e) =>
                              updateSate("txtSubjectCovered", e.target.value)
                            }
                          />
                          <br />
                        </div>

                        <div className="msw">
                          <div className="manager">
                            <label>Managers:</label>
                            <br />
                            <input
                              className="enterInput"
                              type="text"
                              placeholder="Managers"
                              name="txtManagers"
                              value={formValues.txtManagers}
                              onChange={(e) =>
                                updateSate("txtManagers", e.target.value)
                              }
                            />
                          </div>
                          <div className="staff">
                            <label>Staff:</label>
                            <br />
                            <input
                              className="enterInput"
                              type="text"
                              placeholder="Staff"
                              name="txtStaff"
                              value={formValues.txtStaff}
                              onChange={(e) =>
                                updateSate("txtStaff", e.target.value)
                              }
                            />
                          </div>
                          <div className="workmen">
                            <label>Workmen:</label>
                            <br />
                            <input
                              className="enterInput"
                              type="text"
                              placeholder="Workmen"
                              name="txtWorkmen"
                              value={formValues.txtWorkmen}
                              onChange={(e) =>
                                updateSate("txtWorkmen", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submitBtn1">
                  <button onClick={() => onClickAddHRDetails()}>SUBMIT</button>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="custom-tabs-three-settings"
              role="tabpanel"
              aria-labelledby="custom-tabs-three-settings-tab"
            >
              <div className="TechnicalDetails">
                <div className="selectCompany">
                  <p>Company's Profile</p>
                  <select
                    name="txtTDCompanyProfileName"
                    onChange={(e) =>
                      updateSate("txtTDCompanyProfileName", e.target.value)
                    }
                    value={formValues.txtTDCompanyProfileName}
                  >
                    <option value="">--Select--</option>
                    {companyProfileList.map((company, index) => (
                      <option key={index} value={company.companyName}>
                        {company.companyName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="MachinaryDetails">
                  <p>
                    4.1 Details of Machinary & Equipment: <span>*</span>
                  </p>
                  <div className="machinaryDetailrow1">
                    <div className="sno">
                      <label>
                        S.No.<span>*</span>{" "}
                      </label>
                      <br />
                      <input
                        type="number"
                        placeholder="S.No."
                        className="enterInput"
                        name="txtEquipSNo"
                        value={formValues.txtEquipSNo}
                        onChange={(e) =>
                          updateSate("txtEquipSNo", e.target.value)
                        }
                      />
                    </div>

                    <div className="DescriptionMake">
                      <label>
                        Description & Make<span>*</span>
                      </label>
                      <br />
                      <input
                        type="text"
                        placeholder="Description & Make"
                        className="enterInput"
                        name="txtEquipDescrption"
                        value={formValues.txtEquipDescrption}
                        onChange={(e) =>
                          updateSate("txtEquipDescrption", e.target.value)
                        }
                      />
                    </div>

                    <div className="Qty">
                      <label>
                        Qty.<span>*</span>
                      </label>
                      <br />
                      <input
                        type="number"
                        placeholder="Qty"
                        className="enterInput"
                        name="txtEquipQty"
                        value={formValues.txtEquipQty}
                        onChange={(e) =>
                          updateSate("txtEquipQty", e.target.value)
                        }
                      />
                    </div>

                    <div className="Type">
                      <label>
                        Type (GPM/SPM/CNC, etc.)<span>*</span>
                      </label>
                      <br />
                      <input
                        type="text"
                        placeholder="Type"
                        className="enterInput"
                        name="txtEquipType"
                        value={formValues.txtEquipType}
                        onChange={(e) =>
                          updateSate("txtEquipType", e.target.value)
                        }
                      />
                    </div>

                    <div className="Remarks">
                      <label>Remarks / Purpose</label>
                      <br />
                      <input
                        type="text"
                        placeholder="Remarks"
                        className="enterInput"
                        name="txtEquipRemark"
                        value={formValues.txtEquipRemark}
                        onChange={(e) =>
                          updateSate("txtEquipRemark", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="machinaryDetailrow2">
                    <div className="attachFile">
                      <label>
                        Details of other Machinary & Equipment (Attach separate
                        sheet):
                      </label>
                      <br />
                      <input type="file" className="enterInput" />
                    </div>
                  </div>
                </div>
                <div className="InhouseTestingDetails">
                  <p>
                    4.2 Details of In-house Testing & Inspection Facilities:
                    (Attach separate sheet for outside facilities currently in
                    use,(in same format)): <span>*</span>
                  </p>
                  <div className="InhouseTestingDetailsrow1">
                    <div className="sno">
                      <label>
                        S.No.<span>*</span>{" "}
                      </label>
                      <br />
                      <input
                        type="number"
                        placeholder="S.No."
                        className="enterInput"
                        name="txtInhouseSNo"
                        value={formValues.txtInhouseSNo}
                        onChange={(e) =>
                          updateSate("txtInhouseSNo", e.target.value)
                        }
                      />
                    </div>

                    <div className="DescriptionMake">
                      <label>
                        Description & Make<span>*</span>
                      </label>
                      <br />
                      <input
                        type="text"
                        placeholder="Description & Make"
                        className="enterInput"
                        name="txtInhouseDesc"
                        value={formValues.txtInhouseDesc}
                        onChange={(e) =>
                          updateSate("txtInhouseDesc", e.target.value)
                        }
                      />
                    </div>

                    <div className="Qty">
                      <label>
                        Qty.<span>*</span>
                      </label>
                      <br />
                      <input
                        type="number"
                        placeholder="Qty"
                        className="enterInput"
                        name="txtInhouseQty"
                        value={formValues.txtInhouseQty}
                        onChange={(e) =>
                          updateSate("txtInhouseQty", e.target.value)
                        }
                      />
                    </div>

                    <div className="Type">
                      <label>
                        Type (GPM/SPM/CNC, etc.)<span>*</span>
                      </label>
                      <br />
                      <input
                        type="text"
                        placeholder="Type"
                        className="enterInput"
                        name="txtInhouseType"
                        value={formValues.txtInhouseType}
                        onChange={(e) =>
                          updateSate("txtInhouseType", e.target.value)
                        }
                      />
                    </div>

                    <div className="Remarks">
                      <label>Remarks / Purpose</label>
                      <br />
                      <input
                        type="text"
                        placeholder="Remarks"
                        className="enterInput"
                        name="txtInhouseRemark"
                        value={formValues.txtInhouseRemark}
                        onChange={(e) =>
                          updateSate("txtInhouseRemark", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="InhouseTestingDetailsrow2">
                    <div className="attachFile">
                      <label>
                        Details of other In-house Testing & Inspection
                        Facilities (Attach separate sheet):
                      </label>
                      <br />
                      <input type="file" className="enterInput" />
                    </div>
                  </div>
                </div>
                <div className="RDFacilities">
                  <p>
                    4.3 R&D Facilities: (If yes, attach separate sheet giving
                    details, e.g. CAD/CAM/CAE facilities, trained Man-power,
                    etc. Also furnish details of products, designed & developed
                    during last two years):
                  </p>
                  <div className="InhouseTestingDetailsrow1">
                    <select
                      name="txtRDFacility"
                      value={formValues.txtRDFacility}
                      onChange={(e) =>
                        updateSate("txtRDFacility", e.target.value)
                      }
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="InhouseTestingDetailsrow2">
                    <div className="attachFile">
                      <label>
                        Details of R&D Facilities (Attach separate sheet):
                      </label>
                      <br />
                      <input type="file" className="enterInput" />
                    </div>
                  </div>
                </div>
                <div className="RawMaterialSource">
                  <p>4.4 Source of Raw Material (BSL related products):</p>
                  <div className="RawMaterialSourcerow1">
                    <div className="sno">
                      <label>S.No.</label>
                      <br />
                      <input
                        type="number"
                        placeholder="S.No."
                        className="enterInput"
                        name="txtRawMatSNo"
                        value={formValues.txtRawMatSNo}
                        onChange={(e) =>
                          updateSate("txtRawMatSNo", e.target.value)
                        }
                      />
                    </div>

                    <div className="DescriptionMake">
                      <label>Description</label>
                      <br />
                      <input
                        type="text"
                        placeholder="Description & Make"
                        className="enterInput"
                        name="txtRawMatDesc"
                        value={formValues.txtRawMatDesc}
                        onChange={(e) =>
                          updateSate("txtRawMatDesc", e.target.value)
                        }
                      />
                    </div>

                    <div className="Source">
                      <label>Source</label>
                      <br />
                      <input
                        type="text"
                        placeholder="Source"
                        className="enterInput"
                        name="txtRawMatSource"
                        value={formValues.txtRawMatSource}
                        onChange={(e) =>
                          updateSate("txtRawMatSource", e.target.value)
                        }
                      />
                    </div>

                    <div className="Remarks">
                      <label>Remarks</label>
                      <br />
                      <input
                        type="text"
                        placeholder="Remarks"
                        className="enterInput"
                        name="txtRawMatRemarks"
                        value={formValues.txtRawMatRemarks}
                        onChange={(e) =>
                          updateSate("txtRawMatRemarks", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="RawMaterialSourcerow2">
                    <div className="attachFile">
                      <label>
                        Details of other Raw Material (Attach separate sheet):
                      </label>
                      <br />
                      <input type="file" className="enterInput" />
                    </div>
                  </div>
                </div>
                <div className="tracebility">
                  <p>
                    4.5 Tracebility: (Kindly define your product Traceability
                    System in separat sheet)
                  </p>
                  <input
                    type="text"
                    className="enterInput"
                    name="txtTracebility"
                    value={formValues.txtTracebility}
                    onChange={(e) =>
                      updateSate("txtTracebility", e.target.value)
                    }
                  />
                </div>
                <div className="ReactionPlan">
                  <p>
                    4.6 Describe the Reaction Plan for Non-conforming products
                    (Attach separate sheet) <span>*</span>
                  </p>

                  <div className="attachFile">
                    <label>
                      Details of other Machinary & Equipment (Attach separate
                      sheet):
                    </label>
                    <br />
                    <input type="file" className="enterInput" />
                  </div>
                </div>
                <div className="AnySpecialProcess">
                  <p>4.7 Any Special Process / Facility:</p>

                  <select
                    name="txtSpecialFacility"
                    value={formValues.txtSpecialFacility}
                    onChange={(e) =>
                      updateSate("txtSpecialFacility", e.target.value)
                    }
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="RejectionMonitoringSystem">
                  <p>
                    4.8 Rejection Monitoring System: <span>*</span>
                  </p>

                  <select
                    name="txtRejectionMS"
                    value={formValues.txtRejectionMS}
                    onChange={(e) =>
                      updateSate("txtRejectionMS", e.target.value)
                    }
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="CustomerSatisfactionIndex">
                  <p>4.9 Customer Satisfaction Index / Trend:</p>

                  <select
                    name="txtCustomerSatisfaction"
                    value={formValues.txtCustomerSatisfaction}
                    onChange={(e) =>
                      updateSate("txtCustomerSatisfaction", e.target.value)
                    }
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="InspectionProcedures">
                  <p>
                    4.10 Give details of Inspection Procedures (Sampling,
                    Self-certification, etc.){" "}
                    <span className="mandatory">*</span>
                  </p>

                  <div className="attachFile">
                    <input type="file" className="enterInput" />
                  </div>
                </div>
                <div className="NationalStandards">
                  <p>4.11 Exposure to National / International Standards:</p>
                  <table className="tableForm">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Please Tick</th>
                        <th>Specify Nos. (which you are currently using)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* IS/ISO */}
                      <tr>
                        <td>
                          (a) IS/ISO<span className="mandatory">*</span>
                        </td>
                        <td>
                          Yes
                          <input
                            type="radio"
                            value="yes"
                            checked={standards.ISISO.checked === "yes"}
                            onChange={(e) => handleRadioChange(e, "ISISO")}
                          />{" "}
                          No
                          <input
                            type="radio"
                            value="no"
                            checked={standards.ISISO.checked === "no"}
                            onChange={(e) => handleRadioChange(e, "ISISO")}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="IS/ISO"
                            value={standards.ISISO.value}
                            onChange={(e) => handleInputChange(e, "ISISO")}
                            className="enterInput"
                            disabled={standards.ISISO.checked === "no"}
                          />
                        </td>
                      </tr>

                      {/* EN/BS */}
                      <tr>
                        <td>(b) EN/BS</td>
                        <td>
                          Yes
                          <input
                            type="radio"
                            value="yes"
                            checked={standards.ENBS.checked === "yes"}
                            onChange={(e) => handleRadioChange(e, "ENBS")}
                          />{" "}
                          No
                          <input
                            type="radio"
                            value="no"
                            checked={standards.ENBS.checked === "no"}
                            onChange={(e) => handleRadioChange(e, "ENBS")}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="EN/BS"
                            value={standards.ENBS.value}
                            onChange={(e) => handleInputChange(e, "ENBS")}
                            className="enterInput"
                            disabled={standards.ENBS.checked === "no"}
                          />
                        </td>
                      </tr>

                      {/* JIS/JASO */}
                      <tr>
                        <td>(c) JIS/JASO</td>
                        <td>
                          Yes
                          <input
                            type="radio"
                            value="yes"
                            checked={standards.JISJASO.checked === "yes"}
                            onChange={(e) => handleRadioChange(e, "JISJASO")}
                          />{" "}
                          No
                          <input
                            type="radio"
                            value="no"
                            checked={standards.JISJASO.checked === "no"}
                            onChange={(e) => handleRadioChange(e, "JISJASO")}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="JIS/JASO"
                            value={standards.JISJASO.value}
                            onChange={(e) => handleInputChange(e, "JISJASO")}
                            className="enterInput"
                            disabled={standards.JISJASO.checked === "no"}
                          />
                        </td>
                      </tr>

                      {/* DIN */}
                      <tr>
                        <td>(d) DIN</td>
                        <td>
                          Yes
                          <input
                            type="radio"
                            value="yes"
                            checked={standards.DIN.checked === "yes"}
                            onChange={(e) => handleRadioChange(e, "DIN")}
                          />{" "}
                          No
                          <input
                            type="radio"
                            value="no"
                            checked={standards.DIN.checked === "no"}
                            onChange={(e) => handleRadioChange(e, "DIN")}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="DIN"
                            value={standards.DIN.value}
                            onChange={(e) => handleInputChange(e, "DIN")}
                            className="enterInput"
                            disabled={standards.DIN.checked === "no"}
                          />
                        </td>
                      </tr>

                      {/* Any Others */}
                      <tr>
                        <td>(e) Any Others</td>
                        <td>
                          Yes
                          <input
                            type="radio"
                            value="yes"
                            checked={standards.Others.checked === "yes"}
                            onChange={(e) => handleRadioChange(e, "Others")}
                          />{" "}
                          No
                          <input
                            type="radio"
                            value="no"
                            checked={standards.Others.checked === "no"}
                            onChange={(e) => handleRadioChange(e, "Others")}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Any Others"
                            value={standards.Others.value}
                            onChange={(e) => handleInputChange(e, "Others")}
                            className="enterInput"
                            disabled={standards.Others.checked === "no"}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="submitBtn1">
                  <button onClick={() => onClickAddTechnicalDetails()}>
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionniare;
