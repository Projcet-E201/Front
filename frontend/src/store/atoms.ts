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
  const [index, setIndex] = useRecoilState(indexAtom);

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
