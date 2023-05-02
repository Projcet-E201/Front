import React from "react";
import MainLayout from "../../layout/MainLayout";
import MotorChartMarkers from "./Markers/MotorChartMarkers";
import AirInChartMarkers from "./Markers/AirInChartMarkers";
import VacuumChartMarkers from "./Markers/VacuumChartMarkers";
const EquipmentSettingPage = () => {
  return (
    <MainLayout>
      <div style={{}}>
        <MotorChartMarkers />
        <hr />
        <AirInChartMarkers />
        <hr />
        <VacuumChartMarkers />
      </div>
    </MainLayout>
  );
};

export default EquipmentSettingPage;
