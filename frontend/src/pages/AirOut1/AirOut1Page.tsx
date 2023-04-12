import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import SensorLayout from "../../layout/SensorLayout";
const AirOut1Page = () => {
  const navigate = useNavigate();

  const airOut1s = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <SensorLayout>
      <div>
        <button onClick={() => navigate(-1)}>메인페이지</button>
      </div>
      <div>
        <h3>Air-Out1 페이지</h3>
        <div>
          {airOut1s.map((airOut1Id) => (
            <div key={airOut1Id}>
              <button onClick={() => navigate(`/air-out1/${airOut1Id}`)}>
                {airOut1Id}
              </button>
            </div>
          ))}
        </div>
      </div>
    </SensorLayout>
  );
};

export default AirOut1Page;
