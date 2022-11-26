import React from "react";
import BasePage from "./BasePage.jsx";

ErrorPage.propTypes = {};

function ErrorPage() {
  return (
    <BasePage>
      <div className="container">
        <h1>Sorry, resource not found</h1>
      </div>
    </BasePage>
  );
}

export default ErrorPage;
