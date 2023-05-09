import React, { useState, useEffect } from "react";

import { useParams, useNavigate, useLocation } from "react-router-dom";

import DetailTopCard from "../../components/common/DetailTopCard";
import SensorLayout from "../../layout/SensorLayout";
import DetailItem from "../../components/DetailItem/DetailItem";
import styles from "./RpmPage.module.css";

const RpmDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SensorLayout>
      <div className={styles.topcard}>
        <DetailTopCard location={location.pathname} />
      </div>
      <div style={{ width: "100%" }}>
        <DetailItem />
        <DetailItem />
      </div>
    </SensorLayout>
  );
};

export default RpmDetailPage;
