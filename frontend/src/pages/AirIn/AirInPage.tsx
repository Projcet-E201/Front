import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SensorLayout from "../../layout/SensorLayout";
import AirInChart from "../../components/Chart/AirInChart";
import { faker } from "@faker-js/faker";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TopCard from "../../components/common/TopCard";
import styles from "./AirInPage.module.css";

import event1 from "../../assets/event1.png";
import event2 from "../../assets/event2.png";
import event3 from "../../assets/event3.png";
import axios from "axios";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AirInPage = () => {
  const [error, setError] = useState<any>();
  const [reconnectTimer, setReconnectTimer] = useState<any>();
  const [reconnectTimeLeft, setReconnectTimeLeft] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { machine = "" } = useParams();

  const [airInData, setAirInData] = useState<any>([]);

  const getAirInData = () => {
    console.log("airIndata 가져오기");
    axios
      .get(`https://semse.info/api/machine/${machine}/air_in_kpa`)
      .then((res) => {
        const airInData = res.data.reduce((acc: any, airIn: any) => {
          const { name, time, value } = airIn;
          const airInId = name.replace("AIR_IN_KPA", "");
          const dataPoint = { x: time.split("/")[1], y: value };

          if (!acc[airInId]) {
            acc[airInId] = { id: `AirIn${airInId}`, data: [dataPoint] };
          } else {
            acc[airInId].data.push(dataPoint);
          }

          return acc;
        }, {});

        // 데이터를 모두 추가한 후 motorData 배열에 값을 넣어줍니다.
        setAirInData(Object.values(airInData));
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
            getAirInData();
            setError("");
          }
        }, 1000);
      });
  };

  useEffect(() => {
    getAirInData();

    const interval = setInterval(() => {
      getAirInData();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(reconnectTimer);
      setAirInData([]);
    };
  }, [machine]);

  const latestData = airInData.map(
    (dataset: any) => dataset.data[dataset.data.length - 1]
  );

  console.log(airInData);

  console.log(latestData);
  return (
    <SensorLayout>
      <div className={styles.topcard}>
        <TopCard location={location.pathname} />
      </div>
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
                  {data?.y > 800 ? (
                    <img
                      src={event3}
                      alt="event3"
                      style={{ width: 60, margin: "5px" }}
                    />
                  ) : data?.y > 700 ? (
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
                    AirIn{index + 1}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className={styles.card} style={{ flex: "2" }}>
          <CardContent style={{ height: "13rem" }}>
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
              <AirInChart datasets={airInData} legend={true} />
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
        {airInData.map((dataset: any, index: number) => (
          // <Card className={styles.card} style={{ width: "32.3%" }}>
          <Card
            key={index}
            className={styles.card}
            style={{ width: "49%" }}
            onClick={() => navigate(`${index + 1}`)}
          >
            <CardContent style={{ height: "20vh", margin: "0" }}>
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
                  <h4 style={{ margin: "0" }}>AirIn-{index + 1}</h4>
                  <AirInChart datasets={[dataset]} legend={false} />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </SensorLayout>
  );
};

export default AirInPage;
