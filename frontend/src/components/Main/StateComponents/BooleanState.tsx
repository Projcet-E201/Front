import React from "react";
import styles from "./BooleanState.module.css";
import booleanOn from "../../../assets/state/ON_button_icon.png";
import booleanOff from "../../../assets/state/OFF_button_icon.png";

const BooleanState = ({ data }: any) => {
  console.log(data);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {data.map((value: any, index: number) => (
          <div
            key={index}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {value.value ? (
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
    </div>
  );
};

export default BooleanState;
