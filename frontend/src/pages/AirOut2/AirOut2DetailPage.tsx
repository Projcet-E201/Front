import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import SensorLayout from "../../layout/SensorLayout";
const AirOut2DetailPage = () => {
  const { airOut2Number } = useParams();
  const navigate = useNavigate();

  // const check = () => {
  //   console.log(airOut2Number);
  // };
  console.log(typeof airOut2Number);
  return (
    <SensorLayout>
      <div>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
        {/* <p>{airOut2Number}</p> */}
        <h3>{airOut2Number}airOut2 디테일 페이지</h3>
        <p>{airOut2Number}</p>
      </div>
    </SensorLayout>
  );
};

export default AirOut2DetailPage;
