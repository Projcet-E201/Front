import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import SensorLayout from "../../layout/SensorLayout";

import MotorChart from "../../components/Chart/MotorChart";
const MotorDetailPage = () => {
  const { motorNumber } = useParams();
  const navigate = useNavigate();

  // const check = () => {
  //   console.log(motorNumber);
  // };
  // console.log(typeof motorNumber);
  return (
    <SensorLayout>
      <div>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
        {/* <p>{motorNumber}</p> */}
        <h3>{motorNumber}모터 디테일 페이지</h3>
        <MotorChart />
      </div>
    </SensorLayout>
  );
};

export default MotorDetailPage;
