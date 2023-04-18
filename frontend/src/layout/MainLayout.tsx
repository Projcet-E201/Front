import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/common/NavBar";
import LeftNav from "../components/common/LeftNav";

import styles from "./Layout.module.css";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "13%" }}>
          <LeftNav />
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.children}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
