import React, { useCallback, useEffect, useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DetailChart from "../Chart/DetailChart/DetailChart";
import styles from "./DetailItem.module.css";
import { DatePicker, Space, Button } from "antd";
import axios from "axios";

const { RangePicker } = DatePicker;
type History = {
  x: string;
  y: number;
};

const DetailItem: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<{ x: number; [key: string]: number }[]>([]);
  const [intervalSeconds, setIntervalSeconds] = useState<number>(1);
  const [machineId, setMachineId] = useState<string>("");
  const [sensor, setSensor] = useState<string>("");
  const [sensorId, setSensorId] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [historydata, setHistoryData] = useState<History[]>([]);

  const datasets = [...Array(1)].map((_, i) => {
    const values = data.map((d) => d.y);
    const max = values.length > 0 ? Math.max(...values) : 0;
    const avg =
      values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    const min = values.length > 0 ? Math.min(...values) : 0;
    const [, , , sensor] = location.pathname.split("/");

    return {
      id: `${sensorId}`,
      name: `${sensor}`,
      data: data.map((d) => ({ x: d.x, y: d.y })),
      max: Number(max.toFixed(3)),
      avg: Number(avg.toFixed(3)),
      min: Number(min.toFixed(3)),
    };
  });

  const handleDateChange = useCallback(
    (dates: any, dateStrings: [string, string]) => {
      setStartDate(dates[0].toDate());
      setEndDate(dates[1].toDate());
    },
    []
  );

  useEffect(() => {
    const pathname = location.pathname;
    const [, , machineid, sensor, id] = pathname.split("/");
    setSensor(`${sensor}`);
    setSensorId(`${id}`);
    setMachineId(`${machineid}`);
  }, [location.pathname]);

  const getHistoryData = async () => {
    console.log("요청했다멍");

    const startTime = startDate?.toISOString();
    const endTime = endDate?.toISOString();

    await axios
      .get(
        `https://semse.info/api/machine/${machineId}/history/${sensor}/${sensorId}/${startTime}/${endTime}`
      )
      .then((response) => {
        console.log("성공이다멍", response.data);
        // console.log(startTime, endTime);

        const historyData = response.data.data.map((item: any) => ({
          x: item.x.split("/")[1], // x 값에서 시간 부분만 추출하여 저장
          y: parseFloat(item.y), // y 값을 숫자로 변환하여 저장
        }));

        setData(historyData); // 데이터를 업데이트합니다.
      })
      .catch((error) => {
        // console.error("실패다멍", error);
        // console.log(startTime, endTime);
      });
  };

  const getNowData = async () => {
    console.log("요청했다람쥐");

    const currentDate = new Date();
    const startTime = new Date(
      currentDate.getTime() - 10 * 60 * 1000
    ).toISOString();
    const endTime = currentDate.toISOString();

    await axios
      .get(
        `https://semse.info/api/machine/${machineId}/history/${sensor}/${sensorId}/${startTime}/${endTime}`
      )
      .then((response) => {
        // console.log("성공이다람쥐", response.data);
        const nowData = response.data.data.map((item: any) => ({
          x: item.x.split("/")[1], // x 값에서 시간 부분만 추출하여 저장
          y: parseFloat(item.y), // y 값을 숫자로 변환하여 저장
        }));

        setData(nowData);
      })
      .catch((error) => {
        // console.error("실패다람쥐", error);
      });
  };

  useEffect(() => {
    if (data.length === 0) {
      getNowData();
    }
  }, [getNowData]);

  return (
    <div style={{ width: "100%" }}>
      <Card className={styles.detailcard}>
        <CardContent>
          <div style={{ height: "33vh" }}>
            <DetailChart datasets={datasets} legend={false} />
          </div>
        </CardContent>
      </Card>
      <Card className={styles.detaildate}>
        <CardContent>
          <div style={{ height: "33vh", marginTop: "0%" }}>
            <div className={styles.data}>
              <div className={styles.max}>
                <h1 style={{ marginBottom: "0%" }}>{datasets[0].max}</h1>
                <p>Maximum Value</p>
              </div>
              <div className={styles.avg}>
                <h1 style={{ marginBottom: "0%" }}>{datasets[0].avg}</h1>
                <p>Average Value</p>
              </div>
              <div className={styles.min}>
                <h1 style={{ marginBottom: "0%" }}>{datasets[0].min}</h1>
                <p>Minimum Value</p>
              </div>
            </div>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Space direction="vertical" size={12} style={{ width: "80%" }}>
                <RangePicker showTime onChange={handleDateChange} />
              </Space>
            </div>
            <br />
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Space direction="vertical" style={{ width: "80%" }}>
                <Button block onClick={getHistoryData}>
                  검색하기
                </Button>
                {/* <Button type="text" block onClick={handleRealTimeButtonClick}> */}
                <Button block onClick={getNowData}>
                  현재 기준으로 보기
                </Button>
              </Space>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailItem;
