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

const VacuumChartMarkers = () => {
  const [VacuumMarkers, setVacuumMarkers] = useState<Marker[]>([]);
  const [newVacuumMarkerValue, setNewVacuumMarkerValue] = useState<number>(0);
  const [newVacuumMarkerWidth, setNewVacuumMarkerWidth] = useState<number>(2);
  const [newVacuumMarkerLegend, setNewVacuumMarkerLegend] =
    useState<string>("");

  const [color, setColor] = useState<string>("#FF3B30");

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
    // const strokeColor = markerType === "warning" ? "#FF3B30" : "#FFC041";
    const strokeColor = color;
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

  const handleColorChange = (color: string) => {
    // console.log(color);
    setColor(color);
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
        {/* <div>
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
        </div> */}
        <div>
          <label htmlFor="newVacuumMarkerWidth">두께: </label>
          <input
            id="newVacuumMarkerWidth"
            type="number"
            value={newVacuumMarkerWidth}
            onChange={handleNewMarkerWidthChange}
            min={0}
            max={10}
            // defaultValue={2}
            // value={newVacuumMarkerStrokeWidth}
            // onChange={handleNewVacuumMarkerStrokeWidth}
          />
        </div>
        <div>
          <ColorPicker onColorChange={handleColorChange} />
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

            <div
              style={{
                display: "inline-block",
                width: "100px",
                height: `${VacuumMarker.lineStyle.strokeWidth}px`,
                marginRight: "5px",
                backgroundColor: VacuumMarker.lineStyle.stroke,
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

export default VacuumChartMarkers;
