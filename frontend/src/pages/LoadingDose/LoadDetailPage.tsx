import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import SensorLayout from "../../layout/SensorLayout";
const LoadDetailPage = () => {
  const { loadNumber } = useParams();
  const navigate = useNavigate();

  // const check = () => {
  //   console.log(loadNumber);
  // }load
  // console.log(typeof loadNumber);
  return (
    <SensorLayout>
      <div>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
        {/* <p>{loadNumber}</p> */}
        <h3>{loadNumber}부하량 디테일 페이지</h3>
        <p>{loadNumber}</p>
      </div>
    </SensorLayout>
  );
};

export default LoadDetailPage;
