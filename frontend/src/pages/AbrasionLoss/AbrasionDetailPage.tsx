import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import SensorLayout from "../../layout/SensorLayout";
const AbrasionDetailPage = () => {
  const { abrasionNumber } = useParams();
  const navigate = useNavigate();

  // const check = () => {
  //   console.log(abrasionNumber);
  // };
  // console.log(typeof abrasionNumber);
  return (
    <SensorLayout>
      <div>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
        {/* <p>{abrasionNumber}</p> */}
        <h3>{abrasionNumber}마모량 디테일 페이지</h3>
        <p>{abrasionNumber}</p>
      </div>
    </SensorLayout>
  );
};

export default AbrasionDetailPage;
