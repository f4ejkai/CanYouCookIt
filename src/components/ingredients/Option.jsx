/* eslint-disable react/prop-types */
import React, { useState } from "react";

export default function Option(props) {
  return <option value={props.name}>{props.name}</option>;
}
