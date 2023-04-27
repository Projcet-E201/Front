import React, { useEffect } from "react";
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
import LoginPage from "./pages/Login/LoginPage";
import TestPage from "./pages/TestPage";
import CustomBuildPage from "./pages/CustomBuildPage";

// recoil 사용
import { RecoilRoot } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "./store/atoms";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  // const isLoggedIn = useRecoilValue(isLoggedInAtom);

  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/machine/:machine" element={<MachinePage />} />
        {/* MOTOR */}
        <Route path="/machine/:machine/motor" element={<MotorPage />} />
        <Route
          path="/machine/:machine/motor/:motorNumber"
          element={<MotorDetailPage />}
        />
        {/* VACUUM */}
        <Route path="/machine/:machine/vacuum" element={<VacuumPage />} />
        <Route
          path="/machine/:machine/vacuum/:vacuumNumber"
          element={<VacuumDetailPage />}
        />
        {/* AirIn */}
        <Route path="/machine/:machine/air-in" element={<AirInPage />} />
        <Route
          path="/machine/:machine/air-in/:airInNumber"
          element={<AirInDetailPage />}
        />
        {/* AirOut1 */}
        <Route path="/machine/:machine/air-out-kpa" element={<AirOut1Page />} />
        <Route
          path="/machine/:machine/air-out-kpa/:airOut1Number"
          element={<AirOut1DetailPage />}
        />
        {/* AirOut2 */}
        <Route path="/machine/:machine/air-out-mpa" element={<AirOut2Page />} />
        <Route
          path="/machine/:machine/air-out-mpa/:airOut2Number"
          element={<AirOut2DetailPage />}
        />
        {/* Water */}
        <Route path="/machine/:machine/water" element={<WaterPage />} />
        <Route
          path="/machine/:machine/water/:waterNumber"
          element={<WaterDetailPage />}
        />
        {/* 마모량 */}
        <Route path="/machine/:machine/abrasion" element={<AbrasionPage />} />
        <Route
          path="/machine/:machine/abrasion/:abrasionNumber"
          element={<AbrasionDetailPage />}
        />
        {/* 부하량 */}
        <Route path="/machine/:machine/load" element={<LoadPage />} />
        <Route
          path="/machine/:machine/load/:loadNumber"
          element={<LoadDetailPage />}
        />
        {/* RPM */}
        <Route path="/machine/:machine/rpm" element={<RpmPage />} />
        <Route
          path="/machine/:machine/rpm/:rpmNumber"
          element={<RpmDetailPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/custom-build" element={<CustomBuildPage />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
