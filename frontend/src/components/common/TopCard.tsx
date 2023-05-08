import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useRecoilState } from "recoil";
import { selectedMachineAtom } from "../../store/atoms";
import {
  MotorMarkersAtom,
  VacuumMarkersAtom,
  AirInMarkersAtom,
  AirOutKpaMarkersAtom,
  AirOutMpaMarkersAtom,
  WaterMarkersAtom,
  LoadMarkersAtom,
  RpmMarkersAtom,
  AbrasionMarkersAtom,
} from "../../store/atoms";

import { useNavigate } from "react-router";

import styles from "./TopCard.module.css";

import TuneIcon from "@mui/icons-material/Tune";

import {
  Drawer,
  List,
  ListItem,
  Checkbox,
  Box,
  FormControlLabel,
} from "@mui/material";

interface Props {
  location: string;
}

const TopCard = ({ location }: Props) => {
  const navigate = useNavigate();
  const [selectedMachine, setSelectedMachine] =
    useRecoilState(selectedMachineAtom);
  // console.log(selectedMachine);

  // marker Drawer
  const [open, setOpen] = React.useState(false);

  let title = "";

  if (location.endsWith("motor")) {
    title = "Motor Toque";
  } else if (location.endsWith("vacuum")) {
    title = "Vacuum";
  } else if (location.endsWith("water")) {
    title = "Water";
  } else if (location.endsWith("air-in")) {
    title = "AirIn";
  } else if (location.endsWith("air-out-kpa")) {
    title = "AirOut(kPa)";
  } else if (location.endsWith("air-out-mpa")) {
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
        navigate(`/machine/${selectedMachine}/air-out-mpa`);
        break;
      case "AirIn":
        navigate(`/machine/${selectedMachine}/vacuum`);
        break;
      case "AirOut(kPa)":
        navigate(`/machine/${selectedMachine}/air-in`);
        break;
      case "AirOut(MPa)":
        navigate(`/machine/${selectedMachine}/air-out-kpa`);
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
        navigate(`/machine/${selectedMachine}/air-out-kpa`);
        break;
      case "AirOut(kPa)":
        navigate(`/machine/${selectedMachine}/air-out-mpa`);
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

  const [markers, setMarkers] = useState<any>([]);
  const [MotorRecoilMarkers, setMotorRecoilMarkers] =
    useRecoilState(MotorMarkersAtom);
  const [VacuumRecoilMarkers, setVacuumRecoilMarkers] =
    useRecoilState(VacuumMarkersAtom);
  const [AirInRecoilMarkers, setAirInRecoilMarkers] =
    useRecoilState(AirInMarkersAtom);
  const [AirOutKpaRecoilMarkers, setAirOutKpaRecoilMarkers] =
    useRecoilState(AirOutKpaMarkersAtom);
  const [AirOutMpaRecoilMarkers, setAirOutMpaRecoilMarkers] =
    useRecoilState(AirOutMpaMarkersAtom);
  const [WaterRecoilMarkers, setWaterRecoilMarkers] =
    useRecoilState(WaterMarkersAtom);
  const [LoadRecoilMarkers, setLoadRecoilMarkers] =
    useRecoilState(LoadMarkersAtom);
  const [RpmRecoilMarkers, setRpmRecoilMarkers] =
    useRecoilState(RpmMarkersAtom);
  const [AbrasionRecoilMarkers, setAbrasionRecoilMarkers] =
    useRecoilState(AbrasionMarkersAtom);

  useEffect(() => {
    if (location.includes("motor")) {
      const storedMarkers = JSON.parse(
        localStorage.getItem("MotorChartMarkers") || "[]"
      );
      setMarkers(storedMarkers);
      setMotorRecoilMarkers(storedMarkers);
      // console.log(markers);
    } else if (location.includes("vacuum")) {
      const storedMarkers = JSON.parse(
        localStorage.getItem("VacuumChartMarkers") || "[]"
      );
      setMarkers(storedMarkers);
      setVacuumRecoilMarkers(storedMarkers);
      // console.log(markers);
    } else if (location.includes("air-in")) {
      const storedMarkers = JSON.parse(
        localStorage.getItem("AirInChartMarkers") || "[]"
      );
      setMarkers(storedMarkers);
      setAirInRecoilMarkers(storedMarkers);
      // console.log(markers);
    } else if (location.includes("air-out-kpa")) {
      const storedMarkers = JSON.parse(
        localStorage.getItem("AirOutKpaChartMarkers") || "[]"
      );
      setMarkers(storedMarkers);
      setAirOutKpaRecoilMarkers(storedMarkers);
      // console.log(markers);
    } else if (location.includes("air-out-mpa")) {
      const storedMarkers = JSON.parse(
        localStorage.getItem("AirOutMpaChartMarkers") || "[]"
      );
      setMarkers(storedMarkers);
      setAirOutMpaRecoilMarkers(storedMarkers);
      // console.log(markers);
    } else if (location.includes("water")) {
      const storedMarkers = JSON.parse(
        localStorage.getItem("WaterChartMarkers") || "[]"
      );
      setMarkers(storedMarkers);
      setWaterRecoilMarkers(storedMarkers);
      // console.log(markers);
    } else if (location.includes("load")) {
      const storedMarkers = JSON.parse(
        localStorage.getItem("LoadChartMarkers") || "[]"
      );
      setMarkers(storedMarkers);
      setLoadRecoilMarkers(storedMarkers);
      // console.log(markers);
    } else if (location.includes("rpm")) {
      const storedMarkers = JSON.parse(
        localStorage.getItem("RpmChartMarkers") || "[]"
      );
      setMarkers(storedMarkers);
      setRpmRecoilMarkers(storedMarkers);
      // console.log(markers);
    } else if (location.includes("abrasion")) {
      const storedMarkers = JSON.parse(
        localStorage.getItem("AbrasionChartMarkers") || "[]"
      );
      setMarkers(storedMarkers);
      setAbrasionRecoilMarkers(storedMarkers);
      // console.log(markers);
    }
  }, []);

  const handleMarkerCheckedChange = (index: number) => () => {
    setMarkers((markers: any[]) => {
      const updatedMarkers = [...markers];
      updatedMarkers[index] = {
        ...updatedMarkers[index],
        checked: !updatedMarkers[index].checked,
      };
      if (location.includes("motor")) {
        localStorage.setItem(
          "MotorChartMarkers",
          JSON.stringify(updatedMarkers)
        );
        setMotorRecoilMarkers(updatedMarkers);
      } else if (location.includes("vacuum")) {
        localStorage.setItem(
          "VacuumChartMarkers",
          JSON.stringify(updatedMarkers)
        );
        setVacuumRecoilMarkers(updatedMarkers);
      } else if (location.includes("air-in")) {
        localStorage.setItem(
          "AirInChartMarkers",
          JSON.stringify(updatedMarkers)
        );
        setAirInRecoilMarkers(updatedMarkers);
      } else if (location.includes("air-out-kpa")) {
        localStorage.setItem(
          "AirOutKpaChartMarkers",
          JSON.stringify(updatedMarkers)
        );
        setAirOutKpaRecoilMarkers(updatedMarkers);
      } else if (location.includes("air-out-mpa")) {
        localStorage.setItem(
          "AirOutMpaChartMarkers",
          JSON.stringify(updatedMarkers)
        );
        setAirOutMpaRecoilMarkers(updatedMarkers);
      } else if (location.includes("water")) {
        localStorage.setItem(
          "WaterChartMarkers",
          JSON.stringify(updatedMarkers)
        );
        setWaterRecoilMarkers(updatedMarkers);
      } else if (location.includes("load")) {
        localStorage.setItem(
          "LoadChartMarkers",
          JSON.stringify(updatedMarkers)
        );
        setLoadRecoilMarkers(updatedMarkers);
      } else if (location.includes("rpm")) {
        localStorage.setItem("RpmChartMarkers", JSON.stringify(updatedMarkers));
        setRpmRecoilMarkers(updatedMarkers);
      } else if (location.includes("abrasion")) {
        localStorage.setItem(
          "AbrasionChartMarkers",
          JSON.stringify(updatedMarkers)
        );
        setAbrasionRecoilMarkers(updatedMarkers);
      }
      return updatedMarkers;
    });
  };

  const markerList = (anchor: "right") => (
    <Box sx={{ width: 250 }} role="presentation">
      <h1>MarkerList</h1>
      <List>
        {markers.map((marker: any, index: number) => {
          const isChecked = marker.checked;
          return (
            <ListItem key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={marker.checked}
                    onChange={handleMarkerCheckedChange(index)}
                  />
                }
                label={marker.legend}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <div>
      <Card className={styles.card}>
        <CardContent
          style={{
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            height: "4vh",
            padding: "24px",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <IconButton
              aria-label="go-to-water-page"
              onClick={handleLeftButtonClick}
            >
              <ArrowBackIcon />
            </IconButton>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                width: "30vh",
              }}
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
          <div
            style={{ position: "absolute", right: "1rem", cursor: "pointer" }}
          >
            <IconButton onClick={() => setOpen(true)}>
              <TuneIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ zIndex: "10" }}
      >
        {markerList("right")}
      </Drawer>
    </div>
  );
};

export default TopCard;
