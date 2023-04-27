import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

import { useParams, useNavigate, useLocation } from "react-router-dom";

import DetailTopCard from "../../components/common/DetailTopCard";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SensorLayout from "../../layout/SensorLayout";
import RpmChart from "../../components/Chart/RpmChart";
import styles from "./RpmPage.module.css";

const RpmDetailPage = () => {
  const { rpmNumber } = useParams();
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
        newEntry[`AbrasionLoss${i}`] = faker.datatype.number({
          min: 0,
          max: 50000,
        });
      }
      setData((prevData) =>
        prevData.length >= 5
          ? [...prevData.slice(1), newEntry]
          : [...prevData, newEntry]
      );
    }, 60000);
    return () => clearInterval(intervalId);
  }, [location]);

  const datasets = [...Array(5)].map((_, i) => ({
    id: `AbrasionLoss${i + 1}`,
    data: data.map((d) => ({ x: d.x, y: d[`AbrasionLoss${i + 1}`] })),
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
                <h1>44000</h1>
                <p>Max Value</p>
              </div>
              <div className={styles.avg}>
                <h1>30000</h1>
                <p>Average Value</p>
              </div>
              <div className={styles.min}>
                <h1>20000</h1>
                <p>Minimum Value</p>
              </div>
            </div>
            <div style={{ height: "45vh" }}>
              <RpmChart datasets={datasets} legend={false} />
            </div>
          </CardContent>
        </Card>
      </div>
    </SensorLayout>
  );
};

export default RpmDetailPage;
