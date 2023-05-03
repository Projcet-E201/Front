import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useRecoilState } from "recoil";
import { indexAtom } from "../../store/atoms";
import styles from "./MainMachineItem.module.css";

export type MachinePropsType = {
  name: string;
  value: {
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

const MainMachineItem = (client: MachinePropsType, index: number) => {
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

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "54%",
      }}
    >
      <Card className={styles.maincard}>
        <div>
          <h3
            className={styles.maincardtitle}
            onClick={() => {
              navigate(`/machine/${index}`);
              indexClick("Monitoring");
            }}
            style={
              data.SCORE < 30
                ? { backgroundColor: "red" }
                : { backgroundColor: "#5e5e5e" }
            }
          >
            {client.name}
          </h3>
        </div>
        <CardContent
          style={{
            lineHeight: "2.8em",
          }}
        >
          <div
            className={styles.maincardcontent}
            onClick={() => navigate(`/machine/${index}/vacuum`)}
          >
            <div className={styles.maincardcontentname}>압력</div>
            <div className={styles.maincardcontentscore}>{data.air_in_kpa}</div>
          </div>
          <div
            className={styles.maincardcontent}
            onClick={() => navigate(`/machine/${index}/water`)}
          >
            <div className={styles.maincardcontentname}>유량</div>
            <div className={styles.maincardcontentscore}>{data.water}</div>
          </div>
          <div
            className={styles.maincardcontent}
            onClick={() => navigate(`/machine/${index}/motor`)}
          >
            <div className={styles.maincardcontentname}>모터 가동</div>
            <div className={styles.maincardcontentscore}>{data.motor}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainMachineItem;
