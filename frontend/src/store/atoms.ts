import { atom } from "recoil";

export const selectedAtom = atom<string>({
  key: "selected",
  default: "Sensor",
});

export const indexAtom = atom<string>({
  key: "index",
  default: "Main",
});

export const selectedMachineAtom = atom<string>({
  key: "selectedMachineAtom",
  default: "1",
});
