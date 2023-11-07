import React from "react";
import { Slider } from "antd";

const InputSlider = ({
  label,
  inputValue1,
  setInputValue1,
  marks,
  max,
  steps,
}) => {
  return (
    <div>
      <div>
        <div className="my-6">
          <span className="font-mono  font-medium	 text-blue-600">
            {label} :{" "}
          </span>
          <span>
            {" "}
            <input
              className="bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5"
              type="number"
              min={0}
              placeholder="Enter value"
              value={inputValue1}
              onChange={(e) => setInputValue1(e.target.value)}
            />
          </span>
        </div>
        <div>
          <Slider
            styles={{
              track: {
                background: "gray",
              },
              tracks: {
                background: "red",
              },
            }}
            min={0}
            max={max}
            marks={marks}
            step={steps}
            onChange={(value) => {
              setInputValue1(value);
            }}
            value={Number(inputValue1) || 0}
          />
        </div>
      </div>
    </div>
  );
};

export default InputSlider;
