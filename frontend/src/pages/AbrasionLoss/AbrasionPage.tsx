import React from "react";
import { useNavigate } from "react-router-dom";

import SensorLayout from "../../layout/SensorLayout";

const AbrasionPage = () => {
  const navigate = useNavigate();

  const abrasions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <SensorLayout>
      <div>
        {/* <button onClick={() => navigate(-1)}>메인페이지</button> */}
      </div>
      <div>
        <h3>마모량 페이지</h3>
        <div>
          {abrasions.map((abrasionId) => (
            <div key={abrasionId}>
              <button onClick={() => navigate(`/abrasion/${abrasionId}`)}>
                {abrasionId}
              </button>
            </div>
          ))}
        </div>
      </div>
    </SensorLayout>
  );
};

export default AbrasionPage;
