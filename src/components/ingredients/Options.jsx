/* eslint-disable react/prop-types */
import React from "react";
import Option from "./Option";
import PropTypes from "prop-types";

export default function Options(props) {
  // console.log(props);
  let ingredientsList = props.options;
  let id = 0;
  const options = ingredientsList.map((ingredient) => {
    let option = <Option name={ingredient.name} id={ingredient.id} key={id} />;
    // ideal format
    // let option = <Option id={ingredient.id} name={ingredient.name} key={id} />;
    id = id + 1;
    return option;
  });
  return <datalist id="possible-ingredients">{options}</datalist>;
  // return <div>hello world</div>;
}
Options.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};
