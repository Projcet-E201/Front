import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import SensorLayout from "../../layout/SensorLayout";
const WaterDetailPage = () => {
  const { waterNumber } = useParams();
  const navigate = useNavigate();

  // const check = () => {
  //   console.log(waterNumber);
  // };
  // console.log(typeof waterNumber);
  return (
    <SensorLayout>
      <div>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
        {/* <p>{waterNumber}</p> */}
        <h3>{waterNumber}water 디테일 페이지</h3>
        <p>{waterNumber}</p>
      </div>
    </SensorLayout>
  );
};

export default WaterDetailPage;
