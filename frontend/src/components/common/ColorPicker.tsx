import React, { useEffect, useState } from "react";
import { TwitterPicker } from "react-color";

interface Props {
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<Props> = ({ onColorChange }) => {
  const [color, setColor] = useState("#FF3B30");

  const handleColorChange = (newColor: any) => {
    const hexColor = newColor.hex;
    setColor(hexColor);
    onColorChange(hexColor);
  };

  return (
    <div>
      <div>
        <br />
        <TwitterPicker
          color={color}
          onChange={handleColorChange}
          colors={[
            "#FF3B30",
            "#FFC041",
            "#4CD964",
            "#007AFF",
            "#5856D6",
            "#FF2D55",
          ]}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
