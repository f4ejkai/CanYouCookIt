import React from "react";
import PropTypes from "prop-types";

export default function Option(props) {
  return <option value={props.name}>{props.name}</option>;
}
Option.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
