import React, { useState, useEffect } from "react";
import Options from "./Options";

export default function AddIngredient() {
  const [formData, setFormData] = useState({
    item: "",
  });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getData = setTimeout(async () => {
      logger();
      const opt = await getOptions(formData.item);
      setOptions(opt);
    }, 2000);
    return () => clearTimeout(getData);
  }, [formData]);

  let logger = () => {
    console.log("hi");
  };
  let getOptions = async (text) => {
    let items = [];
    if (text.length >= 2) {
      let res = await fetch(
        "/api/ingredients?" +
          new URLSearchParams({
            query: text,
          })
      );
      const data = await res.json();
      // console.log(data);
      items = data.possibleIngredients;
      console.log(items);
    }
    // console.log(items);
    return items;
  };
  function handleChange(event) {
    setFormData((prevFormData) => {
      console.log(prevFormData);
      let updatedObj = {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };

      return updatedObj;
    });
  }

  return (
    <div>
      <h2>Add Ingredient</h2>
      <input
        className="form-control mx-0 my-1"
        list="possible-ingredients"
        name="item"
        id="item"
        onChange={handleChange}
        value={formData.item}
        required
        placeholder="Enter a food"
      />
      <Options options={options} />
    </div>
  );
}
