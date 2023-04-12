import React from "react";
import { useNavigate } from "react-router-dom";

import SensorLayout from "../../layout/SensorLayout";

const AirInPage = () => {
  const navigate = useNavigate();

  const airs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <SensorLayout>
      <div>
        <button onClick={() => navigate(-1)}>메인페이지</button>
      </div>
      <div>
        <h3>AirIn 페이지</h3>
        <div>
          {airs.map((airInId) => (
            <div key={airInId}>
              <button onClick={() => navigate(`/air-in/${airInId}`)}>
                {airInId}
              </button>
            </div>
          ))}
        </div>
      </div>
    </SensorLayout>
  );
};

export default AirInPage;
