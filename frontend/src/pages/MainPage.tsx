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
  const [clientData, setClientData] = useState<ClientData>([{}]);

  const [error, setError] = useState<any>();
  const [reconnectTimer, setReconnectTimer] = useState<any>();
  const [reconnectTimeLeft, setReconnectTimeLeft] = useState<number>(0);

  const getClientData = async () => {
    await axios

      .get("https://semse.info/api/main/machine")

      // .get("http://localhost8091/api/main/machine")
      .then((response) => {
        // console.log(response.data);
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

        setCheck(1);
        setClientData([{ ...sortedData }]);
      })
      .catch((error) => {});
  };

  const updateCycle = localStorage.getItem("updateCycle");
  const time = updateCycle ? parseInt(updateCycle) : 10000;

  useEffect(() => {
    getClientData();

    const interval = setInterval(() => {
      getClientData();
    }, time);
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
              <MainError />
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
