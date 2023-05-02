import React, { useState, useEffect } from "react";

interface Marker {
  axis: string;
  value: number;
  legend: string;
  lineStyle: any;
}

const MotorChartMarkers = () => {
  const [motorMarkers, setMotorMarkers] = useState<Marker[]>([]);
  const [newMotorMarkerValue, setNewMotorMarkerValue] = useState<number>(0);
  const [newMotorMarkerLegend, setNewMotorMarkerLegend] = useState<string>("");

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
    const newMotorMarker: Marker = {
      axis: "y",
      value: newMotorMarkerValue,
      legend: newMotorMarkerLegend,
      lineStyle: { stroke: "#FF3B30", strokeWidth: 2 },
    };
    setMotorMarkers([...motorMarkers, newMotorMarker]);
  };

  const handleNewMarkerValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewMotorMarkerValue(Number(event.target.value));
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

  return (
    <>
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
        />
      </div>
      <button onClick={handleMotorMarker}>Add MotorMarker</button>
      <div>
        {motorMarkers.map((motorMarker, index) => (
          <div key={index}>
            <div>
              <p>legend: {motorMarker.legend}</p>
              <p>value: {motorMarker.value}</p>
              <p>색상: {motorMarker.lineStyle.stroke}</p>
              <button onClick={() => deleteHandler(index)}>삭제</button>
            </div>
            <p>--------------------------</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MotorChartMarkers;
