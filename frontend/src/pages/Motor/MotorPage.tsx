import React from "react";
import { useNavigate } from "react-router-dom";

import SensorLayout from "../../layout/SensorLayout";
import MotorChart from "../../components/Chart/MotorChart";

const MotorPage = () => {
  const navigate = useNavigate();

  const motors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <SensorLayout>
      <div>
        <button onClick={() => navigate(-1)}>메인페이지</button>
      </div>
      <div>
        <h3>모터 페이지</h3>
        <div style={{ display: "flex" }}>
          {motors.map((motorId) => (
            <div key={motorId}>
              <button onClick={() => navigate(`/motor/${motorId}`)}>
                {motorId}
              </button>
            </div>
          ))}
        </div>
        <div style={{ height: "500px" }}>
          <MotorChart />
        </div>
      </div>
    </SensorLayout>
  );
};

export default MotorPage;
