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

const WaterChartMarkers = () => {
  const [WaterMarkers, setWaterMarkers] = useState<Marker[]>([]);
  const [newWaterMarkerValue, setNewWaterMarkerValue] = useState<number>(0);
  const [newWaterMarkerWidth, setNewWaterMarkerWidth] = useState<number>(2);
  const [newWaterMarkerLegend, setNewWaterMarkerLegend] = useState<string>("");

  const [color, setColor] = useState<string>("#FF3B30");

  // localStorage에서 markers 가져오기
  useEffect(() => {
    const storedWaterMarkers = localStorage.getItem("WaterChartMarkers");
    if (storedWaterMarkers) {
      setWaterMarkers(JSON.parse(storedWaterMarkers));
    }
  }, []);

  // localStorage에 markers 저장하기
  useEffect(() => {
    localStorage.setItem("WaterChartMarkers", JSON.stringify(WaterMarkers));
  }, [WaterMarkers]);

  const [markerType, setMarkerType] = useState<string>("warning");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMarkerType(event.target.value);
  };

  const handleWaterMarker = () => {
    // const strokeColor = markerType === "warning" ? "#FF3B30" : "#FFC041";
    const strokeColor = color;
    const legend =
      newWaterMarkerLegend.trim() !== ""
        ? newWaterMarkerLegend
        : `Value: ${newWaterMarkerValue}`;
    const newWaterMarker: Marker = {
      axis: "y",
      value: newWaterMarkerValue,
      legend,
      lineStyle: {
        stroke: strokeColor,
        strokeWidth: `${newWaterMarkerWidth}`,
      },

      // 처음 생성 시 무조건 true
      checked: true,
    };
    setWaterMarkers([...WaterMarkers, newWaterMarker]);
  };

  const handleNewMarkerValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewWaterMarkerValue(Number(event.target.value));
  };

  const handleNewMarkerWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewWaterMarkerWidth(Number(event.target.value));
  };

  const handleNewMarkerLegendChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewWaterMarkerLegend(event.target.value);
  };

  const deleteHandler = (index: number) => {
    setWaterMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers.splice(index, 1);
      return newMarkers;
    });
  };

  const handleMarkerToggle = (index: number) => {
    setWaterMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].checked = !newMarkers[index].checked;
      return newMarkers;
    });

    localStorage.setItem("WaterChartMarkers", JSON.stringify(WaterMarkers));
  };

  const handleColorChange = (color: string) => {
    // console.log(color);
    setColor(color);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "100px" }}>
        <h1>Water Marker</h1>
        <div>
          <label htmlFor="newWaterMarkerValue">Value:</label>
          <input
            id="newWaterMarkerValue"
            type="number"
            value={newWaterMarkerValue}
            onChange={handleNewMarkerValueChange}
          />
        </div>
        <div>
          <label htmlFor="newWaterMarkerLegend">Legend:</label>
          <input
            id="newWaterMarkerLegend"
            type="text"
            value={newWaterMarkerLegend}
            onChange={handleNewMarkerLegendChange}
            placeholder="비어있을 시 Value값이 됩니다."
          />
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="warning"
              checked={markerType === "warning"}
              onChange={handleRadioChange}
            />
            경고
          </label>
          <label>
            <input
              type="radio"
              value="caution"
              checked={markerType === "caution"}
              onChange={handleRadioChange}
            />
            주의
          </label>
        </div>
        <div>
          <label htmlFor="newWaterMarkerWidth">두께: </label>
          <input
            id="newWaterMarkerWidth"
            type="number"
            value={newWaterMarkerWidth}
            onChange={handleNewMarkerWidthChange}
            min={0}
            max={10}
            // defaultValue={2}
            // value={newWaterMarkerStrokeWidth}
            // onChange={handleNewWaterMarkerStrokeWidth}
          />
        </div>
        <div>
          <ColorPicker onColorChange={handleColorChange} />
        </div>

        <button onClick={handleWaterMarker}>Add WaterMarker</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {WaterMarkers.map((WaterMarker, index) => (
          <div key={index} style={{ width: "10vw" }}>
            <Switch
              checked={WaterMarker.checked}
              onChange={(event) => handleMarkerToggle(index)}
            />
            <p>legend: {WaterMarker.legend}</p>
            <p>value: {WaterMarker.value}</p>
            <div
              style={{
                display: "inline-block",
                width: "100px",
                height: `${WaterMarker.lineStyle.strokeWidth}px`,
                marginRight: "5px",
                backgroundColor: WaterMarker.lineStyle.stroke,
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

export default WaterChartMarkers;
