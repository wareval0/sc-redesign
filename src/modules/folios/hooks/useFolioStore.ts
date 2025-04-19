import { create } from "zustand";
import {
  AnamnesisType,
  AntecedentsType,
  FolioStateType,
  SystemsReviewType,
} from "../types/types";

type DefaultFolioStateType = {
  anamnesis: AnamnesisType;
  systemsReview: SystemsReviewType;
  antecedents: AntecedentsType;
};

const defaultFolioState: DefaultFolioStateType = {
  anamnesis: { motive: "", description: "" },
  systemsReview: {},
  antecedents: {}
};

export const useFolioStore = create<FolioStateType>((set) => ({
  ...defaultFolioState,
  setAnamnesis: (anamnesis: AnamnesisType) => set({ anamnesis }),
  setSystemsReview: (systemsReview: SystemsReviewType) => set({ systemsReview }),
  setAntecedents: (antecedents: AntecedentsType) => set({ antecedents }),
  reset: () => set({ ...defaultFolioState }),
}));
