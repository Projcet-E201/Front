import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";

interface Marker {
  axis: string;
  value: number;
  legend: string;
  lineStyle: any;
  checked: boolean;
}

const VacuumChartMarkers = () => {
  const [VacuumMarkers, setVacuumMarkers] = useState<Marker[]>([]);
  const [newVacuumMarkerValue, setNewVacuumMarkerValue] = useState<number>(0);
  const [newVacuumMarkerWidth, setNewVacuumMarkerWidth] = useState<number>(2);
  const [newVacuumMarkerLegend, setNewVacuumMarkerLegend] =
    useState<string>("");

  // localStorage에서 markers 가져오기
  useEffect(() => {
    const storedVacuumMarkers = localStorage.getItem("VacuumChartMarkers");
    if (storedVacuumMarkers) {
      setVacuumMarkers(JSON.parse(storedVacuumMarkers));
    }
  }, []);

  // localStorage에 markers 저장하기
  useEffect(() => {
    localStorage.setItem("VacuumChartMarkers", JSON.stringify(VacuumMarkers));
  }, [VacuumMarkers]);

  const [markerType, setMarkerType] = useState<string>("warning");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMarkerType(event.target.value);
  };

  const handleVacuumMarker = () => {
    const strokeColor = markerType === "warning" ? "#FF3B30" : "#FFC041";
    const legend =
      newVacuumMarkerLegend.trim() !== ""
        ? newVacuumMarkerLegend
        : `Value: ${newVacuumMarkerValue}`;
    const newVacuumMarker: Marker = {
      axis: "y",
      value: newVacuumMarkerValue,
      legend,
      lineStyle: {
        stroke: strokeColor,
        strokeWidth: `${newVacuumMarkerWidth}`,
      },

      // 처음 생성 시 무조건 true
      checked: true,
    };
    setVacuumMarkers([...VacuumMarkers, newVacuumMarker]);
  };

  const handleNewMarkerValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewVacuumMarkerValue(Number(event.target.value));
  };

  const handleNewMarkerWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewVacuumMarkerWidth(Number(event.target.value));
  };

  const handleNewMarkerLegendChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewVacuumMarkerLegend(event.target.value);
  };

  const deleteHandler = (index: number) => {
    setVacuumMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers.splice(index, 1);
      return newMarkers;
    });
  };

  const handleMarkerToggle = (index: number) => {
    setVacuumMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].checked = !newMarkers[index].checked;
      return newMarkers;
    });

    localStorage.setItem("VacuumChartMarkers", JSON.stringify(VacuumMarkers));
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "100px" }}>
        <h1>Vacuum Marker</h1>
        <div>
          <label htmlFor="newVacuumMarkerValue">Value:</label>
          <input
            id="newVacuumMarkerValue"
            type="number"
            value={newVacuumMarkerValue}
            onChange={handleNewMarkerValueChange}
          />
        </div>
        <div>
          <label htmlFor="newVacuumMarkerLegend">Legend:</label>
          <input
            id="newVacuumMarkerLegend"
            type="text"
            value={newVacuumMarkerLegend}
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
          <label htmlFor="newVacuumMarkerWidth">두께: </label>
          <input
            id="newVacuumMarkerWidth"
            type="number"
            value={newVacuumMarkerWidth}
            onChange={handleNewMarkerWidthChange}
            min={0}
            max={100}
            defaultValue={2}
            // value={newVacuumMarkerStrokeWidth}
            // onChange={handleNewVacuumMarkerStrokeWidth}
          />
        </div>
        <button onClick={handleVacuumMarker}>Add VacuumMarker</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {VacuumMarkers.map((VacuumMarker, index) => (
          <div key={index} style={{ width: "10vw" }}>
            <Switch
              checked={VacuumMarker.checked}
              onChange={(event) => handleMarkerToggle(index)}
            />
            <p>legend: {VacuumMarker.legend}</p>
            <p>value: {VacuumMarker.value}</p>
            {/* <p>색상: {VacuumMarker.lineStyle.stroke}</p> */}
            {VacuumMarker.lineStyle.stroke === "#FFC041" ? (
              <p>주의</p>
            ) : (
              <p>경고</p>
            )}
            <p>두께: {VacuumMarker.lineStyle.strokeWidth}</p>
            <button onClick={() => deleteHandler(index)}>삭제</button>
            <p>--------------------------</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VacuumChartMarkers;
