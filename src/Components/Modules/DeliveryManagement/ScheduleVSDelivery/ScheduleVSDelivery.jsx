import React, { useState, useRef } from "react";
// import { FaTrash, FaDownload } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "./ScheduleVSDelivery.css";

const ScheduleVSDelivery = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const gridApiRef = useRef(null);

  const handleSupplierChange = (e) => {
    setSelectedSupplier(e.target.value);
  };

  const handleDownload = () => {
    alert("Download Successfully");
  };

  return (
    <div class="w-[98%] bg-transparent px-[15px] py-[20px] mx-auto">
      <p class="text-[16px] font-semibold px-[5px] mb-3">
        Delivery Management - View Buyer Schedule
      </p>
      <div class="container mx-auto p-2 bg-slate-100">
        <div class="flex flex-col md:flex-row items-center gap-4">
          <div class="flex items-center">
            <label for="vendorCode" class="mr-2 font-semibold">
              Vendor Code :
            </label>
            <select id="vendorCode" class="border rounded px-4 py-1">
              <option>--Select Vendor--</option>
              <option>A10002</option>
              <option>A10003</option>
              <option>A10004</option>
              <option>A10005</option>
              <option>A10006</option>
              <option>A10007</option>
              <option>A10008</option>
              <option>A10009</option>
            </select>
          </div>

          <div className="flex items-center">
            <label htmlFor="fromDate" className="mr-2 font-semibold">
              From Date :
            </label>
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              className="border rounded px-2 py-1"
              placeholderText="mm/dd/yyyy"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="toDate" className="mr-2 font-semibold">
              To Date :
            </label>
            <DatePicker
              selected={toDate}
              onChange={(date) => setToDate(date)}
              className="border rounded px-2 py-1"
              placeholderText="mm/dd/yyyy"
            />
          </div>

          <button class="bg-green-500 text-white rounded px-4 py-2 mt-2 md:mt-0">
            <i class="fas fa-download"></i> Download
          </button>
        </div>
      </div>
    </div>
  );
};
export default ScheduleVSDelivery;
