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

import MotorMarkerChart from "./MarkerChart/MotorMarkerChart";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import styles from "./EquipmentSettingPage.module.css";
const EquipmentSettingPage = () => {
  const equipmentList = [
    "Motor Toque Marker",
    "Air In Marker",
    "Vacuum Marker",
    "Air Out(kPa) Marker",
    "Air Out(MPa) Marker",
    "Water Marker",
    "Rpm Marker",
    "Load Marker",
    "Abrasion Marker",
  ];

  const componentList = [
    <MotorChartMarkers />,
    <AirInChartMarkers />,
    <VacuumChartMarkers />,
    <AirOutKpaChartMarkers />,
    <AirOutMpaChartMarkers />,
    <WaterChartMarkers />,
    <RpmChartMarkers />,
    <LoadChartMarkers />,
    <AbrasionChartMarkers />,
  ];
  return (
    <MainLayout>
      {componentList.map((component: any, index: number) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card className={styles.card} style={{ width: "100%" }}>
            <CardContent>
              <h1 style={{ margin: "0" }}>{equipmentList[index]}</h1>
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "60%" }}>{component}</div>
                <div
                  style={{ width: "40%", marginLeft: "40px", height: "350px" }}
                >
                  <MotorMarkerChart />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </MainLayout>
  );
};

export default EquipmentSettingPage;
