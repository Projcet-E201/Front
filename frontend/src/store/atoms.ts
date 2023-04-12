import { atom } from "recoil";

export const selectedAtom = atom<string>({
  key: "selected",
  default: "Sensor",
});
