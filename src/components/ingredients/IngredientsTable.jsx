/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Ingredients from "./Ingredients";

export default function IngredientsTable() {
  // fetch all ingredients and then display

  const [ingredientsInfo, setIngredientsInfo] = useState();
  useEffect(() => {
    async function getMyIngredientsInventory(id) {
      try {
        const response = await fetch("/api/myinventory/" + id);

        if (response.ok) {
          const ingredientsJson = await response.json();
          setIngredientsInfo(ingredientsJson);
        } else {
          console.error("Error in fetch api/myinventory/<id>");
        }
      } catch (e) {
        console.log({ error: e });
      }
    }
    getMyIngredientsInventory(1);
  }, []);

  const deleteItem = async (userId, itemId) => {
    await fetch("api/myinventory/" + userId + "/" + itemId, {
      method: "DELETE",
    }).then(() => {
      setIngredientsInfo((prevList) => {
        let updatedList = prevList.filter(
          (ingredient) => ingredient.id !== itemId
        );
        return updatedList;
      });
    });
  };
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th className="col-1" scope="col"></th>
          <th className="col-6" scope="col-6">
            Ingredient
          </th>
          <th className="col-1" scope="col">
            Add Item to search
          </th>
          <th className="col-1" scope="col">
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        {ingredientsInfo && (
          <Ingredients
            ingredients={ingredientsInfo}
            handleClick={deleteItem}
          ></Ingredients>
        )}
      </tbody>
    </table>
  );
}
