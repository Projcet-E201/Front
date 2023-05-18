import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "@mui/material/Link";

import ChangeColorPicker from "./ChangeColorPicker";

import {
  Select,
  MenuItem,
  Slider,
  Input,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";

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
    machine,
  } = useParams();
  const [selectedMachine, setselectedMachine] =
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

  const [open, setOpen] = React.useState(false);
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
    console.log(inputwidth);
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
    console.log(color);
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
                    variant="standard"
                    onChange={(event) =>
                      handleMarkerValueChange(index, Number(event.target.value))
                    }
                  />
                  {/* <p>{marker.lineStyle.stroke}</p> */}
                  {/* <div
                    style={{
                      display: "inline-block",
                      width: "90%",
                      height: `${marker.lineStyle.strokeWidth}px`,
                      marginRight: "5px",
                      backgroundColor: marker.lineStyle.stroke,
                      border: "1px solid #ddd",
                    }}
                  ></div> */}
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
                              console.log(e.target.value);
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

export default DetailTopCard;
