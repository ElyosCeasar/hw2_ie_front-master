import React, { useState } from "react";
import OptionInputs from "./optionInputs";
import { Button, Input } from "antd";

const OptionManager = props => {
  const blankoption = { name: "", age: "" };
  let temp;

  if (props.intitialVal) {
    temp = props.intitialVal;
  } else {
    temp = blankoption;
  }
  const [optionState, setoptionState] = useState([{ ...temp }]);
  const addoption = () => {
    setoptionState([...optionState, { ...blankoption }]);
  };

  const handleoptionChange = e => {
    const updatedoptions = [...optionState];
    updatedoptions[e.target.dataset.idx][e.target.className] = e.target.value;
    setoptionState(updatedoptions);
    props.onChangeOptions(updatedoptions);
  };

  return (
    <div>
      <Button
        onClick={addoption}
        style={{
          marginLeft: "10px",
          marginRight: "10px",
          marginBottom: "10px"
        }}
      >
        {props.direc === "rtl" ? "اضافه کردن" : "Add"}
      </Button>
      {optionState.map((val, idx) => (
        <OptionInputs
          key={`option-${idx}`}
          idx={idx}
          optionState={optionState}
          direc={props.direc}
          handleoptionChange={handleoptionChange}
        />
      ))}
    </div>
  );
};

export default OptionManager;
