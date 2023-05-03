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

const AirOutMpaChartMarkers = () => {
  const [AirOutMpaMarkers, setAirOutMpaMarkers] = useState<Marker[]>([]);
  const [newAirOutMpaMarkerValue, setNewAirOutMpaMarkerValue] =
    useState<number>(0);
  const [newAirOutMpaMarkerWidth, setNewAirOutMpaMarkerWidth] =
    useState<number>(2);
  const [newAirOutMpaMarkerLegend, setNewAirOutMpaMarkerLegend] =
    useState<string>("");

  const [color, setColor] = useState<string>("#000000");

  // localStorage에서 markers 가져오기
  useEffect(() => {
    const storedAirOutMpaMarkers = localStorage.getItem(
      "AirOutMpaChartMarkers"
    );
    if (storedAirOutMpaMarkers) {
      setAirOutMpaMarkers(JSON.parse(storedAirOutMpaMarkers));
    }
  }, []);

  // localStorage에 markers 저장하기
  useEffect(() => {
    localStorage.setItem(
      "AirOutMpaChartMarkers",
      JSON.stringify(AirOutMpaMarkers)
    );
  }, [AirOutMpaMarkers]);

  const [markerType, setMarkerType] = useState<string>("warning");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMarkerType(event.target.value);
  };

  const handleAirOutMpaMarker = () => {
    // const strokeColor = markerType === "warning" ? "#FF3B30" : "#FFC041";
    const strokeColor = color;
    const legend =
      newAirOutMpaMarkerLegend.trim() !== ""
        ? newAirOutMpaMarkerLegend
        : `Value: ${newAirOutMpaMarkerValue}`;
    const newAirOutMpaMarker: Marker = {
      axis: "y",
      value: newAirOutMpaMarkerValue,
      legend,
      lineStyle: {
        stroke: strokeColor,
        strokeWidth: `${newAirOutMpaMarkerWidth}`,
      },

      // 처음 생성 시 무조건 true
      checked: true,
    };
    setAirOutMpaMarkers([...AirOutMpaMarkers, newAirOutMpaMarker]);
  };

  const handleNewMarkerValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewAirOutMpaMarkerValue(Number(event.target.value));
  };

  const handleNewMarkerWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewAirOutMpaMarkerWidth(Number(event.target.value));
  };

  const handleNewMarkerLegendChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewAirOutMpaMarkerLegend(event.target.value);
  };

  const deleteHandler = (index: number) => {
    setAirOutMpaMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers.splice(index, 1);
      return newMarkers;
    });
  };

  const handleMarkerToggle = (index: number) => {
    setAirOutMpaMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].checked = !newMarkers[index].checked;
      return newMarkers;
    });

    localStorage.setItem(
      "AirOutMpaChartMarkers",
      JSON.stringify(AirOutMpaMarkers)
    );
  };

  const handleColorChange = (color: string) => {
    // console.log(color);
    setColor(color);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "100px" }}>
        <h1>AirOutMpa Marker</h1>
        <div>
          <label htmlFor="newAirOutMpaMarkerValue">Value:</label>
          <input
            id="newAirOutMpaMarkerValue"
            type="number"
            value={newAirOutMpaMarkerValue}
            onChange={handleNewMarkerValueChange}
          />
        </div>
        <div>
          <label htmlFor="newAirOutMpaMarkerLegend">Legend:</label>
          <input
            id="newAirOutMpaMarkerLegend"
            type="text"
            value={newAirOutMpaMarkerLegend}
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
          <label htmlFor="newAirOutMpaMarkerWidth">두께: </label>
          <input
            id="newAirOutMpaMarkerWidth"
            type="number"
            value={newAirOutMpaMarkerWidth}
            onChange={handleNewMarkerWidthChange}
            min={0}
            max={10}
            // defaultValue={2}
            // value={newAirOutMpaMarkerStrokeWidth}
            // onChange={handleNewAirOutMpaMarkerStrokeWidth}
          />
        </div>
        <div>
          <ColorPicker onColorChange={handleColorChange} />
        </div>

        <button onClick={handleAirOutMpaMarker}>Add AirOutMpaMarker</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {AirOutMpaMarkers.map((AirOutMpaMarker, index) => (
          <div key={index} style={{ width: "10vw" }}>
            <Switch
              checked={AirOutMpaMarker.checked}
              onChange={(event) => handleMarkerToggle(index)}
            />
            <p>legend: {AirOutMpaMarker.legend}</p>
            <p>value: {AirOutMpaMarker.value}</p>
            <div
              style={{
                display: "inline-block",
                width: "100px",
                height: `${AirOutMpaMarker.lineStyle.strokeWidth}px`,
                marginRight: "5px",
                backgroundColor: AirOutMpaMarker.lineStyle.stroke,
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

export default AirOutMpaChartMarkers;
