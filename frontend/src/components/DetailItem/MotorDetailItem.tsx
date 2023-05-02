import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

import { useParams, useNavigate, useLocation } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MotorDetailChart from "../Chart/DetailChart/MotorDetailChart";
import styles from "./MotorDetailItem.module.css";

const MotorDetailItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<{ x: number; [key: string]: number }[]>([]);
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [startTime, setStartTime] = useState<string>("00:00:01");
  const [endTime, setEndTime] = useState<string>("23:59:59");
  const [intervalSeconds, setIntervalSeconds] = useState<number>(5);
  const maxDate = new Date().toISOString().slice(0, 10);
  const minDate = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  useEffect(() => {
    const fetchData = async () => {
      // 선택된 날짜에 해당하는 데이터를 가져옵니다.
      const response = await fetch(`/api/motor-data?date=${startDate}`);
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, [startDate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString("ko-KR", {
        hour12: false,
      });
      const newEntry: any = { x: currentTime };
      for (let i = 1; i <= 1; i++) {
        newEntry[`Motor${i}`] = faker.datatype.number({ min: 10, max: 290 });
      }
      setData((prevData) =>
        prevData.length >= 10
          ? [...prevData.slice(1), newEntry]
          : [...prevData, newEntry]
      );
    }, intervalSeconds * 1000);
    return () => clearInterval(intervalId);
  }, [location, intervalSeconds]);

  const datasets = [...Array(1)].map((_, i) => ({
    id: `Motor${i + 1}`,
    data: data.map((d) => ({ x: d.x, y: d[`Motor${i + 1}`] })),
  }));

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    if (selectedDate <= maxDate && selectedDate >= minDate) {
      setStartDate(selectedDate);
    } else {
      // 범위를 벗어나는 경우 처리
      alert("일주일 이내의 날짜를 선택해주세요.");
    }
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    if (selectedDate <= maxDate && selectedDate >= minDate) {
      setEndDate(selectedDate);
    } else {
      // 범위를 벗어나는 경우 처리
      alert("일주일 이내의 날짜를 선택해주세요.");
    }
  };
  const handleStartTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(event.target.value);
  };

  const handleIntervalChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIntervalSeconds(Number(event.target.value));
  };

  return (
    <div style={{ width: "100%" }}>
      <Card className={styles.detailcard}>
        <CardContent>
          <div style={{ height: "33vh" }}>
            <MotorDetailChart datasets={datasets} legend={false} />
          </div>
        </CardContent>
      </Card>
      <Card className={styles.detaildate}>
        <CardContent>
          <div style={{ height: "33vh", marginTop: "0%" }}>
            <div className={styles.data}>
              <div className={styles.max}>
                <h1 style={{ marginBottom: "0%" }}>0.8</h1>
                <p>Maximum Value</p>
              </div>
              <div className={styles.avg}>
                <h1 style={{ marginBottom: "0%" }}>0.5</h1>
                <p>Average Value</p>
              </div>
              <div className={styles.min}>
                <h1 style={{ marginBottom: "0%" }}>0</h1>
                <p>Minimum Value</p>
              </div>
            </div>
            <br />
            <div style={{ marginLeft: "2vw" }}>
              날짜:{"  "}
              <input
                type="date"
                value={startDate}
                onChange={handleDateChange}
              />{" "}
              ~{" "}
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
            <br />
            <div style={{ marginLeft: "2vw" }}>
              시간:{"  "}
              <input
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
              />{" "}
              ~{" "}
              <input
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
              />
            </div>
            <br />
            <div style={{ marginLeft: "2vw" }}>
              간격:{"  "}
              <select
                id="interval"
                name="interval"
                value={intervalSeconds}
                onChange={handleIntervalChange}
              >
                <option value={1}>1초</option>
                <option value={5}>5초</option>
                <option value={10}>10초</option>
                <option value={60}>1분</option>
                <option value={600}>10분</option>
                <option value={3600}>1시간</option>
              </select>
            </div>
            <br />
            <div className={styles.data}>
              <div style={{ float: "left" }}>검색</div>
              <div style={{ float: "left" }}>실시간</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MotorDetailItem;
