import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";

interface Marker {
  axis: string;
  value: number;
  legend: string;
  lineStyle: any;
  checked: boolean;
}

const AirInChartMarkers = () => {
  const [AirInMarkers, setAirInMarkers] = useState<Marker[]>([]);
  const [newAirInMarkerValue, setNewAirInMarkerValue] = useState<number>(0);
  const [newAirInMarkerWidth, setNewAirInMarkerWidth] = useState<number>(2);
  const [newAirInMarkerLegend, setNewAirInMarkerLegend] = useState<string>("");

  // localStorage에서 markers 가져오기
  useEffect(() => {
    const storedAirInMarkers = localStorage.getItem("AirInChartMarkers");
    if (storedAirInMarkers) {
      setAirInMarkers(JSON.parse(storedAirInMarkers));
    }
  }, []);

  // localStorage에 markers 저장하기
  useEffect(() => {
    localStorage.setItem("AirInChartMarkers", JSON.stringify(AirInMarkers));
  }, [AirInMarkers]);

  const [markerType, setMarkerType] = useState<string>("warning");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMarkerType(event.target.value);
  };

  const handleAirInMarker = () => {
    const strokeColor = markerType === "warning" ? "#FF3B30" : "#FFC041";
    const legend =
      newAirInMarkerLegend.trim() !== ""
        ? newAirInMarkerLegend
        : `Value: ${newAirInMarkerValue}`;
    const newAirInMarker: Marker = {
      axis: "y",
      value: newAirInMarkerValue,
      legend,
      lineStyle: { stroke: strokeColor, strokeWidth: `${newAirInMarkerWidth}` },

      // 처음 생성 시 무조건 true
      checked: true,
    };
    setAirInMarkers([...AirInMarkers, newAirInMarker]);
  };

  const handleNewMarkerValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewAirInMarkerValue(Number(event.target.value));
  };

  const handleNewMarkerWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewAirInMarkerWidth(Number(event.target.value));
  };

  const handleNewMarkerLegendChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewAirInMarkerLegend(event.target.value);
  };

  const deleteHandler = (index: number) => {
    setAirInMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers.splice(index, 1);
      return newMarkers;
    });
  };

  const handleMarkerToggle = (index: number) => {
    setAirInMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].checked = !newMarkers[index].checked;
      return newMarkers;
    });

    localStorage.setItem("AirInChartMarkers", JSON.stringify(AirInMarkers));
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "100px" }}>
        <h1>AirIn Marker</h1>
        <div>
          <label htmlFor="newAirInMarkerValue">Value:</label>
          <input
            id="newAirInMarkerValue"
            type="number"
            value={newAirInMarkerValue}
            onChange={handleNewMarkerValueChange}
          />
        </div>
        <div>
          <label htmlFor="newAirInMarkerLegend">Legend:</label>
          <input
            id="newAirInMarkerLegend"
            type="text"
            value={newAirInMarkerLegend}
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
          <label htmlFor="newAirInMarkerWidth">두께: </label>
          <input
            id="newAirInMarkerWidth"
            type="number"
            value={newAirInMarkerWidth}
            onChange={handleNewMarkerWidthChange}
            min={0}
            max={10}
            defaultValue={2}
            // value={newAirInMarkerStrokeWidth}
            // onChange={handleNewAirInMarkerStrokeWidth}
          />
        </div>
        <button onClick={handleAirInMarker}>Add AirInMarker</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {AirInMarkers.map((AirInMarker, index) => (
          <div key={index} style={{ width: "10vw" }}>
            <Switch
              checked={AirInMarker.checked}
              onChange={(event) => handleMarkerToggle(index)}
            />
            <p>legend: {AirInMarker.legend}</p>
            <p>value: {AirInMarker.value}</p>
            {/* <p>색상: {AirInMarker.lineStyle.stroke}</p> */}
            {AirInMarker.lineStyle.stroke === "#FFC041" ? (
              <p>주의</p>
            ) : (
              <p>경고</p>
            )}
            <p>두께: {AirInMarker.lineStyle.strokeWidth}</p>
            <button onClick={() => deleteHandler(index)}>삭제</button>
            <p>---------------------------</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirInChartMarkers;
