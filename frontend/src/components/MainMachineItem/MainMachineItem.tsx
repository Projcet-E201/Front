import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useRecoilState } from "recoil";
import { indexAtom } from "../../store/atoms";
import styles from "./MainMachineItem.module.css";

export type MachinePropsType = {
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

type MainMachineItemProps = {
  id: string;
  client: MachinePropsType;
  clientindex: number;
};

const MainMachineItem = (props: MainMachineItemProps) => {
  const [selectedIndex, setSelectedIndex] = useRecoilState(indexAtom);
  const indexClick = (value: string) => {
    setSelectedIndex(value);
  };
  const navigate = useNavigate();
  const [data, setData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newValues: { [key: string]: number } = {};
      newValues["motor"] = data.MOTOR;
      newValues["air_in_kpa"] = data.AIR_IN_KPA;
      newValues["water"] = data.WATER;
      setData({ ...data, ...newValues });
    }, 100);
    return () => clearInterval(interval);
  }, [data]);
  const [isScoreZero, setIsScoreZero] = useState(false);

  useEffect(() => {
    setIsScoreZero(props.client.SCORE > 0 && props.client.SCORE < 60); // SCORE 값이 0인 경우에만 true를 설정
  }, [props.client.SCORE]);

  const getBackgroundColor = () => {
    if (props.client.SCORE === 0) {
      return "#5e5e5e";
    } else if (props.client.SCORE < 60) {
      return "red";
    } else {
      return "#4CD964";
    }
  };

  const getAnimatedStyle = () => {
    if (isScoreZero) {
      return {
        animation: `${styles.pulse} 1s infinite`,
        backgroundColor: getBackgroundColor(),
      };
    } else {
      return {
        backgroundColor: getBackgroundColor(),
      };
    }
  };

  return (
    <div>
      <Card className={styles.cardall}>
        <div>
          <h3
            className={`${styles.mainmachinecardtitle} ${
              isScoreZero ? styles["is-score-zero"] : ""
            }`}
            onClick={() => {
              navigate(`/machine/${props.clientindex + 1}`);
              indexClick("Monitoring");
            }}
            style={getAnimatedStyle()}
          >
            {props.id}
          </h3>
        </div>
        <CardContent
          style={{
            lineHeight: "2.8em",
            ...(props.client.SCORE === 0 && {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            }),
          }}
        >
          <div
            className={styles.mainmachinecardcontent}
            onClick={() =>
              navigate(
                `/mprops.client.VACUUMachine/${props.clientindex + 1}/vacuum`
              )
            }
          >
            <div className={styles.mainmachinecardcontentname}>압력</div>
            <div className={styles.mainmachinecardcontentscore}>
              {props.client.VACUUM}
            </div>
          </div>
          <div
            className={styles.mainmachinecardcontent}
            onClick={() => navigate(`/machine/${props.clientindex + 1}/water`)}
          >
            <div className={styles.mainmachinecardcontentname}>유량</div>
            <div className={styles.mainmachinecardcontentscore}>
              {props.client.WATER}
            </div>
          </div>
          <div
            className={styles.mainmachinecardcontent}
            onClick={() => navigate(`/machine/${props.clientindex + 1}/motor`)}
          >
            <div className={styles.mainmachinecardcontentname}>모터 가동</div>
            <div className={styles.mainmachinecardcontentscore}>
              {props.client.MOTOR}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainMachineItem;
