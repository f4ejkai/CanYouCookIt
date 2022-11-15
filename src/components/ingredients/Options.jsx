/* eslint-disable react/prop-types */
import React from "react";
import Option from "./Option";

export default function Options(props) {
  console.log(props);
  let ingredientsList = props.options;
  const options = ingredientsList.map((ingredient) => {
    return (
      <Option id={ingredient.id} name={ingredient.name} key={ingredient.id} />
    );
  });
  return <datalist id="possible-ingredients">{options}</datalist>;
  // return <div>hello world</div>;
}
