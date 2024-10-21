import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Page from "../Page/Page";
import PageAuthenticator from "../PageAuthenticator/PageAuthenticator";
import Login from "../../Components/Modules/Common/Login/Login";
import Home from "../../Components/Modules/Common/Home/Home";
import ManageUser from "../../Components/Modules/UserManagement/ManageUser/ManageUser";
import CreateNewModal from "../../Components/Modules/UserManagement/ManageUser/Modal/CreateNewModal";
import ManageRoles from "../../Components/Modules/UserManagement/ManageRoles/ManageRoles";
import ProfileManagement from "../../Components/Modules/ProfileManagement/ProfileManagement";
import BuyerAssociation from "../../Components/Modules/UserManagement/BuyerAssociation/BuyerAssociation";
import Materials from "../../Components/Modules/MasterManagement/Materials/Materials";
import Vendors from "../../Components/Modules/MasterManagement/Vendors/Vendors";
import Plants from "../../Components/Modules/MasterManagement/Plants/Plants";
import Cities from "../../Components/Modules/MasterManagement/Cities/Cities";
import Units from "../../Components/Modules/MasterManagement/Units/Units";
import ManageSchedule from "../../Components/Modules/BuyerManagement/ManageSchedule/ManageSchedule";
import ManagePO from "../../Components/Modules/BuyerManagement/ManagePO/ManagePO";
import ViewModal from "../../Components/Modules/BuyerManagement/ManagePO/Modal/ViewModal";
import ManageInvoice from "../../Components/Modules/BuyerManagement/ManageInvoice/ManageInvoice";
import ViewModall from "../../Components/Modules/BuyerManagement/ManageInvoice/Modal/ViewModall";
import VendorQuestionnare from "../../Components/Modules/SupplierManagement/VendorQuestionnare/VendorQuestionnare";
import SupplierPackingStandard from "../../Components/Modules/SupplierManagement/SupplierPackingStandard/SupplierPackingStandard";
import SupplierSourcingDeclaration from "../../Components/Modules/SupplierManagement/SupplierSourcingDeclaration/SupplierSourcingDeclaration";
import SupplierCapacityDeclaration from "../../Components/Modules/SupplierManagement/SupplierCapacityDeclaration/SupplierCapacityDeclaration";
import QualitySystemCertificate from "../../Components/Modules/SupplierManagement/QualitySystemCertificate/QualitySystemCertificate";
import StockDeclarationReport from "../../Components/Modules/SupplierManagement/StockDeclarationReport/StockDeclarationReport";
import FOC from "../../Components/Modules/DeliveryManagement/FOC/FOC";
import FortnightPlan from "../../Components/Modules/DeliveryManagement/FortnightPlan/FortnightPlan";
import KitPlan from "../../Components/Modules/DeliveryManagement/KITPlan/KitPlan";
import PreDispatchInformation from "../../Components/Modules/DeliveryManagement/PreDispatchInformation/PreDispatchInfo";
import ScheduleVSDelivery from "../../Components/Modules/DeliveryManagement/ScheduleVSDelivery/ScheduleVSDelivery";
import VendorOverallRating from "../../Components/Modules/QualityManagement/VendorOverallRating/VendorOverallRating";
import LineStoppage from "../../Components/Modules/QualityManagement/LineStoppage/LineStoppage";
import MChangeSheet from "../../Components/Modules/QualityManagement/4MChangeSheet/4MChangeSheet";
import Warranty from "../../Components/Modules/QualityManagement/Warranty/Warranty";
import PPM from "../../Components/Modules/QualityManagement/PPM/PPM";
import QualityManual from "../../Components/Modules/QualityManagement/QualityManual/QualityManual";
import MonthlyInspectionReport from "../../Components/Modules/QualityManagement/MonthlyInspectionReport/MonthlyInspectionReport";
import ECN from "../../Components/Modules/R&D/ECN";
import Calendar from "../../Components/Modules/General/Calender/Calender";
import Notification from "../../Components/Modules/General/Notifications/Notification";
import Help from "../../Components/Modules/General/Help/Help";
import Calender from "../../Components/Modules/General/Calender/Calender";
import MSViewModal from "../../Components/Modules/BuyerManagement/ManageSchedule/MSViewModal";
import Questionniare from "../../Components/Modules/SupplierManagement/VendorQuestionnare/Questionniare";

function PageRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PageAuthenticator />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/home"
          element={<Page component={<Home />} title="Dashboard" />}
        />
        {/* User Management */}
        <Route exact path="/UserManagement">
          <Route
            exact
            path="ManageUser"
            element={<Page component={<ManageUser />} title="Manage User" />}
          />
          <Route
            exact
            path="CreateNewModal"
            element={
              <Page component={<CreateNewModal />} title="CreateNewModal" />
            }
          />
          <Route
            exact
            path="ManageRoles"
            element={<Page component={<ManageRoles />} title="Manage Roles" />}
          />
          <Route
            exact
            path="BuyerAssociation"
            element={
              <Page
                component={<BuyerAssociation />}
                title="Buyer Association"
              />
            }
          />
        </Route>

        {/* Profile Management */}
        <Route
          path="/ProfileManagement"
          element={
            <Page
              component={<ProfileManagement />}
              title="Profile Management"
            />
          }
        />

        {/* Master Management */}
        <Route exact path="/MasterManagement">
          <Route
            exact
            path="Materials"
            element={<Page component={<Materials />} title="Materials" />}
          />
          <Route
            exact
            path="Vendors"
            element={<Page component={<Vendors />} title="Vendors" />}
          />
          <Route
            exact
            path="Plants"
            element={<Page component={<Plants />} title="Plants" />}
          />
          <Route
            exact
            path="Cities"
            element={<Page component={<Cities />} title="Cities" />}
          />
          <Route
            exact
            path="Units"
            element={<Page component={<Units />} title="Units" />}
          />
        </Route>

        {/* Buyer Management */}
        <Route exact path="/BuyerManagement">
          <Route
            exact
            path="ManageSchedule"
            element={
              <Page component={<ManageSchedule />} title="ManageSchedule" />
            }
          />
          <Route
            exact
            path="MSViewModal"
            element={<Page component={<MSViewModal />} />}
          />
          <Route
            exact
            path="ManagePO"
            element={<Page component={<ManagePO />} title="ManagePO" />}
          />
          <Route
            exact
            path="ViewModal"
            element={<Page component={<ViewModal />} />}
          />

          <Route
            exact
            path="ManageInvoice"
            element={
              <Page component={<ManageInvoice />} title="ManageInvoice" />
            }
          />
          <Route
            exact
            path="ViewModall"
            element={<Page component={<ViewModall />} />}
          />
        </Route>

        {/* Supplier Management */}

        <Route exact path="/SupplierManagement">
          <Route
            exact
            path="VendorQuestionnare"
            element={
              <Page
                component={<VendorQuestionnare />}
                title="VendorQuestionnare"
              />
            }
          />
          <Route
            exact
            path="Questionniare"
            element={<Page component={<Questionniare />} />}
          />
          <Route
            exact
            path="SupplierPackingStatndard"
            element={
              <Page
                component={<SupplierPackingStandard />}
                title="SupplierPackingStandard"
              />
            }
          />

          <Route
            exact
            path="SupplierSourcingDeclaration"
            element={
              <Page
                component={<SupplierSourcingDeclaration />}
                title="SupplierSourcingDeclaration"
              />
            }
          />

          <Route
            exact
            path="SupplierCapacityDeclaration"
            element={
              <Page
                component={<SupplierCapacityDeclaration />}
                title="SupplierCapacityDeclaration"
              />
            }
          />

          <Route
            exact
            path="QualitySystemCertificate"
            element={
              <Page
                component={<QualitySystemCertificate />}
                title="QualitySystemCertificate"
              />
            }
          />

          <Route
            exact
            path="StockDeclarationReport"
            element={
              <Page
                component={<StockDeclarationReport />}
                title="StockDeclarationReport"
              />
            }
          />
        </Route>

        {/* Delivery Management */}
        <Route exact path="/DeliveryManagement">
          <Route exact path="FOC" element={<Page component={<FOC />} />} />

          <Route
            exact
            path="FortnightPlan"
            element={<Page component={<FortnightPlan />} />}
          />

          <Route
            exact
            path="KitPlan"
            element={<Page component={<KitPlan />} />}
          />

          <Route
            exact
            path="PreDispatchInformation"
            element={<Page component={<PreDispatchInformation />} />}
          />

          <Route
            exact
            path="ScheduleVSDelivery"
            element={<Page component={<ScheduleVSDelivery />} />}
          />
        </Route>

        {/* Quality Management */}
        <Route exact path="/QualityManagement">
          <Route
            exact
            path="VendorOverallRating"
            element={<Page component={<VendorOverallRating />} />}
          />

          <Route
            exact
            path="LineStoppage"
            element={<Page component={<LineStoppage />} />}
          />

          <Route
            exact
            path="MChangeSheet"
            element={<Page component={<MChangeSheet />} />}
          />

          <Route
            exact
            path="Warranty"
            element={<Page component={<Warranty />} />}
          />

          <Route exact path="PPM" element={<Page component={<PPM />} />} />

          <Route
            exact
            path="QualityManual"
            element={<Page component={<QualityManual />} />}
          />

          <Route
            exact
            path="MonthlyInspectionReport"
            element={<Page component={<MonthlyInspectionReport />} />}
          />
        </Route>

        {/* R&D */}
        <Route exact path="/R&D">
          <Route exact path="ECN" element={<Page component={<ECN />} />} />
        </Route>

        {/* Notification */}
        <Route exact path="/Notifications">
          <Route
            exact
            path="Calender"
            element={<Page component={<Calender />} />}
          />
          <Route
            exact
            path="Notification"
            element={<Page component={<Notification />} />}
          />
          <Route exact path="Help" element={<Page component={<Help />} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default PageRouter;
