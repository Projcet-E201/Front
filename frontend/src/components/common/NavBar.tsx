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

  return (
    <div>
      <div style={{ background: "white" }}>
        {/* <p>최상단 네브바</p> */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <div
              className={styles.title}
              onClick={() => navigate(`/${machine}`)}
            >
              <img src={logo} />
              <h1>SEMSE</h1>
            </div>
            <div>
              <h1>Machine{machine}</h1>
            </div>
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
                <div style={{ display: "flex" }}>
                  <div
                    onClick={() => navigate(`/${machine}/motor`)}
                    style={{
                      color: location.pathname.includes(`/motor`)
                        ? "#5cc2f2"
                        : "gray",
                      marginRight: "10px",
                    }}
                  >
                    Motor
                  </div>
                  <div
                    onClick={() => navigate(`/${machine}/vacuum`)}
                    style={{
                      color: location.pathname.includes(`/vacuum`)
                        ? "#5cc2f2"
                        : "gray",
                      marginRight: "10px",
                    }}
                  >
                    Vacuum
                  </div>
                  <div
                    onClick={() => navigate(`/${machine}/air-out1`)}
                    style={{
                      color: location.pathname.includes(`/air-out1`)
                        ? "#5cc2f2"
                        : "gray",
                      marginRight: "10px",
                    }}
                  >
                    AirOut1
                  </div>
                  <div
                    onClick={() => navigate(`/${machine}/air-out2`)}
                    style={{
                      color: location.pathname.includes(`/air-out2`)
                        ? "#5cc2f2"
                        : "gray",
                      marginRight: "10px",
                    }}
                  >
                    AirOut2
                  </div>
                  <div
                    onClick={() => navigate(`/${machine}/air-in`)}
                    style={{
                      color: location.pathname.includes(`/air-in`)
                        ? "#5cc2f2"
                        : "gray",
                      marginRight: "10px",
                    }}
                  >
                    AirIn
                  </div>
                  <div
                    onClick={() => navigate(`/${machine}/water`)}
                    style={{
                      color: location.pathname.includes(`/water`)
                        ? "#5cc2f2"
                        : "gray",
                      marginRight: "10px",
                    }}
                  >
                    Water
                  </div>
                  <div
                    onClick={() => navigate(`/${machine}/abrasion`)}
                    style={{
                      color: location.pathname.includes(`/abrasion`)
                        ? "#5cc2f2"
                        : "gray",
                      marginRight: "10px",
                    }}
                  >
                    마모량
                  </div>
                  <div
                    onClick={() => navigate(`/${machine}/load`)}
                    style={{
                      color: location.pathname.includes(`/load`)
                        ? "#5cc2f2"
                        : "gray",
                      marginRight: "10px",
                    }}
                  >
                    부하량
                  </div>
                  <div
                    onClick={() => navigate(`/${machine}/rpm`)}
                    style={{
                      color: location.pathname.includes(`/rpm`)
                        ? "#5cc2f2"
                        : "gray",
                    }}
                  >
                    회전속도
                  </div>
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
