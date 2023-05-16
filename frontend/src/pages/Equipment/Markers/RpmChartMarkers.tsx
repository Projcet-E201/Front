import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import ColorPicker from "../../../components/common/ColorPicker";
import ChangeColorPicker from "../../../components/common/ChangeColorPicker";
import {
  Select,
  MenuItem,
  Slider,
  Input,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  // InputLabel,
} from "@mui/material";

import toast, { Toaster } from "react-hot-toast";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import InputAdornment from "@mui/material/InputAdornment";
import TitleIcon from "@mui/icons-material/Title";

import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    id: "Rpm",
    data: Array.from({ length: 20 }, (_, i) => ({
      x: i + 1,
      y: Math.sin((i / 5) * Math.PI) * 25000 + 25000,
    })),
  },
];

interface LineStyle {
  stroke: string;
  strokeWidth: string;
}

interface Marker {
  axis: string;
  value: number;
  legend: string;
  lineStyle: LineStyle;
  checked: boolean;
}

const RpmChartMarkers = () => {
  const [RpmMarkers, setRpmMarkers] = useState<any>([]);
  // const [newRpmMarkerValue, setNewRpmMarkerValue] = useState<number>(0);
  const [newRpmMarkerValue, setNewRpmMarkerValue] = React.useState<any>(10000);
  const [newRpmMarkerWidth, setNewRpmMarkerWidth] = useState<number>(2);
  const [newRpmMarkerLegend, setNewRpmMarkerLegend] = useState<string>("");

  const [showAlert, setShowAlert] = useState(false);

  const [color, setColor] = useState<string>("#FF3B30");

  const [isChangeColorPickerOpen, setIsChangeColorPickerOpen] =
    useState<number>(0);
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);

  // localStorage에서 markers 가져오기
  useEffect(() => {
    const storedRpmMarkers = localStorage.getItem("RpmChartMarkers");
    if (storedRpmMarkers) {
      setRpmMarkers(JSON.parse(storedRpmMarkers));
    }
  }, []);

  const handleMarkerValueChange = (index: number, value: number) => {
    setRpmMarkers((prevMarkers: any) => {
      const newMarkers = [...prevMarkers];

      // max값 설정하기.
      if (value > 50000) {
        toast.error("회전속도 Marker의 최대값은 50000입니다.", {
          duration: 2000,
          position: "top-right",
          style: {
            // backgroundColor: "red",
            // width: "100%",
            maxWidth: "100%",
          },
        });
        value = 50000;
      } else if (value < 0) {
        toast.error("회전속도 Marker의 최소값은 0입니다.", {
          duration: 2000,
          position: "top-right",
          style: {
            // backgroundColor: "red",
            // width: "100%",
            maxWidth: "100%",
          },
        });
        value = 0;
      }
      newMarkers[index].value = value || 0;
      if (newMarkers[index].legend.startsWith("Value:")) {
        newMarkers[index].legend = `Value: ${value}`;
      }
      return newMarkers;
    });
  };

  const handleMarkerLegendChange = (index: number, legend: any) => {
    setRpmMarkers((prevMarkers: any) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].legend = legend;
      return newMarkers;
    });
  };

  const handleMarkerWidthChange = (index: number, width: number) => {
    setRpmMarkers((prevMarkers: any) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index] = {
        ...newMarkers[index],
        lineStyle: {
          ...newMarkers[index].lineStyle,
          strokeWidth: width,
        },
      };
      return newMarkers;
    });
  };

  // localStorage에 markers 저장하기
  useEffect(() => {
    localStorage.setItem("RpmChartMarkers", JSON.stringify(RpmMarkers));
  }, [RpmMarkers]);

  const handleRpmMarker = () => {
    const strokeColor = color;
    const legend =
      newRpmMarkerLegend.trim() !== ""
        ? newRpmMarkerLegend
        : `Value: ${newRpmMarkerValue}`;
    const newRpmMarker: Marker = {
      axis: "y",
      value: newRpmMarkerValue,
      legend,
      lineStyle: {
        stroke: strokeColor,
        strokeWidth: `${newRpmMarkerWidth}`,
      },

      // 처음 생성 시 무조건 true
      checked: true,
    };
    for (let i = 0; i < RpmMarkers.length; i++) {
      if (RpmMarkers[i].value === newRpmMarkerValue) {
        toast.error("이미 존재하는 value 입니다. Value를 수정해주세요", {
          duration: 2000,
          position: "top-right",
          style: {
            // backgroundColor: "red",
            // width: "100%",
            maxWidth: "100%",
          },
        });
        return;
      }
    }
    setRpmMarkers([...RpmMarkers, newRpmMarker]);
    setNewRpmMarkerLegend("");
    setColor("#FF3B30");
    setNewRpmMarkerValue(10000);
    setNewRpmMarkerWidth(2);
  };

  const handleDefaultMarker = () => {
    const defaultMarker = [
      {
        axis: "y",
        value: 40000,
        legend: "경고",
        lineStyle: { stroke: "#FFC041", strokeWidth: "2" },
        checked: true,
      },
      {
        axis: "y",
        value: 45000,
        legend: "위험",
        lineStyle: { stroke: "#FF3B30", strokeWidth: "2" },
        checked: true,
      },
    ];
    setRpmMarkers(defaultMarker);
  };

  const handleNewMarkerLegendChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewRpmMarkerLegend(event.target.value);
  };

  const deleteHandler = (index: number) => {
    setRpmMarkers((prevMarkers: any) => {
      const newMarkers = [...prevMarkers];
      newMarkers.splice(index, 1);
      toast.success("삭제가 완료되었습니다.", {
        duration: 2000,
        position: "top-right",
        style: {
          // backgroundColor: "red",
          // width: "100%",
          maxWidth: "100%",
        },
      });
      return newMarkers;
    });
  };

  const handleMarkerToggle = (index: number) => {
    setRpmMarkers((prevMarkers: any) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].checked = !newMarkers[index].checked;
      return newMarkers;
    });

    localStorage.setItem("RpmChartMarkers", JSON.stringify(RpmMarkers));
  };

  const handleColorChange = (color: string) => {
    setColor(color);
    console.log(color);
  };

  const handleEditColor = (color: string) => {
    setRpmMarkers((prevMarkers: any) => {
      const newMarkers = [...prevMarkers];
      const newLineStyle = { ...newMarkers[isChangeColorPickerOpen].lineStyle };
      newLineStyle.stroke = color;
      newMarkers[isChangeColorPickerOpen].lineStyle = newLineStyle;
      return newMarkers;
    });
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setNewRpmMarkerValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (parseInt(event.target.value) > 50000) {
      value = 50000;
      toast.error("회전속도 Marker의 최대값은 50000입니다.", {
        duration: 2000,
        position: "top-right",
        style: {
          // backgroundColor: "red",
          // width: "100%",
          maxWidth: "100%",
        },
      });
    } else if (parseInt(event.target.value) < 0) {
      toast.error("회전속도 Marker의 최소값은 0입니다.", {
        duration: 2000,
        position: "top-right",
        style: {
          // backgroundColor: "red",
          // width: "100%",
          maxWidth: "100%",
        },
      });
      value = 0;
    }
    setNewRpmMarkerValue(event.target.value === "" ? "" : Number(value));
  };

  const handleBlur = () => {
    if (newRpmMarkerValue < 0) {
      setNewRpmMarkerValue(0);
    } else if (newRpmMarkerValue > 300) {
      setNewRpmMarkerValue(300);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Toaster />
      <div
        style={{
          marginRight: "50px",
          // flex: "1",
          width: "20%",
        }}
      >
        <div style={{ marginTop: "30px" }}>
          <TextField
            sx={{ width: "100%" }}
            id="input-with-icon-textfield"
            label="Marker Name"
            placeholder={`Value: ${newRpmMarkerValue}`}
            onChange={handleNewMarkerLegendChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* <TitleIcon /> */}
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </div>
        <div style={{ marginTop: " 30px" }}>
          <Box sx={{ width: "100%" }}>
            <Typography>Setting Value</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <BorderColorIcon />
              </Grid>
              <Grid item xs>
                <Slider
                  valueLabelDisplay="auto"
                  value={
                    typeof newRpmMarkerValue === "number"
                      ? newRpmMarkerValue
                      : 0
                  }
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  min={0}
                  max={50000}
                />
              </Grid>
              <Grid item xs={2.5}>
                <Input
                  value={newRpmMarkerValue}
                  size="small"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 1000,

                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </div>
        <div
          style={{
            // display: "flex",
            // justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <ColorPicker onColorChange={handleColorChange} />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Select
            value={newRpmMarkerWidth}
            onChange={(e) => setNewRpmMarkerWidth(Number(e.target.value))}
            sx={{ width: "100%" }}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((width) => (
              <MenuItem key={width} value={width} sx={{ height: "20px" }}>
                <div
                  style={{
                    display: "inline-block",
                    width: "90%",
                    height: `${width}px`,

                    marginRight: "5px",
                    border: "1px solid #ddd",
                    // backgroundColor: "black",
                    backgroundColor: color,
                  }}
                ></div>
                {/* <p>{width}px</p> */}
              </MenuItem>
            ))}
          </Select>
        </div>

        {/* <button onClick={handleRpmMarker}>Add RpmMarker</button> */}
        <Button
          onClick={handleRpmMarker}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, height: "50px" }}
        >
          생성하기
        </Button>
      </div>
      <div
        style={{
          width: "40%",
        }}
      >
        {RpmMarkers.length === 0 ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ color: "gray" }}>Marker가 존재하지 않습니다.</p>
              <Button onClick={handleDefaultMarker}>Default Marker 생성</Button>
            </div>
          </div>
        ) : (
          <div
            style={{
              position: "relative",
              display: "flex",
              width: "100%",
              height: "100%",
              // justifyContent: "center",
              flexWrap: "wrap",
              maxHeight: "380px",
              overflowY: RpmMarkers.length === 0 ? "hidden" : "scroll",
              overflowX: "hidden",
            }}
          >
            {RpmMarkers.map((RpmMarker: any, index: number) => (
              <div
                key={index}
                style={{
                  width: "30%",
                  minWidth: "150px",
                  height: "45%",
                  marginBottom: "30px",
                  marginRight: "5px",
                  padding: "5px",
                  backgroundColor: RpmMarker.checked ? "" : "gray",
                  // border: RpmMarker.checked ? "2px solid blue" : "gray",
                  // textAlign: "left",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Switch
                    checked={RpmMarker.checked}
                    onChange={() => handleMarkerToggle(index)}
                  />
                  <IconButton onClick={() => deleteHandler(index)}>
                    <DeleteIcon />
                  </IconButton>
                </div>

                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    id="input-with-icon-textfield"
                    label="Marker Name"
                    value={RpmMarker.legend}
                    onChange={(event) =>
                      handleMarkerLegendChange(
                        index,
                        String(event.target.value)
                      )
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TitleIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                </div>
                <TextField
                  sx={{ width: "100%", marginTop: "10px" }}
                  id="input-with-icon-textfield"
                  label="Value"
                  type="number"
                  value={RpmMarker.value}
                  onChange={(event) =>
                    handleMarkerValueChange(index, Number(event.target.value))
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {/* <TitleIcon /> */}
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    step: 1000,
                  }}
                  variant="standard"
                />
                {/* <p style={{ margin: "0" }}>Marker 수정</p> */}
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
                      height: `${RpmMarker.lineStyle.strokeWidth}px`,
                      marginRight: "5px",
                      // backgroundColor: RpmMarker.lineStyle.stroke,
                      backgroundColor: RpmMarker.checked
                        ? RpmMarker.lineStyle.stroke
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
                      <div>
                        <ChangeColorPicker onColorChange={handleEditColor} />
                      </div>
                      <div style={{ display: "flex", marginTop: "10px" }}>
                        <Select
                          sx={{
                            backgroundColor: "white",
                            // marginTop: "10px",
                            width: "100%",
                          }}
                          value={RpmMarker.lineStyle.strokeWidth}
                          onChange={(e) =>
                            handleMarkerWidthChange(index, e.target.value)
                          }
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

                                    backgroundColor: RpmMarker.lineStyle.stroke,
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
            ))}
          </div>
        )}
      </div>
      <div style={{ width: "40%", height: "380px" }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 10, right: 35, bottom: 30, left: 40 }}
          // xFormat={(value: any) => formatTime(new Date().getTime() / 1000 - value)}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: 0,
            max: 50000,
            stacked: false,
            reverse: false,
          }}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          colors={{ scheme: "category10" }}
          lineWidth={2}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          enableSlices="x"
          enablePoints={false}
          useMesh={true}
          animate={true}
          // legends={legend ? legends : []}
          markers={RpmMarkers.filter((marker: any) => marker.checked)}
          isInteractive={false} // 마우스 움직이면 tooltip 막 뜨는거
        />
      </div>
    </div>
  );
};

export default RpmChartMarkers;
