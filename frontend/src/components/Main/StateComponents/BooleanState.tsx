import React, { useEffect, useState } from "react";
import styles from "./BooleanState.module.css";
import booleanOn from "../../../assets/state/ON_button_icon.png";
import booleanOff from "../../../assets/state/OFF_button_icon.png";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { setUncaughtExceptionCaptureCallback } from "process";

const BooleanState = ({ data, error, time }: any) => {
  // const dummy = [
  //   {
  //     id: 1,
  //     value: 1,
  //   },
  //   {
  //     id: 2,
  //     value: 1,
  //   },
  //   {
  //     id: 3,
  //     value: 0,
  //   },
  //   {
  //     id: 4,
  //     value: 0,
  //   },
  //   {
  //     id: 4,
  //     value: 1,
  //   },
  // ];
  const [booleanData, setBooleanData] = useState<any>([]);
  // console.log(data, "재필이는 바보야~");
  useEffect(() => {
    // console.log(data);
    setBooleanData(data);
  }, [data, booleanData]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {error !== "error" ? (
        <div style={{ width: "100%", height: "100%" }}>
          {data.length > 1 ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              {data.map((value: any, index: number) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  {value.value === 1 ? (
                    <div className={styles.booleanimg}>
                      <img src={booleanOn} alt="" />
                      <h3>B{value.id}</h3>
                    </div>
                  ) : (
                    <div className={styles.booleanimg}>
                      <img src={booleanOff} alt="" />
                      <h3>B{value.id}</h3>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
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
              <h3>Boolean 데이터를 불러오는 중 입니다...</h3>
            </Box>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // marginTop: "10px",
          }}
        >
          <h2>서버와 연결에 실패했습니다.</h2>
          {/* <p>{Math.ceil(time / 1000)}초후 재연결을 시도합니다.</p> */}
          <p>재연결시도...{Math.ceil(time / 1000)}</p>
          {/* <p>{Math.ceil(time / 1000)}</p> */}
        </div>
      )}
    </div>
  );
};

export default BooleanState;
