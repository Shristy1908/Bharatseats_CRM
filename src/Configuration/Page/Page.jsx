import React, { useEffect } from "react";
import "../../plugins/fontawesome-free/css/all.min.css";
import "../../dist/css/adminlte.css";
import "../../dist/css/style.css";
import Header from "../../Components/Modules/Common/Header/Header";
import SideBar from "../../Components/Modules/Common/SideBar/SideBar";
import Footer from "../../Components/Modules/Common/Footer/Footer";
import "../../dist/js/adminlte.js";
import PropTypes from "prop-types";

function Page(props) {
  const { title, component } = props;

  useEffect(() => {
    document.title = title ? `${title} | Bharat Seats` : "Bharat Seats";
  }, [title]);

  return (
    <>
      <div class="wrapper">
        <Header />
        <SideBar />
        <div class="content-wrapper bgCss">{component}</div>
        <Footer />
      </div>
    </>
  );
}

export default Page;

Page.propTypes = {
  title: PropTypes.string.isRequired,
  component: PropTypes.node.isRequired,
};
