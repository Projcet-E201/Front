import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SensorLayout from "../../layout/SensorLayout";
import MotorChart from "../../components/Chart/MotorChart";
import { faker } from "@faker-js/faker";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TopCard from "../../components/common/TopCard";
import styles from "./MotorPage.module.css";

import axios from "axios";

import event1 from "../../assets/event1.png";
import event2 from "../../assets/event2.png";
import event3 from "../../assets/event3.png";

const MotorPage = () => {
  const [error, setError] = useState<any>();
  const [reconnectTimer, setReconnectTimer] = useState<any>();
  const [reconnectTimeLeft, setReconnectTimeLeft] = useState<number>(0);
  const [data, setData] = useState<{ x: number; [key: string]: number }[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { machine = "" } = useParams();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString("ko-KR", {
        hour12: false,
      });
      const newEntry: any = { x: currentTime };
      for (let i = 1; i <= 10; i++) {
        newEntry[`Motor${i}`] = faker.datatype.number({ min: 10, max: 100 });
      }
      setData((prevData) =>
        prevData.length >= 10
          ? [...prevData.slice(1), newEntry]
          : [...prevData, newEntry]
      );
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const datasets = [...Array(10)].map((_, i) => ({
    id: `Motor${i + 1}`,
    data: data.map((d) => ({ x: d.x, y: d[`Motor${i + 1}`] })),
  }));

  // console.log(datasets);
  const latestData = datasets.map(
    (dataset) => dataset.data[dataset.data.length - 1]
  );

  // console.log(latestData);

  const getMotorData = () => {
    console.log("motordata 가져오기");
    axios
      .get(`https://semse.info/api/machine/${machine}/motor`)
      .then((res) => {
        console.log(res);
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
            getMotorData();
            setError("");
          }
        }, 1000);
      });
  };

  useEffect(() => {
    getMotorData();

    const interval = setInterval(() => {
      getMotorData();
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(reconnectTimer);
    };
  }, [machine]);

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
              {latestData.map((data, index) => (
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
                  {data?.y > 90 ? (
                    <img
                      src={event3}
                      alt="event3"
                      style={{ width: 60, margin: "5px" }}
                    />
                  ) : data?.y > 70 ? (
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
                    M{index + 1}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className={styles.card} style={{ flex: "2" }}>
          <CardContent style={{ height: "250px" }}>
            <MotorChart datasets={datasets} legend={true} />
          </CardContent>
        </Card>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          // width: "100%",
          justifyContent: "space-between",
        }}
      >
        {datasets.map((dataset, index) => (
          // <Card className={styles.card} style={{ width: "32.3%" }}>
          <Card
            key={index}
            className={styles.botcard}
            // style={{ width: "32%", cursor: "pointer" }}
            onClick={() => navigate(`${index + 1}`)}
          >
            <CardContent style={{ height: "250px", margin: "0" }}>
              <h4 style={{ margin: "0" }}>Motor{index + 1}</h4>
              <MotorChart datasets={[dataset]} legend={false} />
            </CardContent>
          </Card>
        ))}
      </div>
    </SensorLayout>
  );
};

export default MotorPage;
