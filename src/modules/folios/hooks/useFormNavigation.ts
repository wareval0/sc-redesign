import { create } from "zustand";
import { FormNavigationType } from "../types/FormNavigationType";

type DefaultFormNavigationType = {
  step: number;
  steps: string[];
  submitCurrentForm: (() => void) | null;
}

const defaultFormNavigationState: DefaultFormNavigationType = {
  step: 0,
  steps: [],
  submitCurrentForm: null,
};

export const useFormNavigation = create<FormNavigationType>((set) => ({
  ...defaultFormNavigationState,
  setStep: (step: number) => set({ step }),
  setSteps: (steps: string[]) => set({ steps }),
  setSubmitCurrentForm: (submitFn) => set({ submitCurrentForm: submitFn }),
  incrementStep: () => set((state) => ({ step: state.step + 1 })),
  decrementStep: () => set((state) => ({ step: state.step - 1 })),
  reset: () => set({ ...defaultFormNavigationState }),
}));
