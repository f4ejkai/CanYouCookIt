import React from "react";
import Ingredient from "./Ingredient";

import PropTypes from "prop-types";

export default function Ingredients(props) {
  console.log(props);

  let ingredientsList = props.ingredients;

  const ingredients = ingredientsList.map((ingredientInfo) => {
    let ingredient = (
      <Ingredient
        url={ingredientInfo.url}
        name={ingredientInfo.name}
        key={ingredientInfo.id}
        id={ingredientInfo.id}
        handleClickInner={props.handleClick}
        handleOnChange={props.handleOnChange}
        checkedData={props.checkedData}
      />
    );

    return ingredient;
  });
  return ingredients;
}

Ingredients.propTypes = {
  handleClick: PropTypes.func,
  handleOnChange: PropTypes.func,
  checkedData: PropTypes.objectOf(PropTypes.bool),
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
};
