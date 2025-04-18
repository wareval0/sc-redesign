import { AnamnesisType, SystemsReviewType } from "./types";

export type FolioStateType = {
  anamnesis: AnamnesisType;
  systemsReview: SystemsReviewType
  setAnamnesis: (anamnesis: AnamnesisType) => void;
  setSystemsReview: (systemsReview: SystemsReviewType) => void;
  reset: () => void;
};
