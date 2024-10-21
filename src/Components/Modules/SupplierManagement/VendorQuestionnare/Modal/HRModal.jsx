import React, { useState, useRef, useMemo } from "react";
import { Modal, Form } from "../../../../../Framework/Components/Layout";
import { AgGridReact } from "ag-grid-react";
import "../../../../../../node_modules/ag-grid-community/src/styles/ag-grid.scss";
import "../../../../../../node_modules/ag-grid-community/src/styles/ag-theme-alpine/sass/ag-theme-alpine.scss";
import BizClass from "./EditModal.module.scss";
import "./FinancialModal.css";

const HRModal = ({ handleHR, selectedHRDetail }) => {
  return (
    <Modal
      varient="center"
      title="Human Resources Details"
      width="90vw"
      show={handleHR}
      right="0"
    >
      <Modal.Body>
        <div className={BizClass.ticketHistoryDetail}>
          <div className={BizClass.TicketDetails}>
            <h5>HR Details</h5>
            <hr style={{ marginTop: "5px", borderTop: "#adacac" }} />
            <table className={BizClass.table}>
              <tr>
                <td>
                  Permanent Employee :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.permanentEmp}
                  </span>
                </td>
                <td>
                  Unionised Employee :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.unionisedEmp}
                  </span>
                </td>
                <td>
                  Non-Unionised Employee :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.nonIonisedEmp}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  Casuals :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.casualEmp}
                  </span>
                </td>
                <td>
                  Manager :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.managersEmp}
                  </span>
                </td>
                <td>
                  Supervisiors :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.supervisiorsEmp}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  Degree Holders :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.degreeHoldersEmp}
                  </span>
                </td>
                <td>
                  Diploma Holders :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.diplomaHoldersEmp}
                  </span>
                </td>
                <td>
                  Others :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.othersEmp}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  Production :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.productionEmp}
                  </span>
                </td>
                <td>
                  Direct :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.directEmp}
                  </span>
                </td>
                <td>
                  Direct ITI :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.directITIEmp}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  Direct Non ITI :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.directNONITIEmp}
                  </span>
                </td>
                <td>
                  Indirect :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.indirectEmp}
                  </span>
                </td>
                <td>
                  Indirect ITI :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.indirectITIEmp}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  Indirect Non ITI :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.indirectNONITIEmp}
                  </span>
                </td>
                <td>
                  QA :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.qaEmp}
                  </span>
                </td>
                <td>
                  Administration :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.administrationEmp}
                  </span>
                </td>
              </tr>

              <tr>
                <td>
                  Workers Union :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.workersUnion}
                  </span>
                </td>
                <td>
                  Long Term Settle Union :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.longTermSettleUnion}
                  </span>
                </td>
                <td>
                  Strike:{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.strike}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  IR Situation :{" "}
                  <span className={BizClass.value}>
                    {selectedHRDetail.irsituation}
                  </span>
                </td>
                <td>
                  Shift Timings :{" "}
                  <span className={BizClass.value}>
                    {" "}
                    {selectedHRDetail.shiftTimings}
                  </span>
                </td>
                <td>
                  Annual Training Plan :{" "}
                  <span className={BizClass.value}>
                    {" "}
                    {selectedHRDetail.annualTrainingPlan}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  Training Prog Being Plan :{" "}
                  <span className={BizClass.value}>
                    {" "}
                    {selectedHRDetail.trainingProgBeingPlanned}
                  </span>
                </td>
                <td>
                  Training Conducted :{" "}
                  <span className={BizClass.value}>
                    {" "}
                    {selectedHRDetail.trainingConductedLastYear}
                  </span>
                </td>
                <td>
                  Foreign Subject :{" "}
                  <span className={BizClass.value}>
                    {" "}
                    {selectedHRDetail.foreignTrainingSubCovered}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  Foreign SubManager :{" "}
                  <span className={BizClass.value}>
                    {" "}
                    {selectedHRDetail.foreignTrainingManagers}
                  </span>
                </td>
                <td>
                  Foreign SubStaff :{" "}
                  <span className={BizClass.value}>
                    {" "}
                    {selectedHRDetail.foreignTrainingStaff}
                  </span>
                </td>
                <td>
                  Foreign SubWorkmen :{" "}
                  <span className={BizClass.value}>
                    {" "}
                    {selectedHRDetail.foreignTrainingWorkmen}
                  </span>
                </td>
              </tr>
            </table>
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

export default HRModal;
