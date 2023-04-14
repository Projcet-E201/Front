// import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./NavBar.module.css";

// recoil 연결
import { useRecoilState } from "recoil";
import { selectedAtom } from "../../store/atoms";

const NavBar = () => {
  // const [selected, setSelected] = useState("Sensor");
  const location = useLocation();
  const { machineNumber } = useParams();
  const [selected, setSelected] = useRecoilState(selectedAtom);
  const navigate = useNavigate();
  const handleToggleClick = (value: string) => {
    setSelected(value);
    // if (window.location.pathname !== "/") {
    //   navigate("/");
    // }
    if (value !== selected) {
      navigate(`/${machineNumber}`);
    }
  };

  return (
    <div>
      <div style={{ borderBottom: "2px solid gray" }}>
        {/* <p>최상단 네브바</p> */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>반도체 설비 모니터링 시스템</h1>
          {location.pathname !== `/` && (
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
          )}
        </div>
      </div>

      {location.pathname !== "/" && (
        <div style={{ borderBottom: "2px solid gray" }}>
          <button onClick={() => navigate(-1)}>메인페이지</button>
        </div>
      )}

      {location.pathname !== `/` && selected === "Sensor" && (
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            borderBottom: "2px solid gray",
          }}
        >
          <button onClick={() => navigate("/machine/motor")}>Motor</button>
          <button onClick={() => navigate("/vacuum")}>Vacuum</button>
          <button onClick={() => navigate("/air-out1")}>AirOut1</button>
          <button onClick={() => navigate("/air-out2")}>AirOut2</button>
          <button onClick={() => navigate("/air-in")}>AirIn</button>
          <button onClick={() => navigate("/water")}>Water</button>
          <button onClick={() => navigate("/abrasion")}>abrasionlose</button>
          <button onClick={() => navigate("/load")}>loadingDose</button>
          <button onClick={() => navigate("/rpm")}>RPM</button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
