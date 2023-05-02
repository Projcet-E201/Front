import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/common/NavBar";
import LeftNav from "../components/common/LeftNav";

import styles from "./Layout.module.css";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const MainLayout = ({ children }: Props) => {
  const [childrenHeight, setChildrenHeight] = useState<number>(0);
  const childrenRef = useRef<HTMLDivElement>(null);

  const [leftNavWidth, setLeftNavWidth] = useState<number>(0);
  const leftNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (childrenRef.current) {
      setChildrenHeight(childrenRef.current.clientHeight);
    }
    // console.log("칠드런 높이", childrenHeight);
  }, [children]);

  // useEffect(() => {
  //   if (leftNavRef.current) {
  //     setLeftNavWidth(leftNavRef.current.clientWidth);
  //   }
  //   console.log(leftNavWidth, "left");
  // }, [leftNavWidth]);

  return (
    <div>
      <div ref={childrenRef} style={{ display: "fixed" }}>
        <NavBar leftNavWidth={leftNavWidth} />
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        {/* <div ref={leftNavRef}> */}
        <LeftNav childrenHeight={childrenHeight} />
        {/* </div> */}
        <div style={{ width: "100%" }}>
          <div className={styles.children}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
