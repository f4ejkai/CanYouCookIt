import React from "react";
import PropTypes from "prop-types";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";


BasePage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

function BasePage({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default BasePage;
