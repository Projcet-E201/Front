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

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import styles from "./EquipmentSettingPage.module.css";
const EquipmentSettingPage = () => {
  return (
    <MainLayout>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card className={styles.card} style={{ width: "100%" }}>
          <CardContent>
            <MotorChartMarkers />
          </CardContent>
        </Card>
      </div>
      <hr />
      <AirInChartMarkers />
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
      <AbrasionChartMarkers />
    </MainLayout>
  );
};

export default EquipmentSettingPage;
