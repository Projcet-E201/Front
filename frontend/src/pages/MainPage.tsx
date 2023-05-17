import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MainLayout from "../layout/MainLayout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from "./MainPage.module.css";
import MainMachineRadarItem from "../components/MainMachineItem/MainMachineRadarItem";
import MainError from "../components/MainError/MainError";
import MainMachinePieItem from "../components/MainMachineItem/MainMachinePieItem";
import MainMachineItem from "../components/MainMachineItem/MainMachineItem";
import MainSenserItem from "../components/MainSenserItem/MainSenserItem";
import MainSenserHorizonBarItem from "../components/MainSenserItem/MainSenserHorizonBarItem";
import MainSensorBarItem from "../components/MainSenserItem/MainSensorBarItem";

import { BiTrafficCone } from "react-icons/bi";
import { AiOutlineRadarChart } from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { FaListAlt } from "react-icons/fa";
import axios from "axios";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

type ClientData = [
  {
    [key: string]: {
      MOTOR: number;
      VACUUM: number;
      AIR_IN_KPA: number;
      AIR_OUT_KPA: number;
      AIR_OUT_MPA: number;
      WATER: number;
      ABRASION: number;
      LOAD: number;
      VELOCITY: number;
      SCORE: number;
    };
  }
];

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [check, setCheck] = useState(0);
  const [clientData, setClientData] = useState<ClientData>([
    {
      CLIENT1: {
        MOTOR: 100,
        VACUUM: 50,
        AIR_IN_KPA: 400,
        AIR_OUT_KPA: 500,
        AIR_OUT_MPA: 0.8,
        WATER: 3,
        ABRASION: 16,
        LOAD: 8,
        VELOCITY: 30000,
        SCORE: 80,
      },
      CLIENT2: {
        MOTOR: 150,
        VACUUM: 10,
        AIR_IN_KPA: 300,
        AIR_OUT_KPA: 500,
        AIR_OUT_MPA: 0.1,
        WATER: 2,
        ABRASION: 16,
        LOAD: 8,
        VELOCITY: 10000,
        SCORE: 70,
      },
      CLIENT3: {
        MOTOR: 280,
        VACUUM: 70,
        AIR_IN_KPA: 400,
        AIR_OUT_KPA: 500,
        AIR_OUT_MPA: 0.5,
        WATER: 2,
        ABRASION: 13,
        LOAD: 1,
        VELOCITY: 20000,
        SCORE: 90,
      },
      CLIENT4: {
        MOTOR: 100,
        VACUUM: 50,
        AIR_IN_KPA: 400,
        AIR_OUT_KPA: 500,
        AIR_OUT_MPA: 0.8,
        WATER: 3,
        ABRASION: 16,
        LOAD: 8,
        VELOCITY: 30000,
        SCORE: 50,
      },
      CLIENT5: {
        MOTOR: 50,
        VACUUM: 10,
        AIR_IN_KPA: 700,
        AIR_OUT_KPA: 500,
        AIR_OUT_MPA: 0.6,
        WATER: 3,
        ABRASION: 16,
        LOAD: 8,
        VELOCITY: 15000,
        SCORE: 80,
      },
      CLIENT6: {
        MOTOR: 100,
        VACUUM: 50,
        AIR_IN_KPA: 400,
        AIR_OUT_KPA: 500,
        AIR_OUT_MPA: 0.8,
        WATER: 3,
        ABRASION: 16,
        LOAD: 8,
        VELOCITY: 30000,
        SCORE: 67,
      },
      CLIENT7: {
        MOTOR: 100,
        VACUUM: 50,
        AIR_IN_KPA: 400,
        AIR_OUT_KPA: 500,
        AIR_OUT_MPA: 0.8,
        WATER: 3,
        ABRASION: 16,
        LOAD: 8,
        VELOCITY: 30000,
        SCORE: 85,
      },
      CLIENT8: {
        MOTOR: 80,
        VACUUM: 50,
        AIR_IN_KPA: 400,
        AIR_OUT_KPA: 500,
        AIR_OUT_MPA: 0.8,
        WATER: 3,
        ABRASION: 16,
        LOAD: 8,
        VELOCITY: 30000,
        SCORE: 97,
      },
      CLIENT9: {
        MOTOR: 100,
        VACUUM: 50,
        AIR_IN_KPA: 400,
        AIR_OUT_KPA: 500,
        AIR_OUT_MPA: 0.8,
        WATER: 3,
        ABRASION: 16,
        LOAD: 8,
        VELOCITY: 30000,
        SCORE: 48,
      },
      CLIENT10: {
        MOTOR: 250,
        VACUUM: 50,
        AIR_IN_KPA: 400,
        AIR_OUT_KPA: 500,
        AIR_OUT_MPA: 0.8,
        WATER: 3,
        ABRASION: 16,
        LOAD: 8,
        VELOCITY: 30000,
        SCORE: 62,
      },
      CLIENT11: {
        MOTOR: 100,
        VACUUM: 50,
        AIR_IN_KPA: 400,
        AIR_OUT_KPA: 500,
        AIR_OUT_MPA: 0.8,
        WATER: 3,
        ABRASION: 16,
        LOAD: 8,
        VELOCITY: 30000,
        SCORE: 81,
      },
      CLIENT12: {
        MOTOR: 90,
        VACUUM: 50,
        AIR_IN_KPA: 400,
        AIR_OUT_KPA: 500,
        AIR_OUT_MPA: 0.8,
        WATER: 3,
        ABRASION: 16,
        LOAD: 8,
        VELOCITY: 30000,
        SCORE: 75,
      },
    },
  ]);

  const [error, setError] = useState<any>();
  const [reconnectTimer, setReconnectTimer] = useState<any>();
  const [reconnectTimeLeft, setReconnectTimeLeft] = useState<number>(0);

  const getClientData = async () => {
    console.log("요청했다냥");

    await axios

      .get("https://semse.info/api/main/machine")

      // .get("http://localhost8091/api/main/machine")
      .then((response) => {
        const sortedData: { [key: string]: any } = Object.entries(
          response.data[0]
        )
          .sort(([a], [b]) => {
            const aIndex = parseInt(a.replace("CLIENT", ""));
            const bIndex = parseInt(b.replace("CLIENT", ""));
            return aIndex - bIndex;
          })
          .reduce((acc: { [key: string]: any }, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {});
        console.log("성공이다냥", response.data);

        setCheck(1);
        setClientData([{ ...sortedData }]);
      })
      .catch((error) => {
        console.error("실패다냥", error);
      });
  };
  useEffect(() => {
    getClientData();

    const interval = setInterval(() => {
      getClientData();
    }, 10000);
    return () => {
      clearInterval(interval);
      clearInterval(reconnectTimer);
    };
  }, []);

  const [tab2Index, setTab2Index] = useState<number>(1);

  const onClickTab2 = (index: number) => {
    setTab2Index(index);
  };

  const [tabIndex, setTabIndex] = useState(1);

  const onClickTab = (index: number) => {
    setTabIndex(index);
  };

  return (
    <MainLayout>
      <div className={styles.main1}>
        <div className={styles.main2}>
          {check == 1 ? (
            <>
              {tab2Index === 0 && (
                <MainMachineRadarItem clientData={clientData[0]} />
              )}
              {tab2Index === 1 &&
                Object.entries(clientData[0]).map(([key, client], index) => (
                  <div className={styles.maincard} key={key}>
                    <MainMachineItem
                      client={client}
                      id={key}
                      clientindex={index}
                    />
                  </div>
                ))}
              {/* {tab2Index === 2 && (
                <MainMachinePieItem clientData={clientData[0]} />
              )} */}
              <div className={styles.sensortab2}>
                <div
                  onClick={() => onClickTab2(0)}
                  className={
                    tab2Index === 0
                      ? styles["selected"]
                      : styles["not-selected"]
                  }
                >
                  <AiOutlineRadarChart />
                </div>
                <div
                  onClick={() => onClickTab2(1)}
                  className={
                    tab2Index === 1
                      ? styles["selected"]
                      : styles["not-selected"]
                  }
                >
                  <FaListAlt />
                </div>
                {/* <div
                  onClick={() => onClickTab2(2)}
                  className={
                    tab2Index === 2
                      ? styles["selected"]
                      : styles["not-selected"]
                  }
                >
                  <BiTrafficCone style={{ transform: "scaleY(-1)" }} />
                </div> */}
              </div>
            </>
          ) : (
            <Card className={styles.mainloadingcard}>
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
                <h3> 설비 데이터를 불러오는 중입니다...</h3>
              </Box>
            </Card>
          )}

          <Card className={styles.errorcard}>
            <CardContent className={styles.errorcardcomponent}>
              {/* <MainError /> */}
            </CardContent>
          </Card>
        </div>
        {check == 1 ? (
          <div className={styles.sensordatastyle}>
            {tabIndex === 0 && <MainSensorBarItem clientData={clientData[0]} />}
            {tabIndex === 1 && <MainSenserItem clientData={clientData[0]} />}
            {tabIndex === 2 && (
              <MainSenserHorizonBarItem clientData={clientData[0]} />
            )}
            <div className={styles.sensortab}>
              <div
                onClick={() => onClickTab(0)}
                className={
                  tabIndex === 0 ? styles["selected"] : styles["not-selected"]
                }
              >
                <BsFillBarChartFill />
              </div>
              <div
                onClick={() => onClickTab(1)}
                className={
                  tabIndex === 1 ? styles["selected"] : styles["not-selected"]
                }
              >
                <FaListAlt />
              </div>
              <div
                onClick={() => onClickTab(2)}
                className={
                  tabIndex === 2 ? styles["selected"] : styles["not-selected"]
                }
              >
                <RiBarChartHorizontalFill />
              </div>
            </div>
          </div>
        ) : (
          <Card className={styles.sensorloadingcard}>
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
              <h3> 데이터를 불러오는 중입니다...</h3>
            </Box>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default MainPage;
