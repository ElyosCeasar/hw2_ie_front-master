import React from "react";
import PropTypes from "prop-types";
import { Button, Input } from "antd";

const OptionInputs = ({ direc, idx, optionState, handleoptionChange }) => {
  const optionId = `name-${idx}`;
  const valueId = `value-${idx}`;
  const valueText = direc === "rtl" ? "مقدار" : "value";
  return (
    <div key={`${valueText}-${idx}`}>
      <label htmlFor={valueId}>{direc === "rtl" ? "برچسب" : "lable"}</label>
      <input
        type="text"
        className="value"
        name={valueId}
        data-idx={idx}
        id={valueId}
        value={optionState[idx].value}
        onChange={handleoptionChange}
        style={{ display: "inline", width: "30%" }}
      />
      <label htmlFor={optionId}>{`${valueText} #${idx + 1}`}</label>
      <input
        type="text"
        className="label"
        name={optionId}
        data-idx={idx}
        id={optionId}
        value={optionState[idx].label}
        onChange={handleoptionChange}
        style={{ display: "inline", width: "40%" }}
      />
    </div>
  );
};

OptionInputs.propTypes = {
  idx: PropTypes.number,
  optionState: PropTypes.array,
  handleoptionChange: PropTypes.func
};

export default OptionInputs;
