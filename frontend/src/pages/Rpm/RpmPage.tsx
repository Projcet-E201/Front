import React from "react";
import { useNavigate } from "react-router-dom";

import SensorLayout from "../../layout/SensorLayout";

const RpmPage = () => {
  const navigate = useNavigate();

  const rpms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <SensorLayout>
      <div>
        {/* <button onClick={() => navigate(-1)}>메인페이지</button> */}
      </div>
      <div>
        <h3>rpm 페이지</h3>
        <div>
          {rpms.map((rpmId) => (
            <div key={rpmId}>
              <button onClick={() => navigate(`/rpm/${rpmId}`)}>{rpmId}</button>
            </div>
          ))}
        </div>
      </div>
    </SensorLayout>
  );
};

export default RpmPage;
