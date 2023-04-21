import React from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

const MainPage = () => {
  const navigate = useNavigate();
  const machines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <MainLayout>
      <div>
        <h1>여기는 메인페이지입니다.</h1>
        {machines.map((machine) => (
          <div key={machine}>
            <button onClick={() => navigate(`/machine/${machine}`)}>
              머신{machine} ㄱㄱ
            </button>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default MainPage;
