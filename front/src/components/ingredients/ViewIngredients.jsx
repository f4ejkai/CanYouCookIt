import React from "react";
import PropTypes from "prop-types";
import IngredientsTable from "./IngredientsTable.jsx";

ViewIngredients.propTypes = {
  setShowSearch: PropTypes.func,
  setIngredientsForSearch: PropTypes.func,
};

export default function ViewIngredients(props) {
  return (
    <div>
      <h2>My Ingredients</h2>
      <IngredientsTable
        setShowSearch={props.setShowSearch}
        setIngredientsForSearch={props.setIngredientsForSearch}
      />
    </div>
  );
}
