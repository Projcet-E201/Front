import React, { useState } from "react";
import { SketchPicker } from "react-color";

interface Props {
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<Props> = ({ onColorChange }) => {
  // const ColorPicker: React.FC = () => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState("#FF3B30");

  const handleColorChange = (newColor: any) => {
    const hexColor = newColor.hex;
    // console.log(hexColor);
    setColor(hexColor);
    onColorChange(hexColor);
  };

  return (
    <div>
      <button onClick={() => setShowColorPicker(!showColorPicker)}>
        {showColorPicker ? "Close color picker" : "Pick a color"}
      </button>
      {showColorPicker && (
        <SketchPicker
          color={color}
          onChange={handleColorChange}
          presetColors={["#FF0000", "#FFFF00", "#0000FF"]}
        />
      )}
    </div>
  );
};

export default ColorPicker;
