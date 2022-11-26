import React from "react";
import PropTypes from "prop-types";
import "./Ingredient.css";

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
            id="flexCheckDefault"
            name={props.name}
            onChange={props.handleOnChange}
            checked={props.checkedData && props.checkedData[props.name]}
            // checked={props.checkedData[props.name]}
          />
        </div>
      </td>
      <td>
        <div className="py-5 px-3">
          <span
            className="btn btn-danger"
            onClick={() => {
              props.handleClickInner(userId, props.id, props.name);
            }}
          >
            X
          </span>
        </div>
      </td>
    </tr>
  );
}

Ingredient.propTypes = {
  handleClick: PropTypes.func,
  handleOnChangeInner: PropTypes.func,
  checkedData: PropTypes.objectOf(PropTypes.bool),
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
