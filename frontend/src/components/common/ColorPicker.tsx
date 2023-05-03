import React, { useEffect, useState } from "react";
import {
  SketchPicker,
  TwitterPicker,
  CirclePicker,
  SwatchesPicker,
  SliderPicker,
} from "react-color";

interface Props {
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<Props> = ({ onColorChange }) => {
  // const ColorPicker: React.FC = () => {
  const [showColorPicker, setShowColorPicker] = useState(true);
  const [color, setColor] = useState("#FF3B30");

  const handleColorChange = (newColor: any) => {
    const hexColor = newColor.hex;
    // console.log(hexColor);
    setColor(hexColor);
    onColorChange(hexColor);
  };

  return (
    <div>
      {/* <button onClick={() => setShowColorPicker(!showColorPicker)}>
        {showColorPicker ? "Close color picker" : "Pick a color"}
      </button> */}
      {/* <div
        onClick={() => setShowColorPicker(!showColorPicker)}
        style={{
          display: "inline-block",
          width: "100px",
          height: "20px",
          marginRight: "5px",
          backgroundColor: color,
          border: "1px solid #ddd",
        }}
      ></div> */}
      {showColorPicker && (
        <div>
          <SketchPicker
            color={color}
            onChange={handleColorChange}
            presetColors={[
              { color: "#FF3B30", title: "경고" },
              { color: "#FFC041", title: "주의" },
              { color: "#4CD964", title: "안전" },
            ]}
          />
          <br />
          {/* <TwitterPicker color={color} onChange={handleColorChange} /> */}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
