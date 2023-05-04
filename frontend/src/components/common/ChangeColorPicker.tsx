import React, { useEffect, useState } from "react";
import { TwitterPicker } from "react-color";

interface Props {
  onColorChange: (color: string) => void;
}

const ChangeColorPicker: React.FC<Props> = ({ onColorChange }) => {
  // const ChangeColorPicker: React.FC = () => {
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
            "#5856D6",
            "#5AC8FA", // 하늘색
            "#AF52DE", // 보라색
            "#FFD3E0", // 연분홍색
          ]}
          triangle="hide" // 삼각형 화살표 모양
          width="280px" // default 276px
        />
      </div>
    </div>
  );
};

export default ChangeColorPicker;