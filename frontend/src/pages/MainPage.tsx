import React from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import Sensor from "../components/Main/Sensor";
import State from "../components/Main/State";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div>
        <div>
          <button onClick={() => navigate("/motor")}>모터페이지</button>
        </div>
        <h3>여기는 메인페이지입니다.</h3>
        <Sensor />
        <State />
      </div>
    </MainLayout>
  );
};

export default MainPage;
