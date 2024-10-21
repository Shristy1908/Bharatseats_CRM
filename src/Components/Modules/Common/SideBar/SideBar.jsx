import React, { useState } from "react";
import log_web from "../../../../dist/img/bharat-seats-logo-brand.png";
import "../SideBar/SideBar.css";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();

  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const [isProfileManagementOpen, setIsProfileManagementOpen] = useState(false);
  const [isMasterManagementOpen, setIsMasterManagementOpen] = useState(false);
  const [isBuyerManagementOpen, setIsBuyerManagementOpen] = useState(false);
  const [isSupplierManagementOpen, setIsSupplierManagementOpen] =
    useState(false);
  const [isDeliveryManagementOpen, setIsDeliveryManagementOpen] =
    useState(false);
  const [isQualityManagementOpen, setIsQualityManagementOpen] = useState(false);
  const [isRnDManagementOpen, setIsRnDManagementOpen] = useState(false);
  const [isGeneralManagementOpen, setIsGeneralManagementOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState("");

  const toggleUserManagement = (e) => {
    e.preventDefault();
    setIsUserManagementOpen(!isUserManagementOpen);
  };
  const toggleProfileManagement = (e) => {
    debugger;
    onClickSubMenu(e);
    setIsProfileManagementOpen(!isProfileManagementOpen);
  };
  const toggleMasterManagement = (e) => {
    e.preventDefault();
    setIsMasterManagementOpen(!isMasterManagementOpen);
  };

  const toggleBuyerManagement = (e) => {
    e.preventDefault();
    setIsBuyerManagementOpen(!isBuyerManagementOpen);
  };

  const toggleSupplierManagement = (e) => {
    e.preventDefault();
    setIsSupplierManagementOpen(!isSupplierManagementOpen);
  };

  const toggleDeliveryManagement = (e) => {
    e.preventDefault();
    setIsDeliveryManagementOpen(!isDeliveryManagementOpen);
  };

  const toggleQualityManagement = (e) => {
    e.preventDefault();
    setIsQualityManagementOpen(!isQualityManagementOpen);
  };

  const toggleRnDManagement = (e) => {
    e.preventDefault();
    setIsRnDManagementOpen(!isRnDManagementOpen);
  };

  const toggleGeneralManagement = (e) => {
    e.preventDefault();
    setIsGeneralManagementOpen(!isGeneralManagementOpen);
  };

  const onClickSubMenu = (Type) => {
    setActiveSubMenu(Type);
    if (Type === "MUser") navigate("/UserManagement/ManageUser");
    else if (Type === "MRoles") navigate("/UserManagement/ManageRoles");
    else if (Type === "BAssociation")
      navigate("/UserManagement/BuyerAssociation");
    else if (Type === "ProfileManagement") navigate("/ProfileManagement");
    else if (Type === "Materials") navigate("/MasterManagement/Materials");
    else if (Type === "Vendors") navigate("/MasterManagement/Vendors");
    else if (Type === "Plants") navigate("/MasterManagement/Plants");
    else if (Type === "Cities") navigate("/MasterManagement/Cities");
    else if (Type === "Units") navigate("/MasterManagement/Units");
    else if (Type === "ManageSchedule")
      navigate("/BuyerManagement/ManageSchedule");
    else if (Type === "ManagePO") navigate("/BuyerManagement/ManagePO");
    else if (Type === "ManageInvoice")
      navigate("/BuyerManagement/ManageInvoice");
    else if (Type == "VendorQuestionnare")
      navigate("/SupplierManagement/VendorQuestionnare");
    else if (Type == "SupplierPackStandard")
      navigate("/SupplierManagement/SupplierPackingStatndard");
    else if (Type == "SupplierSourcingDeclaration")
      navigate("/SupplierManagement/SupplierSourcingDeclaration");
    else if (Type == "SupplierCapDeclaration")
      navigate("/SupplierManagement/SupplierCapacityDeclaration");
    else if (Type == "QualitySystemCertificate")
      navigate("/SupplierManagement/QualitySystemCertificate");
    else if (Type == "StockDeclarationReport")
      navigate("/SupplierManagement/StockDeclarationReport");
    else if (Type == "FOC") navigate("/DeliveryManagement/FOC");
    else if (Type == "FortnightPlan")
      navigate("/DeliveryManagement/FortnightPlan");
    else if (Type == "KitPlan") navigate("/DeliveryManagement/KitPlan");
    else if (Type == "PreDispatchInformation")
      navigate("/DeliveryManagement/PreDispatchInformation");
    else if (Type == "ScheduleVSDelivery")
      navigate("/DeliveryManagement/ScheduleVSDelivery");
    else if (Type == "VendorOverallRating")
      navigate("/QualityManagement/VendorOverallRating");
    else if (Type == "LineStoppage")
      navigate("/QualityManagement/LineStoppage");
    else if (Type == "MChangeSheet")
      navigate("/QualityManagement/MChangeSheet");
    else if (Type == "Warranty") navigate("/QualityManagement/Warranty");
    else if (Type == "PPM") navigate("/QualityManagement/PPM");
    else if (Type == "QualityManual")
      navigate("/QualityManagement/QualityManual");
    else if (Type == "MonthlyInspectionReport")
      navigate("/QualityManagement/MonthlyInspectionReport");
    else if (Type == "ECN") navigate("/R&D/ECN");
    else if (Type == "Calender") navigate("/Notifications/Calender");
    else if (Type == "Notification") navigate("/Notifications/Notification");
    else if (Type == "Help") navigate("/Notifications/Help");
  };

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <aside
      className="main-sidebar sidebar-dark-primary elevation-4"
      style={{ backgroundColor: "#e57401" }}
    >
      <a
        className="brand-link"
        onClick={goToHome}
        style={{ cursor: "pointer" }}
      >
        <img
          src={log_web}
          alt="Brand Logo"
          className="brand-image"
          style={{ opacity: "99", width: "150px" }}
        />
        <span className="Brandheading">Bharat Seats</span>
      </a>
      <div className="sidebar" id="sidebarcolor">
        <nav className="mt-2 text-white">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* User Management Section */}
            <li className="nav-item">
              <a className="nav-link" onClick={toggleUserManagement}>
                <i className="nav-icon fas fa-table"></i>
                <p>
                  User Management
                  <i
                    className={`fas ${
                      isUserManagementOpen ? "fa-angle-up" : "fa-angle-down"
                    } right`}
                  ></i>
                </p>
              </a>
              <ul
                className={`nav nav-treeview ${
                  isUserManagementOpen ? "show" : ""
                }`}
              >
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("MUser")}
                  >
                    <input
                      type="radio"
                      name="user-management"
                      checked={activeSubMenu === "MUser"}
                      onChange={() => onClickSubMenu("MUser")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Manage Users</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("MRoles")}
                  >
                    <input
                      type="radio"
                      name="user-management"
                      checked={activeSubMenu === "MRoles"}
                      onChange={() => onClickSubMenu("MRoles")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Manage Roles</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("BAssociation")}
                  >
                    <input
                      type="radio"
                      name="user-management"
                      checked={activeSubMenu === "BAssociation"}
                      onChange={() => onClickSubMenu("BAssociation")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Buyer Association</p>
                  </a>
                </li>
              </ul>
            </li>

            {/* Profile Management Section */}

            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => toggleProfileManagement("ProfileManagement")}
              >
                <i className="nav-icon fas fa-users"></i>
                <p>Profile Management</p>
              </a>
            </li>

            {/* Masters Management Section */}
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={toggleMasterManagement}>
                <i className="nav-icon fas fa-users"></i>
                <p>
                  Masters Management
                  <i
                    className={`fas ${
                      isMasterManagementOpen ? "fa-angle-up" : "fa-angle-down"
                    } right`}
                  ></i>
                </p>
              </a>
              <ul
                className={`nav nav-treeview ${
                  isMasterManagementOpen ? "show" : ""
                }`}
              >
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("Materials")}
                  >
                    <input
                      type="radio"
                      name="profile-management"
                      checked={activeSubMenu === "Materials"}
                      onChange={() => onClickSubMenu("Materials")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Materials</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("Vendors")}
                  >
                    <input
                      type="radio"
                      name="profile-management"
                      checked={activeSubMenu === "Vendors"}
                      onChange={() => onClickSubMenu("Vendors")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Supplier</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("Plants")}
                  >
                    <input
                      type="radio"
                      name="profile-management"
                      checked={activeSubMenu === "Plants"}
                      onChange={() => onClickSubMenu("Plants")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Plants</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("Cities")}
                  >
                    <input
                      type="radio"
                      name="profile-management"
                      checked={activeSubMenu === "Cities"}
                      onChange={() => onClickSubMenu("Cities")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Cities</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("Units")}
                  >
                    <input
                      type="radio"
                      name="profile-management"
                      checked={activeSubMenu === "Units"}
                      onChange={() => onClickSubMenu("Units")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Units</p>
                  </a>
                </li>
              </ul>
            </li>

            {/* Buyer Management Section */}
            <li className="nav-item">
              <a className="nav-link" onClick={toggleBuyerManagement}>
                <i className="nav-icon fas fa-shopping-cart"></i>
                <p>
                  Buyer Management
                  <i
                    className={`fas ${
                      isBuyerManagementOpen ? "fa-angle-up" : "fa-angle-down"
                    } right`}
                  ></i>
                </p>
              </a>
              <ul
                className={`nav nav-treeview ${
                  isBuyerManagementOpen ? "show" : ""
                }`}
              >
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("ManageSchedule")}
                  >
                    <input
                      type="radio"
                      name="buyer-management"
                      checked={activeSubMenu === "ManageSchedule"}
                      onChange={() => onClickSubMenu("ManageSchedule")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Manage Schedule</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("ManagePO")}
                  >
                    <input
                      type="radio"
                      name="buyer-management"
                      checked={activeSubMenu === "ManagePO"}
                      onChange={() => onClickSubMenu("ManagePO")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Manage PO</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("ManageInvoice")}
                  >
                    <input
                      type="radio"
                      name="buyer-management"
                      checked={activeSubMenu === "ManageInvoice"}
                      onChange={() => onClickSubMenu("ManageInvoice")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Manage Invoice</p>
                  </a>
                </li>
              </ul>
            </li>

            {/* Supplier Management Section */}
            <li className="nav-item">
              <a className="nav-link" onClick={toggleSupplierManagement}>
                <i className="nav-icon fas fa-truck"></i>
                <p>
                  Supplier Management
                  <i
                    className={`fas ${
                      isSupplierManagementOpen ? "fa-angle-up" : "fa-angle-down"
                    } right`}
                  ></i>
                </p>
              </a>
              <ul
                className={`nav nav-treeview ${
                  isSupplierManagementOpen ? "show" : ""
                }`}
              >
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("VendorQuestionnare")}
                  >
                    <input
                      type="radio"
                      name="supplier-management"
                      checked={activeSubMenu === "VendorQuestionnare"}
                      onChange={() => onClickSubMenu("VendorQuestionnare")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Vendor Questionnare</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("SupplierPackStandard")}
                  >
                    <input
                      type="radio"
                      name="supplier-management"
                      checked={activeSubMenu === "SupplierPackStandard"}
                      onChange={() => onClickSubMenu("SupplierPackStandard")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Supplier Packing Standard</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() =>
                      onClickSubMenu("SupplierSourcingDeclaration")
                    }
                  >
                    <input
                      type="radio"
                      name="supplier-management"
                      checked={activeSubMenu === "SupplierSourcingDeclaration"}
                      onChange={() =>
                        onClickSubMenu("SupplierSourcingDeclaration")
                      }
                      style={{ marginRight: "8px" }}
                    />
                    <p>Supplier Sourcing Declaration</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("SupplierCapDeclaration")}
                  >
                    <input
                      type="radio"
                      name="supplier-management"
                      checked={activeSubMenu === "SupplierCapDeclaration"}
                      onChange={() => onClickSubMenu("SupplierCapDeclaration")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Supplier Capacity Declaration</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("QualitySystemCertificate")}
                  >
                    <input
                      type="radio"
                      name="supplier-management"
                      checked={activeSubMenu === "QualitySystemCertificate"}
                      onChange={() =>
                        onClickSubMenu("QualitySystemCertificate")
                      }
                      style={{ marginRight: "8px" }}
                    />
                    <p>Quality System Certificate</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("StockDeclarationReport")}
                  >
                    <input
                      type="radio"
                      name="supplier-management"
                      checked={activeSubMenu === "StockDeclarationReport"}
                      onChange={() => onClickSubMenu("StockDeclarationReport")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Stock Declaration Report</p>
                  </a>
                </li>
              </ul>
            </li>

            {/* Delivery Management Section */}
            <li className="nav-item">
              <a className="nav-link" onClick={toggleDeliveryManagement}>
                <i className="nav-icon fas fa-truck-loading"></i>
                <p>
                  Delivery Management
                  <i
                    className={`fas ${
                      isDeliveryManagementOpen ? "fa-angle-up" : "fa-angle-down"
                    } right`}
                  ></i>
                </p>
              </a>
              <ul
                className={`nav nav-treeview ${
                  isDeliveryManagementOpen ? "show" : ""
                }`}
              >
                <li className="nav-item">
                  <a className="nav-link" onClick={() => onClickSubMenu("FOC")}>
                    <input
                      type="radio"
                      name="delivery-management"
                      checked={activeSubMenu === "FOC"}
                      onChange={() => onClickSubMenu("FOC")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>FOC</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("FortnightPlan")}
                  >
                    <input
                      type="radio"
                      name="delivery-management"
                      checked={activeSubMenu === "FortnightPlan"}
                      onChange={() => onClickSubMenu("FortnightPlan")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Fortnight Plan</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("KitPlan")}
                  >
                    <input
                      type="radio"
                      name="delivery-management"
                      checked={activeSubMenu === "KitPlan"}
                      onChange={() => onClickSubMenu("KitPlan")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>KIT Plan</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("PreDispatchInformation")}
                  >
                    <input
                      type="radio"
                      name="delivery-management"
                      checked={activeSubMenu === "PreDispatchInformation"}
                      onChange={() => onClickSubMenu("PreDispatchInformation")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Pre-Dispatch Information</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("ScheduleVSDelivery")}
                  >
                    <input
                      type="radio"
                      name="delivery-management"
                      checked={activeSubMenu === "ScheduleVSDelivery"}
                      onChange={() => onClickSubMenu("ScheduleVSDelivery")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Schedule V/S Delivery</p>
                  </a>
                </li>
              </ul>
            </li>

            {/* Quality Management Section */}
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                onClick={toggleQualityManagement}
              >
                <i className="nav-icon fas fa-check-circle"></i>
                <p>
                  Quality Management
                  <i
                    className={`fas ${
                      isQualityManagementOpen ? "fa-angle-up" : "fa-angle-down"
                    } right`}
                  ></i>
                </p>
              </a>
              <ul
                className={`nav nav-treeview ${
                  isQualityManagementOpen ? "show" : ""
                }`}
              >
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("VendorOverallRating")}
                  >
                    <input
                      type="radio"
                      name="quality-management"
                      checked={activeSubMenu === "VendorOverallRating"}
                      onChange={() => onClickSubMenu("VendorOverallRating")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Vendor/Overall Rating</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("LineStoppage")}
                  >
                    <input
                      type="radio"
                      name="quality-management"
                      checked={activeSubMenu === "LineStoppage"}
                      onChange={() => onClickSubMenu("LineStoppage")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Line Stoppage</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("MChangeSheet")}
                  >
                    <input
                      type="radio"
                      name="quality-management"
                      checked={activeSubMenu === "MChangeSheet"}
                      onChange={() => onClickSubMenu("MChangeSheet")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>4 M Change Sheet</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("Warranty")}
                  >
                    <input
                      type="radio"
                      name="quality-management"
                      checked={activeSubMenu === "Warranty"}
                      onChange={() => onClickSubMenu("Warranty")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Warranty</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={() => onClickSubMenu("PPM")}>
                    <input
                      type="radio"
                      name="quality-management"
                      checked={activeSubMenu === "PPM"}
                      onChange={() => onClickSubMenu("PPM")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>PPM</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("QualityManual")}
                  >
                    <input
                      type="radio"
                      name="quality-management"
                      checked={activeSubMenu === "QualityManual"}
                      onChange={() => onClickSubMenu("QualityManual")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Quality Manual</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("MonthlyInspectionReport")}
                  >
                    <input
                      type="radio"
                      name="quality-management"
                      checked={activeSubMenu === "MonthlyInspectionReport"}
                      onChange={() => onClickSubMenu("MonthlyInspectionReport")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Monthly Inspection Report</p>
                  </a>
                </li>
              </ul>
            </li>

            {/* R&D Management Section */}
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={toggleRnDManagement}>
                <i className="nav-icon fas fa-flask"></i>
                <p>
                  R&D
                  <i
                    className={`fas ${
                      isRnDManagementOpen ? "fa-angle-up" : "fa-angle-down"
                    } right`}
                  ></i>
                </p>
              </a>
              <ul
                className={`nav nav-treeview ${
                  isRnDManagementOpen ? "show" : ""
                }`}
              >
                <li className="nav-item">
                  <a className="nav-link" onClick={() => onClickSubMenu("ECN")}>
                    <input
                      type="radio"
                      name="r&d"
                      checked={activeSubMenu === "ECN"}
                      onChange={() => onClickSubMenu("ECN")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>ECN</p>
                  </a>
                </li>
              </ul>
            </li>

            {/* General Section */}
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                onClick={toggleGeneralManagement}
              >
                <i className="nav-icon fas fa-cogs"></i>
                <p>
                  General
                  <i
                    className={`fas ${
                      isGeneralManagementOpen ? "fa-angle-up" : "fa-angle-down"
                    } right`}
                  ></i>
                </p>
              </a>
              <ul
                className={`nav nav-treeview ${
                  isGeneralManagementOpen ? "show" : ""
                }`}
              >
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("Calender")}
                  >
                    <input
                      type="radio"
                      name="general"
                      checked={activeSubMenu === "Calender"}
                      onChange={() => onClickSubMenu("Calender")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Calendar</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("Notification")}
                  >
                    <input
                      type="radio"
                      name="general"
                      checked={activeSubMenu === "Notification"}
                      onChange={() => onClickSubMenu("Notification")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Notifications</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => onClickSubMenu("Help")}
                  >
                    <input
                      type="radio"
                      name="general"
                      checked={activeSubMenu === "Help"}
                      onChange={() => onClickSubMenu("Help")}
                      style={{ marginRight: "8px" }}
                    />
                    <p>Help</p>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default SideBar;
