import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useRecoilState } from "recoil";
import { selectedMachineAtom } from "../../store/atoms";

import { useNavigate, useParams } from "react-router";

import styles from "./TopCard.module.css";

interface Props {
  location: string;
}

const DetailTopCard = ({ location }: Props) => {
  const navigate = useNavigate();
  const {
    motorNumber,
    vacuumNumber,
    airInNumber,
    airOut1Number,
    airOut2Number,
    waterNumber,
    abrasionNumber,
    loadNumber,
    rpmNumber,
  } = useParams();
  const [selectedMachine, setSelectedMachine] =
    useRecoilState(selectedMachineAtom);

  let title = "";
  if (location.includes("motor")) {
    title = `Motor ${motorNumber}`;
  } else if (location.includes("vacuum")) {
    title = `Vacuum ${vacuumNumber}`;
  } else if (location.includes("air-in")) {
    title = `AirIn ${airInNumber}`;
  } else if (location.includes("air-out-kpa")) {
    title = `AO(kPa) ${airOut1Number}`;
  } else if (location.includes("air-out-mpa")) {
    title = `AO(MPa) ${airOut2Number}`;
  } else if (location.includes("water")) {
    title = `Water ${waterNumber}`;
  } else if (location.includes("abrasion")) {
    title = `Abrasion ${abrasionNumber}`;
  } else if (location.includes("load")) {
    title = `Load ${loadNumber}`;
  } else if (location.includes("rpm")) {
    title = `Rpm ${rpmNumber}`;
  }

  const isMotor = title.includes("Motor");
  const isVacuum = title.includes("Vacuum");
  const handleLeftButtonClick = () => {
    if (isMotor && motorNumber !== undefined) {
      const nextMotorNumber =
        motorNumber === "1" ? "10" : parseInt(motorNumber) - 1;
      navigate(`/machine/${selectedMachine}/motor/${nextMotorNumber}`);
    } else if (isVacuum && vacuumNumber !== undefined) {
      const nextVacuumNumber =
        vacuumNumber === "1" ? "30" : parseInt(vacuumNumber) - 1;
      navigate(`/machine/${selectedMachine}/vacuum/${nextVacuumNumber}`);
    }
  };

  const handleRightButtonClick = () => {
    if (isMotor && motorNumber !== undefined) {
      const nextMotorNumber =
        motorNumber === "10" ? "1" : parseInt(motorNumber) + 1;
      navigate(`/machine/${selectedMachine}/motor/${nextMotorNumber}`);
    } else if (isVacuum && vacuumNumber !== undefined) {
      const nextVacuumNumber =
        vacuumNumber === "30" ? "1" : parseInt(vacuumNumber) + 1;
      navigate(`/machine/${selectedMachine}/vacuum/${nextVacuumNumber}`);
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
          padding: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
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

export default DetailTopCard;
