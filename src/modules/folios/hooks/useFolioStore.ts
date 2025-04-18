import { create } from "zustand";
import {
  AnamnesisType,
  FolioStateType,
  SystemsReviewType,
} from "../types/types";

type DefaultFolioStateType = {
  anamnesis: AnamnesisType;
  systemsReview: SystemsReviewType;
};

const defaultFolioState: DefaultFolioStateType = {
  anamnesis: { motive: "", description: "" },
  systemsReview: {},
};

export const useFolioStore = create<FolioStateType>((set) => ({
  ...defaultFolioState,
  setAnamnesis: (anamnesis: AnamnesisType) => set({ anamnesis }),
  setSystemsReview: (systemsReview: SystemsReviewType) => set({ systemsReview }),
  reset: () => set({ ...defaultFolioState }),
}));
