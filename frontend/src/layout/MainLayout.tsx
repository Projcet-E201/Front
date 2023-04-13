import React from "react";
import NavBar from "../components/common/NavBar";

import styles from "./Layout.module.css";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <p>메인레이아웃</p>
      <NavBar />
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default MainLayout;
