import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import SensorLayout from "../../layout/SensorLayout";
const RpmDetailPage = () => {
  const { rpmNumber } = useParams();
  const navigate = useNavigate();

  // const check = () => {
  //   console.log(rpmNumber);
  // };
  // console.log(typeof rpmNumber);
  return (
    <SensorLayout>
      <div>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
        {/* <p>{rpmNumber}</p> */}
        <h3>{rpmNumber}rpm 디테일 페이지</h3>
        <p>{rpmNumber}</p>
      </div>
    </SensorLayout>
  );
};

export default RpmDetailPage;
