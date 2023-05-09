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
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
      WATER: 3,
      ABRASION: 16,
      LOAD: 8,
      VELOCITY: 30000,
      SCORE: 80,
    },
    CLIENT2: {
      MOTOR: 100,
      VACUUM: 50,
      AIR_IN_KPA: 400,
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
      WATER: 3,
      ABRASION: 16,
      LOAD: 8,
      VELOCITY: 30000,
      SCORE: 80,
    },
    CLIENT3: {
      MOTOR: 100,
      VACUUM: 50,
      AIR_IN_KPA: 400,
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
      WATER: 3,
      ABRASION: 16,
      LOAD: 8,
      VELOCITY: 30000,
      SCORE: 80,
    },
    CLIENT4: {
      MOTOR: 100,
      VACUUM: 50,
      AIR_IN_KPA: 400,
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
      WATER: 3,
      ABRASION: 16,
      LOAD: 8,
      VELOCITY: 30000,
      SCORE: 80,
    },
    CLIENT5: {
      MOTOR: 100,
      VACUUM: 50,
      AIR_IN_KPA: 400,
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
      WATER: 3,
      ABRASION: 16,
      LOAD: 8,
      VELOCITY: 30000,
      SCORE: 80,
    },
    CLIENT6: {
      MOTOR: 100,
      VACUUM: 50,
      AIR_IN_KPA: 400,
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
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
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
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
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
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
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
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
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
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
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
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
      AIR_OUT_KPA: 0.8,
      AIR_OUT_MPA: 500,
      WATER: 3,
      ABRASION: 16,
      LOAD: 8,
      VELOCITY: 30000,
      SCORE: 80,
    },
  });

  //웹소켓 연결 코드 시작
  // const connectUrl = "http://k8e201.p.ssafy.io:8091/ws";

  // const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  // const [message, setMessage] = useState<any>();

  // const connectWebSocket = () => {
  //   console.log(connectUrl);
  //   const socket = new SockJS(connectUrl);
  //   const stompClient = Stomp.over(socket);
  //   stompClient.connect(
  //     // 헤더
  //     {},
  //     () => {
  //       // 연결 성공시 이벤트
  //       // console.log("WebSocket connected");
  //       setStompClient(stompClient);
  //     },
  //     (error) => {
  //       // 연결 실패시 이벤트
  //       console.error("WebSocket error: ", error);
  //     }
  //   );
  // };

  // const handleTitleModify = f(() => {
  //   if (stompClient) {
  //     // stompClient.send(`/server/post`, {}, JSON.stringify({ data: "data" }));
  //     stompClient.send(
  //       `/server/main/machine`,
  //       {},
  //       JSON.stringify({ data: "data" })
  //     );
  //   }
  // }, [stompClient]);

  // useEffect(() => {
  //   connectWebSocket();
  //   return () => {
  //     if (stompClient) {
  //       stompClient.disconnect(() => "");
  //       // stompClient.close();
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   // server 에서 보내는 데이터를 실시간으로 받는 코드
  //   if (stompClient) {
  //     // console.log("stompClient2");
  //     stompClient.subscribe(`/client/main/machine`, (data) => {
  //       // console.log(data);
  //       setMessage(JSON.parse(data.body)); // JSON.parse() 함수를 사용하여 데이터를 파싱합니다.
  //       // setMessage(data.body); // JSON.parse() 함수를 사용하여 데이터를 파싱합니다.
  //     });
  //   }
  // }, [stompClient]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleTitleModify();
  //   }, 10000);

  //   return () => clearInterval(interval);
  // }, [handleTitleModify]);

  //웹소켓 연결 코드 끝

  return (
    <MainLayout>
      <div className={styles.main1}>
        <div className={styles.main2}>
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
          <MainSenserItem clientData={clientData} />
        </div>
      </div>
    </MainLayout>
  );
};

export default MainPage;
