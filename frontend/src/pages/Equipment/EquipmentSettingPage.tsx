import React from "react";
import MainLayout from "../../layout/MainLayout";
import MotorChartMarkers from "./Markers/MotorChartMarkers";
import AirInChartMarkers from "./Markers/AirInChartMarkers";
import VacuumChartMarkers from "./Markers/VacuumChartMarkers";
import AirOutKpaChartMarkers from "./Markers/AirOutKpaChartMarkers";
import AirOutMpaChartMarkers from "./Markers/AirOutMpaChartMarkers";
import WaterChartMarkers from "./Markers/WaterChartMarkers";
import RpmChartMarkers from "./Markers/RpmChartMarkers";
import LoadChartMarkers from "./Markers/LoadChartMarkers";
import AbrasionChartMarkers from "./Markers/AbrasionChartMarkers";
const EquipmentSettingPage = () => {
  return (
    <MainLayout>
      <div style={{}}>
        <MotorChartMarkers />
        <hr />
        {/* <AirInChartMarkers />
        <hr />
        <VacuumChartMarkers />
        <hr />
        <AirOutKpaChartMarkers />
        <hr />
        <AirOutMpaChartMarkers />
        <hr />
        <WaterChartMarkers />
        <hr />
        <RpmChartMarkers />
        <hr />
        <LoadChartMarkers />
        <hr />
        <AbrasionChartMarkers /> */}
      </div>
    </MainLayout>
  );
};

export default EquipmentSettingPage;
