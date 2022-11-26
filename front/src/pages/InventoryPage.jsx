import React from "react";
import PropTypes from "prop-types";
import AddIngredient from "../components/ingredients/AddIngredient.jsx";
import ViewIngredients from "../components/ingredients/ViewIngredients.jsx";

InventoryPage.propTypes = {
  setShowSearch: PropTypes.func,
  setIngredientsForSearch: PropTypes.func,
};

export default function InventoryPage(props) {
  return (
    <div className="container">
      <h1>Inventory</h1>
      <AddIngredient />
      <hr />
      <ViewIngredients
        setShowSearch={props.setShowSearch}
        setIngredientsForSearch={props.setIngredientsForSearch}
      />
    </div>
  );
}
