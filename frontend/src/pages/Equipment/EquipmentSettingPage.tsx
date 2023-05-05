import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import SensorLayout from "../../layout/SensorLayout";
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
import Typography from "@mui/material/Typography";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

  const [expanded, setExpanded] = useState<number | false>(0);

  const handleChange = (panel: number) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <SensorLayout>
      <div>
        {componentList.map((component: any, index: number) => (
          <div
            style={{ display: "flex", justifyContent: "center" }}
            key={index}
          >
            {/* <Card className={styles.card} style={{ width: "100%" }}>
            <CardContent>
              <Typography variant="h5" component="h2" style={{ margin: 0 }}>
                {equipmentList[index]}
              </Typography> */}
            <Accordion
              className={styles.card}
              expanded={expanded === index}
              onChange={handleChange(index)}
              sx={{
                width: "100%",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h5">{equipmentList[index]}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ display: "flex", width: "100%" }}>
                  <div style={{ width: "60%" }}>{component}</div>
                  <div
                    style={{
                      width: "40%",
                      marginLeft: "40px",
                      height: "350px",
                    }}
                  >
                    <MotorMarkerChart />
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            {/* </CardContent>
          </Card> */}
          </div>
        ))}
      </div>
    </SensorLayout>
  );
};

export default EquipmentSettingPage;
