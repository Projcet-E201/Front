import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router";

import MainLayout from "../../layout/MainLayout";
import styles from "./CustomBuildPage.module.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import SendIcon from "@mui/icons-material/Send";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import toast, { Toaster } from "react-hot-toast";

// import MotorChart from "../components/Chart/MotorChart";
// import CardMotorChart from "../../components/Main/CardChart/CardMotorChart";
import CustomChart from "./CustomChart";

import { TbEqualDouble, TbEqual } from "react-icons/tb";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface chartInterFace {
  machine: string;
  sensor: string;
  sensorNumber: string;
}

const CustomBuildPage = () => {
  const [selectedMachine, setSelectedMachine] = React.useState("");
  const [selectedSensor, setSelectedSensor] = React.useState("");
  // const [selectedNumber, setSelectedNumber] = React.useState<string[]>([]);
  const [selectedNumber, setSelectedNumber] = React.useState("");
  const [chartList, setChartList] = useState<chartInterFace[]>([]);

  const navigate = useNavigate();

  // 한줄에 1개 볼 지 2개볼 지
  const [isSingleRow, setIsSingleRow] = useState(true);

  const handleSingleRowClick = () => {
    setIsSingleRow(true);
  };

  const handleDoubleRowClick = () => {
    setIsSingleRow(false);
  };

  useEffect(() => {
    const storedChartList = localStorage.getItem("chartList");
    if (storedChartList) {
      setChartList(JSON.parse(storedChartList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chartList", JSON.stringify(chartList));
  }, [chartList]);

  // console.log(chartList, "chartList");

  const addChartHandler = () => {
    const newChart = {
      machine: selectedMachine,
      sensor: selectedSensor,
      sensorNumber: selectedNumber,
    };
    if (selectedMachine === "") {
      toast.error("Machine을 선택해주세요", {
        duration: 2000,
      });
    } else if (selectedSensor === "") {
      toast.error("Sensor를 선택해주세요", {
        duration: 2000,
      });
    } else {
      setChartList((prevList): any => [...prevList, newChart]);
      setSelectedMachine("");
      setSelectedSensor("");
      setSelectedNumber("");
    }
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

  // console.log(chartList);

  return (
    <MainLayout>
      <Toaster />
      <Card className={styles.card} sx={{ paddingBottom: "0" }}>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ marginTop: "0" }}>차트 선택</h3>
            </div>
            {/* <div onClick={resetHandler} style={{ cursor: "pointer" }}>
              <RestartAltIcon />
            </div> */}
            <IconButton onClick={resetHandler}>
              <RestartAltIcon />
            </IconButton>
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
              justifyContent: "space-between",
              marginTop: "10px",
              alignItems: "end",
            }}
          >
            <div style={{ alignItems: "end" }}>
              {/* <button onClick={handleSingleRowClick}>1줄에 1개</button> */}
              <TbEqual
                onClick={handleSingleRowClick}
                size={40}
                style={{ marginRight: "0 20px 0 0" }}
                className={styles.icon}
                title="한 줄로 보기"
              />
              {/* <img src={line_1} alt="" /> */}
              {/* <button onClick={handleDoubleRowClick}>1줄에 2개</button> */}
              <TbEqualDouble
                onClick={handleDoubleRowClick}
                size={40}
                className={styles.icon}
                title="두 줄로 보기"
              />
            </div>
            <div style={{ display: "flex" }}>
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
              {/* <button style={{ height: "40px" }} onClick={addChartHandler}>
                ADD CHART
              </button> */}
              <Button
                onClick={addChartHandler}
                variant="contained"
                endIcon={<SendIcon />}
              >
                ADD CHART
              </Button>
            </div>
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
            key={index}
            className={styles.card}
            style={{
              // width: chartList.length > 1 ? "49%" : "100%",
              width:
                isSingleRow === true || chartList.length === 1 ? "100%" : "49%",
            }}
            onClick={() => {
              let navi = "";
              const defaultUrl = `/machine/${chart.machine}`;
              if (chart.sensorNumber === "all") {
                if (chart.sensor === "Motor") {
                  navi = defaultUrl + `/motor`;
                } else if (chart.sensor === "Vacuum") {
                  navi = defaultUrl + "/vacuum";
                } else if (chart.sensor === "AirIn") {
                  navi = defaultUrl + "/air-in";
                } else if (chart.sensor === "AirOut(kPa)") {
                  navi = defaultUrl + "/air-out-kpa";
                } else if (chart.sensor === "AirOut(MPa)") {
                  navi = defaultUrl + "/air-out-mpa";
                } else if (chart.sensor === "Water") {
                  navi = defaultUrl + "/water";
                } else if (chart.sensor === "마모량") {
                  navi = defaultUrl + "/abrasion";
                } else if (chart.sensor === "부하량") {
                  navi = defaultUrl + "/load";
                } else if (chart.sensor === "회전속도") {
                  navi = defaultUrl + "/rpm";
                }
              } else {
                if (chart.sensor === "Motor") {
                  navi = defaultUrl + `/motor/${chart.sensorNumber}`;
                } else if (chart.sensor === "Vacuum") {
                  navi = defaultUrl + `/vacuum/${chart.sensorNumber}`;
                } else if (chart.sensor === "AirIn") {
                  navi = defaultUrl + `/air-in/${chart.sensorNumber}`;
                } else if (chart.sensor === "AirOut(kPa)") {
                  navi = defaultUrl + `/air-out-kpa/${chart.sensorNumber}`;
                } else if (chart.sensor === "AirOut(MPa)") {
                  navi = defaultUrl + `/air-out-mpa/${chart.sensorNumber}`;
                } else if (chart.sensor === "Water") {
                  navi = defaultUrl + `/water/${chart.sensorNumber}`;
                } else if (chart.sensor === "마모량") {
                  navi = defaultUrl + `/abrasion/${chart.sensorNumber}`;
                } else if (chart.sensor === "부하량") {
                  navi = defaultUrl + `/load/${chart.sensorNumber}`;
                } else if (chart.sensor === "회전속도") {
                  navi = defaultUrl + `/rpm/${chart.sensorNumber}`;
                }
              }
              navigate(navi);
            }}
          >
            <CardContent>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ marginTop: "0" }}>
                  Machine{chart.machine} -{chart.sensor} - {chart.sensorNumber}
                </h4>
                {/* <button onClick={() => deleteChart(index)}>삭제</button> */}
                <IconButton onClick={() => deleteChart(index)}>
                  <DeleteIcon />
                </IconButton>
              </div>
              <div
                style={{
                  height: chartList.length < 3 ? "50vh" : "35vh",
                }}
              >
                <CustomChart chart={chart} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default CustomBuildPage;
