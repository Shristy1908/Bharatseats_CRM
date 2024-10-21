// import React, { useState, useRef, useMemo } from "react";
// import "./Home.css";
// import { AgGridReact } from "ag-grid-react";
// import "../../../../../node_modules/ag-grid-community/src/styles/ag-grid.scss";
// import "../../../../../node_modules/ag-grid-community/src/styles/ag-theme-alpine/sass/ag-theme-alpine.scss";

// const Home = () => {
//   const [rowData, setRowData] = useState([
//     {
//       userCode: "201",
//       message: "user a",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "203",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "204",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "205",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "201",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "206",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "201",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "201",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "201",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "201",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "201",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "201",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "201",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "201",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "201",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "201",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "201",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "201",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "202",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "201",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//   ]);

//   const gridApiRef = useRef(null);

//   const columnDefs = [
//     {
//       headerName: "User Code",
//       field: "userCode",
//       headerClass: "header",
//       sortable: true,
//       width: 250,
//     },
//     {
//       headerName: "Message",
//       field: "message",
//       headerClass: "header",
//       sortable: true,
//       width: 250,
//     },
//     {
//       headerName: "Start Date",
//       field: "startDate",
//       headerClass: "header",
//       sortable: true,
//       width: 250,
//     },
//     {
//       headerName: "End Date",
//       field: "endDate",
//       headerClass: "header",
//       sortable: true,
//       width: 250,
//     },
//     {
//       headerName: "Upload Date",
//       field: "startDate",
//       headerClass: "header",
//       sortable: true,
//       width: 250,
//     },
//   ];

//   const onGridReady = (params) => {
//     gridApiRef.current = params.api;
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     gridApiRef.current.setQuickFilter(value);
//   };

//   const defaultColDef = useMemo(() => {
//     return {
//       wrapHeaderText: true,
//       autoHeaderHeight: true,
//     };
//   }, []);

//   return (
//     <>
//       <div className=" homeContainer1 ">
//         <p className="title">Notifications</p>
//         <div className="inputBox3">
//           <label>Search:</label>
//           <input
//             type="text"
//             placeholder="Enter Text..."
//             onChange={handleSearch}
//           />
//         </div>

//         <div className="outerContainer">
//           <div className="ag-theme-alpine">
//             <AgGridReact
//               rowData={rowData}
//               columnDefs={columnDefs}
//               pagination={true}
//               paginationPageSize={10}
//               onGridReady={onGridReady}
//               defaultColDef={defaultColDef}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;

import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-blue-600 text-white p-6 rounded-lg shadow-md transform transition duration-300 hover:bg-blue-700 hover:scale-105">
        <h1 className="text-3xl font-bold text-center">
          Welcome to Bharat Seats Admin Portal
        </h1>
        <p className="text-center mt-2">
          Your one-stop solution for managing all administrative tasks
          creatively!
        </p>
      </header>
    </div>
  );
};

export default Home;

// import React, { useState, useRef, useMemo, useEffect } from "react";
// import "./Home.css";
// import { AgGridReact } from "ag-grid-react";

// const Home = () => {
//   const [rowData, setRowData] = useState([
//     {
//       userCode: "201",
//       message: "user a",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "203",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "204",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "205",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "201",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "206",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "201",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "201",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "201",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "201",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//   ]);
//   const gridApiRef = useRef(null);

//   const columnDefs = [
//     {
//       headerName: "User Code",
//       field: "userCode",
//       headerClass: "header",
//       sortable: true,
//       width: 50,
//     },
//     {
//       headerName: "Message",
//       field: "message",
//       headerClass: "header",
//       sortable: true,
//       width: 50,
//     },
//     {
//       headerName: "Start Date",
//       field: "startDate",
//       headerClass: "header",
//       sortable: true,
//       width: 50,
//     },
//     {
//       headerName: "End Date",
//       field: "endDate",
//       headerClass: "header",
//       sortable: true,
//       width: 50,
//     },
//     {
//       headerName: "Upload Date",
//       field: "startDate",
//       headerClass: "header",
//       sortable: true,
//       width: 50,
//     },
//   ];

//   const onGridReady = (params) => {
//     gridApiRef.current = params.api;
//     headerHeightSetter();
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     gridApiRef.current.setQuickFilter(value);
//   };

//   const defaultColDef = useMemo(
//     () => ({
//       wrapHeaderText: true,
//       autoHeaderHeight: true,
//       flex: 1,
//       resizable: true,
//       sortable: true,
//     }),
//     []
//   );

