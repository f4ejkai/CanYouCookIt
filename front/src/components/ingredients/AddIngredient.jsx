import React, { useState, useEffect } from "react";
import Options from "./Options";

export default function AddIngredient() {
  const userId = 1;
  const [formData, setFormData] = useState({
    item: "",
  });
  const [allOptions, setAllOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [btnEnabled, setBtnEnabled] = useState(false);
  const [optionsHistory, setHistory] = useState([]);

  useEffect(() => {
    if (!allOptions.includes(formData.item)) {
      setBtnEnabled(false);
    } else {
      setBtnEnabled(true);
    }
    const getData = setTimeout(async () => {
      const opt = await getOptions(formData.item);
      let possibleIngredients = [];
      opt.forEach((elt) => possibleIngredients.push(elt["name"]));
      setOptions(opt);
      setHistory(() => {
        let arr = [...new Set(optionsHistory.concat(opt))];
        arr = arr.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (t) => t.place === value.place && t.name === value.name
            )
        );
        return arr;
      });
      setAllOptions([...new Set(options.concat(possibleIngredients))]);
    }, 2000);

    return () => clearTimeout(getData);
  }, [formData]);

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
      items = data;
    }
    // console.log(items);
    return items;
  };
  function handleChange(event) {
    setFormData((prevFormData) => {
      let updatedObj = {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };

      return updatedObj;
    });
  }
  const addItem = async () => {
    const item = optionsHistory.find((obj) => obj.name === formData.item);
    // post
    const rawResponse = await fetch("/api/myinventory/" + userId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const content = await rawResponse.json();
    document.location.reload();
    console.log(content);
  };
  return (
    <div>
      <h2>Add Ingredient</h2>
      <div className="row">
        <div className="col-6">
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
        <div className="col-2">
          <button
            disabled={!btnEnabled}
            onClick={() => {
              addItem();
            }}
            className="btn btn-primary"
          >
            +Add
          </button>
        </div>
      </div>
    </div>
  );
}
