import React from "react";
import "./Loader.css";
import img from "./bharat-seats-ltd.png";

const Loader = () => {
  return (
    <div className="loader_Back">
      <div className="loader">
        <img src={img} alt="Loading..." />
      </div>
    </div>
  );
};

export default Loader;