//   // const headerHeightGetter = () => {
//   //   const columnHeaderTexts = [
//   //     ...document.querySelectorAll(".ag-header-cell-text"),
//   //   ];
//   //   const clientHeights = columnHeaderTexts.map(
//   //     (headerText) => headerText.clientHeight
//   //   );
//   //   const tallestHeaderTextHeight = Math.max(...clientHeights);

//   //   return tallestHeaderTextHeight;
//   // };

//   const headerHeightSetter = () => {
//     const padding = 20;
//     // const height = headerHeightGetter() + padding;
//     const height = 30;
//     gridApiRef.current.setHeaderHeight(height);
//   };

//   useEffect(() => {
//     if (gridApiRef.current) {
//       headerHeightSetter();
//     }
//   }, [rowData]);

//   return (
//     <div className="homeContainer1">
//       <p className="title">Notifications</p>
//       <div className="inputBox">
//         <label>Search:</label>
//         <input
//           type="text"
//           placeholder="Enter Text..."
//           onChange={handleSearch}
//         />
//       </div>

//       <div className="outerContainer">
//         <div
//           className="ag-theme-alpine"
//           style={{ height: "500px", width: "100%" }}
//         >
//           <AgGridReact
//             rowData={rowData}
//             columnDefs={columnDefs}
//             pagination={true}
//             paginationPageSize={10}
//             onGridReady={onGridReady}
//             defaultColDef={defaultColDef}
//             onFirstDataRendered={headerHeightSetter}
//             onColumnResized={headerHeightSetter}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Home;

// import React, { useState, useRef, useMemo, useEffect } from "react";
// import "./Home.css";
// import { AgGridReact } from "ag-grid-react";

// const Home = () => {
//   const [rowData, setRowData] = useState([
//     {
//       userCode: "201",
//       message: "user a",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     {
//       userCode: "203",
//       message: "user",
//       startDate: "12/03/2023",
//       endDate: "07/12/2024",
//       uploadDate: "",
//     },
//     // Add more data here as needed...
//   ]);
//   const gridApiRef = useRef(null);

//   const columnDefs = [
//     {
//       headerName: "User Code",
//       field: "userCode",
//       headerClass: "header",
//       sortable: true,
//       // width: 50,
//     },
//     {
//       headerName: "Message",
//       field: "message",
//       headerClass: "header",
//       sortable: true,
//       // width: 50,
//     },
//     {
//       headerName: "Start Date",
//       field: "startDate",
//       headerClass: "header",
//       sortable: true,
//       // width: 50,
//     },
//     {
//       headerName: "End Date",
//       field: "endDate",
//       headerClass: "header",
//       sortable: true,
//       // width: 50,
//     },
//     {
//       headerName: "Upload Date",
//       field: "startDate",
//       headerClass: "header",
//       sortable: true,
//       // width: 50,
//     },
//   ];

//   const onGridReady = (params) => {
//     gridApiRef.current = params.api;
//     headerHeightSetter();
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     gridApiRef.current.setQuickFilter(value);
//   };

//   const defaultColDef = useMemo(
//     () => ({
//       wrapHeaderText: true,
//       autoHeaderHeight: true,
//       flex: 1,
//       resizable: true,
//       sortable: true,
//     }),
//     []
//   );

//   const headerHeightGetter = () => {
//     const columnHeaderTexts = [
//       ...document.querySelectorAll(".ag-header-cell-text"),
//     ];
//     const clientHeights = columnHeaderTexts.map(
//       (headerText) => headerText.clientHeight
//     );
//     const tallestHeaderTextHeight = Math.max(...clientHeights);

//     return tallestHeaderTextHeight;
//   };

//   const headerHeightSetter = () => {
//     const padding = 20;
//     const height = headerHeightGetter() + padding;
//     gridApiRef.current.setHeaderHeight(height);
//   };

//   useEffect(() => {
//     if (gridApiRef.current) {
//       headerHeightSetter();
//     }
//   }, [rowData]);

//   return (
//     <div className="homeContainer1">
//       <p className="title">Notifications</p>
//       <div className="inputBox">
//         <label>Search:</label>
//         <input
//           type="text"
//           placeholder="Enter Text..."
//           onChange={handleSearch}
//         />
//       </div>

//       <div className="outerContainer">
//         <div
//           className="ag-theme-alpine"
//           style={{ height: "500px", width: "100%" }}
//         >
//           <AgGridReact
//             rowData={rowData}
//             columnDefs={columnDefs}
//             pagination={true}
//             paginationPageSize={10}
//             onGridReady={onGridReady}
//             defaultColDef={defaultColDef}
//             onFirstDataRendered={headerHeightSetter}
//             onColumnResized={headerHeightSetter}
//             onGridSizeChanged={headerHeightSetter}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
