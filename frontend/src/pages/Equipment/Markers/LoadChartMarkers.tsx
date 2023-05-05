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

const LoadChartMarkers = () => {
  const [LoadMarkers, setLoadMarkers] = useState<Marker[]>([]);
  // const [newLoadMarkerValue, setNewLoadMarkerValue] = useState<number>(0);
  const [newLoadMarkerValue, setNewLoadMarkerValue] = React.useState<any>(30);
  const [newLoadMarkerWidth, setNewLoadMarkerWidth] = useState<number>(2);
  const [newLoadMarkerLegend, setNewLoadMarkerLegend] = useState<string>("");

  const [showAlert, setShowAlert] = useState(false);

  const [color, setColor] = useState<string>("#FF3B30");

  const [isChangeColorPickerOpen, setIsChangeColorPickerOpen] =
    useState<number>(0);
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);

  // localStorage에서 markers 가져오기
  useEffect(() => {
    const storedLoadMarkers = localStorage.getItem("LoadChartMarkers");
    if (storedLoadMarkers) {
      setLoadMarkers(JSON.parse(storedLoadMarkers));
    }
  }, []);

  const handleMarkerValueChange = (index: number, value: number) => {
    setLoadMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];

      // max값 설정하기.
      if (value > 300) {
        toast.error("Load Marker의 최대값은 300입니다.");
        value = 300;
      } else if (value < 0) {
        toast.error("Load Marker의 최소값은 0입니다.");
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
    setLoadMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].legend = legend;
      return newMarkers;
    });
  };

  const handleMarkerWidthChange = (index: number, width: any) => {
    setLoadMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].lineStyle.strokeWidth = width;
      return newMarkers;
    });
  };

  // localStorage에 markers 저장하기
  useEffect(() => {
    localStorage.setItem("LoadChartMarkers", JSON.stringify(LoadMarkers));
  }, [LoadMarkers]);

  const handleLoadMarker = () => {
    const strokeColor = color;
    const legend =
      newLoadMarkerLegend.trim() !== ""
        ? newLoadMarkerLegend
        : `Value: ${newLoadMarkerValue}`;
    const newLoadMarker: Marker = {
      axis: "y",
      value: newLoadMarkerValue,
      legend,
      lineStyle: {
        stroke: strokeColor,
        strokeWidth: `${newLoadMarkerWidth}`,
      },

      // 처음 생성 시 무조건 true
      checked: true,
    };
    for (let i = 0; i < LoadMarkers.length; i++) {
      if (LoadMarkers[i].value === newLoadMarkerValue) {
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
    setLoadMarkers([...LoadMarkers, newLoadMarker]);
  };

  const handleNewMarkerLegendChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewLoadMarkerLegend(event.target.value);
  };

  const deleteHandler = (index: number) => {
    setLoadMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers.splice(index, 1);
      toast.success("삭제가 완료되었습니다.");
      return newMarkers;
    });
  };

  const handleMarkerToggle = (index: number) => {
    setLoadMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].checked = !newMarkers[index].checked;
      return newMarkers;
    });

    localStorage.setItem("LoadChartMarkers", JSON.stringify(LoadMarkers));
  };

  const handleColorChange = (color: string) => {
    setColor(color);
    console.log(color);
  };

  const handleEditColor = (color: string) => {
    setLoadMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[isChangeColorPickerOpen].lineStyle.stroke = color;
      return newMarkers;
    });
  };

  // const changeColorHandler = (index: number) => {
  //   setLoadMarkers((prevMarkers) => {
  //     const newMarkers = [...prevMarkers];
  //     newMarkers[index].lineStyle.stroke = editColor;
  //     return newMarkers;
  //   });
  // };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setNewLoadMarkerValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLoadMarkerValue(
      event.target.value === "" ? "" : Number(event.target.value)
    );
  };

  const handleBlur = () => {
    if (newLoadMarkerValue < 0) {
      setNewLoadMarkerValue(0);
    } else if (newLoadMarkerValue > 300) {
      setNewLoadMarkerValue(300);
    }
  };

  console.log(isChangeColorPickerOpen);
  console.log(isPickerOpen);
  return (
    <div style={{ display: "flex" }}>
      <Toaster />
      <div
        style={{
          marginRight: "50px",
          // flex: "1",
          width: "33%",
        }}
      >
        <div style={{ marginTop: "30px" }}>
          <TextField
            sx={{ width: "100%" }}
            id="input-with-icon-textfield"
            label="Marker Name"
            placeholder={`Value: ${newLoadMarkerValue}`}
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
                    typeof newLoadMarkerValue === "number"
                      ? newLoadMarkerValue
                      : 0
                  }
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  min={0}
                  max={300}
                />
              </Grid>
              <Grid item xs={2.5}>
                <Input
                  value={newLoadMarkerValue}
                  size="small"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 10,
                    min: 0,
                    max: 300,
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
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <ColorPicker onColorChange={handleColorChange} />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Select
            value={newLoadMarkerWidth}
            onChange={(e) => setNewLoadMarkerWidth(Number(e.target.value))}
            sx={{ width: "100%" }}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((width) => (
              <MenuItem key={width} value={width} sx={{ height: "20px" }}>
                <div
                  style={{
                    display: "inline-block",
                    width: "100%",
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

        {/* <button onClick={handleLoadMarker}>Add LoadMarker</button> */}
        <Button
          onClick={handleLoadMarker}
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
          width: "66%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            // justifyContent: "center",
            flexWrap: "wrap",
            maxHeight: "380px",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {LoadMarkers.map((LoadMarker, index) => (
            <div
              key={index}
              style={{
                // width: "30%",
                minWidth: "150px",
                marginBottom: "30px",
                marginRight: "5px",
                padding: "5px",
                backgroundColor: LoadMarker.checked ? "" : "gray",
                // border: LoadMarker.checked ? "2px solid blue" : "gray",
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
                  checked={LoadMarker.checked}
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
                  value={LoadMarker.legend}
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
                value={LoadMarker.value}
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
                id="colorBar"
                style={{
                  display: "inline-block",
                  width: "100%",
                  height: `${LoadMarker.lineStyle.strokeWidth}px`,
                  marginRight: "5px",
                  // backgroundColor: LoadMarker.lineStyle.stroke,
                  backgroundColor: LoadMarker.checked
                    ? LoadMarker.lineStyle.stroke
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
                    <ChangeColorPicker onColorChange={handleEditColor} />
                    <Select
                      sx={{
                        backgroundColor: "white",
                        marginTop: "10px",
                      }}
                      value={LoadMarker.lineStyle.strokeWidth}
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
                                width: "100px",
                                height: `${width}px`,
                                marginRight: "5px",
                                border: "1px solid #ddd",

                                backgroundColor: LoadMarker.lineStyle.stroke,
                              }}
                            ></div>
                            {/* <p>{width}px</p> */}
                          </MenuItem>
                        )
                      )}
                    </Select>
                    <div>
                      <button style={{}} onClick={() => setIsPickerOpen(false)}>
                        닫기
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadChartMarkers;
