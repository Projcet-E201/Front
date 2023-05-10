import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import VacuumChart from "../../components/Chart/VacuumChart";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
import { faker } from "@faker-js/faker";

import SensorLayout from "../../layout/SensorLayout";
import TopCard from "../../components/common/TopCard";

import styles from "./VacuumPage.module.css";

import event1 from "../../assets/event1.png";
import event2 from "../../assets/event2.png";
import event3 from "../../assets/event3.png";

// mui icons
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

const VacuumPage = () => {
  // const { machine } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 전체 vacuum 데이터 가져오기
  const [data, setData] = useState(() => {
    const data = [];
    for (let i = 1; i <= 30; i++) {
      const vacuum = `V${i}`;
      const value = faker.datatype.number({ min: 0, max: 100 });
      const color = (i - 1) % 2 === 0 ? "#C1EAF3" : "#5CC2F2";
      data.push({ id: `${i}`, vacuum, value, color });
    }
    return data;
  });

  const [remainingTime, setRemainingTime] = useState(5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newData = data.map((d: any) => ({
        ...d,
        value: faker.datatype.number({ min: 0, max: 100 }),
      }));
      setData(newData);
      setRemainingTime(6);
    }, 10000);

    const countdownIntervalId = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 10000);

    return () => {
      clearInterval(intervalId);
      clearInterval(countdownIntervalId);
    };
  }, [data]);
  console.log(data);

  return (
    <SensorLayout>
      <div className={styles.topcard}>
        {/* <Card className={styles.card}>
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "5vh",
            }}
          >
            <h1>Vacuum</h1>
          </CardContent>
        </Card> */}
        <TopCard location={location.pathname} />
      </div>
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
            {data.map((d, index) => (
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
                }}
              >
                {data.filter((d) => d.value <= 70).length}
              </h1>
              <p style={{ display: "flex", justifyContent: "center" }}>Good</p>
            </div>
            <div style={{ width: "20%" }}>
              <h1
                style={{
                  color: "#FFC041",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {data.filter((d) => d.value > 70 && d.value < 90).length}
              </h1>
              <p style={{ display: "flex", justifyContent: "center" }}>Fair</p>
            </div>
            <div style={{ width: "20%" }}>
              <h1
                style={{
                  color: "#FF3B30",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {data.filter((d) => d.value >= 90).length}
              </h1>
              <p style={{ display: "flex", justifyContent: "center" }}>Pool</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className={styles.card} style={{ height: "50vh" }}>
          <CardContent style={{ height: "48vh" }}>
            <VacuumChart data={data} />
          </CardContent>
        </Card>
      </div>
    </SensorLayout>
  );
};

export default VacuumPage;
