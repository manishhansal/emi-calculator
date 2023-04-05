import React from "react";

const TextInput = ({ title, state, setState,max }) => {
  return (
    <>
      <span className="title">{title}</span>
      <input
        type="number"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={title}
        min={0}
        max={max}
      />
    </>
  );
};

export default TextInput;
