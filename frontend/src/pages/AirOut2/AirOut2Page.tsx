import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import AirOut2Chart from "../../components/Chart/AirOut2Chart";
import { faker } from "@faker-js/faker";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TopCard from "../../components/common/TopCard";
import styles from "./AirOut2Page.module.css";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import event1 from "../../assets/event1.png";
import event2 from "../../assets/event2.png";
import event3 from "../../assets/event3.png";

import axios from "axios";

const AirOut2Page = () => {
  const [error, setError] = useState<any>();
  const [reconnectTimer, setReconnectTimer] = useState<any>();
  const [reconnectTimeLeft, setReconnectTimeLeft] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { machine = "" } = useParams();

  const [airOutMpaData, setAirOutMpaData] = useState<any>([]);
  const getAirOutMpaData = () => {
    // console.log("airOutMpa 가져오기");
    axios
      .get(`https://semse.info/api/machine/${machine}/air_out_mpa`)
      .then((res) => {
        const airOutMpaData = res.data.reduce((acc: any, air_out_mpa: any) => {
          const { name, time, value } = air_out_mpa;
          const airOutMpaId = name.replace("AIR_OUT_MPA", "");
          const dataPoint = { x: time.split("/")[1], y: value };

          if (!acc[airOutMpaId]) {
            acc[airOutMpaId] = {
              id: `AirOutMpa${airOutMpaId}`,
              data: [dataPoint],
            };
          } else {
            acc[airOutMpaId].data.push(dataPoint);
          }

          return acc;
        }, {});

        // 데이터를 모두 추가한 후 motorData 배열에 값을 넣어줍니다.
        setAirOutMpaData(Object.values(airOutMpaData));
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
            getAirOutMpaData();
            setError("");
          }
        }, 1000);
      });
  };
  const updateCycle = localStorage.getItem("updateCycle");
  const time = updateCycle ? parseInt(updateCycle) : 10000;
  useEffect(() => {
    getAirOutMpaData();

    const interval = setInterval(() => {
      getAirOutMpaData();
    }, time);

    return () => {
      clearInterval(interval);
      clearInterval(reconnectTimer);
      setAirOutMpaData([]);
    };
  }, [machine]);

  // console.log(motorData[0]);
  // console.log(motorData[1]);

  // console.log(motorData);

  const latestData = airOutMpaData.map(
    (dataset: any) => dataset.data[dataset.data.length - 1]
  );

  // console.log(latestData);

  return (
    <MainLayout>
      <div className={styles.topcard}>
        <TopCard location={location.pathname} />
      </div>
      {airOutMpaData.length === 0 ? (
        <Card className={styles.card}>
          <CardContent style={{ height: "70vh" }}>
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
              <h3>AirOut(MPa) 데이터를 불러오는 중 입니다...</h3>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <div>
          <div className={styles.midcard}>
            <Card className={styles.card} style={{ flex: "1" }}>
              <CardContent style={{ height: "100%" }}>
                {/* <h3 style={{ margin: "0" }}>Event</h3> */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignContent: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  {latestData.map((data: any, index: number) => (
                    <div
                      key={index}
                      style={{
                        flexDirection: "column",
                        display: "flex",
                        alignItems: "center",
                        width: "20%",
                        cursor: "pointer",
                        margin: "0px",
                      }}
                      onClick={() => navigate(`${index + 1}`)}
                    >
                      {data?.y > 0.8 ? (
                        <img
                          src={event3}
                          alt="event3"
                          style={{ width: 60, margin: "5px" }}
                        />
                      ) : data?.y > 0.7 ? (
                        <img
                          src={event2}
                          alt="event2"
                          style={{ width: 60, margin: "5px" }}
                        />
                      ) : (
                        <img
                          src={event1}
                          alt="event1"
                          style={{ width: 60, margin: "5px" }}
                        />
                      )}
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "0",
                        }}
                      >
                        AO(Mpa){index + 1}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className={styles.card} style={{ flex: "2" }}>
              <CardContent style={{ height: "25vh" }}>
                <AirOut2Chart datasets={airOutMpaData} legend={true} />
              </CardContent>
            </Card>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {airOutMpaData.map((dataset: any, index: number) => (
              // <Card className={styles.card} style={{ width: "32.3%" }}>
              <Card
                className={styles.botcard}
                onClick={() => navigate(`${index + 1}`)}
              >
                <CardContent style={{ height: "25vh", margin: "0" }}>
                  <h4 style={{ margin: "0" }}>AirOut-MPa{index + 1}</h4>
                  <AirOut2Chart datasets={[dataset]} legend={false} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default AirOut2Page;
