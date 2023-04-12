import React from "react";
import { useNavigate } from "react-router-dom";

const Sensor = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h3>일단 쉽게 이동하려고 만든 버튼들</h3>
      <div style={{ display: "flex" }}>
        <button onClick={() => navigate("/motor")}>Motor</button>
        <button onClick={() => navigate("/vacuum")}>Vacuum</button>
        <button onClick={() => navigate("/air-out1")}>AirOut1</button>
        <button onClick={() => navigate("/air-out2")}>AirOut2</button>
        <button onClick={() => navigate("/air-in")}>AirIn</button>
        <button onClick={() => navigate("/water")}>Water</button>
        <button onClick={() => navigate("/abrasion")}>abrasionlose</button>
        <button onClick={() => navigate("/load")}>loadingDose</button>
        <button onClick={() => navigate("/rpm")}>RPM</button>
      </div>
      <div>
        <h1>이건 센서 컴포넌트 입니다.</h1>
      </div>
    </div>
  );
};

export default Sensor;
