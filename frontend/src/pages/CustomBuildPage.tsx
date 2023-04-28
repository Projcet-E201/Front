import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import MainLayout from "../layout/MainLayout";
import styles from "./CustomBuildPage.module.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Grid";

import MotorChart from "../components/Chart/MotorChart";
import CardMotorChart from "../components/Main/CardChart/CardMotorChart";

interface chartInterFace {
  machine: string;
  sensor: string;
  sensorNumber: string;
}

const CustomBuildPage = () => {
  const [selectedMachine, setSelectedMachine] = React.useState("");
  const [selectedSensor, setSelectedSensor] = React.useState("");
  const [selectedNumber, setSelectedNumber] = React.useState("");
  const [chartList, setChartList] = useState<chartInterFace[]>([]);

  useEffect(() => {
    const storedChartList = localStorage.getItem("chartList");
    if (storedChartList) {
      setChartList(JSON.parse(storedChartList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chartList", JSON.stringify(chartList));
  }, [chartList]);

  const addChartHandler = () => {
    const newChart = {
      machine: selectedMachine,
      sensor: selectedSensor,
      sensorNumber: selectedNumber,
    };
    setChartList((prevList): any => [...prevList, newChart]);
    setSelectedMachine("");
    setSelectedSensor("");
    setSelectedNumber("");
  };

  const machineChange = (event: SelectChangeEvent) => {
    setSelectedMachine(event.target.value as string);
  };

  const sensorChange = (event: SelectChangeEvent) => {
    setSelectedSensor(event.target.value as string);
    setSelectedNumber("all");
  };

  const numberChange = (event: SelectChangeEvent) => {
    setSelectedNumber(event.target.value as string);
  };

  // selectedSensor 값에 따라 선택지 설정
  let numberOptions;
  switch (selectedSensor) {
    case "Motor":
    case "AirIn":
    case "Water":
      numberOptions = Array.from({ length: 10 }, (_, index) => (
        <MenuItem key={index + 1} value={index + 1}>
          {index + 1}
        </MenuItem>
      ));
      break;
    case "Vacuum":
      numberOptions = Array.from({ length: 30 }, (_, index) => (
        <MenuItem key={index + 1} value={index + 1}>
          {index + 1}
        </MenuItem>
      ));
      break;

    default:
      numberOptions = Array.from({ length: 5 }, (_, index) => (
        <MenuItem key={index + 1} value={index + 1}>
          {index + 1}
        </MenuItem>
      ));
  }
  const resetHandler = () => {
    setSelectedMachine("");
    setSelectedSensor("");
    setSelectedNumber("");
  };

  const deleteChart = (index: number) => {
    setChartList((prevList) => prevList.filter((_, i) => i !== index));
  };

  return (
    <MainLayout>
      <Card className={styles.card}>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ marginTop: "0" }}>차트 선택</h3>
            </div>
            <div onClick={resetHandler} style={{ cursor: "pointer" }}>
              <RestartAltIcon />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Machine</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedMachine}
                label="Machine"
                onChange={machineChange}
              >
                {Array.from({ length: 12 }, (_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sensor</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedSensor}
                label="Sensor"
                onChange={sensorChange}
                disabled={selectedMachine ? false : true}
              >
                <MenuItem value={"Motor"}>Motor</MenuItem>
                <MenuItem value={"Vacuum"}>Vacuum</MenuItem>
                <MenuItem value={"AirIn"}>AirIn</MenuItem>
                <MenuItem value={"AirOut(kPa)"}>AirOut(kPa)</MenuItem>
                <MenuItem value={"AirOut(MPa)"}>AirOut(MPa)</MenuItem>
                <MenuItem value={"Water"}>Water</MenuItem>
                <MenuItem value={"마모량"}>마모량</MenuItem>
                <MenuItem value={"부하량"}>부하량</MenuItem>
                <MenuItem value={"회전속도"}>회전속도</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Sensor Number
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedNumber}
                label="Sensor Number"
                onChange={numberChange}
                disabled={selectedSensor ? false : true}
              >
                <MenuItem value={"all"}>all</MenuItem>
                {numberOptions}
              </Select>
            </FormControl>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "end",
                marginRight: "20px",
                width: "310px",
              }}
            >
              <h5 style={{ margin: "0" }}>선택된 차트: &nbsp;&nbsp; </h5>
              <h4 style={{ margin: "0" }}>
                {selectedMachine && <span>Machine{selectedMachine} -</span>}{" "}
                {selectedSensor && <span>{selectedSensor} -</span>}{" "}
                {selectedNumber && <span>{selectedNumber}</span>}{" "}
              </h4>
            </div>
            <button style={{ height: "40px" }} onClick={addChartHandler}>
              ADD CHART
            </button>
          </div>
        </CardContent>
      </Card>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: chartList.length > 1 ? "space-between" : "center",
        }}
      >
        {chartList.map((chart, index) => (
          <Card
            className={styles.card}
            style={{
              width: chartList.length > 1 ? "49%" : "100%",
            }}
          >
            <CardContent>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ marginTop: "0" }}>
                  Machine{chart.machine} -{chart.sensor} - {chart.sensorNumber}
                </h4>
                <button onClick={() => deleteChart(index)}>삭제</button>
              </div>
              <div style={{ height: chartList.length > 2 ? "23vh" : "55vh" }}>
                {chart.sensor === "Motor" && <CardMotorChart />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default CustomBuildPage;
