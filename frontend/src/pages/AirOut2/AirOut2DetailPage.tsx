import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

import { useParams, useNavigate, useLocation } from "react-router-dom";

import DetailTopCard from "../../components/common/DetailTopCard";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SensorLayout from "../../layout/SensorLayout";
import AirOut2Chart from "../../components/Chart/AirOut2Chart";
import styles from "./AirOut2Page.module.css";

const AirOut2DetailPage = () => {
  const { airOut2Number } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<{ x: number; [key: string]: number }[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString("ko-KR", {
        hour12: false,
      });
      const newEntry: any = { x: currentTime };
      for (let i = 1; i <= 1; i++) {
        newEntry[`AirOut2${i}`] = faker.datatype.number({ min: -0.1, max: 1 });
      }
      setData((prevData) =>
        prevData.length >= 5
          ? [...prevData.slice(1), newEntry]
          : [...prevData, newEntry]
      );
    }, 10000);
    return () => clearInterval(intervalId);
  }, [location]);

  const datasets = [...Array(1)].map((_, i) => ({
    id: `AirOut2${i + 1}`,
    data: data.map((d) => ({ x: d.x, y: d[`AirOut2${i + 1}`] })),
  }));

  // console.log(datasets);
  const latestData = datasets.map(
    (dataset) => dataset.data[dataset.data.length - 1]
  );

  // console.log(latestData);

  return (
    <SensorLayout>
      <div className={styles.topcard}>
        <DetailTopCard location={location.pathname} />
      </div>
      <div style={{ width: "100%" }}>
        <Card className={styles.card}>
          <CardContent>
            <div className={styles.data}>
              <div className={styles.max}>
                <h1>0.8</h1>
                <p>Max Value</p>
              </div>
              <div className={styles.avg}>
                <h1>0.5</h1>
                <p>Average Value</p>
              </div>
              <div className={styles.min}>
                <h1>0</h1>
                <p>Minimum Value</p>
              </div>
            </div>
            <div style={{ height: "45vh" }}>
              <AirOut2Chart datasets={datasets} legend={false} />
            </div>
          </CardContent>
        </Card>
      </div>
    </SensorLayout>
  );
};

export default AirOut2DetailPage;
