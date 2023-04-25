import React from "react";
import { useLocation, useParams } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import Sensor from "../components/Main/Sensor";
import State from "../components/Main/State";

// 토글값에 따라서 보여줄 컴포넌트 다르니까 recoil값 가져오기
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedAtom, selectedMachineAtom } from "../store/atoms";

const MachinePage = () => {
  const location = useLocation();
  const { machine } = useParams();

  // selected 토글값 가져오기
  const selected = useRecoilValue(selectedAtom);

  // 선택한 기계를 저장하기 위한 recoil 값 설정
  const setSelectedMachine = useSetRecoilState(selectedMachineAtom);
  console.log(machine);
  React.useEffect(() => {
    // 주소에서 machineId 추출하여 selectedMachineAtom에 저장
    setSelectedMachine(`${machine}`);
  }, [location, setSelectedMachine]);

  return (
    <MainLayout>
      <div style={{ marginTop: "5px" }}>
        {selected === "Sensor" && <Sensor />}
        {selected === "State" && <State />}
      </div>
    </MainLayout>
  );
};

export default MachinePage;
