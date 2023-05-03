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

const LoadChartMarkers = () => {
  const [LoadMarkers, setLoadMarkers] = useState<Marker[]>([]);
  const [newLoadMarkerValue, setNewLoadMarkerValue] = useState<number>(0);
  const [newLoadMarkerWidth, setNewLoadMarkerWidth] = useState<number>(2);
  const [newLoadMarkerLegend, setNewLoadMarkerLegend] = useState<string>("");

  const [color, setColor] = useState<string>("#FF3B30");

  // localStorage에서 markers 가져오기
  useEffect(() => {
    const storedLoadMarkers = localStorage.getItem("LoadChartMarkers");
    if (storedLoadMarkers) {
      setLoadMarkers(JSON.parse(storedLoadMarkers));
    }
  }, []);

  // localStorage에 markers 저장하기
  useEffect(() => {
    localStorage.setItem("LoadChartMarkers", JSON.stringify(LoadMarkers));
  }, [LoadMarkers]);

  const [markerType, setMarkerType] = useState<string>("warning");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMarkerType(event.target.value);
  };

  const handleLoadMarker = () => {
    // const strokeColor = markerType === "warning" ? "#FF3B30" : "#FFC041";
    const strokeColor = color;
    const legend =
      newLoadMarkerLegend.trim() !== ""
        ? newLoadMarkerLegend
        : `Value: ${newLoadMarkerValue}`;
    const newLoadMarker: Marker = {
      axis: "y",
      value: newLoadMarkerValue,
      legend,
      lineStyle: {
        stroke: strokeColor,
        strokeWidth: `${newLoadMarkerWidth}`,
      },

      // 처음 생성 시 무조건 true
      checked: true,
    };
    setLoadMarkers([...LoadMarkers, newLoadMarker]);
  };

  const handleNewMarkerValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewLoadMarkerValue(Number(event.target.value));
  };

  const handleNewMarkerWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewLoadMarkerWidth(Number(event.target.value));
  };

  const handleNewMarkerLegendChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewLoadMarkerLegend(event.target.value);
  };

  const deleteHandler = (index: number) => {
    setLoadMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers.splice(index, 1);
      return newMarkers;
    });
  };

  const handleMarkerToggle = (index: number) => {
    setLoadMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].checked = !newMarkers[index].checked;
      return newMarkers;
    });

    localStorage.setItem("LoadChartMarkers", JSON.stringify(LoadMarkers));
  };

  const handleColorChange = (color: string) => {
    // console.log(color);
    setColor(color);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "100px" }}>
        <h1>Load Marker</h1>
        <div>
          <label htmlFor="newLoadMarkerValue">Value:</label>
          <input
            id="newLoadMarkerValue"
            type="number"
            value={newLoadMarkerValue}
            onChange={handleNewMarkerValueChange}
          />
        </div>
        <div>
          <label htmlFor="newLoadMarkerLegend">Legend:</label>
          <input
            id="newLoadMarkerLegend"
            type="text"
            value={newLoadMarkerLegend}
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
          <label htmlFor="newLoadMarkerWidth">두께: </label>
          <input
            id="newLoadMarkerWidth"
            type="number"
            value={newLoadMarkerWidth}
            onChange={handleNewMarkerWidthChange}
            min={0}
            max={10}
            // defaultValue={2}
            // value={newLoadMarkerStrokeWidth}
            // onChange={handleNewLoadMarkerStrokeWidth}
          />
        </div>
        <div>
          <ColorPicker onColorChange={handleColorChange} />
        </div>

        <button onClick={handleLoadMarker}>Add LoadMarker</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {LoadMarkers.map((LoadMarker, index) => (
          <div key={index} style={{ width: "10vw" }}>
            <Switch
              checked={LoadMarker.checked}
              onChange={(event) => handleMarkerToggle(index)}
            />
            <p>legend: {LoadMarker.legend}</p>
            <p>value: {LoadMarker.value}</p>
            <div
              style={{
                display: "inline-block",
                width: "100px",
                height: `${LoadMarker.lineStyle.strokeWidth}px`,
                marginRight: "5px",
                backgroundColor: LoadMarker.lineStyle.stroke,
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

export default LoadChartMarkers;
