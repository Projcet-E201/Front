import React from "react";
import { useNavigate } from "react-router-dom";

import SensorLayout from "../../layout/SensorLayout";

const LoadPage = () => {
  const navigate = useNavigate();

  const loads = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <SensorLayout>
      <div>
        {/* <button onClick={() => navigate(-1)}>메인페이지</button> */}
      </div>
      <div>
        <h3>부하량 페이지</h3>
        <div>
          {loads.map((loadId) => (
            <div key={loadId}>
              <button onClick={() => navigate(`/load/${loadId}`)}>
                {loadId}
              </button>
            </div>
          ))}
        </div>
      </div>
    </SensorLayout>
  );
};

export default LoadPage;
