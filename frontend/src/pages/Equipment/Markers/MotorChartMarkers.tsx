import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import ColorPicker from "../../../components/common/ColorPicker";
import { Select, MenuItem } from "@mui/material";

import { SketchPicker } from "react-color";

interface LineStyle {
  stroke: string;
  strokeWidth: string;
}

interface Marker {
  axis: string;
  value: number;
  legend: string;
  lineStyle: LineStyle;
  checked: boolean;
}

const MotorChartMarkers = () => {
  const [motorMarkers, setMotorMarkers] = useState<Marker[]>([]);
  const [newMotorMarkerValue, setNewMotorMarkerValue] = useState<number>(0);
  const [newMotorMarkerWidth, setNewMotorMarkerWidth] = useState<number>(2);
  const [newMotorMarkerLegend, setNewMotorMarkerLegend] = useState<string>("");

  const [color, setColor] = useState<string>("#FF3B30");

  const [showColorPicker, setShowColorPicker] = useState(false);

  // localStorage에서 markers 가져오기
  useEffect(() => {
    const storedMotorMarkers = localStorage.getItem("motorChartMarkers");
    if (storedMotorMarkers) {
      setMotorMarkers(JSON.parse(storedMotorMarkers));
    }
  }, []);

  const handleMarkerValueChange = (index: number, value: number) => {
    setMotorMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].value = value;
      return newMarkers;
    });
  };

  const handleMarkerLegendChange = (index: number, legend: any) => {
    setMotorMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].legend = legend;
      return newMarkers;
    });
  };

  // localStorage에 markers 저장하기
  useEffect(() => {
    localStorage.setItem("motorChartMarkers", JSON.stringify(motorMarkers));
  }, [motorMarkers]);

  const handleMotorMarker = () => {
    const strokeColor = color;
    const legend =
      newMotorMarkerLegend.trim() !== ""
        ? newMotorMarkerLegend
        : `Value: ${newMotorMarkerValue}`;
    const newMotorMarker: Marker = {
      axis: "y",
      value: newMotorMarkerValue,
      legend,
      lineStyle: { stroke: strokeColor, strokeWidth: `${newMotorMarkerWidth}` },

      // 처음 생성 시 무조건 true
      checked: true,
    };
    setMotorMarkers([...motorMarkers, newMotorMarker]);
  };

  const handleNewMarkerValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewMotorMarkerValue(Number(event.target.value));
  };

  const handleNewMarkerLegendChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewMotorMarkerLegend(event.target.value);
  };

  const deleteHandler = (index: number) => {
    setMotorMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers.splice(index, 1);
      return newMarkers;
    });
  };

  const handleMarkerToggle = (index: number) => {
    setMotorMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].checked = !newMarkers[index].checked;
      return newMarkers;
    });

    localStorage.setItem("motorChartMarkers", JSON.stringify(motorMarkers));
  };

  const handleColorChange = (color: string) => {
    setColor(color);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "100px" }}>
        <h1>Motor Marker</h1>
        <div>
          <label htmlFor="newMotorMarkerValue">Value:</label>
          <input
            id="newMotorMarkerValue"
            type="number"
            value={newMotorMarkerValue}
            onChange={handleNewMarkerValueChange}
          />
        </div>
        <div>
          <label htmlFor="newMotorMarkerLegend">Legend:</label>
          <input
            id="newMotorMarkerLegend"
            type="text"
            value={newMotorMarkerLegend}
            onChange={handleNewMarkerLegendChange}
            placeholder="비어있을 시 Value값이 됩니다."
          />
        </div>

        <div>
          {/* <label htmlFor="newMotorMarkerWidth">두께: </label> */}
          <Select
            value={newMotorMarkerWidth}
            onChange={(e) => setNewMotorMarkerWidth(Number(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((width) => (
              <MenuItem key={width} value={width}>
                <div
                  style={{
                    display: "inline-block",
                    width: "100px",
                    height: `${width}px`,
                    marginRight: "5px",
                    border: "1px solid #ddd",
                    // backgroundColor: "black",
                    backgroundColor: color,
                  }}
                ></div>
              </MenuItem>
            ))}
          </Select>
        </div>

        <div>
          <div>
            <ColorPicker onColorChange={handleColorChange} />
          </div>
        </div>

        <button onClick={handleMotorMarker}>Add MotorMarker</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {motorMarkers.map((motorMarker, index) => (
          <div key={index} style={{ width: "10vw" }}>
            <Switch
              checked={motorMarker.checked}
              onChange={() => handleMarkerToggle(index)}
            />
            <div>
              <input
                type="text"
                value={motorMarker.legend}
                onChange={(event) =>
                  handleMarkerLegendChange(index, String(event.target.value))
                }
              />
            </div>
            <div style={{ display: "flex" }}>
              <input
                type="number"
                value={motorMarker.value}
                onChange={(event) =>
                  handleMarkerValueChange(index, Number(event.target.value))
                }
              />
            </div>
            <div
              id="colorBar"
              style={{
                display: "inline-block",
                width: "100px",
                height: `${motorMarker.lineStyle.strokeWidth}px`,
                marginRight: "5px",
                backgroundColor: motorMarker.lineStyle.stroke,
                border: "1px solid #ddd",
              }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            ></div>
            {showColorPicker && (
              <div style={{ position: "absolute", zIndex: 2 }}>
                <SketchPicker
                  color={color}
                  onChange={(c) => handleColorChange(c.hex)}
                />
              </div>
            )}
            <div>
              <button onClick={() => deleteHandler(index)}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotorChartMarkers;
