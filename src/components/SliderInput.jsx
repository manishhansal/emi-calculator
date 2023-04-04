import React from "react";
import { numberWithCommas } from "../utils/config";

const SliderInput = ({
  title,
  state,
  min,
  max,
  onChange,
  labelMin,
  labelMax,
  underlineTitle,
}) => {
  return (
    <>
      <span className="title">{title}</span>
      {state > 0 && (
        <span className="title" style={{ textDecoration: "underline" }}>
          {underlineTitle}
        </span>
      )}

      <div>
        <input
          type="range"
          min={min}
          max={max}
          className="slider"
          value={state}
          onChange={onChange}
        />

        <div className="labels">
          <label>{labelMin ?? numberWithCommas(min)}</label>
          <label>{numberWithCommas(state)}</label>
          <label>{labelMax ?? numberWithCommas(max)}</label>
        </div>
      </div>
    </>
  );
};

export default SliderInput;
