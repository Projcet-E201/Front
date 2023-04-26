import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from "./MainPage.module.css";
import { fontSize } from "@mui/system";

const MainPage = () => {
  const navigate = useNavigate();
  const machines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const sensers = [
    "motor",
    "vacuum",
    "air-in",
    "air-out-kpa",
    "air-out-mpa",
    "water",
    "abrasion",
    "load",
    "rpm",
  ];
  const [currentPage, setCurrentPage] = useState(1);

  const senserCards = sensers
    .slice((currentPage - 1) * 4, currentPage * 4)
    .map((senser) => (
      <Card className={styles.sensercard}>
        <CardContent>{senser}</CardContent>
      </Card>
    ));

  const totalPages = Math.ceil(sensers.length / 4);

  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    pageLinks.push(
      <div
        key={i}
        style={{
          cursor: "pointer",
          fontWeight: currentPage === i ? "bold" : "normal",
          textDecoration: currentPage === i ? "underline" : "none",
        }}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </div>
    );
  }

  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "54%",
            minHeight: "200px",
          }}
        >
          {machines.map((machine) => (
            <Card className={styles.maincard}>
              <div>
                <h3
                  className={styles.maincardtitle}
                  onClick={() => navigate(`/machine/${machine}`)}
                >
                  Machine {machine}
                </h3>
              </div>
              <CardContent>
                <div className={styles.maincardcontent}>
                  <div className={styles.maincardcontentname}>압력</div>
                  <div className={styles.maincardcontentscore}>100</div>
                </div>
                <div className={styles.maincardcontent}>
                  <div className={styles.maincardcontentname}>유량</div>
                  <div className={styles.maincardcontentscore}>200</div>
                </div>
                <div
                  className={styles.maincardcontent}
                  onClick={() => navigate(`/machine/${machine}/motor`)}
                >
                  <div className={styles.maincardcontentname}>모터 가동</div>
                  <div className={styles.maincardcontentscore}>300</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div
          style={{
            width: "4%",
            minHeight: "100px",
          }}
        >
          {currentPage > 1 && (
            <MdKeyboardArrowLeft
              style={{
                cursor: "pointer",
                fontSize: "50px",
                minHeight: "200px",
                marginTop: "289px",
                marginLeft: "10px",
                color: "#5E5E5E",
              }}
              onClick={() => setCurrentPage(currentPage - 1)}
            />
          )}{" "}
        </div>

        <h3
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "45%",
            minHeight: "200px",
            marginTop: "0px",
            marginBottom: "0px",
          }}
        >
          {senserCards}
        </h3>
        <div
          style={{
            width: "4%",
            minHeight: "100px",
          }}
        >
          {currentPage < totalPages && (
            <MdKeyboardArrowRight
              style={{
                cursor: "pointer",
                fontSize: "50px",
                minHeight: "200px",
                marginTop: "289px",
                color: "#5E5E5E",
              }}
              onClick={() => setCurrentPage(currentPage + 1)}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MainPage;
