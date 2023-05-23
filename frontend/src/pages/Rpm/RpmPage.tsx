import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import MainLayout from "../../layout/MainLayout";
import TopCard from "../../components/common/TopCard";
import { faker } from "@faker-js/faker";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from "./RpmPage.module.css";

import axios from "axios";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import event1 from "../../assets/event1.png";
import event2 from "../../assets/event2.png";
import event3 from "../../assets/event3.png";

import RpmChart from "../../components/Chart/RpmChart";

const RpmPage = () => {
  const [error, setError] = useState<any>();
  const [reconnectTimer, setReconnectTimer] = useState<any>();
  const [reconnectTimeLeft, setReconnectTimeLeft] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { machine = "" } = useParams();

  const [rpmData, setRpmData] = useState<any>([]);

  const getRpmData = () => {
    // console.log("rpmdata 가져오기");
    axios
      .get(`https://semse.info/api/machine/${machine}/velocity`)
      .then((res) => {
        const rpmData = res.data.reduce((acc: any, rpm: any) => {
          const { name, time, value } = rpm;
          const rpmId = name.replace("VELOCITY", "");
          const dataPoint = { x: time.split("/")[1], y: value };

          if (!acc[rpmId]) {
            acc[rpmId] = { id: `Rpm${rpmId}`, data: [dataPoint] };
          } else {
            acc[rpmId].data.push(dataPoint);
          }

          return acc;
        }, {});

        // 데이터를 모두 추가한 후 motorData 배열에 값을 넣어줍니다.
        setRpmData(Object.values(rpmData));
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
            getRpmData();
            setError("");
          }
        }, 1000);
      });
  };
  const updateCycle = localStorage.getItem("updateCycle");
  const time = updateCycle ? parseInt(updateCycle) : 10000;
  useEffect(() => {
    getRpmData();

    const interval = setInterval(() => {
      getRpmData();
    }, time);

    return () => {
      clearInterval(interval);
      clearInterval(reconnectTimer);
      setRpmData([]);
    };
  }, [machine]);

  // console.log(motorData[0]);
  // console.log(motorData[1]);

  // console.log(motorData);

  const latestData = rpmData.map(
    (dataset: any) => dataset.data[dataset.data.length - 1]
  );

  // console.log(latestData);
  return (
    <MainLayout>
      <div className={styles.topcard}>
        <TopCard location={location.pathname} />
      </div>

      {rpmData.length === 0 ? (
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
              <h3>회전속도 데이터를 불러오는 중 입니다...</h3>
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
                      {data?.y > 45000 ? (
                        <img
                          src={event3}
                          alt="event3"
                          style={{ width: 60, margin: "5px" }}
                        />
                      ) : data?.y > 40000 ? (
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
                        Rpm{index + 1}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className={styles.card} style={{ flex: "1" }}>
              <CardContent style={{ height: "25vh" }}>
                {rpmData.length === 0 ? (
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
                  <RpmChart datasets={rpmData} legend={true} />
                )}
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
            {rpmData.map((dataset: any, index: number) => (
              // <Card className={styles.card} style={{ width: "32.3%" }}>
              <Card
                className={styles.botcard}
                onClick={() => navigate(`${index + 1}`)}
              >
                <CardContent style={{ height: "20vh", margin: "0" }}>
                  <h4 style={{ margin: "0" }}>Rpm-{index + 1}</h4>
                  <RpmChart datasets={[dataset]} legend={false} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default RpmPage;
