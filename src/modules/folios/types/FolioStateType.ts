import { AnamnesisType } from "./AnamnesisType";

export type FolioStateType = {
  step: number;
  anamnesis: AnamnesisType;
  setStep: (step: number) => void;
  setAnamnesis: (anamnesis: AnamnesisType) => void;
};
