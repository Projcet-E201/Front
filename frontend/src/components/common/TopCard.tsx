import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "@mui/material/Link";

import ChangeColorPicker from "./ChangeColorPicker";

import { Select, MenuItem, TextField, Button } from "@mui/material";

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

  const setLocalStorage = (updatedMarkers: any) => {
    if (location.includes("motor")) {
      localStorage.setItem("MotorChartMarkers", JSON.stringify(updatedMarkers));
      setMotorRecoilMarkers(updatedMarkers);
    } else if (location.includes("vacuum")) {
      localStorage.setItem(
        "VacuumChartMarkers",
        JSON.stringify(updatedMarkers)
      );
      setVacuumRecoilMarkers(updatedMarkers);
    } else if (location.includes("air-in")) {
      localStorage.setItem("AirInChartMarkers", JSON.stringify(updatedMarkers));
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
      localStorage.setItem("WaterChartMarkers", JSON.stringify(updatedMarkers));
      setWaterRecoilMarkers(updatedMarkers);
    } else if (location.includes("load")) {
      localStorage.setItem("LoadChartMarkers", JSON.stringify(updatedMarkers));
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
  };

  const handleMarkerValueChange = (index: number, inputValue: any) => {
    setMarkers((markers: any[]) => {
      const updatedMarkers = [...markers];
      updatedMarkers[index] = {
        ...updatedMarkers[index],
        value: inputValue,
      };
      setLocalStorage(updatedMarkers);
      return updatedMarkers;
    });
  };

  const handleMarkerLegendChange = (index: number, inputlegend: any) => {
    setMarkers((markers: any[]) => {
      const updatedMarkers = [...markers];
      updatedMarkers[index] = {
        ...updatedMarkers[index],
        legend: inputlegend,
      };
      setLocalStorage(updatedMarkers);
      return updatedMarkers;
    });
  };

  const handleMarkerCheckedChange = (index: number) => () => {
    setMarkers((markers: any[]) => {
      const updatedMarkers = [...markers];
      updatedMarkers[index] = {
        ...updatedMarkers[index],
        checked: !updatedMarkers[index].checked,
      };
      setLocalStorage(updatedMarkers);
      return updatedMarkers;
    });
  };

  const handleMarkerWidthChange = (index: number, inputwidth: any) => {
    // console.log(inputwidth);
    setMarkers((markers: any[]) => {
      const updatedMarkers = [...markers];
      updatedMarkers[index] = {
        ...updatedMarkers[index],
        lineStyle: {
          ...updatedMarkers[index].lineStyle,
          strokeWidth: inputwidth,
        },
      };
      setLocalStorage(updatedMarkers);
      return updatedMarkers;
    });
  };

  const [isChangeColorPickerOpen, setIsChangeColorPickerOpen] =
    useState<number>(0);
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const handleEditColor = (color: string) => {
    // console.log(color);
    setMarkers((markers: any[]) => {
      const updatedMarkers = [...markers];
      const markerToUpdate = { ...updatedMarkers[isChangeColorPickerOpen] };
      const newLineStyle = { ...markerToUpdate.lineStyle };
      newLineStyle.stroke = color;
      markerToUpdate.lineStyle = newLineStyle;
      updatedMarkers[isChangeColorPickerOpen] = markerToUpdate;
      newLineStyle.stroke = color;
      updatedMarkers[isChangeColorPickerOpen].lineStyle = newLineStyle;
      setLocalStorage(updatedMarkers);
      return updatedMarkers;
    });
  };

  const markerList = (anchor: "right") => (
    <Box sx={{ width: 350, height: "100%" }} role="presentation">
      <div style={{ textAlign: "center", height: "10vh" }}>
        <h1>MarkerList</h1>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Link href="/equipment-setting">수정하러가기</Link>
        </div>
      </div>
      {markers.length === 0 ? (
        <div
          style={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>Marker가 없습니다.</h3>
        </div>
      ) : (
        <List>
          {markers.map((marker: any, index: number) => (
            <ListItem key={index} sx={{ marginBottom: "20px" }}>
              <div style={{ width: "100%" }}>
                <FormControlLabel
                  sx={{ width: "100%" }}
                  control={
                    <Checkbox
                      checked={marker.checked}
                      onChange={handleMarkerCheckedChange(index)}
                    />
                  }
                  // label={marker.legend}
                  label={
                    <TextField
                      sx={{ width: "100%" }}
                      id="input-with-icon-textfield"
                      label="Marker Name"
                      value={marker.legend}
                      variant="standard"
                      onChange={(event) =>
                        handleMarkerLegendChange(
                          index,
                          String(event.target.value)
                        )
                      }
                    />
                  }
                />
                <div style={{ width: "100%" }}>
                  <TextField
                    sx={{ width: "100%", marginTop: "10px" }}
                    id="input-with-icon-textfield"
                    label="Value"
                    value={marker.value}
                    type="number"
                    // inputProps={{
                    //   min: 0, // 최소값
                    //   max: 100, // 최대값
                    // }}
                    variant="standard"
                    onChange={(event) =>
                      handleMarkerValueChange(index, Number(event.target.value))
                    }
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <div
                      id="colorBar"
                      style={{
                        display: "inline-block",
                        width: "90%",
                        height: `${marker.lineStyle.strokeWidth}px`,
                        marginRight: "5px",
                        // backgroundColor: MotorMarker.lineStyle.stroke,
                        backgroundColor: marker.checked
                          ? marker.lineStyle.stroke
                          : "gray",
                        border: "1px solid #ddd",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (isChangeColorPickerOpen !== index) {
                          setIsChangeColorPickerOpen(index);
                        }
                        setIsPickerOpen(!isPickerOpen);
                      }}
                    ></div>
                  </div>
                  {isPickerOpen && isChangeColorPickerOpen === index && (
                    <div style={{ marginTop: "10px" }}>
                      <div
                        style={
                          (index + 1) % 3 === 0
                            ? {
                                position: "absolute",
                                zIndex: "2",
                                right: "0px",
                              }
                            : { position: "absolute", zIndex: "2" }
                        }
                      >
                        <div style={{ background: "white" }}>
                          <ChangeColorPicker onColorChange={handleEditColor} />
                        </div>
                        <div style={{ display: "flex", marginTop: "10px" }}>
                          <Select
                            sx={{
                              backgroundColor: "white",
                              // marginTop: "10px",
                              width: "100%",
                            }}
                            value={marker.lineStyle.strokeWidth}
                            onChange={(e) => {
                              handleMarkerWidthChange(index, e.target.value);
                              // console.log(e.target.value);
                            }}
                          >
                            {Array.from({ length: 10 }, (_, i) => i + 1).map(
                              (width) => (
                                <MenuItem key={width} value={width}>
                                  <div
                                    style={{
                                      display: "inline-block",
                                      width: "90%",
                                      height: `${width}px`,
                                      marginRight: "5px",
                                      border: "1px solid #ddd",

                                      backgroundColor: marker.lineStyle.stroke,
                                    }}
                                  ></div>
                                  {/* <p>{width}px</p> */}
                                </MenuItem>
                              )
                            )}
                          </Select>
                          <div
                            style={{
                              marginLeft: "10px",
                              display: "flex",
                              alignItems: "end",
                            }}
                          >
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => setIsPickerOpen(false)}
                              sx={{ height: "30px" }}
                            >
                              닫기
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      )}
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
              // aria-label="go-to-water-page"
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
