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
    title = `AirOut(kPa) ${airOut1Number}`;
  } else if (location.includes("air-out-mpa")) {
    title = `AirOut(MPa) ${airOut2Number}`;
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
  const isAirIn = title.includes("AirIn");
  const isWater = title.includes("Water");
  const isAOMPa = title.includes("AO(MPa)");
  const isAOkPa = title.includes("AO(kPa)");
  const isAbrasion = title.includes("Abrasion");
  const isLoad = title.includes("Load");
  const isRpm = title.includes("Rpm");

  const handleLeftButtonClick = () => {
    if (isMotor && motorNumber !== undefined) {
      const nextMotorNumber =
        motorNumber === "1" ? "10" : parseInt(motorNumber) - 1;
      navigate(`/machine/${selectedMachine}/motor/${nextMotorNumber}`);
    } else if (isVacuum && vacuumNumber !== undefined) {
      const nextVacuumNumber =
        vacuumNumber === "1" ? "30" : parseInt(vacuumNumber) - 1;
      navigate(`/machine/${selectedMachine}/vacuum/${nextVacuumNumber}`);
    } else if (isAirIn && airInNumber !== undefined) {
      const nextAirInNumber =
        airInNumber === "1" ? "10" : parseInt(airInNumber) - 1;
      navigate(`/machine/${selectedMachine}/air-in/${nextAirInNumber}`);
    } else if (isWater && waterNumber !== undefined) {
      const nextWaterNumber =
        waterNumber === "1" ? "10" : parseInt(waterNumber) - 1;
      navigate(`/machine/${selectedMachine}/water/${nextWaterNumber}`);
    } else if (isAOMPa && airOut2Number !== undefined) {
      const nextAOMPaNumber =
        airOut2Number === "1" ? "5" : parseInt(airOut2Number) - 1;
      navigate(`/machine/${selectedMachine}/air-out-mpa/${nextAOMPaNumber}`);
    } else if (isAOkPa && airOut1Number !== undefined) {
      const nextAOkPaNumber =
        airOut1Number === "1" ? "5" : parseInt(airOut1Number) - 1;
      navigate(`/machine/${selectedMachine}/air-out-kpa/${nextAOkPaNumber}`);
    } else if (isAbrasion && abrasionNumber !== undefined) {
      const nextAbrasionNumber =
        abrasionNumber === "1" ? "5" : parseInt(abrasionNumber) - 1;
      navigate(`/machine/${selectedMachine}/abrasion/${nextAbrasionNumber}`);
    } else if (isLoad && loadNumber !== undefined) {
      const nextLoadNumber =
        loadNumber === "1" ? "5" : parseInt(loadNumber) - 1;
      navigate(`/machine/${selectedMachine}/load/${nextLoadNumber}`);
    } else if (isRpm && rpmNumber !== undefined) {
      const nextRpmNumber = rpmNumber === "1" ? "5" : parseInt(rpmNumber) - 1;
      navigate(`/machine/${selectedMachine}/rpm/${nextRpmNumber}`);
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
    } else if (isAirIn && airInNumber !== undefined) {
      const nextAirInNumber =
        airInNumber === "10" ? "1" : parseInt(airInNumber) + 1;
      navigate(`/machine/${selectedMachine}/air-in/${nextAirInNumber}`);
    } else if (isWater && waterNumber !== undefined) {
      const nextWaterNumber =
        waterNumber === "10" ? "1" : parseInt(waterNumber) + 1;
      navigate(`/machine/${selectedMachine}/water/${nextWaterNumber}`);
    } else if (isAOMPa && airOut2Number !== undefined) {
      const nextAOMPaNumber =
        airOut2Number === "5" ? "1" : parseInt(airOut2Number) + 1;
      navigate(`/machine/${selectedMachine}/air-out-mpa/${nextAOMPaNumber}`);
    } else if (isAOkPa && airOut1Number !== undefined) {
      const nextAOkPaNumber =
        airOut1Number === "5" ? "1" : parseInt(airOut1Number) + 1;
      navigate(`/machine/${selectedMachine}/air-out-kpa/${nextAOkPaNumber}`);
    } else if (isAbrasion && abrasionNumber !== undefined) {
      const nextAbrasionNumber =
        abrasionNumber === "5" ? "1" : parseInt(abrasionNumber) + 1;
      navigate(`/machine/${selectedMachine}/abrasion/${nextAbrasionNumber}`);
    } else if (isLoad && loadNumber !== undefined) {
      const nextLoadNumber =
        loadNumber === "5" ? "1" : parseInt(loadNumber) + 1;
      navigate(`/machine/${selectedMachine}/load/${nextLoadNumber}`);
    } else if (isRpm && rpmNumber !== undefined) {
      const nextRpmNumber = rpmNumber === "5" ? "1" : parseInt(rpmNumber) + 1;
      navigate(`/machine/${selectedMachine}/rpm/${nextRpmNumber}`);
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
