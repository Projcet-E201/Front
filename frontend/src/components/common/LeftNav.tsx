import React, { useEffect } from "react";
import styles from "./LeftNav.module.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";

// mui button
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

import SettingsIcon from "@mui/icons-material/Settings";
import MonitorIcon from "@mui/icons-material/Monitor";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

// Recoil로 어떤 index인지 결정하기
import { useRecoilState } from "recoil";
import { indexAtom } from "../../store/atoms";

const LeftNav = ({ childrenHeight }: any) => {
  // console.log(childrenHeight, "프롭받은 높이");
  const navigate = useNavigate();
  const location = useLocation();
  const { machine } = useParams();
  const [open, setOpen] = React.useState(false);

  // index 어떤거 선택되어 있는지
  const [selectedIndex, setSelectedIndex] = useRecoilState(indexAtom);
  const indexClick = (value: string) => {
    setSelectedIndex(value);
  };

  const buttonList = [];
  for (let i = 1; i <= 12; i++) {
    buttonList.push(
      <div key={i} style={{ borderBottom: "1px solid gray" }}>
        <ListItemButton
          sx={{
            pl: 4,
            "&:hover": {
              bgcolor: "#191BA9",
              color: "white",
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            },
            bgcolor: location.pathname.includes(`/machine/${i}`)
              ? "#191BA9"
              : "inherit",
            color: location.pathname.includes(`/machine/${i}`)
              ? "white"
              : "inherit",
            borderRadius: "10px",
          }}
          key={`button-${i}`}
          onClick={() => {
            navigate(`/machine/${i}`);
            // setOpen(false);
          }}
        >
          <ListItemIcon>
            {/* <StarBorder /> */}
            <PrecisionManufacturingIcon
              sx={{
                color: location.pathname.includes(`/machine/${i}`)
                  ? "white"
                  : undefined,
              }}
            />
          </ListItemIcon>
          <ListItemText primary={`No.${i}`} />
        </ListItemButton>
      </div>
    );
  }

  // console.log(selectedIndex);
  // console.log(location.pathname);

  return (
    <div
      className={styles.left}
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: `calc(100vh - ${childrenHeight}px`,
        height: "100%",
        minWidth: "220.88px",
      }}
    >
      <List
        sx={{
          width: "80%",
          bgcolor: "background.paper",
          justifyContent: "center",
          marginTop: "25px",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        // subheader={
        //   <ListSubheader component="div" id="nested-list-subheader">
        //     INDEX
        //   </ListSubheader>
        // }
      >
        <ListItemButton
          sx={{
            "&:hover": {
              bgcolor: "#191BA9",
              color: "white",
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            },
            borderRadius: "10px",
            // bgcolor: selectedIndex === "Main" ? "#191BA9" : undefined,
            // color: selectedIndex === "Main" ? "white" : undefined,
            bgcolor: location.pathname === "/" ? "#191BA9" : undefined,
            color: location.pathname === "/" ? "white" : undefined,
          }}
          onClick={() => {
            indexClick("Main");
            if (location.pathname !== "/") {
              navigate("/");
            }
          }}
        >
          <ListItemIcon>
            <DashboardIcon
              sx={{
                // color: selectedIndex === "Main" ? "white" : undefined,
                color: location.pathname === "/" ? "white" : undefined,
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Main" />
        </ListItemButton>
        <ListItemButton
          sx={{
            "&:hover": {
              bgcolor: "#191BA9",
              color: "white",
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            },
            borderRadius: "10px",
            // bgcolor: selectedIndex === "Monitoring" ? "#191BA9" : undefined,
            // color: selectedIndex === "Monitoring" ? "white" : undefined,
            bgcolor: location.pathname.includes("machine")
              ? "#191BA9"
              : undefined,
            color: location.pathname.includes("machine") ? "white" : undefined,
          }}
          onClick={() => {
            setOpen(!open);
            indexClick("Monitoring");
            if (open === true && location.pathname === "/") {
              indexClick("Main");
              setSelectedIndex("Main");
            }
          }}
        >
          <ListItemIcon
            sx={{
              // color: selectedIndex === "Monitoring" ? "white" : undefined,
              color: location.pathname.includes("machine")
                ? "white"
                : undefined,
            }}
          >
            {/* 아이콘 수정하기 */}
            <MonitorIcon sx={{}} />
          </ListItemIcon>
          <ListItemText
            primary="Machine"
            secondary={machine ? `No. ${machine}` : ""}
            secondaryTypographyProps={{
              color: "white",
            }}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {buttonList}
          </List>
        </Collapse>
        <ListItemButton
          sx={{
            "&:hover": {
              bgcolor: "#191BA9",
              color: "white",
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            },
            borderRadius: "10px",
            // bgcolor: selectedIndex === "Setting" ? "#191BA9" : undefined,
            // color: selectedIndex === "Setting" ? "white" : undefined,
            bgcolor: location.pathname.includes("custom-build")
              ? "#191BA9"
              : undefined,
            color: location.pathname.includes("custom-build")
              ? "white"
              : undefined,
          }}
          onClick={() => {
            indexClick("Custom");
            navigate("/custom-build");
          }}
        >
          <ListItemIcon>
            <DashboardCustomizeIcon
              sx={{
                color: location.pathname.includes("custom-build")
                  ? "white"
                  : undefined,
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Custom" />
        </ListItemButton>

        <ListItemButton
          sx={{
            "&:hover": {
              bgcolor: "#191BA9",
              color: "white",
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            },
            borderRadius: "10px",
            // bgcolor: selectedIndex === "Facilities" ? "#191BA9" : undefined,
            // color: selectedIndex === "Facilities" ? "white" : undefined,
            bgcolor: location.pathname.includes("equipment-setting")
              ? "#191BA9"
              : undefined,
            color: location.pathname.includes("equipment-setting")
              ? "white"
              : undefined,
          }}
          onClick={() => {
            navigate(`/equipment-setting`);
            indexClick("EquipmentSetting");
          }}
        >
          <ListItemIcon>
            <SettingsInputComponentIcon
              sx={{
                // color: selectedIndex === "Facilities" ? "white" : undefined,
                color: location.pathname.includes("equipment-setting")
                  ? "white"
                  : undefined,
              }}
            />
          </ListItemIcon>
          <ListItemText primary="설비 관리" />
        </ListItemButton>

        {/* <ListItemButton
          sx={{
            "&:hover": {
              bgcolor: "#191BA9",
              color: "white",
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            },
            borderRadius: "10px",
            // bgcolor: selectedIndex === "Setting" ? "#191BA9" : undefined,
            // color: selectedIndex === "Setting" ? "white" : undefined,
            bgcolor: location.pathname.includes("login")
              ? "#191BA9"
              : undefined,
            color: location.pathname.includes("login") ? "white" : undefined,
          }}
          onClick={() => {
            indexClick("Setting");
            navigate("/login");
          }}
        >
          <ListItemIcon>
            <SettingsIcon
              sx={{
                // color: selectedIndex === "Setting" ? "white" : undefined,
                color: location.pathname.includes("login")
                  ? "white"
                  : undefined,
              }}
            />
          </ListItemIcon>
          <ListItemText primary="서비스 관리" />
        </ListItemButton> */}

        {/* <ListItemButton
          sx={{
            "&:hover": {
              bgcolor: "#191BA9",
              color: "white",
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            },
            borderRadius: "10px",
            bgcolor: selectedIndex === "Facilities" ? "#191BA9" : undefined,
            color: selectedIndex === "Facilities" ? "white" : undefined,
          }}
          onClick={() => {
            navigate(`/test`);
            indexClick("Test1");
          }}
        >
          <ListItemIcon>
            <SettingsInputComponentIcon
              sx={{
                color: selectedIndex === "Facilities" ? "white" : undefined,
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Test" />
        </ListItemButton> */}

        {/* <ListItemButton
          sx={{
            "&:hover": {
              bgcolor: "#191BA9",
              color: "white",
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            },
            borderRadius: "10px",
            bgcolor: selectedIndex === "Facilities" ? "#191BA9" : undefined,
            color: selectedIndex === "Facilities" ? "white" : undefined,
          }}
          onClick={() => {
            navigate(`/test2`);
            indexClick("Test2");
          }}
        >
          <ListItemIcon>
            <SettingsInputComponentIcon
              sx={{
                color: selectedIndex === "Facilities" ? "white" : undefined,
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Test2" />
        </ListItemButton> */}
      </List>
    </div>
  );
};

export default LeftNav;
