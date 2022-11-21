/* eslint-disable react/prop-types */
import React from "react";
import Ingredient from "./Ingredient";

export default function Ingredients(props) {
  //   console.log(props);

  let ingredientsList = props.ingredients;

  const ingredients = ingredientsList.map((ingredientInfo) => {
    let ingredient = (
      <Ingredient
        url={ingredientInfo.url}
        name={ingredientInfo.name}
        key={ingredientInfo.id}
        id={ingredientInfo.id}
        handleClickInner={props.handleClick}
      />
    );
    // ideal format
    // let option = <Ingredient id={ingredient.id} name={ingredient.name} key={id} />;

    return ingredient;
  });
  return ingredients;
}
