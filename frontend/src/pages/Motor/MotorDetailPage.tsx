import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

import { useParams, useNavigate, useLocation } from "react-router-dom";

import DetailTopCard from "../../components/common/DetailTopCard";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SensorLayout from "../../layout/SensorLayout";
import MotorChart from "../../components/Chart/MotorChart";
import styles from "./MotorPage.module.css";

const MotorDetailPage = () => {
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
        newEntry[`Motor${i}`] = faker.datatype.number({ min: 10, max: 100 });
      }
      setData((prevData) =>
        prevData.length >= 10
          ? [...prevData.slice(1), newEntry]
          : [...prevData, newEntry]
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, [location]);

  const datasets = [...Array(1)].map((_, i) => ({
    id: `Motor${i + 1}`,
    data: data.map((d) => ({ x: d.x, y: d[`Motor${i + 1}`] })),
  }));

  // console.log(datasets);
  const latestData = datasets.map(
    (dataset) => dataset.data[dataset.data.length - 1]
  );

  // console.log(latestData);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleDateChange = (e: any) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e: any) => {
    setSelectedTime(e.target.value);
  };

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
                <h1>79</h1>
                <p>Max Value</p>
              </div>
              <div className={styles.avg}>
                <h1>23</h1>
                <p>Average Value</p>
              </div>
              <div className={styles.min}>
                <h1>3</h1>
                <p>Minimum Value</p>
              </div>
            </div>
            <div style={{ height: "45vh" }}>
              <MotorChart datasets={datasets} legend={false} />
            </div>
          </CardContent>
        </Card>

        <Card className={styles.daycard}>
          <label htmlFor="date-input">날짜 선택</label>
          <input
            type="date"
            id="date-input"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </Card>
        <Card className={styles.timecard}>
          <label htmlFor="time-input">시간 선택</label>
          <input
            type="time"
            id="time-input"
            value={selectedTime}
            onChange={handleTimeChange}
          />
        </Card>
      </div>
    </SensorLayout>
  );
};

export default MotorDetailPage;
