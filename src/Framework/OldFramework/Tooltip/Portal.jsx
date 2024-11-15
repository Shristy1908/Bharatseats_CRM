import ReactDOM from "react-dom";

function Portal(props) {
  return ReactDOM.createPortal(props.children, document.getElementById("root"));
}

export default Portal;
