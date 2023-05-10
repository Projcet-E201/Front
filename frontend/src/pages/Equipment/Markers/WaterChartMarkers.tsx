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
    id: "Water",
    data: Array.from({ length: 20 }, (_, i) => ({
      x: i + 1,
      y: Math.sin((i / 5) * Math.PI) * 50 + 50,
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

const WaterChartMarkers = () => {
  const [WaterMarkers, setWaterMarkers] = useState<any>([]);
  // const [newWaterMarkerValue, setNewWaterMarkerValue] = useState<number>(0);
  const [newWaterMarkerValue, setNewWaterMarkerValue] = React.useState<any>(0);
  const [newWaterMarkerWidth, setNewWaterMarkerWidth] = useState<number>(2);
  const [newWaterMarkerLegend, setNewWaterMarkerLegend] = useState<string>("");

  const [showAlert, setShowAlert] = useState(false);

  const [color, setColor] = useState<string>("#FF3B30");

  const [isChangeColorPickerOpen, setIsChangeColorPickerOpen] =
    useState<number>(0);
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);

  // localStorage에서 markers 가져오기
  useEffect(() => {
    const storedWaterMarkers = localStorage.getItem("WaterChartMarkers");
    if (storedWaterMarkers) {
      setWaterMarkers(JSON.parse(storedWaterMarkers));
    }
  }, []);

  const handleMarkerValueChange = (index: number, value: number) => {
    setWaterMarkers((prevMarkers: any) => {
      const newMarkers = [...prevMarkers];

      // max값 설정하기.
      if (value > 300) {
        toast.error("Water Marker의 최대값은 300입니다.");
        value = 300;
      } else if (value < 0) {
        toast.error("Water Marker의 최소값은 0입니다.");
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
    setWaterMarkers((prevMarkers: any) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].legend = legend;
      return newMarkers;
    });
  };

  const handleMarkerWidthChange = (index: number, width: number) => {
    setWaterMarkers((prevMarkers: any) => {
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
    localStorage.setItem("WaterChartMarkers", JSON.stringify(WaterMarkers));
  }, [WaterMarkers]);

  const handleWaterMarker = () => {
    const strokeColor = color;
    const legend =
      newWaterMarkerLegend.trim() !== ""
        ? newWaterMarkerLegend
        : `Value: ${newWaterMarkerValue}`;
    const newWaterMarker: Marker = {
      axis: "y",
      value: newWaterMarkerValue,
      legend,
      lineStyle: { stroke: strokeColor, strokeWidth: `${newWaterMarkerWidth}` },

      // 처음 생성 시 무조건 true
      checked: true,
    };
    for (let i = 0; i < WaterMarkers.length; i++) {
      if (WaterMarkers[i].value === newWaterMarkerValue) {
        toast.error("이미 존재하는 value 입니다. Value를 수정해주세요", {
          duration: 2000,
          position: "top-center",
          style: {
            // backgroundColor: "red",
            // width: "100%",
            maxWidth: "100%",
          },
        });
        return;
      }
    }
    setWaterMarkers([...WaterMarkers, newWaterMarker]);
    setNewWaterMarkerLegend("");
    setColor("#FF3B30");
    setNewWaterMarkerValue(30);
    setNewWaterMarkerWidth(2);
  };

  const handleDefaultMarker = () => {
    const defaultMarker = [
      {
        axis: "y",
        value: 70,
        legend: "경고",
        lineStyle: { stroke: "#FFC041", strokeWidth: "2" },
        checked: true,
      },
      {
        axis: "y",
        value: 90,
        legend: "위험",
        lineStyle: { stroke: "#FF3B30", strokeWidth: "2" },
        checked: true,
      },
    ];
    setWaterMarkers(defaultMarker);
  };

  const handleNewMarkerLegendChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewWaterMarkerLegend(event.target.value);
  };

  const deleteHandler = (index: number) => {
    setWaterMarkers((prevMarkers: any) => {
      const newMarkers = [...prevMarkers];
      newMarkers.splice(index, 1);
      toast.success("삭제가 완료되었습니다.");
      return newMarkers;
    });
  };

  const handleMarkerToggle = (index: number) => {
    setWaterMarkers((prevMarkers: any) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].checked = !newMarkers[index].checked;
      return newMarkers;
    });

    localStorage.setItem("WaterChartMarkers", JSON.stringify(WaterMarkers));
  };

  const handleColorChange = (color: string) => {
    setColor(color);
    console.log(color);
  };

  const handleEditColor = (color: string) => {
    setWaterMarkers((prevMarkers: any) => {
      const newMarkers = [...prevMarkers];
      const newLineStyle = { ...newMarkers[isChangeColorPickerOpen].lineStyle };
      newLineStyle.stroke = color;
      newMarkers[isChangeColorPickerOpen].lineStyle = newLineStyle;
      return newMarkers;
    });
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setNewWaterMarkerValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewWaterMarkerValue(
      event.target.value === "" ? "" : Number(event.target.value)
    );
  };

  const handleBlur = () => {
    if (newWaterMarkerValue < 0) {
      setNewWaterMarkerValue(0);
    } else if (newWaterMarkerValue > 300) {
      setNewWaterMarkerValue(300);
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
            placeholder={`Value: ${newWaterMarkerValue}`}
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
                    typeof newWaterMarkerValue === "number"
                      ? newWaterMarkerValue
                      : 0
                  }
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  min={0}
                  max={4}
                />
              </Grid>
              <Grid item xs={2.5}>
                <Input
                  value={newWaterMarkerValue}
                  size="small"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 0.5,
                    min: 0,
                    max: 4,
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
            value={newWaterMarkerWidth}
            onChange={(e) => setNewWaterMarkerWidth(Number(e.target.value))}
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

        {/* <button onClick={handleWaterMarker}>Add WaterMarker</button> */}
        <Button
          onClick={handleWaterMarker}
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
        {WaterMarkers.length === 0 && (
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
        )}
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100%",
            // justifyContent: "center",
            flexWrap: "wrap",
            maxHeight: "380px",
            overflowY: WaterMarkers.length === 0 ? "hidden" : "scroll",
            overflowX: "hidden",
          }}
        >
          {WaterMarkers.map((WaterMarker: any, index: number) => (
            <div
              key={index}
              style={{
                width: "30%",
                minWidth: "150px",
                height: "45%",
                marginBottom: "30px",
                marginRight: "5px",
                padding: "5px",
                backgroundColor: WaterMarker.checked ? "" : "gray",
                // border: WaterMarker.checked ? "2px solid blue" : "gray",
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
                  checked={WaterMarker.checked}
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
                  value={WaterMarker.legend}
                  onChange={(event) =>
                    handleMarkerLegendChange(index, String(event.target.value))
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
                value={WaterMarker.value}
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
                    height: `${WaterMarker.lineStyle.strokeWidth}px`,
                    marginRight: "5px",
                    // backgroundColor: WaterMarker.lineStyle.stroke,
                    backgroundColor: WaterMarker.checked
                      ? WaterMarker.lineStyle.stroke
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
                        value={WaterMarker.lineStyle.strokeWidth}
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

                                  backgroundColor: WaterMarker.lineStyle.stroke,
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
            max: 120,
            stacked: false,
            reverse: false,
          }}
          curve="basis"
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
          markers={WaterMarkers.filter((marker: any) => marker.checked)}
          isInteractive={false} // 마우스 움직이면 tooltip 막 뜨는거
        />
      </div>
    </div>
  );
};

export default WaterChartMarkers;
