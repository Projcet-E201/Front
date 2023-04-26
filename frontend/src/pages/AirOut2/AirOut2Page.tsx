import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SensorLayout from "../../layout/SensorLayout";
import AirOutChart from "../../components/Chart/AirOutChart";
import { faker } from "@faker-js/faker";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TopCard from "../../components/common/TopCard";
import styles from "./AirOut2Page.module.css";

import event1 from "../../assets/event1.png";
import event2 from "../../assets/event2.png";
import event3 from "../../assets/event3.png";

const AirOut2Page = () => {
  const [data, setData] = useState<{ x: number; [key: string]: number }[]>([]);
  const location = useLocation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString("ko-KR", {
        hour12: false,
      });
      const newEntry: any = { x: currentTime };
      for (let i = 1; i <= 10; i++) {
        newEntry[`AirOut-mpa${i}`] = faker.datatype.number({
          min: 10,
          max: 100,
        });
      }
      setData((prevData) =>
        prevData.length >= 10
          ? [...prevData.slice(1), newEntry]
          : [...prevData, newEntry]
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const datasets = [...Array(10)].map((_, i) => ({
    id: `AirOut-mpa${i + 1}`,
    data: data.map((d) => ({ x: d.x, y: d[`AirOut-mpa${i + 1}`] })),
  }));

  // console.log(datasets);
  const latestData = datasets.map(
    (dataset) => dataset.data[dataset.data.length - 1]
  );

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
              {latestData.map((data, index) => (
                <div
                  key={index}
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    alignItems: "center",
                    width: "20%",
                  }}
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
                    AO(MPa){index + 1}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className={styles.card} style={{ flex: "2" }}>
          <CardContent style={{ height: "25vh" }}>
            <AirOutChart datasets={datasets} legend={true} />
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
        {datasets.map((dataset, index) => (
          // <Card className={styles.card} style={{ width: "32.3%" }}>
          <Card className={styles.card} style={{ width: "49%" }}>
            <CardContent style={{ height: "20vh", margin: "0" }}>
              <h4 style={{ margin: "0" }}>AirOut-mpa{index + 1}</h4>
              <AirOutChart datasets={[dataset]} legend={false} />
            </CardContent>
          </Card>
        ))}
      </div>
    </SensorLayout>
  );
};

export default AirOut2Page;
