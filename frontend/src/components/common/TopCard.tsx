import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useRecoilState } from "recoil";
import { selectedMachineAtom } from "../../store/atoms";

import { useNavigate } from "react-router";

import styles from "./TopCard.module.css";

interface Props {
  location: string;
}

const TopCard = ({ location }: Props) => {
  const navigate = useNavigate();
  const [selectedMachine, setSelectedMachine] =
    useRecoilState(selectedMachineAtom);
  console.log(selectedMachine);

  let title = "";

  if (location.endsWith("motor")) {
    title = "Motor Toque";
  } else if (location.endsWith("vacuum")) {
    title = "Vacuum";
  } else if (location.endsWith("water")) {
    title = "Water";
  } else if (location.endsWith("air-in")) {
    title = "AirIn";
  } else if (location.endsWith("air-out1")) {
    title = "AirOut(kPa)";
  } else if (location.endsWith("air-out2")) {
    title = "AirOut(MPa)";
  } else if (location.endsWith("abrasion")) {
    title = "마모량";
  } else if (location.endsWith("load")) {
    title = "부하량";
  } else if (location.endsWith("rpm")) {
    title = "회전속도";
  }

  const handleLeftButtonClick = () => {
    switch (title) {
      case "Motor Toque":
        navigate(`/machine/${selectedMachine}/rpm`);
        break;
      case "Vacuum":
        navigate(`/machine/${selectedMachine}/motor`);
        break;
      case "Water":
        navigate(`/machine/${selectedMachine}/air-out2`);
        break;
      case "AirIn":
        navigate(`/machine/${selectedMachine}/vacuum`);
        break;
      case "AirOut(kPa)":
        navigate(`/machine/${selectedMachine}/air-in`);
        break;
      case "AirOut(MPa)":
        navigate(`/machine/${selectedMachine}/air-out1`);
        break;
      case "마모량":
        navigate(`/machine/${selectedMachine}/water`);
        break;
      case "부하량":
        navigate(`/machine/${selectedMachine}/abrasion`);
        break;
      case "회전속도":
        navigate(`/machine/${selectedMachine}/load`);
        break;
      default:
        break;
    }
  };

  const handleRightButtonClick = () => {
    switch (title) {
      case "Motor Toque":
        navigate(`/machine/${selectedMachine}/vacuum`);
        break;
      case "Vacuum":
        navigate(`/machine/${selectedMachine}/air-in`);
        break;
      case "Water":
        navigate(`/machine/${selectedMachine}/abrasion`);
        break;
      case "AirIn":
        navigate(`/machine/${selectedMachine}/air-out1`);
        break;
      case "AirOut(kPa)":
        navigate(`/machine/${selectedMachine}/air-out2`);
        break;
      case "AirOut(MPa)":
        navigate(`/machine/${selectedMachine}/water`);
        break;
      case "마모량":
        navigate(`/machine/${selectedMachine}/load`);
        break;
      case "부하량":
        navigate(`/machine/${selectedMachine}/rpm`);
        break;
      case "회전속도":
        navigate(`/machine/${selectedMachine}/motor`);
        break;
      default:
        break;
    }
  };

  return (
    <Card className={styles.card}>
      <CardContent
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "4vh",
        }}
      >
        <div style={{ display: "flex", alignContent: "center" }}>
          <IconButton
            aria-label="go-to-water-page"
            onClick={handleLeftButtonClick}
          >
            <ArrowBackIcon />
          </IconButton>
          <h1
            style={{ display: "flex", justifyContent: "center", width: "30vh" }}
          >
            <span>{title}</span>
          </h1>
          <IconButton
            aria-label="go-to-vacuum-page"
            onClick={handleRightButtonClick}
          >
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopCard;
