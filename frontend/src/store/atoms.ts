import { atom, useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const selectedAtom = atom<string>({
  key: "selected",
  default: "Sensor",
});

export const indexAtom = atom<string>({
  key: "index",
  default: "Main",
});

export const useSetIndexAtom = () => {
  const location = useLocation();
  const [, setIndex] = useRecoilState(indexAtom);

  useEffect(() => {
    if (location.pathname === "/") {
      setIndex("Main");
    }
  }, [location.pathname, setIndex]);
};

export const selectedMachineAtom = atom<string>({
  key: "selectedMachineAtom",
  default: "1",
});

// 로그인 유무
export const isLoggedInAtom = atom<boolean>({
  key: "isLoggedIn",
  default: false,
});

export const MotorMarkersAtom = atom<any[]>({
  key: "MotorMarkersAtom",
  default: JSON.parse(localStorage.getItem("MotorChartMarkers") || "[]"),
});

export const VacuumMarkersAtom = atom<any[]>({
  key: "VacuumMarkersAtom",
  default: JSON.parse(localStorage.getItem("VacuumChartMarkers") || "[]"),
});
export const AirInMarkersAtom = atom<any[]>({
  key: "AirInMarkersAtom",
  default: JSON.parse(localStorage.getItem("AirInChartMarkers") || "[]"),
});
export const AirOutKpaMarkersAtom = atom<any[]>({
  key: "AirOutKpaMarkersAtom",
  default: JSON.parse(localStorage.getItem("AirOutKpaChartMarkers") || "[]"),
});
export const AirOutMpaMarkersAtom = atom<any[]>({
  key: "AirOutMpaMarkersAtom",
  default: JSON.parse(localStorage.getItem("AirOutMpaChartMarkers") || "[]"),
});
export const WaterMarkersAtom = atom<any[]>({
  key: "WaterMarkersAtom",
  default: JSON.parse(localStorage.getItem("WaterChartMarkers") || "[]"),
});
export const LoadMarkersAtom = atom<any[]>({
  key: "LoadMarkersAtom",
  default: JSON.parse(localStorage.getItem("LoadChartMarkers") || "[]"),
});
export const RpmMarkersAtom = atom<any[]>({
  key: "RpmMarkersAtom",
  default: JSON.parse(localStorage.getItem("RpmChartMarkers") || "[]"),
});
export const AbrasionMarkersAtom = atom<any[]>({
  key: "AbrasionMarkersAtom",
  default: JSON.parse(localStorage.getItem("AbrasionChartMarkers") || "[]"),
});

export const currentTimeAtom = atom<string>({
  key: "currentTime",
  default: "",
});

export const currentDateAtom = atom<string>({
  key: "currentDate",
  default: "",
});

export const useDateTimeUpdater = () => {
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeAtom);
  const [currentDate, setCurrentDate] = useRecoilState(currentDateAtom);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}시 ${minutes}분 ${seconds}초`);
      setCurrentDate(`${year}년 ${month}월 ${day}일`);
    }, 1000);

    return () => clearInterval(interval);
  }, [setCurrentTime, setCurrentDate]);

  // Return the current time and date values in case you need them in your component
  return {
    currentTime,
    currentDate,
  };
};
