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

const AbrasionChartMarkers = () => {
  const [AbrasionMarkers, setAbrasionMarkers] = useState<Marker[]>([]);
  const [newAbrasionMarkerValue, setNewAbrasionMarkerValue] =
    useState<number>(0);
  const [newAbrasionMarkerWidth, setNewAbrasionMarkerWidth] =
    useState<number>(2);
  const [newAbrasionMarkerLegend, setNewAbrasionMarkerLegend] =
    useState<string>("");

  const [color, setColor] = useState<string>("#FF3B30");

  // localStorage에서 markers 가져오기
  useEffect(() => {
    const storedAbrasionMarkers = localStorage.getItem("AbrasionChartMarkers");
    if (storedAbrasionMarkers) {
      setAbrasionMarkers(JSON.parse(storedAbrasionMarkers));
    }
  }, []);

  // localStorage에 markers 저장하기
  useEffect(() => {
    localStorage.setItem(
      "AbrasionChartMarkers",
      JSON.stringify(AbrasionMarkers)
    );
  }, [AbrasionMarkers]);

  const [markerType, setMarkerType] = useState<string>("warning");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMarkerType(event.target.value);
  };

  const handleAbrasionMarker = () => {
    // const strokeColor = markerType === "warning" ? "#FF3B30" : "#FFC041";
    const strokeColor = color;
    const legend =
      newAbrasionMarkerLegend.trim() !== ""
        ? newAbrasionMarkerLegend
        : `Value: ${newAbrasionMarkerValue}`;
    const newAbrasionMarker: Marker = {
      axis: "y",
      value: newAbrasionMarkerValue,
      legend,
      lineStyle: {
        stroke: strokeColor,
        strokeWidth: `${newAbrasionMarkerWidth}`,
      },

      // 처음 생성 시 무조건 true
      checked: true,
    };
    setAbrasionMarkers([...AbrasionMarkers, newAbrasionMarker]);
  };

  const handleNewMarkerValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewAbrasionMarkerValue(Number(event.target.value));
  };

  const handleNewMarkerWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewAbrasionMarkerWidth(Number(event.target.value));
  };

  const handleNewMarkerLegendChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewAbrasionMarkerLegend(event.target.value);
  };

  const deleteHandler = (index: number) => {
    setAbrasionMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers.splice(index, 1);
      return newMarkers;
    });
  };

  const handleMarkerToggle = (index: number) => {
    setAbrasionMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].checked = !newMarkers[index].checked;
      return newMarkers;
    });

    localStorage.setItem(
      "AbrasionChartMarkers",
      JSON.stringify(AbrasionMarkers)
    );
  };

  const handleColorChange = (color: string) => {
    // console.log(color);
    setColor(color);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "100px" }}>
        <h1>Abrasion Marker</h1>
        <div>
          <label htmlFor="newAbrasionMarkerValue">Value:</label>
          <input
            id="newAbrasionMarkerValue"
            type="number"
            value={newAbrasionMarkerValue}
            onChange={handleNewMarkerValueChange}
          />
        </div>
        <div>
          <label htmlFor="newAbrasionMarkerLegend">Legend:</label>
          <input
            id="newAbrasionMarkerLegend"
            type="text"
            value={newAbrasionMarkerLegend}
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
          <label htmlFor="newAbrasionMarkerWidth">두께: </label>
          <input
            id="newAbrasionMarkerWidth"
            type="number"
            value={newAbrasionMarkerWidth}
            onChange={handleNewMarkerWidthChange}
            min={0}
            max={10}
            // defaultValue={2}
            // value={newAbrasionMarkerStrokeWidth}
            // onChange={handleNewAbrasionMarkerStrokeWidth}
          />
        </div>
        <div>
          <ColorPicker onColorChange={handleColorChange} />
        </div>

        <button onClick={handleAbrasionMarker}>Add AbrasionMarker</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {AbrasionMarkers.map((AbrasionMarker, index) => (
          <div key={index} style={{ width: "10vw" }}>
            <Switch
              checked={AbrasionMarker.checked}
              onChange={(event) => handleMarkerToggle(index)}
            />
            <p>legend: {AbrasionMarker.legend}</p>
            <p>value: {AbrasionMarker.value}</p>
            <div
              style={{
                display: "inline-block",
                width: "100px",
                height: `${AbrasionMarker.lineStyle.strokeWidth}px`,
                marginRight: "5px",
                backgroundColor: AbrasionMarker.lineStyle.stroke,
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

export default AbrasionChartMarkers;
