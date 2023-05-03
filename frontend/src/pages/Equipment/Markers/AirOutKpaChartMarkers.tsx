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

const AirOutKpaChartMarkers = () => {
  const [AirOutKpaMarkers, setAirOutKpaMarkers] = useState<Marker[]>([]);
  const [newAirOutKpaMarkerValue, setNewAirOutKpaMarkerValue] =
    useState<number>(0);
  const [newAirOutKpaMarkerWidth, setNewAirOutKpaMarkerWidth] =
    useState<number>(2);
  const [newAirOutKpaMarkerLegend, setNewAirOutKpaMarkerLegend] =
    useState<string>("");

  const [color, setColor] = useState<string>("#000000");

  // localStorage에서 markers 가져오기
  useEffect(() => {
    const storedAirOutKpaMarkers = localStorage.getItem(
      "AirOutKpaChartMarkers"
    );
    if (storedAirOutKpaMarkers) {
      setAirOutKpaMarkers(JSON.parse(storedAirOutKpaMarkers));
    }
  }, []);

  // localStorage에 markers 저장하기
  useEffect(() => {
    localStorage.setItem(
      "AirOutKpaChartMarkers",
      JSON.stringify(AirOutKpaMarkers)
    );
  }, [AirOutKpaMarkers]);

  const [markerType, setMarkerType] = useState<string>("warning");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMarkerType(event.target.value);
  };

  const handleAirOutKpaMarker = () => {
    // const strokeColor = markerType === "warning" ? "#FF3B30" : "#FFC041";
    const strokeColor = color;
    const legend =
      newAirOutKpaMarkerLegend.trim() !== ""
        ? newAirOutKpaMarkerLegend
        : `Value: ${newAirOutKpaMarkerValue}`;
    const newAirOutKpaMarker: Marker = {
      axis: "y",
      value: newAirOutKpaMarkerValue,
      legend,
      lineStyle: {
        stroke: strokeColor,
        strokeWidth: `${newAirOutKpaMarkerWidth}`,
      },

      // 처음 생성 시 무조건 true
      checked: true,
    };
    setAirOutKpaMarkers([...AirOutKpaMarkers, newAirOutKpaMarker]);
  };

  const handleNewMarkerValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewAirOutKpaMarkerValue(Number(event.target.value));
  };

  const handleNewMarkerWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewAirOutKpaMarkerWidth(Number(event.target.value));
  };

  const handleNewMarkerLegendChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewAirOutKpaMarkerLegend(event.target.value);
  };

  const deleteHandler = (index: number) => {
    setAirOutKpaMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers.splice(index, 1);
      return newMarkers;
    });
  };

  const handleMarkerToggle = (index: number) => {
    setAirOutKpaMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].checked = !newMarkers[index].checked;
      return newMarkers;
    });

    localStorage.setItem(
      "AirOutKpaChartMarkers",
      JSON.stringify(AirOutKpaMarkers)
    );
  };

  const handleColorChange = (color: string) => {
    // console.log(color);
    setColor(color);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "100px" }}>
        <h1>AirOutKpa Marker</h1>
        <div>
          <label htmlFor="newAirOutKpaMarkerValue">Value:</label>
          <input
            id="newAirOutKpaMarkerValue"
            type="number"
            value={newAirOutKpaMarkerValue}
            onChange={handleNewMarkerValueChange}
          />
        </div>
        <div>
          <label htmlFor="newAirOutKpaMarkerLegend">Legend:</label>
          <input
            id="newAirOutKpaMarkerLegend"
            type="text"
            value={newAirOutKpaMarkerLegend}
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
          <label htmlFor="newAirOutKpaMarkerWidth">두께: </label>
          <input
            id="newAirOutKpaMarkerWidth"
            type="number"
            value={newAirOutKpaMarkerWidth}
            onChange={handleNewMarkerWidthChange}
            min={0}
            max={10}
            // defaultValue={2}
            // value={newAirOutKpaMarkerStrokeWidth}
            // onChange={handleNewAirOutKpaMarkerStrokeWidth}
          />
        </div>
        <div>
          <ColorPicker onColorChange={handleColorChange} />
        </div>

        <button onClick={handleAirOutKpaMarker}>Add AirOutKpaMarker</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {AirOutKpaMarkers.map((AirOutKpaMarker, index) => (
          <div key={index} style={{ width: "10vw" }}>
            <Switch
              checked={AirOutKpaMarker.checked}
              onChange={(event) => handleMarkerToggle(index)}
            />
            <p>legend: {AirOutKpaMarker.legend}</p>
            <p>value: {AirOutKpaMarker.value}</p>
            <div
              style={{
                display: "inline-block",
                width: "100px",
                height: `${AirOutKpaMarker.lineStyle.strokeWidth}px`,
                marginRight: "5px",
                backgroundColor: AirOutKpaMarker.lineStyle.stroke,
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

export default AirOutKpaChartMarkers;
