import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import SensorLayout from "../../layout/SensorLayout";
const VacuumDetailPage = () => {
  const { vacuumNumber } = useParams();
  const navigate = useNavigate();

  // const check = () => {
  //   console.log(vacuumNumber);
  // };
  console.log(typeof vacuumNumber);
  return (
    <SensorLayout>
      <div>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
        {/* <p>{vacuumNumber}</p> */}
        <h3>{vacuumNumber}vacuum 디테일 페이지</h3>
        <p>{vacuumNumber}</p>
      </div>
    </SensorLayout>
  );
};

export default VacuumDetailPage;
