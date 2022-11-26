import React from "react";
import Option from "./Option";
import PropTypes from "prop-types";

export default function Options(props) {
  // console.log(props);
  let ingredientsList = props.options;
  const options = ingredientsList.map((ingredient, idx) => {
    let option = <Option name={ingredient.name} id={ingredient.id} key={idx} />;
    return option;
  });
  return <datalist id="possible-ingredients">{options}</datalist>;
}
Options.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};
