import React from "react";
import { Link } from "react-router-dom";
import BasePage from "./BasePage.jsx";

IndexPage.propTypes = {};

function IndexPage() {
  return (
    <BasePage>
      <div>
        <div className="container">
          <h1>Welcome to CanYouCookIt app!</h1>
          <div className="row">
            <div className="col-7">
              <p>
                CanYouCookIt helps you to find the matching recipes based on the
                list of ingredients you have at home.
              </p>
              <p>
                The app was built using React + Express.js + MongoDB +
                HTML5/Bootstrap. Its current version does not support user
                authentication.
              </p>
              <p>
                The project is part of the
                {" "}<Link to="https://johnguerra.co/classNamees/webDevelopment_fall_2022/">
                  CS5610 Web Development
                </Link>{" "}
                at the Northeastern University.
              </p>
            </div>
            <div className="col-5">
              <div className="col-md-12 pt-5 text-center">
                <Link className="btn btn-custom btn-green" to="/inventory">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  );
}

export default IndexPage;
