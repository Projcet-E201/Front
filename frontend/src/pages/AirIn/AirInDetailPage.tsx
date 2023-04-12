import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import SensorLayout from "../../layout/SensorLayout";
const AirInDetailPage = () => {
  const { airInNumber } = useParams();
  const navigate = useNavigate();

  // const check = () => {
  //   console.log(airInNumber);
  // };
  console.log(typeof airInNumber);
  return (
    <SensorLayout>
      <div>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
        {/* <p>{airInNumber}</p> */}
        <h3>{airInNumber}airIn 디테일 페이지</h3>
        <p>{airInNumber}</p>
      </div>
    </SensorLayout>
  );
};

export default AirInDetailPage;
