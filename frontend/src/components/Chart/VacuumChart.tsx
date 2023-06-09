import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { VacuumMarkersAtom } from "../../store/atoms";

const VacuumChart = ({ data }: any) => {
  const navigate = useNavigate();

  const handleBarClick = (data: any, event: any) => {
    navigate(`${data.indexValue.slice(1)}`);
  };

  const [markers, setMarkers] = useState([]);
  const [recoilMarkers, setRecoilMarkers] = useRecoilState(VacuumMarkersAtom);
  useEffect(() => {
    const markersFromLocalStorage = JSON.parse(
      localStorage.getItem("VacuumChartMarkers") || "[]"
    );
    setMarkers(markersFromLocalStorage.filter((marker: any) => marker.checked));
    setRecoilMarkers(
      markersFromLocalStorage.filter((marker: any) => marker.checked)
    );
  }, []);
  return (
    <ResponsiveBar
      onClick={handleBarClick}
      // width={1000} // 차트의 가로 길이
      // width={100} // 차트의 가로 길이
      // height={500} // 차트의 세로 길이
      data={data} // 차트에 표시될 데이터 배열
      keys={["value"]} // 표시될 데이터에서 y축 값에 해당하는 키 값
      indexBy="vacuum" // 표시될 데이터에서 x축 값에 해당하는 키 값
      margin={{ top: 50, right: 50, bottom: 50, left: 60 }} // 차트와 경계선 사이의 여백
      padding={0.2} // 바 사이의 여백
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }} // 라벨의 색상과 스타일 지정
      axisBottom={{
        // x축의 설정
        tickSize: 5, // 축의 눈금선 길이
        tickPadding: 5, // 축과 눈금선 사이의 여백
        tickRotation: 0, // 눈금선의 회전 각도
        legend: "Vacuum", // x축에 대한 레전드(축 이름)
        legendPosition: "middle", // 레전드의 위치
        legendOffset: 32, // 레전드의 오프셋
      }}
      axisLeft={{
        // y축의 설정
        tickSize: 5, // 축의 눈금선 길이
        tickPadding: 5, // 축과 눈금선 사이의 여백
        tickRotation: 0, // 눈금선의 회전 각도
        legend: "Value", // y축에 대한 레전드(축 이름)
        legendPosition: "middle", // 레전드의 위치
        legendOffset: -40, // 레전드의 오프셋
      }}
      maxValue={100}
      colors={(bar: any) => bar.data.color}
      markers={recoilMarkers.filter((marker: any) => marker.checked)}
    />
  );
};

export default VacuumChart;
