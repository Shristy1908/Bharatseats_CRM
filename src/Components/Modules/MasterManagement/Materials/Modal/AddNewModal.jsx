import React, { useState, useEffect } from "react";
import { Modal, Form } from "../../../../../Framework/Components/Layout";
import { Button } from "../../../../../Framework/Components/Widgets";
import { addMaterial, listOfUnits } from "../../../Services/Method";
import { AlertMessage } from "../../../../../Framework/Components/Widgets";

const AddNewModal = ({ handleAddNew, updateMaterialData }) => {
  const setAlertMessage = AlertMessage();
  const [formValues, setFormValues] = useState({
    txtMatCode: "",
    txtMatDes: "",
    txtUom: null,
    txtMatGroup: "",
    txtSNP: "",
  });

  const addMaterialOnClick = async () => {
    debugger;
    try {
      // if (!handleValidation()) {
      //   return;
      // }
      const formdata = {
        materialId: 0,
        materialCode:
          formValues && formValues.txtMatCode ? formValues.txtMatCode : "",
        materialDescription:
          formValues && formValues.txtMatDes ? formValues.txtMatDes : "",
        unitId:
          formValues && formValues.txtUom && formValues.txtUom.unitId
            ? formValues.txtUom.unitId
            : "",
        unit:
          formValues && formValues.txtUom && formValues.txtUom.unitCode
            ? formValues.txtUom.unitCode
            : "",
        materialGroup: formValues.txtMatGroup,
        snp: formValues.txtSNP,
        isActive: 1,
      };
      const result = await addMaterial(formdata);
      if (result.response.successCode === 1) {
        setAlertMessage({
          type: "success",
          message: result.response.successMsg,
        });
        const newlyAddedMaterial = [
          {
            materialCode:
              formValues && formValues.txtMatCode ? formValues.txtMatCode : "",
            materialDescription:
              formValues && formValues.txtMatDes ? formValues.txtMatDes : "",
            unit:
              formValues && formValues.txtUom && formValues.txtUom.unitCode
                ? formValues.txtUom.unitCode
                : "",
            materialGroup: formValues.txtMatGroup,
            snp: formValues.txtSNP,
            isActive: 1,
          },
        ];
        console.log(newlyAddedMaterial);
        updateMaterialData(newlyAddedMaterial);
        handleAddNew();
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
  };

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

  useEffect(() => {
    getUnitList();
  }, []);

  const handleSubmit = () => {
    handleAddNew(formValues);
  };

  return (
    <Modal
      varient="center"
      title="Add New Material"
      width="28vw"
      show={handleAddNew}
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
                req="true"
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
                req="true"
                onChange={(e) => updateState("txtMatDes", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup label="UOM">
              <Form.InputControl
                control="select"
                value={formValues.txtUom}
                name="txtUom"
                req="true"
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
                req="true"
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
                req="true"
                onChange={(e) => updateState("txtSNP", e.target.value)}
              />
            </Form.InputGroup>
            <Form.InputGroup label="Active">
              <input
                className="small-checkbox"
                type="checkbox"
                checked={true}
                name="txtActive"
                // onChange={(e) => updateState("txtActive", e.target.checked)}
              />
            </Form.InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="button" varient="secondary" onClick={addMaterialOnClick}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewModal;
