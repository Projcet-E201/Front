import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import ColorPicker from "../../../components/common/ColorPicker";

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

  // localStorage에서 markers 가져오기
  useEffect(() => {
    const storedMotorMarkers = localStorage.getItem("motorChartMarkers");
    if (storedMotorMarkers) {
      setMotorMarkers(JSON.parse(storedMotorMarkers));
    }
  }, []);

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

  const handleNewMarkerWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewMotorMarkerWidth(Number(event.target.value));
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
    // console.log(color);
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
          <label htmlFor="newMotorMarkerWidth">두께: </label>
          <input
            id="newMotorMarkerWidth"
            type="number"
            value={newMotorMarkerWidth}
            onChange={handleNewMarkerWidthChange}
            min={0}
            max={10}
            // defaultValue={2}
            // value={newMotorMarkerStrokeWidth}
            // onChange={handleNewMotorMarkerStrokeWidth}
          />
        </div>
        <div>
          <div>
            {/* <button onClick={() => setShowColorPicker(!showColorPicker)}>
              {showColorPicker ? "Close" : "open"}
            </button> */}
          </div>
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
              onChange={(event) => handleMarkerToggle(index)}
            />
            {/* <p>legend: {motorMarker.legend}</p> */}
            <p>value: {motorMarker.value}</p>
            <div
              id="colorline"
              style={{
                display: "inline-block",
                width: "100px",
                height: `${motorMarker.lineStyle.strokeWidth}px`,
                marginRight: "5px",
                backgroundColor: motorMarker.lineStyle.stroke,
                border: "1px solid #ddd",
              }}
            />
            <button onClick={() => deleteHandler(index)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotorChartMarkers;
