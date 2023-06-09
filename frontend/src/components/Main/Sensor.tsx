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

  const [data, setData] = useState<any[]>([]);
  const [motorData, setMotorData] = useState<any[]>([]);
  const [vacuumData, setVacuumData] = useState<any[]>([]);
  const [airInData, setAirInData] = useState<any[]>([]);
  const [airOutKpaData, setAirOutKpaData] = useState<any[]>([]);
  const [airOutMpaData, setAirOutMpaData] = useState<any[]>([]);
  const [waterData, setWaterData] = useState<any[]>([]);
  const [loadData, setLoadData] = useState<any[]>([]);
  const [velocityData, setVelocityData] = useState<any[]>([]);
  const [abrasionData, setAbrasionData] = useState<any[]>([]);

  // 가장 최근 업데이트 시간

  const [updatedTime, setUpdatedTime] = useState("");

  const getSensorData = () => {
    axios
      .get(`https://semse.info/api/machine/${machine}/sensor`)

      .then((response) => {
        // console.log(response.data);
        setData(response.data);
        setMotorData(response.data[0].MOTOR);
        setVacuumData(response.data[0].VACUUM);
        setAirInData(response.data[0].AIR_IN_KPA);
        setAirOutKpaData(response.data[0].AIR_OUT_KPA);
        setAirOutMpaData(response.data[0].AIR_OUT_MPA);
        setVelocityData(response.data[0].VELOCITY);
        setLoadData(response.data[0].LOAD);
        setAbrasionData(response.data[0].ABRASION);
        setWaterData(response.data[0].WATER);

        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        setUpdatedTime(`${hours}시${minutes}분${seconds}초`);
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

  const updateCycle = localStorage.getItem("updateCycle");
  const time = updateCycle ? parseInt(updateCycle) : 10000;
  useEffect(() => {
    getSensorData();

    const interval = setInterval(() => {
      getSensorData();
    }, time);

    return () => {
      clearInterval(interval);
      // reconnectTimer에 대한 처리 추가 필요
      setMotorData([]);
      setVacuumData([]);
      setAirInData([]);
      setAirOutKpaData([]);
      setAirOutMpaData([]);
      setWaterData([]);
      setLoadData([]);
      setVelocityData([]);
      setAbrasionData([]);
      setData([]);
    };
  }, [machine]);

  // console.log(data.length, "datalength");

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

                    {data.length === 0 ? (
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
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "end",
                          }}
                        >
                          <h3 style={{ margin: "0" }}>Motor Toque(%)</h3>
                          <h5 style={{ margin: "0" }}>
                            last update: {updatedTime}
                          </h5>
                        </div>

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
                    {data.length === 0 ? (
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
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "end",
                          }}
                        >
                          <h3 style={{ margin: "0" }}>Air입력(kPa)</h3>
                          <h5 style={{ margin: "0" }}>
                            last update: {updatedTime}
                          </h5>
                        </div>
                        <CardAirInChart airInData={airInData} />
                      </div>
                    )}
                  </div>
                )}
                {index === 2 && (
                  <div
                    onClick={() => navigate(`/machine/${machine}/vacuum`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    {data.length === 0 ? (
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
                        <h3>Vacuum 데이터를 불러오는 중 입니다...</h3>
                      </Box>
                    ) : (
                      <div style={{ height: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "end",
                          }}
                        >
                          <h3 style={{ margin: "0" }}>Vacuum입력(kPa)</h3>
                          <h5 style={{ margin: "0" }}>
                            last update: {updatedTime}
                          </h5>
                        </div>
                        <CardVacuumChart vacuumData={vacuumData} />
                      </div>
                    )}
                  </div>
                )}
                {index === 3 && (
                  <div
                    onClick={() => navigate(`air-out-kpa`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    {data.length === 0 ? (
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
                        <h3>AirOut(Kpa) 데이터를 불러오는 중 입니다...</h3>
                      </Box>
                    ) : (
                      <div style={{ height: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "end",
                          }}
                        >
                          <h3 style={{ margin: "0" }}>Air출력(kPa)</h3>
                          <h5 style={{ margin: "0" }}>
                            last update: {updatedTime}
                          </h5>
                        </div>
                        <CardAirOutKpaChart airOutKpaData={airOutKpaData} />
                      </div>
                    )}
                  </div>
                )}
                {index === 4 && (
                  <div
                    onClick={() => navigate(`air-out-mpa`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    {data.length === 0 ? (
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
                        <h3>AirOut(Mpa) 데이터를 불러오는 중 입니다...</h3>
                      </Box>
                    ) : (
                      <div style={{ height: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "end",
                          }}
                        >
                          <h3 style={{ margin: "0" }}>Air출력(MPa)</h3>
                          <h5 style={{ margin: "0" }}>
                            last update: {updatedTime}
                          </h5>
                        </div>
                        <CardAirOutMpaChart airOutMpaData={airOutMpaData} />
                      </div>
                    )}
                  </div>
                )}
                {index === 5 && (
                  <div
                    onClick={() => navigate(`water`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    {data.length === 0 ? (
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
                        <h3>Water 데이터를 불러오는 중 입니다...</h3>
                      </Box>
                    ) : (
                      <div style={{ height: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "end",
                          }}
                        >
                          <h3 style={{ margin: "0" }}>Water출력(L/min)</h3>
                          <h5 style={{ margin: "0" }}>
                            last update: {updatedTime}
                          </h5>
                        </div>

                        <CardWaterChart waterData={waterData} />
                      </div>
                    )}
                  </div>
                )}
                {index === 6 && (
                  <div
                    onClick={() => navigate(`rpm`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    {data.length === 0 ? (
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
                        <h3>회전속도 데이터를 불러오는 중 입니다...</h3>
                      </Box>
                    ) : (
                      <div style={{ height: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "end",
                          }}
                        >
                          <h3 style={{ margin: "0" }}>회전속도(/min)</h3>
                          <h5 style={{ margin: "0" }}>
                            last update: {updatedTime}
                          </h5>
                        </div>
                        <CardRpmChart velocityData={velocityData} />
                      </div>
                    )}
                  </div>
                )}
                {index === 7 && (
                  <div
                    onClick={() => navigate(`load`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    {data.length === 0 ? (
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
                        <h3>부하량 데이터를 불러오는 중 입니다...</h3>
                      </Box>
                    ) : (
                      <div style={{ height: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "end",
                          }}
                        >
                          <h3 style={{ margin: "0" }}>부하량(Ampere)</h3>
                          <h5 style={{ margin: "0" }}>
                            last update: {updatedTime}
                          </h5>
                        </div>
                        <CardLoadChart loadData={loadData} />
                      </div>
                    )}
                  </div>
                )}
                {index === 8 && (
                  <div
                    onClick={() => navigate(`abrasion`)}
                    style={{ width: "auto", height: "23vh" }}
                  >
                    {data.length === 0 ? (
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
                        <h3>마모량 데이터를 불러오는 중 입니다...</h3>
                      </Box>
                    ) : (
                      <div style={{ height: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "end",
                          }}
                        >
                          <h3 style={{ margin: "0" }}>마모량(mm)</h3>
                          <h5 style={{ margin: "0" }}>
                            last update: {updatedTime}
                          </h5>
                        </div>
                        <CardAbrasionChart abrasionData={abrasionData} />
                      </div>
                    )}
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
