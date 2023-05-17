import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

import { ResponsiveLine } from "@nivo/line";

import { useRecoilState } from "recoil";
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
} from "../../../store/atoms";

interface Props {
  datasets: any[];
  legend?: boolean;
}

const formatTime = (secondsAgo: number) => {
  const d = new Date();
  d.setSeconds(d.getSeconds() - secondsAgo);
  return d.toLocaleTimeString();
};

const DetailChart = ({ datasets, legend }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const legends: any = [
    {
      anchor: "top-right",
      direction: "column",
      justify: false,
      translateX: 100,
      translateY: 0,
      itemsSpacing: 0,
      itemDirection: "left-to-right",
      itemWidth: 80,
      itemHeight: 20,
      itemOpacity: 0.75,
      symbolSize: 12,
      symbolShape: "circle",
      symbolBorderColor: "rgba(0, 0, 0, .5)",
      effects: [
        {
          on: "hover",
          style: {
            itemBackground: "rgba(0, 0, 0, .03)",
            itemOpacity: 1,
          },
        },
      ],
    },
  ];
  const [maxvalue, setMaxvalue] = useState(0);
  const [minvalue, setMinvalue] = useState(0);

  console.log("여기야여기", datasets);

  useEffect(() => {
    if (datasets[0].name == "motor") {
      setMaxvalue(300);
      setMinvalue(0);
    } else if (datasets[0].name == "water") {
      setMaxvalue(4);
      setMinvalue(0);
    } else if (datasets[0].name == "vacuum") {
      setMaxvalue(100);
      setMinvalue(0);
    } else if (datasets[0].name == "air-in") {
      setMaxvalue(900);
      setMinvalue(0);
    } else if (datasets[0].name == "air-out-kpa") {
      setMaxvalue(900);
      setMinvalue(0);
    } else if (datasets[0].name == "air-out-mpa") {
      setMaxvalue(1);
      setMinvalue(-0.1);
    } else if (datasets[0].name == "abrasion") {
      setMaxvalue(40);
      setMinvalue(0);
    } else if (datasets[0].name == "load") {
      setMaxvalue(16);
      setMinvalue(0);
    } else if (datasets[0].name == "rpm") {
      setMaxvalue(50000);
      setMinvalue(0);
    }
    return;
  }, []);

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
    if (location.pathname.includes("motor")) {
      const storedMarkers = JSON.parse(
        localStorage.getItem("MotorChartMarkers") || "[]"
      );
      setMarkers(storedMarkers);
      setMotorRecoilMarkers(storedMarkers);
      // console.log(markers);
    } else if (location.pathname.includes("vacuum")) {
      const storedMarkers = JSON.parse(
        localStorage.getItem("VacuumChartMarkers") || "[]"
      );
      setMarkers(storedMarkers);
      setVacuumRecoilMarkers(storedMarkers);
      // console.log(markers);
    } else if (location.pathname.includes("air-in")) {
      const storedMarkers = JSON.parse(
        localStorage.getItem("AirInChartMarkers") || "[]"
      );
      setMarkers(storedMarkers);
      setAirInRecoilMarkers(storedMarkers);
      // console.log(markers);
    } else if (location.pathname.includes("air-out-kpa")) {
      const storedMarkers = JSON.parse(
        localStorage.getItem("AirOutKpaChartMarkers") || "[]"
      );
      setMarkers(storedMarkers);
      setAirOutKpaRecoilMarkers(storedMarkers);
      // console.log(markers);
    } else if (location.pathname.includes("air-out-mpa")) {
      const storedMarkers = JSON.parse(
        localStorage.getItem("AirOutMpaChartMarkers") || "[]"
      );
      setMarkers(storedMarkers);
      setAirOutMpaRecoilMarkers(storedMarkers);
      // console.log(markers);
    } else if (location.pathname.includes("water")) {
      const storedMarkers = JSON.parse(
        localStorage.getItem("WaterChartMarkers") || "[]"
      );
      setMarkers(storedMarkers);
      setWaterRecoilMarkers(storedMarkers);
      // console.log(markers);
    } else if (location.pathname.includes("load")) {
      const storedMarkers = JSON.parse(
        localStorage.getItem("LoadChartMarkers") || "[]"
      );
      setMarkers(storedMarkers);
      setLoadRecoilMarkers(storedMarkers);
      // console.log(markers);
    } else if (location.pathname.includes("rpm")) {
      const storedMarkers = JSON.parse(
        localStorage.getItem("RpmChartMarkers") || "[]"
      );
      setMarkers(storedMarkers);
      setRpmRecoilMarkers(storedMarkers);
      // console.log(markers);
    } else if (location.pathname.includes("abrasion")) {
      const storedMarkers = JSON.parse(
        localStorage.getItem("AbrasionChartMarkers") || "[]"
      );
      setMarkers(storedMarkers);
      setAbrasionRecoilMarkers(storedMarkers);
      // console.log(markers);
    }
  }, []);

  return (
    <ResponsiveLine
      data={datasets}
      margin={{ top: 10, right: legend ? 110 : 35, bottom: 30, left: 40 }}
      xFormat={(value: any) => formatTime(new Date().getTime() / 1000 - value)}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: minvalue,
        max: maxvalue,
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
      animate={false}
      legends={legend ? legends : []}
      // markers={markers.filter((marker: any) => marker.checked)}
      markers={
        location.pathname.includes("motor")
          ? MotorRecoilMarkers.filter((marker: any) => marker.checked)
          : location.pathname.includes("vacuum")
          ? VacuumRecoilMarkers.filter((marker) => marker.checked)
          : location.pathname.includes("air-in")
          ? AirInRecoilMarkers.filter((marker) => marker.checked)
          : location.pathname.includes("air-out-kpa")
          ? AirOutKpaRecoilMarkers.filter((marker) => marker.checked)
          : location.pathname.includes("air-out-mpa")
          ? AirOutMpaRecoilMarkers.filter((marker) => marker.checked)
          : location.pathname.includes("water")
          ? WaterRecoilMarkers.filter((marker) => marker.checked)
          : location.pathname.includes("load")
          ? LoadRecoilMarkers.filter((marker) => marker.checked)
          : location.pathname.includes("rpm")
          ? RpmRecoilMarkers.filter((marker) => marker.checked)
          : location.pathname.includes("abrasion")
          ? AbrasionRecoilMarkers.filter((marker) => marker.checked)
          : []
      }
    />
  );
};

export default DetailChart;
