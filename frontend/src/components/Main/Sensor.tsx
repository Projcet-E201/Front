import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
// DnD 기능
// import { DragDropContext } from "react-beautiful-dnd";

import styles from "./Sensor.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import CardMotorChart from "./CardChart/CardMotorChart";
import CardAirInChart from "./CardChart/CardAirInChart";
import CardVacuumChart from "./CardChart/CardVacuumChart";
//air 출력 2개
import CardAirOutKpaChart from "./CardChart/CardAirOutKpaChart";
import CardAirOutMpaChart from "./CardChart/CardAirOutMpaChart";

import CardWaterChart from "./CardChart/CardWaterChart";
import CardRpmChart from "./CardChart/CardRpmChart";
import CardLoadChart from "./CardChart/CardLoadChart";
import CardAbrasionChart from "./CardChart/CardAbrasionChart";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import axios from "axios";

const Sensor = () => {
  const navigate = useNavigate();
  const { machine }: any = useParams();
  const repeat = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [message, setMessage] = useState<any>();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [error, setError] = useState<any>();
  const [reconnectTimer, setReconnectTimer] = useState<any>();
  const [reconnectTimeLeft, setReconnectTimeLeft] = useState<number>(0);

  const [motorData, setMotorData] = useState<any[]>([]);
  const [vacuumData, setVacuumData] = useState<any[]>([]);
  const [airInData, setAirInData] = useState<any[]>([]);
  const [airOutKpaData, setAirOutKpaData] = useState<any[]>([]);
  const [airOutMpaData, setAirOutMpaData] = useState<any[]>([]);
  const [waterData, setWaterData] = useState<any[]>([]);
  const [loadData, setLoadData] = useState<any[]>([]);
  const [velocityData, setVelocityData] = useState<any[]>([]);
  const [abrasionData, setAbrasionData] = useState<any[]>([]);

  const getSensorData = () => {
    axios
      .get(`https://semse.info/api/machine/${machine}/sensor`)
      // .get(`http://localhost:8091/api/machine/${machine}/sensor`)
      .then((response) => {
        // console.log(response.data[0].MOTOR, "datadata", `${machine}`);
        // setMotorData(response.data);
        console.log(response.data[0].AIR_IN_KPA, "dfdfdf");
        setMotorData(response.data[0].MOTOR);
        setAirInData(response.data[0].AIR_IN_KPA);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("error");
        let timeLeft = 5000;
        const timer = setInterval(() => {
          timeLeft -= 1000;
          setReconnectTimeLeft(timeLeft);
          if (timeLeft <= 0) {
            clearInterval(timer);
            getSensorData();
            setError("");
          }
        }, 1000);
      });
  };

  useEffect(() => {
    getSensorData();

    const interval = setInterval(() => {
      getSensorData();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(reconnectTimer);
      setMotorData([]);
      setVacuumData([]);
      setAirInData([]);
      setAirOutKpaData([]);
      setAirOutMpaData([]);
      setWaterData([]);
      setLoadData([]);
      setVelocityData([]);
      setAbrasionData([]);
    };
  }, [machine]);

  console.log(motorData.length, "motormotor");

  return (
    <div>
      <div>
        {/* <h3>센서 컴포넌트 입니다.</h3> */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {repeat.map((item, index) => (
            <Card
              key={index}
              className={
                index < 2
                  ? styles.topcard
                  : index >= 2 && index < 5
                  ? styles.midcard
                  : styles.botcard
              }
              // onClick={() => navigate("/")}
            >
              <CardContent>
                {index === 0 && (
                  <div
                    onClick={() => navigate(`/machine/${machine}/motor`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    {/* motorData가 []이면 연결조차 되지 않았다는 것이고
                null로 채워져 있으면 연결을 되었지만 데이터를 받아오지 못했다는 것이고 */}

                    {motorData.length === 0 ? (
                      <Box
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgress />
                        <h3>Motor 데이터를 불러오는 중 입니다...</h3>
                      </Box>
                    ) : (
                      <div style={{ height: "100%" }}>
                        <h3 style={{ margin: "0" }}>Motor Toque(%)</h3>

                        <CardMotorChart motorData={motorData} />
                      </div>
                    )}
                  </div>
                )}
                {index === 1 && (
                  <div
                    onClick={() => navigate(`air-in`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    {airInData.length === 0 ? (
                      <Box
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgress />
                        <h3>AirIn 데이터를 불러오는 중 입니다...</h3>
                      </Box>
                    ) : (
                      <div style={{ height: "100%" }}>
                        <h3 style={{ margin: "0" }}>Air입력(kPa)</h3>
                        <CardAirInChart />
                      </div>
                    )}
                  </div>
                )}
                {index === 2 && (
                  <div
                    onClick={() => navigate(`/machine/${machine}/vacuum`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    <h3 style={{ margin: "0" }}>Vacuum입력(kPa)</h3>
                    <CardVacuumChart />
                  </div>
                )}
                {index === 3 && (
                  <div
                    onClick={() => navigate(`air-out-kpa`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    <h3 style={{ margin: "0" }}>Air출력(kPa)</h3>
                    <CardAirOutKpaChart />
                  </div>
                )}
                {index === 4 && (
                  <div
                    onClick={() => navigate(`air-out-mpa`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    <h3 style={{ margin: "0" }}>Air출력(MPa)</h3>
                    <CardAirOutMpaChart />
                  </div>
                )}
                {index === 5 && (
                  <div
                    onClick={() => navigate(`water`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    <h3 style={{ margin: "0" }}>Water출력(L/min)</h3>
                    <CardWaterChart />
                  </div>
                )}
                {index === 6 && (
                  <div
                    onClick={() => navigate(`rpm`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    <h3 style={{ margin: "0" }}>기구부 회전속도(/min)</h3>
                    <CardRpmChart />
                  </div>
                )}
                {index === 7 && (
                  <div
                    onClick={() => navigate(`load`)}
                    style={{ width: "auto", height: "23vh" }}
                    // style={{ width: "auto", height: "50.5vh" }}
                  >
                    <h3 style={{ margin: "0" }}>기구부 부하량(Ampere)</h3>
                    <CardLoadChart />
                  </div>
                )}
                {index === 8 && (
                  <div
                    onClick={() => navigate(`abrasion`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    <h3 style={{ margin: "0" }}>기구부 마모량(mm)</h3>
                    <CardAbrasionChart />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sensor;
