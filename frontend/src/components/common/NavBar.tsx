// import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./NavBar.module.css";

import logo from "../../assets/semse_logo.png";

// recoil 연결
import { useRecoilState } from "recoil";
import { selectedAtom } from "../../store/atoms";

const NavBar = () => {
  // const [selected, setSelected] = useState("Sensor");
  const location = useLocation();
  const { machine } = useParams();
  const [selected, setSelected] = useRecoilState(selectedAtom);
  const navigate = useNavigate();
  const handleToggleClick = (value: string) => {
    setSelected(value);
    // if (window.location.pathname !== "/") {
    //   navigate("/");
    // }
    if (value !== selected) {
      navigate(`/${machine}`);
    }
  };

  // console.log(machine);

  return (
    <div>
      <div style={{ background: "white", height: "10vh" }}>
        {/* <p>최상단 네브바</p> */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className={styles.title} onClick={() => navigate(`/${machine}`)}>
            <img src={logo} alt="" />
            <h1>SEMSE</h1>
          </div>
          <div className={styles.rightbutton}>
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

            {selected === "Sensor" && (
              <div className={styles.navbutton}>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <button onClick={() => navigate(`/${machine}/motor`)}>
                    Motor
                  </button>
                  <button onClick={() => navigate(`/${machine}/vacuum`)}>
                    Vacuum
                  </button>
                  <button onClick={() => navigate(`/${machine}/air-out1`)}>
                    AirOut1
                  </button>
                  <button onClick={() => navigate(`/${machine}/air-out2`)}>
                    AirOut2
                  </button>
                  <button onClick={() => navigate(`/${machine}/air-in`)}>
                    AirIn
                  </button>
                  <button onClick={() => navigate(`/${machine}/water`)}>
                    Water
                  </button>
                  <button onClick={() => navigate(`/${machine}/abrasion`)}>
                    마모량
                  </button>
                  <button onClick={() => navigate(`/${machine}/load`)}>
                    부하량
                  </button>
                  <button onClick={() => navigate(`/${machine}/rpm`)}>
                    회전속도
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
