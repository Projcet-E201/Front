import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import MainLayout from "../layout/MainLayout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from "./MainPage.module.css";
import MainError from "../components/MainError/MainError";
import MainMachineItem from "../components/MainMachineItem/MainMachineItem";
import MainSenserItem from "../components/MainSenserItem/MainSenserItem";
import MainSenserHorizonBarItem from "../components/MainSenserItem/MainSenserHorizonBarItem";
import MainSensorBarItem from "../components/MainSenserItem/MainSensorBarItem";
import { BsFillBarChartFill } from "react-icons/bs";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { FaListAlt } from "react-icons/fa";

type ClientData = {
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
};

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const [clientData, setClientData] = useState<ClientData>({
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
      SCORE: 80,
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
      SCORE: 80,
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
      SCORE: 80,
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
      SCORE: 80,
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
      SCORE: 80,
    },
    CLIENT8: {
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
      SCORE: 80,
    },
    CLIENT10: {
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
      SCORE: 80,
    },
    CLIENT12: {
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
  });

  //웹소켓 연결 코드 시작
  // const connectUrl = "http://k8e201.p.ssafy.io:8091/ws";
  const connectUrl = "https://semse.info/api/ws";

  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const [message, setMessage] = useState<any>();

  const connectWebSocket = () => {
    console.log(connectUrl);
    const socket = new SockJS(connectUrl);
    const stompClient = Stomp.over(socket);
    stompClient.connect(
      // 헤더
      {},
      () => {
        // 연결 성공시 이벤트
        console.log("성공, WebSocket connected");
        setStompClient(stompClient);
      },
      (error) => {
        // 연결 실패시 이벤트
        console.error("WebSocket error: ", error);
      }
    );
  };

  const handleTitleModify = useCallback(() => {
    if (stompClient) {
      stompClient.send(
        `/server/main/machine`,
        {},
        JSON.stringify({ data: "data" })
      );
    }
  }, [stompClient]);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (stompClient) {
        stompClient.disconnect(() => "");
        // stompClient.close();
      }
    };
  }, []);

  useEffect(() => {
    // server 에서 보내는 데이터를 실시간으로 받는 코드
    if (stompClient) {
      // console.log("stompClient2");
      stompClient.subscribe(`/client/main/machine`, (data) => {
        // console.log(data);
        setMessage(JSON.parse(data.body)); // JSON.parse() 함수를 사용하여 데이터를 파싱합니다.
        // setMessage(data.body); // JSON.parse() 함수를 사용하여 데이터를 파싱합니다.
      });
    }
  }, [stompClient]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleTitleModify();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleTitleModify]);

  //웹소켓 연결 코드 끝
  const [machinetabIndex, setMachineTabIndex] = useState(1);

  const onClickMachineTab = (index: number) => {
    setMachineTabIndex(index);
  };

  const [tabIndex, setTabIndex] = useState(1);

  const onClickTab = (index: number) => {
    setTabIndex(index);
  };

  console.log("여기", message);

  return (
    <MainLayout>
      <div className={styles.main1}>
        <div className={styles.main2}>
          {/* {machinetabIndex === 0 && (
            <MainSensorBarItem clientData={clientData} />
          )}
          {machinetabIndex === 1 && (
            <div>
              {Object.entries(clientData).map(([key, client], index) => (
                <div className={styles.maincard} key={`${key}-${index}`}>
                  <MainMachineItem client={client} id={key} index={index} />
                </div>
              ))}
            </div>
          )}
          {machinetabIndex === 2 && (
            <MainSenserHorizonBarItem clientData={clientData} />
          )} */}

          {Object.entries(clientData).map(([key, client], index) => (
            <div className={styles.maincard} key={key}>
              <MainMachineItem client={client} id={key} index={index} />
            </div>
          ))}

          <Card className={styles.errorcard}>
            <CardContent className={styles.errorcardcomponent}>
              {/* <p>{JSON.stringify(message)}</p> */}
              <MainError />
            </CardContent>
          </Card>
        </div>

        <div className={styles.sensordatastyle}>
          {tabIndex === 0 && <MainSensorBarItem clientData={clientData} />}
          {tabIndex === 1 && <MainSenserItem clientData={clientData} />}
          {tabIndex === 2 && (
            <MainSenserHorizonBarItem clientData={clientData} />
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
      </div>
    </MainLayout>
  );
};

export default MainPage;
