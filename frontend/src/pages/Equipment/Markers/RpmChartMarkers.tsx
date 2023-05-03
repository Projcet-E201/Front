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

const RpmChartMarkers = () => {
  const [RpmMarkers, setRpmMarkers] = useState<Marker[]>([]);
  const [newRpmMarkerValue, setNewRpmMarkerValue] = useState<number>(0);
  const [newRpmMarkerWidth, setNewRpmMarkerWidth] = useState<number>(2);
  const [newRpmMarkerLegend, setNewRpmMarkerLegend] = useState<string>("");

  const [color, setColor] = useState<string>("#FF3B30");

  // localStorage에서 markers 가져오기
  useEffect(() => {
    const storedRpmMarkers = localStorage.getItem("RpmChartMarkers");
    if (storedRpmMarkers) {
      setRpmMarkers(JSON.parse(storedRpmMarkers));
    }
  }, []);

  // localStorage에 markers 저장하기
  useEffect(() => {
    localStorage.setItem("RpmChartMarkers", JSON.stringify(RpmMarkers));
  }, [RpmMarkers]);

  const [markerType, setMarkerType] = useState<string>("warning");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMarkerType(event.target.value);
  };

  const handleRpmMarker = () => {
    // const strokeColor = markerType === "warning" ? "#FF3B30" : "#FFC041";
    const strokeColor = color;
    const legend =
      newRpmMarkerLegend.trim() !== ""
        ? newRpmMarkerLegend
        : `Value: ${newRpmMarkerValue}`;
    const newRpmMarker: Marker = {
      axis: "y",
      value: newRpmMarkerValue,
      legend,
      lineStyle: {
        stroke: strokeColor,
        strokeWidth: `${newRpmMarkerWidth}`,
      },

      // 처음 생성 시 무조건 true
      checked: true,
    };
    setRpmMarkers([...RpmMarkers, newRpmMarker]);
  };

  const handleNewMarkerValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewRpmMarkerValue(Number(event.target.value));
  };

  const handleNewMarkerWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewRpmMarkerWidth(Number(event.target.value));
  };

  const handleNewMarkerLegendChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewRpmMarkerLegend(event.target.value);
  };

  const deleteHandler = (index: number) => {
    setRpmMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers.splice(index, 1);
      return newMarkers;
    });
  };

  const handleMarkerToggle = (index: number) => {
    setRpmMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].checked = !newMarkers[index].checked;
      return newMarkers;
    });

    localStorage.setItem("RpmChartMarkers", JSON.stringify(RpmMarkers));
  };

  const handleColorChange = (color: string) => {
    // console.log(color);
    setColor(color);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "100px" }}>
        <h1>Rpm Marker</h1>
        <div>
          <label htmlFor="newRpmMarkerValue">Value:</label>
          <input
            id="newRpmMarkerValue"
            type="number"
            value={newRpmMarkerValue}
            onChange={handleNewMarkerValueChange}
          />
        </div>
        <div>
          <label htmlFor="newRpmMarkerLegend">Legend:</label>
          <input
            id="newRpmMarkerLegend"
            type="text"
            value={newRpmMarkerLegend}
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
          <label htmlFor="newRpmMarkerWidth">두께: </label>
          <input
            id="newRpmMarkerWidth"
            type="number"
            value={newRpmMarkerWidth}
            onChange={handleNewMarkerWidthChange}
            min={0}
            max={10}
            // defaultValue={2}
            // value={newRpmMarkerStrokeWidth}
            // onChange={handleNewRpmMarkerStrokeWidth}
          />
        </div>
        <div>
          <ColorPicker onColorChange={handleColorChange} />
        </div>

        <button onClick={handleRpmMarker}>Add RpmMarker</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {RpmMarkers.map((RpmMarker, index) => (
          <div key={index} style={{ width: "10vw" }}>
            <Switch
              checked={RpmMarker.checked}
              onChange={(event) => handleMarkerToggle(index)}
            />
            <p>legend: {RpmMarker.legend}</p>
            <p>value: {RpmMarker.value}</p>
            <div
              style={{
                display: "inline-block",
                width: "100px",
                height: `${RpmMarker.lineStyle.strokeWidth}px`,
                marginRight: "5px",
                backgroundColor: RpmMarker.lineStyle.stroke,
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

export default RpmChartMarkers;
