import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";

const MotorChart = () => {
  const [data, setData] = useState<
    { name: string; uv1: number; uv2: number; uv3: number }[]
  >([]);
  const [sValue, setSValue] = useState();
  const [eValue, setEValue] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData((prevData) => {
        const currentTime = new Date().toLocaleTimeString();
        const newEntry = {
          name: currentTime,
          uv1: faker.datatype.number({ min: 10, max: 100 }),
          uv2: faker.datatype.number({ min: 10, max: 100 }),
          uv3: faker.datatype.number({ min: 10, max: 100 }),
        };
        // if (prevData.length >= 1000) {
        //   const newData = [...prevData.slice(1), newEntry];
        //   return newData;
        // } else {
        //   return [...prevData, newEntry];
        // }
        return [...prevData, newEntry];
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const trimmedData = data.slice(-20);

  const brushChange = (e: any) => {
    console.log(e);
    setSValue(e.startIndex);
    setEValue(e.endIndex);
  };
  return (
    <div>
      <h3>motor chart 나올 예정</h3>
      <div>
        <h3>recharts</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trimmedData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="uv1"
              stroke="#000000"
              isAnimationActive={false}
            />
            {/* <Line
            type="monotone"
            dataKey="uv2"
            stroke="#8884d8"
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="uv3"
            stroke="#777777"
            isAnimationActive={false}
          /> */}
            <Brush
              dataKey="name"
              data={data}
              height={30}
              stroke="#8884d8"
              startIndex={sValue}
              endIndex={eValue}
              onChange={(e) => brushChange(e)}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>다른 차트 써보기</div>
    </div>
  );
};

export default MotorChart;
