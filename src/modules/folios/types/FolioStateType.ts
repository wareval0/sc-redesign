import { AnamnesisType, AntecedentsType, SystemsReviewType } from "./types";

export type FolioStateType = {
  anamnesis: AnamnesisType;
  systemsReview: SystemsReviewType;
  antecedents: AntecedentsType;
  setAnamnesis: (anamnesis: AnamnesisType) => void;
  setSystemsReview: (systemsReview: SystemsReviewType) => void;
  setAntecedents: (antecedents: AntecedentsType) => void;
  reset: () => void;
};
