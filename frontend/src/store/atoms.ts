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
