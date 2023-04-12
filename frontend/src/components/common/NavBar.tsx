// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";

// recoil 연결
import { useRecoilState } from "recoil";
import { selectedAtom } from "../../store/atoms";

const NavBar = () => {
  // const [selected, setSelected] = useState("Sensor");
  const [selected, setSelected] = useRecoilState(selectedAtom);
  const navigate = useNavigate();
  const handleToggleClick = (value: string) => {
    setSelected(value);
    if (window.location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <div>
      <div style={{ borderBottom: "4px solid" }}>
        <p>최상단 네브바</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>반도체 설비 모니터링 시스템</h1>
          <div className={styles.toggle}>
            <div
              className={`${styles.toggleButton} ${
                selected === "Sensor" ? styles.active : styles.inactive
              }`}
              onClick={() => handleToggleClick("Sensor")}
            >
              <span>Sensor</span>
            </div>
            <div
              className={`${styles.toggleButton} ${
                selected === "State" ? styles.active : styles.inactive
              }`}
              onClick={() => handleToggleClick("State")}
            >
              <span>State</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
