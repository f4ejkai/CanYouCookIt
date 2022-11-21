/* eslint-disable react/prop-types */
import React from "react";

export default function Ingredient(props) {
  const userId = 1;
  return (
    <tr>
      <td>
        <img
          id={props.id}
          src={props.url}
          className="ingredient-img"
          alt={props.url}
        />
      </td>
      <td>
        <div className="py-5 px-2">{props.name}</div>
      </td>
      <td>
        <div className="py-5 px-4">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
        </div>
      </td>
      <td>
        <div className="py-5 px-3">
          <button
            className="btn btn-danger"
            onClick={() => {
              props.handleClickInner(userId, props.id);
            }}
          >
            X
          </button>
        </div>
      </td>
    </tr>
  );
}
