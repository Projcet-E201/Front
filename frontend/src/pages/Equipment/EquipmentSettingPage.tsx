import React from "react";
import MainLayout from "../../layout/MainLayout";
import MotorChartMarkers from "./Markers/MotorChartMarkers";
import AirInChartMarkers from "./Markers/AirInChartMarkers";
import VacuumChartMarkers from "./Markers/VacuumChartMarkers";
import AirOutKpaChartMarkers from "./Markers/AirOutKpaChartMarkers";
const EquipmentSettingPage = () => {
  return (
    <MainLayout>
      <div style={{}}>
        <MotorChartMarkers />
        <hr />
        <AirInChartMarkers />
        <hr />
        <VacuumChartMarkers />
        <hr />
        <AirOutKpaChartMarkers />
      </div>
    </MainLayout>
  );
};

export default EquipmentSettingPage;
