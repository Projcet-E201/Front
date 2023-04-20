import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/common/NavBar";
import LeftNav from "../components/common/LeftNav";

import styles from "./Layout.module.css";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const SensorLayout = ({ children }: Props) => {
  const [childrenHeight, setChildrenHeight] = useState<number>(0);
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (childrenRef.current) {
      setChildrenHeight(childrenRef.current.clientHeight);
    }
    // console.log("칠드런 높이", childrenHeight);
  }, [children]);
  return (
    <div>
      <div ref={childrenRef}>
        <NavBar />
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "13%" }}>
          <LeftNav childrenHeight={childrenHeight} />
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.children}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SensorLayout;
