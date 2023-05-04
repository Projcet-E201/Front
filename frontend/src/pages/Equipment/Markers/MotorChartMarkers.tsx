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
  // InputLabel,
} from "@mui/material";

import BorderColorIcon from "@mui/icons-material/BorderColor";
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

const MotorChartMarkers = () => {
  const [motorMarkers, setMotorMarkers] = useState<Marker[]>([]);
  // const [newMotorMarkerValue, setNewMotorMarkerValue] = useState<number>(0);
  const [newMotorMarkerValue, setNewMotorMarkerValue] = React.useState<any>(30);
  const [newMotorMarkerWidth, setNewMotorMarkerWidth] = useState<number>(2);
  const [newMotorMarkerLegend, setNewMotorMarkerLegend] = useState<string>("");

  const [color, setColor] = useState<string>("#FF3B30");

  const [isChangeColorPickerOpen, setIsChangeColorPickerOpen] =
    useState<number>(0);
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [editColor, setEditColor] = useState("");

  // localStorage에서 markers 가져오기
  useEffect(() => {
    const storedMotorMarkers = localStorage.getItem("motorChartMarkers");
    if (storedMotorMarkers) {
      setMotorMarkers(JSON.parse(storedMotorMarkers));
    }
  }, []);

  const handleMarkerValueChange = (index: number, value: number) => {
    setMotorMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].value = value;
      return newMarkers;
    });
  };

  const handleMarkerLegendChange = (index: number, legend: any) => {
    setMotorMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].legend = legend;
      return newMarkers;
    });
  };

  // localStorage에 markers 저장하기
  useEffect(() => {
    localStorage.setItem("motorChartMarkers", JSON.stringify(motorMarkers));
  }, [motorMarkers]);

  const handleMotorMarker = () => {
    const strokeColor = color;
    const legend =
      newMotorMarkerLegend.trim() !== ""
        ? newMotorMarkerLegend
        : `Value: ${newMotorMarkerValue}`;
    const newMotorMarker: Marker = {
      axis: "y",
      value: newMotorMarkerValue,
      legend,
      lineStyle: { stroke: strokeColor, strokeWidth: `${newMotorMarkerWidth}` },

      // 처음 생성 시 무조건 true
      checked: true,
    };
    setMotorMarkers([...motorMarkers, newMotorMarker]);
  };

  // const handleNewMarkerValueChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setNewMotorMarkerValue(Number(event.target.value));
  // };

  const handleNewMarkerLegendChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewMotorMarkerLegend(event.target.value);
  };

  const deleteHandler = (index: number) => {
    setMotorMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers.splice(index, 1);
      return newMarkers;
    });
  };

  const handleMarkerToggle = (index: number) => {
    setMotorMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[index].checked = !newMarkers[index].checked;
      return newMarkers;
    });

    localStorage.setItem("motorChartMarkers", JSON.stringify(motorMarkers));
  };

  const handleColorChange = (color: string) => {
    setColor(color);
    console.log(color);
  };

  const handleEditColor = (color: string) => {
    setEditColor(color);
    // console.log(editColor, "@@@@@@@@@@@@@@@@");
    setMotorMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[isChangeColorPickerOpen].lineStyle.stroke = color;
      return newMarkers;
    });
  };

  // const changeColorHandler = (index: number) => {
  //   setMotorMarkers((prevMarkers) => {
  //     const newMarkers = [...prevMarkers];
  //     newMarkers[index].lineStyle.stroke = editColor;
  //     return newMarkers;
  //   });
  // };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setNewMotorMarkerValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMotorMarkerValue(
      event.target.value === "" ? "" : Number(event.target.value)
    );
  };

  const handleBlur = () => {
    if (newMotorMarkerValue < 0) {
      setNewMotorMarkerValue(0);
    } else if (newMotorMarkerValue > 300) {
      setNewMotorMarkerValue(300);
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "100px" }}>
        <h1>Motor Marker</h1>
        <div>
          <Box sx={{ width: 400 }}>
            <Typography>Value</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <BorderColorIcon />
              </Grid>
              <Grid item xs>
                <Slider
                  valueLabelDisplay="auto"
                  value={
                    typeof newMotorMarkerValue === "number"
                      ? newMotorMarkerValue
                      : 0
                  }
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  min={0}
                  max={300}
                />
              </Grid>
              <Grid item>
                <Input
                  value={newMotorMarkerValue}
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

        <div>
          <TextField
            id="input-with-icon-textfield"
            label="Marker Name"
            placeholder={`Value: ${newMotorMarkerValue}`}
            onChange={handleNewMarkerLegendChange}
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
        <div>
          <ColorPicker onColorChange={handleColorChange} />
        </div>
        <div>
          <Select
            value={newMotorMarkerWidth}
            onChange={(e) => setNewMotorMarkerWidth(Number(e.target.value))}
            sx={
              {
                // backgroundColor: "yellow",
              }
            }
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((width) => (
              <MenuItem key={width} value={width}>
                <div
                  style={{
                    display: "inline-block",
                    width: "100px",
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

        <button onClick={handleMotorMarker}>Add MotorMarker</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {motorMarkers.map((motorMarker, index) => (
          <div key={index} style={{ width: "10vw" }}>
            <Switch
              checked={motorMarker.checked}
              onChange={() => handleMarkerToggle(index)}
            />
            <div>
              <input
                type="text"
                value={motorMarker.legend}
                onChange={(event) =>
                  handleMarkerLegendChange(index, String(event.target.value))
                }
              />
            </div>
            <div style={{ display: "flex" }}>
              <input
                type="number"
                value={motorMarker.value}
                onChange={(event) =>
                  handleMarkerValueChange(index, Number(event.target.value))
                }
              />
            </div>
            <div
              id="colorBar"
              style={{
                display: "inline-block",
                width: "100px",
                height: `${motorMarker.lineStyle.strokeWidth}px`,
                marginRight: "5px",
                backgroundColor: motorMarker.lineStyle.stroke,
                border: "1px solid #ddd",
              }}
              onClick={() => {
                setIsChangeColorPickerOpen(index);
                setIsPickerOpen((prev) => !prev);
              }}
            ></div>
            {isPickerOpen && isChangeColorPickerOpen === index && (
              <ChangeColorPicker onColorChange={handleEditColor} />
            )}
            <div>
              <button onClick={() => deleteHandler(index)}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotorChartMarkers;
