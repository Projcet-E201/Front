import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import SensorLayout from "../../layout/SensorLayout";
const AirOut2Page = () => {
  const navigate = useNavigate();

  const airOut2s = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <SensorLayout>
      <div>
        <button onClick={() => navigate(-1)}>메인페이지</button>
      </div>
      <div>
        <h3>Air-Out2 페이지</h3>
        <div>
          {airOut2s.map((airOut2Id) => (
            <div key={airOut2Id}>
              <button onClick={() => navigate(`/air-out2/${airOut2Id}`)}>
                {airOut2Id}
              </button>
            </div>
          ))}
        </div>
      </div>
    </SensorLayout>
  );
};

export default AirOut2Page;
