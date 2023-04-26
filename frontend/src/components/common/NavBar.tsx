// import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./NavBar.module.css";

import logo from "../../assets/semse_logo.png";

// recoil 연결
import { useRecoilState } from "recoil";
import { selectedAtom } from "../../store/atoms";

const NavBar = ({ leftNavWidth }: any) => {
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
      navigate(`/machine/${machine}`);
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
              style={{ width: "15vw" }}
              onClick={() => navigate(`/`)}
            >
              <img src={logo} alt="logo" />
              <h1>SEMSE</h1>
            </div>
            <div
              onClick={() => navigate(`/machine/${machine}`)}
              style={{ cursor: "pointer" }}
            >
              {location.pathname === "/" ? (
                <h1>All Machine</h1>
              ) : (
                <h1>Machine {machine}</h1>
              )}
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

            {selected === "Sensor" && location.pathname !== "/" && (
              <div className={styles.navbutton}>
                <div style={{ display: "flex" }}>
                  {/* {location.pathname !== `/machine/${machine}` && (
                    <div onClick={() => navigate(`/machine/${machine}`)}>
                      Main
                    </div>
                  )} */}
                  <div
                    onClick={() => navigate(`/machine/${machine}`)}
                    style={{
                      color:
                        location.pathname === `/machine/${machine}`
                          ? "#191BA9"
                          : "gray",
                      marginRight: "10px",
                    }}
                  >
                    Main
                  </div>
                  <div
                    onClick={() => navigate(`/machine/${machine}/motor`)}
                    style={{
                      color: location.pathname.includes(`/motor`)
                        ? "#191BA9"
                        : "gray",
                      marginRight: "10px",
                    }}
                  >
                    Motor
                  </div>
                  <div
                    onClick={() => navigate(`/machine/${machine}/vacuum`)}
                    style={{
                      color: location.pathname.includes(`/vacuum`)
                        ? "#191BA9"
                        : "gray",
                      marginRight: "10px",
                    }}
                  >
                    Vacuum
                  </div>
                  <div
                    onClick={() => navigate(`/machine/${machine}/air-in`)}
                    style={{
                      color: location.pathname.includes(`/air-in`)
                        ? "#191BA9"
                        : "gray",
                      marginRight: "10px",
                    }}
                  >
                    AirIn
                  </div>
                  <div
                    onClick={() => navigate(`/machine/${machine}/air-out-kpa`)}
                    style={{
                      color: location.pathname.includes(`/air-out-kpa`)
                        ? "#191BA9"
                        : "gray",
                      marginRight: "10px",
                    }}
                  >
                    Air-Out(kPa)
                  </div>
                  <div
                    onClick={() => navigate(`/machine/${machine}/air-out-mpa`)}
                    style={{
                      color: location.pathname.includes(`/air-out-mpa`)
                        ? "#191BA9"
                        : "gray",
                      marginRight: "10px",
                    }}
                  >
                    Air-Out(MPa)
                  </div>

                  <div
                    onClick={() => navigate(`/machine/${machine}/water`)}
                    style={{
                      color: location.pathname.includes(`/water`)
                        ? "#191BA9"
                        : "gray",
                      marginRight: "10px",
                    }}
                  >
                    Water
                  </div>
                  <div
                    onClick={() => navigate(`/machine/${machine}/abrasion`)}
                    style={{
                      color: location.pathname.includes(`/abrasion`)
                        ? "#191BA9"
                        : "gray",
                      marginRight: "10px",
                    }}
                  >
                    마모량
                  </div>
                  <div
                    onClick={() => navigate(`/machine/${machine}/load`)}
                    style={{
                      color: location.pathname.includes(`/load`)
                        ? "#191BA9"
                        : "gray",
                      marginRight: "10px",
                    }}
                  >
                    부하량
                  </div>
                  <div
                    onClick={() => navigate(`/machine/${machine}/rpm`)}
                    style={{
                      color: location.pathname.includes(`/rpm`)
                        ? "#191BA9"
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
