import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

import logo from "../../assets/logo_semse.png";

// recoil 연결
import { useRecoilState } from "recoil";
import {
  selectedAtom,
  useDateTimeUpdater,
  currentDateAtom,
  currentTimeAtom,
} from "../../store/atoms";

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

  // const [currentTime, setCurrentTime] = useState("");
  // const [currentDate, setCurrentDate] = useState("");
  const [currentTime] = useRecoilState(currentTimeAtom);
  const [currentDate] = useRecoilState(currentDateAtom);
  useDateTimeUpdater();

  return (
    <div>
      <div style={{ background: "white" }}>
        {/* <p>최상단 네브바</p> */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <div
              className={styles.title}
              style={{ width: "200px" }}
              onClick={() => navigate(`/`)}
            >
              <img src={logo} alt="logo" style={{ width: "100%" }} />
              {/* <h1>SEMSE</h1> */}
            </div>
            {/* 경로 부분 */}
            <div style={{ alignItems: "end", display: "flex" }}>
              {location.pathname === "/" && (
                <h1 style={{ marginBottom: "0", marginLeft: "30px" }}>Main</h1>
              )}
              {location.pathname.startsWith("/machine/") && (
                <>
                  <Link
                    to={`/machine/${machine}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <h1 style={{ marginBottom: "0", marginLeft: "30px" }}>
                      Machine {machine} &nbsp;
                    </h1>
                  </Link>
                  {location.pathname
                    .split("/")
                    .slice(3)
                    .map((path, index) => (
                      <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        key={index}
                        to={`/machine/${machine}/${location.pathname
                          .split("/")
                          .slice(3, index + 4)
                          .join("/")}`}
                      >
                        <h1 style={{ marginBottom: "0" }}>
                          &gt; {path.charAt(0).toUpperCase() + path.slice(1)}
                          &nbsp;
                        </h1>
                      </Link>
                    ))}
                </>
              )}
              {location.pathname === "/custom-build" && (
                <h1 style={{ marginBottom: "0", marginLeft: "30px" }}>
                  CustomBuild
                </h1>
              )}
              {location.pathname === "/equipment-setting" && (
                <h1 style={{ marginBottom: "0", marginLeft: "30px" }}>
                  Setting
                </h1>
              )}
            </div>
          </div>
          <div className={styles.rightbutton}>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginBottom: "10px",
              }}
            >
              <h3
                style={{
                  margin: "0",
                  display: "flex",
                  alignItems: "end",
                  letterSpacing: "0.1em",
                  marginRight: "10px",
                }}
              >
                {currentDate}
              </h3>
              <h1
                style={{
                  margin: "0",
                  display: "flex",
                  alignItems: "end",
                  letterSpacing: "0.1em",
                }}
              >
                {currentTime}
              </h1>

              {location.pathname.includes("machine") && (
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

            {selected === "Sensor" && location.pathname.includes("machine") && (
              <div style={{ display: "flex" }} className={styles.navbuttonlist}>
                <div
                  className={`${
                    location.pathname === `/machine/${machine}`
                      ? styles.choicebutton
                      : styles.nochoicebutton
                  }`}
                  onClick={() => navigate(`/machine/${machine}`)}
                >
                  All
                </div>
                <div
                  className={`${
                    location.pathname === `/machine/${machine}/motor`
                      ? styles.choicebutton
                      : styles.nochoicebutton
                  }`}
                  onClick={() => navigate(`/machine/${machine}/motor`)}
                >
                  Motor
                </div>
                <div
                  className={`${
                    location.pathname === `/machine/${machine}/vacuum`
                      ? styles.choicebutton
                      : styles.nochoicebutton
                  }`}
                  onClick={() => navigate(`/machine/${machine}/vacuum`)}
                >
                  Vacuum
                </div>
                <div
                  className={`${
                    location.pathname === `/machine/${machine}/air-in`
                      ? styles.choicebutton
                      : styles.nochoicebutton
                  }`}
                  onClick={() => navigate(`/machine/${machine}/air-in`)}
                >
                  AirIn
                </div>
                <div
                  className={`${
                    location.pathname === `/machine/${machine}/air-out-kpa`
                      ? styles.choicebutton
                      : styles.nochoicebutton
                  }`}
                  onClick={() => navigate(`/machine/${machine}/air-out-kpa`)}
                >
                  Air-Out(kPa)
                </div>
                <div
                  className={`${
                    location.pathname === `/machine/${machine}/air-out-mpa`
                      ? styles.choicebutton
                      : styles.nochoicebutton
                  }`}
                  onClick={() => navigate(`/machine/${machine}/air-out-mpa`)}
                >
                  Air-Out(MPa)
                </div>
                <div
                  className={`${
                    location.pathname === `/machine/${machine}/water`
                      ? styles.choicebutton
                      : styles.nochoicebutton
                  }`}
                  onClick={() => navigate(`/machine/${machine}/water`)}
                >
                  Water
                </div>
                <div
                  className={`${
                    location.pathname === `/machine/${machine}/abrasion`
                      ? styles.choicebutton
                      : styles.nochoicebutton
                  }`}
                  onClick={() => navigate(`/machine/${machine}/abrasion`)}
                >
                  마모량
                </div>
                <div
                  className={`${
                    location.pathname === `/machine/${machine}/load`
                      ? styles.choicebutton
                      : styles.nochoicebutton
                  }`}
                  onClick={() => navigate(`/machine/${machine}/load`)}
                >
                  부하량
                </div>
                <div
                  className={`${
                    location.pathname === `/machine/${machine}/rpm`
                      ? styles.choicebutton
                      : styles.nochoicebutton
                  }`}
                  onClick={() => navigate(`/machine/${machine}/rpm`)}
                >
                  회전속도
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
