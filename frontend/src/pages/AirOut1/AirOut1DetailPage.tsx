import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import SensorLayout from "../../layout/SensorLayout";
const AirOut1DetailPage = () => {
  const { airOut1Number } = useParams();
  const navigate = useNavigate();

  // const check = () => {
  //   console.log(airOut1Number);
  // };
  console.log(typeof airOut1Number);
  return (
    <SensorLayout>
      <div>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
        {/* <p>{airOut1Number}</p> */}
        <h3>{airOut1Number}airOut1 디테일 페이지</h3>
        <p>{airOut1Number}</p>
      </div>
    </SensorLayout>
  );
};

export default AirOut1DetailPage;
