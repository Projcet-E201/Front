import React from "react";
import MainLayout from "../../layout/MainLayout";
import MotorChartMarkers from "./Markers/MotorChartMarkers";
const EquipmentSettingPage = () => {
  return (
    <MainLayout>
      <h1>환경설정</h1>
      <MotorChartMarkers />
    </MainLayout>
  );
};

export default EquipmentSettingPage;
