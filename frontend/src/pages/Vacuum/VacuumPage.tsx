import React from "react";
import { useNavigate } from "react-router-dom";

import SensorLayout from "../../layout/SensorLayout";

const VacuumPage = () => {
  const navigate = useNavigate();

  const vacuums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <SensorLayout>
      <div>
        <button onClick={() => navigate(-1)}>메인페이지</button>
      </div>
      <div>
        <h3>Vacuum 페이지</h3>
        <div>
          {vacuums.map((vacuumId) => (
            <div key={vacuumId}>
              <button onClick={() => navigate(`/vacuum/${vacuumId}`)}>
                {vacuumId}
              </button>
            </div>
          ))}
        </div>
      </div>
    </SensorLayout>
  );
};

export default VacuumPage;
