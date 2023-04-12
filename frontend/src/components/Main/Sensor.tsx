import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Sensor = () => {
  const navigate = useNavigate();
  const repeat = [1, 2, 3, 4, 5, 6, 7, 8];

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
        <h1>센서 컴포넌트 입니다.</h1>
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {repeat.map((item) => (
          <Card
            style={{
              width: "22%",
              height: "30vh",
              margin: "1rem",
              backgroundColor: "white",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                차트나옵니다.
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sensor;
