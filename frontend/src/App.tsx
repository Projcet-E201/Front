import React from "react";
// import "./App.css";

import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MachinePage from "./pages/MachinePage";
import MotorPage from "./pages/Motor/MotorPage";
import MotorDetailPage from "./pages/Motor/MotorDetailPage";
import VacuumPage from "./pages/Vacuum/VacuumPage";
import VacuumDetailPage from "./pages/Vacuum/VacuumDetailPge";
import AirInPage from "./pages/AirIn/AirInPage";
import AirInDetailPage from "./pages/AirIn/AirInDetailPage";
import AirOut1Page from "./pages/AirOut1/AirOut1Page";
import AirOut1DetailPage from "./pages/AirOut1/AirOut1DetailPage";
import AirOut2Page from "./pages/AirOut2/AirOut2Page";
import AirOut2DetailPage from "./pages/AirOut2/AirOut2DetailPage";
import WaterPage from "./pages/Water/WaterPage";
import WaterDetailPage from "./pages/Water/WaterDetailPage";
import AbrasionPage from "./pages/AbrasionLoss/AbrasionPage";
import AbrasionDetailPage from "./pages/AbrasionLoss/AbrasionDetailPage";
import LoadPage from "./pages/LoadingDose/LoadPage";
import LoadDetailPage from "./pages/LoadingDose/LoadDetailPage";
import RpmPage from "./pages/Rpm/RpmPage";
import RpmDetailPage from "./pages/Rpm/RpmDetailPage";
// recoil 사용
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:machine" element={<MachinePage />} />
        {/* MOTOR */}
        <Route path="/:machine/motor" element={<MotorPage />} />
        <Route
          path="/:machine/motor/:motorNumber"
          element={<MotorDetailPage />}
        />
        {/* VACUUM */}
        <Route path="/:machine/vacuum" element={<VacuumPage />} />
        <Route
          path="/:machine/vacuum/:vacuumNumber"
          element={<VacuumDetailPage />}
        />
        {/* AirIn */}
        <Route path="/:machine/air-in" element={<AirInPage />} />
        <Route
          path="/:machine/air-in/:airInNumber"
          element={<AirInDetailPage />}
        />
        {/* AirOut1 */}
        <Route path="/:machine/air-out1" element={<AirOut1Page />} />
        <Route
          path="/:machine/air-out1/:airOut1Number"
          element={<AirOut1DetailPage />}
        />
        {/* AirOut2 */}
        <Route path="/:machine/air-out2" element={<AirOut2Page />} />
        <Route
          path="/:machine/air-out2/:airOut2Number"
          element={<AirOut2DetailPage />}
        />
        {/* Water */}
        <Route path="/:machine/water" element={<WaterPage />} />
        <Route
          path="/:machine/water/:waterNumber"
          element={<WaterDetailPage />}
        />
        {/* 마모량 */}
        <Route path="/:machine/abrasion" element={<AbrasionPage />} />
        <Route
          path="/:machine/abrasion/:abrasionNumber"
          element={<AbrasionDetailPage />}
        />
        {/* 부하량 */}
        <Route path="/:machine/load" element={<LoadPage />} />
        <Route path="/:machine/load/:loadNumber" element={<LoadDetailPage />} />
        {/* RPM */}
        <Route path="/:machine/rpm" element={<RpmPage />} />
        <Route path="/:machine/rpm/:rpmNumber" element={<RpmDetailPage />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
