import React from "react";

import MainLayout from "../layout/MainLayout";
import { useLocation } from "react-router-dom";

import Sensor from "../components/Main/Sensor";
import State from "../components/Main/State";

// 토글값에 따라서 보여줄 컴포넌트 다르니까 recoil값 가져오기
import { useRecoilValue } from "recoil";
import { selectedAtom } from "../store/atoms";

const MachinePage = () => {
  const location = useLocation();
  //selected 토글값 가져오기
  const selected = useRecoilValue(selectedAtom);

  return (
    <MainLayout>
      {/* <p>{location.pathname}</p> */}
      <div style={{ marginTop: "20px" }}>
        {selected === "Sensor" && <Sensor />}
        {selected === "State" && <State />}
      </div>
    </MainLayout>
  );
};

export default MachinePage;
