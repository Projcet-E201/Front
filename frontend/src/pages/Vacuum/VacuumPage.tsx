import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import VacuumChart from "../../components/Chart/VacuumChart";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
import { faker } from "@faker-js/faker";

import SensorLayout from "../../layout/SensorLayout";
import TopCard from "../../components/common/TopCard";

import axios from "axios";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import styles from "./VacuumPage.module.css";

import event1 from "../../assets/event1.png";
import event2 from "../../assets/event2.png";
import event3 from "../../assets/event3.png";

// mui icons
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

const VacuumPage = () => {
  const [error, setError] = useState<any>();
  const [reconnectTimer, setReconnectTimer] = useState<any>();
  const [reconnectTimeLeft, setReconnectTimeLeft] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { machine = "" } = useParams();

  const [vacuumData, setVacuumData] = useState<any>([]);

  const getVacuumData = () => {
    // console.log("motordata 가져오기");
    axios
      .get(`https://semse.info/api/machine/${machine}/vacuum`)
      .then((res) => {
        const vacuumData = res.data.reduce((acc: any, vacuum: any) => {
          const { name, time, value } = vacuum;
          const vacuumId = name.replace("VACUUM", "");
          const dataPoint = {
            id: vacuumId,
            vacuum: `V${vacuumId}`,
            value: value,
            color: vacuumId % 2 === 0 ? "#C1EAF3" : "#5CC2F2",
          };

          if (!acc[vacuumId]) {
            acc[vacuumId] = { id: `Vacuum${vacuumId}`, data: [dataPoint] };
          } else {
            acc[vacuumId].data.push(dataPoint);
          }

          return acc;
        }, {});

        // 데이터를 모두 추가한 후 motorData 배열에 값을 넣어줍니다.
        setVacuumData(Object.values(vacuumData));
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
            getVacuumData();
            setError("");
          }
        }, 1000);
      });
  };

  useEffect(() => {
    getVacuumData();

    const interval = setInterval(() => {
      getVacuumData();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(reconnectTimer);
      setVacuumData([]);
    };
  }, [machine]);

  // console.log(motorData[0]);
  // console.log(motorData[1]);

  // console.log(motorData);

  const latestData = vacuumData.map(
    (dataset: any) => dataset.data[dataset.data.length - 1]
  );

  // console.log(latestData, "dfdffef22222222222");
  return (
    <SensorLayout>
      <div className={styles.topcard}>
        <TopCard location={location.pathname} />
      </div>
      {vacuumData.length === 0 ? (
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
              <h3>Vacuum 데이터를 불러오는 중 입니다...</h3>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <div>
          <div className={styles.midcard}>
            <Card className={styles.card} style={{ flex: "2" }}>
              <CardContent
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                {latestData.map((d: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      flexDirection: "column",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {d.value > 90 ? (
                      <img
                        src={event3}
                        alt="event3"
                        style={{ width: 60, margin: "5px" }}
                      />
                    ) : d.value > 70 ? (
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
                      V{d.id}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className={styles.card} style={{ flex: "1" }}>
              <CardContent
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignContent: "center",
                }}
              >
                <div style={{ width: "20%" }}>
                  <h1
                    style={{
                      color: "#4CD964",
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "50px", // Increase the font size here
                    }}
                  >
                    {latestData.filter((d: any) => d.value <= 70).length}
                  </h1>
                  <h5 style={{ display: "flex", justifyContent: "center" }}>
                    Good
                  </h5>
                </div>
                <div style={{ width: "20%" }}>
                  <h1
                    style={{
                      color: "#FFC041",
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "50px", // Increase the font size here
                    }}
                  >
                    {
                      latestData.filter(
                        (d: any) => d.value > 70 && d.value < 90
                      ).length
                    }
                  </h1>
                  <h5 style={{ display: "flex", justifyContent: "center" }}>
                    Fair
                  </h5>
                </div>
                <div style={{ width: "20%" }}>
                  <h1
                    style={{
                      color: "#FF3B30",
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "50px", // Increase the font size here
                    }}
                  >
                    {latestData.filter((d: any) => d.value >= 90).length}
                  </h1>
                  <h5 style={{ display: "flex", justifyContent: "center" }}>
                    Pool
                  </h5>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className={styles.card} style={{ height: "50vh" }}>
              <CardContent style={{ height: "48vh" }}>
                <VacuumChart data={latestData} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </SensorLayout>
  );
};

export default VacuumPage;
