import { atom } from "recoil";

export const selectedAtom = atom<string>({
  key: "selected",
  default: "Sensor",
});

export const indexAtom = atom<string>({
  key: "index",
  default: "Monitoring",
});
