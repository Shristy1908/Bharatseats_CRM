import ReactDOM from "react-dom";

function Portal({ open, children }) {
  return ReactDOM.createPortal(children, document.getElementById("root"));
}

export default Portal;