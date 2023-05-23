import React, { useState, useEffect } from "react";
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
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
} from "@mui/material";
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

  const [expanded, setExpanded] = useState<number[]>([]);

  const handleChange =
    (panel: number) => (_event: any, isExpanded: boolean) => {
      setExpanded((prevExpanded) =>
        isExpanded
          ? [...prevExpanded, panel]
          : prevExpanded.filter((p) => p !== panel)
      );
    };

  const [updateCycle, setUpdateCycle] = useState<any>(
    localStorage.getItem("updateCycle") || 10000
  );

  const changeUpdateCycle = (event: any) => {
    const selectedValue = event.target.value;
    const convertedValue: any = selectedValue * 1000;

    setUpdateCycle(convertedValue);
    localStorage.setItem("updateCycle", convertedValue);
  };

  useEffect(() => {
    localStorage.setItem("updateCycle", updateCycle);
  }, [updateCycle]);

  const [updateWidth, setUpdateWidth] = useState<any>(
    localStorage.getItem("updateWidth") || 2
  );

  const changeUpdateWidth = (event: any) => {
    const selectedWidth = event.target.value;
    const convertedValue: any = selectedWidth;

    setUpdateWidth(convertedValue);
    localStorage.setItem("updateWidth", convertedValue);
  };

  useEffect(() => {
    localStorage.setItem("updateWidth", updateWidth);
  }, [updateWidth]);

  return (
    <MainLayout>
      <div>
        <h2>- default Setting</h2>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <div>
                  <h3>Update Cycle</h3>
                  <p>sensor 데이터의 업데이트 주기를 설정합니다.</p>
                  <Select
                    value={updateCycle / 1000} // 1000 -> 1, 2000 -> 2, ...
                    onChange={changeUpdateCycle}
                  >
                    {Array.from(Array(20), (_, i) => i + 1).map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}초
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </Grid>
              {/* <Grid item xs={4}>
                <div>
                  <h3>Line Color</h3>
                  <p>chart Line 색상을 지정합니다.</p>
                  <p>max</p>
                  <p>min</p>
                </div>
              </Grid> */}
              <Grid item xs={4}>
                <div>
                  <h3>Line Width(px)</h3>
                  <p>Chart에 그려지는 Line의 굵기를 선택합니다.</p>
                  <Select
                    value={updateWidth} // 1000 -> 1, 2000 -> 2, ...
                    onChange={changeUpdateWidth}
                  >
                    {Array.from(Array(10), (_, i) => i + 1).map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}px
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
      <div>
        <h2>- Marker Setting</h2>
        {componentList.map((component: any, index: number) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              marginBottom: expanded.includes(index) ? "20px" : 0, // Add margin-bottom when expanded
              // marginTop: expanded.includes(index) ? "20px" : 0, // Add margin-top when expanded
            }}
            key={index}
          >
            <Accordion
              className={styles.card}
              expanded={expanded.includes(index)}
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
                  <div style={{ width: "100%" }}>{component}</div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default EquipmentSettingPage;
