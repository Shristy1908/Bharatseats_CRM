import React from "react";
import PropTypes from "prop-types";
import "./BootStrapButton.scss";
import classNames from "classnames";

function BootStrapButton(props) {
  const {
    varient = "grey",
    trigger,
    className,
    children,
    ...restProps
  } = props;
  return (
    <button
      type="button"
      className={classNames(`BtStrp_Btn BtStrp_${varient}_Btn`, className)}
      {...restProps}
    >
      {trigger === "true" ? (
        <div className="BtStrp_btn__spinner">
          <div className="BtStrp_btn__bounce1" />
          <div className="BtStrp_btn__bounce2" />
          <div className="BtStrp_btn__bounce3" />
        </div>
      ) : (
        children
      )}
    </button>
  );
}

export default BootStrapButton;

BootStrapButton.propTypes = {
  varient: PropTypes.string.isRequired,
  trigger: PropTypes.string,
  className: PropTypes.any,
  children: PropTypes.node.isRequired,
};
