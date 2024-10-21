import React, { useState, useEffect } from "react";
import { Modal, Form } from "../../../../../Framework/Components/Layout";
import { Button } from "../../../../../Framework/Components/Widgets";
import { listOfUnits, updateMaterial } from "../../../Services/Method";
import { AlertMessage } from "../../../../../Framework/Components/Widgets";

const EditModal = ({
  handleEditClick,
  selectedRowData,
  updateEditedMaterial,
}) => {
  const setAlertMessage = AlertMessage();
  const [formValues, setFormValues] = useState({
    txtMatCode: selectedRowData.materialCode,
    txtMatDes: selectedRowData.materialDescription,
    txtUom:
      selectedRowData.unit && selectedRowData.unitId
        ? {
            unitCode: selectedRowData.unit,
            unitId: selectedRowData.unitId,
          }
        : null,
    txtMatGroup: selectedRowData.materialGroup,
    txtSNP: selectedRowData.snp,
    txtActive: selectedRowData.isActive,
  });

  const [unitList, setUnitList] = useState([]);
  const getUnitList = async () => {
    debugger;
    try {
      const formdata = {};
      const result = await listOfUnits(formdata);
      if (result.response.successCode === 1) {
        if (
          result.response.responseData &&
          result.response.responseData.length > 0
        ) {
          setUnitList(result.response.responseData);
        } else {
          setUnitList([]);
        }
      } else {
        setUnitList([]);
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

  const updateOnClick = async () => {
    try {
      const formdata = {
        materialId: selectedRowData.materialId,
        materialCode: formValues.txtMatCode,
        materialDescription: formValues.txtMatDes,
        unitId:
          formValues.txtUom && formValues.txtUom.unitId
            ? formValues.txtUom.unitId
            : "",
        unit:
          formValues.txtUom && formValues.txtUom.unitCode
            ? formValues.txtUom.unitCode
            : "",
        materialGroup: formValues.txtMatGroup,
        snp: formValues.txtSNP,
        isActive: formValues.txtActive,
      };
      const result = await updateMaterial(formdata);
      if (result.response.successCode === 1) {
        setAlertMessage({
          type: "success",
          message: result.response.successMsg,
        });
        selectedRowData.materialCode = formValues.txtMatCode;
        selectedRowData.materialDescription = formValues.txtMatDes;
        selectedRowData.unit = formValues.txtUom.unitCode;
        selectedRowData.materialGroup = formValues.txtMatGroup;
        selectedRowData.snp = formValues.txtSNP;
        selectedRowData.isActive = formValues.txtActive;
        updateEditedMaterial(selectedRowData);
        // handleAddNew();
        handleEditClick();
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

  const updateState = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
    if (name === "txtActive") {
      setFormValues({
        ...formValues,
        [name]: value ? 1 : 0, // Convert boolean to 1 or 0
      });
    }
  };

  useEffect(() => {
    getUnitList();
  }, []);

  return (
    <Modal
      varient="center"
      title="Edit Material"
      width="28vw"
      show={handleEditClick}
      right="0"
    >
      <Modal.Body>
        <Form>
          <Form.Group controlwidth="280px">
            <Form.InputGroup label="Material Code">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtMatCode}
                name="txtMatCode"
                onChange={(e) => updateState("txtMatCode", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup label="Material Description">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtMatDes}
                name="txtMatDes"
                onChange={(e) => updateState("txtMatDes", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup label="UOM">
              <Form.InputControl
                control="select"
                value={formValues.txtUom}
                name="txtUom"
                options={unitList}
                getOptionLabel={(option) => `${option.unitCode}`}
                getOptionValue={(option) => `${option}`}
                onChange={(e) => updateState("txtUom", e)}
              ></Form.InputControl>
            </Form.InputGroup>
            <Form.InputGroup label="Material Group">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtMatGroup}
                name="txtMatGroup"
                onChange={(e) => updateState("txtMatGroup", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup label="SNP">
              <Form.InputControl
                control="input"
                type="text"
                autoComplete="off"
                value={formValues.txtSNP}
                name="txtSNP"
                onChange={(e) => updateState("txtSNP", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup label="Active">
              <input
                className="small-checkbox"
                type="checkbox"
                checked={formValues.txtActive === 1}
                name="txtActive"
                onChange={(e) => updateState("txtActive", e.target.checked)}
              />
            </Form.InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="button" varient="secondary" onClick={updateOnClick}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
