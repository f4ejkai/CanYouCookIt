import React from "react";
import IngredientsTable from "./IngredientsTable";

export default function ViewIngredients() {
  return (
    <div>
      <h2>My Ingredients</h2>
      {/* {ingredients} */}
      <IngredientsTable></IngredientsTable>
    </div>
  );
}
