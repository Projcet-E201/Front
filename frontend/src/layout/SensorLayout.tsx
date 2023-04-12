import React from "react";
import NavBar from "../components/common/NavBar";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <p>센서 레이아웃</p>
      <NavBar />
      {children}
    </div>
  );
};

export default MainLayout;
