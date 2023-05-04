import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useRecoilState } from "recoil";
import { indexAtom } from "../../store/atoms";
import styles from "./MainMachineItem.module.css";
import { Select } from "antd";

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
type MainMachineItemProps = {
  client: MachinePropsType;
  index: number;
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

  return (
    <div>
      <Card>
        <div style={{}}>
          <h3
            className={styles.mainmachinecardtitle}
            onClick={() => {
              navigate(`/machine/${props.index}`);
              indexClick("Monitoring");
            }}
            style={
              data.SCORE < 30
                ? { backgroundColor: "red" }
                : { backgroundColor: "#5e5e5e" }
            }
          >
            {props.client.name}
          </h3>
        </div>
        <CardContent
          style={{
            lineHeight: "2.8em",
          }}
        >
          <div
            className={styles.mainmachinecardcontent}
            onClick={() => navigate(`/machine/${props.index}/vacuum`)}
          >
            <div className={styles.mainmachinecardcontentname}>압력</div>
            <div className={styles.mainmachinecardcontentscore}>
              {props.client.value.VACUUM}
            </div>
          </div>
          <div
            className={styles.mainmachinecardcontent}
            onClick={() => navigate(`/machine/${props.index}/water`)}
          >
            <div className={styles.mainmachinecardcontentname}>유량</div>
            <div className={styles.mainmachinecardcontentscore}>
              {props.client.value.WATER}
            </div>
          </div>
          <div
            className={styles.mainmachinecardcontent}
            onClick={() => navigate(`/machine/${props.index}/motor`)}
          >
            <div className={styles.mainmachinecardcontentname}>모터 가동</div>
            <div className={styles.mainmachinecardcontentscore}>
              {props.client.value.MOTOR}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainMachineItem;
