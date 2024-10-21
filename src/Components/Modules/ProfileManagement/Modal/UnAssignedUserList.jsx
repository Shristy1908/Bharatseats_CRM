import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  DataGrid,
  PageBar,
} from "../../../../Framework/Components/Layout";
import { Button } from "../../../../Framework/Components/Widgets";
import Bizclass from "./UnAssignedUserList.module.scss";
import { AlertMessage } from "../../../../Framework/Components/Widgets";
import { listOfUsers } from "../../Services/Method";

function UnAssignedUserList({
  toggleUnAssignedUserList,
  selectedProfileId,
  selectedProfileName,
}) {
  const setAlertMessage = AlertMessage();
  const [unAssignedUserList, setUnAssignedUserList] = useState([]);
  const getUnAssignedUserList = async () => {
    try {
      const formdata = {
        action: "UNASSIGNED",
        profileId: selectedProfileId,
        profileName: selectedProfileName,
      };
      const result = await listOfUsers(formdata);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.length > 0
        ) {
          setUnAssignedUserList(result.response.responseData);
        } else {
          setUnAssignedUserList([]);
        }
      } else {
        setUnAssignedUserList([]);
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
    getUnAssignedUserList();
  }, []);

  return (
    <Modal
      varient="half"
      title="Un-Assigned User List"
      show={toggleUnAssignedUserList}
      width="49.5vw"
      left="0"
    >
      <Modal.Body>
        <div className={Bizclass.UnAssignedUserList}>
          <PageBar>
            <PageBar.Search />
          </PageBar>
          <DataGrid rowData={unAssignedUserList}>
            <DataGrid.Column
              headerName="Action"
              width={125}
              headerCheckboxSelection
              headerCheckboxSelectionFilteredOnly
              checkboxSelection
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
      <Modal.Footer>
        <Button type="button" varient="secondary">
          Export
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UnAssignedUserList;

UnAssignedUserList.propTypes = {
  toggleUnAssignedUserList: PropTypes.func.isRequired,
};
