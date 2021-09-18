import React from "react";

// FIXME: When you change the slider, it is doing something weird with the markers
// Maybe need to change how we query stuff
function Slider({
  value,
  onChange,
}: {
  value: number;
  onChange: (arg0: number) => void;
}) {
  return (
    <>
      <label htmlFor="driver-slider">Number of drivers slider: {value}</label>
      <input
        id="driver-slider"
        type="range"
        step="1"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
    </>
  );
}

export default Slider;
