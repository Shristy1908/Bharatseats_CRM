import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import {
  Modal,
  DataGrid,
  PageBar,
} from "../../../../Framework/Components/Layout";
import Bizclass from "./AssignedUserList.module.scss";
import UnAssignedUserList from "./UnAssignedUserList";
import { listOfUsers } from "../../Services/Method";
import { AlertMessage } from "../../../../Framework/Components/Widgets";

const cellTemplate = () => {
  return (
    <span>
      <MdDelete
        style={{ marginRight: "5px", fontSize: "15px" }}
        title="Assign User List"
      />
    </span>
  );
};

function AssignedUserList({ toggleAssignedUserListPopup, selectedRowData }) {
  const setAlertMessage = AlertMessage();
  const [openUnAssignedUserList, setOpenUnAssignedUserList] = useState(false);
  const toggleUnAssignedUserList = () => {
    setOpenUnAssignedUserList(!openUnAssignedUserList);
  };
  console.log("selectedRowData", selectedRowData.profileId);

  const [assignedUserList, setAssignedUserList] = useState([]);
  const getAssignedUserList = async () => {
    try {
      const formdata = {
        action: "ASSIGNED",
        profileId: selectedRowData.profileId,
        profileName: selectedRowData.profileName,
      };
      const result = await listOfUsers(formdata);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.length > 0
        ) {
          setAssignedUserList(result.response.responseData);
        } else {
          setAssignedUserList([]);
        }
      } else {
        setAssignedUserList([]);
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

  useEffect(() => {
    getAssignedUserList();
  }, []);

  return (
    <>
      {openUnAssignedUserList && (
        <UnAssignedUserList
          toggleUnAssignedUserList={toggleUnAssignedUserList}
          selectedProfileId={selectedRowData.profileId}
          selectedProfileName={selectedRowData.profileName}
        />
      )}
      <Modal
        varient="half"
        title="Assigned User List"
        show={toggleAssignedUserListPopup}
        width="49.5vw"
        right="0"
      >
        <Modal.Body>
          <div className={Bizclass.AssignedUserList}>
            <PageBar>
              <PageBar.Search />
              <PageBar.Button onClick={() => toggleUnAssignedUserList()}>
                Import
              </PageBar.Button>
            </PageBar>
            <DataGrid
              rowData={assignedUserList}
              frameworkComponents={{
                cellTemplate,
              }}
            >
              <DataGrid.Column
                headerName="Action"
                width={100}
                cellRenderer="cellTemplate"
              />
              <DataGrid.Column
                headerName="Sr No."
                valueGetter={(params) => {
                  return params.node.rowIndex + 1;
                }}
                width={100}
              />
              <DataGrid.Column
                headerName="Display Name"
                field=""
                valueGetter={(node) => {
                  return node.data && node.data.firstName && node.data.lastName
                    ? `${node.data.firstName} ${node.data.lastName}`
                    : "";
                }}
                width={150}
              />
              <DataGrid.Column
                headerName="User Name"
                field="userName"
                width={140}
              />
              <DataGrid.Column
                headerName="Profile Name"
                field="profileName"
                width={150}
              />
              <DataGrid.Column
                headerName="Br Head Type"
                field="brHeadType"
                width={120}
              />
            </DataGrid>
          </div>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </>
  );
}

export default AssignedUserList;

AssignedUserList.propTypes = {
  toggleAssignedUserListPopup: PropTypes.func.isRequired,
};
