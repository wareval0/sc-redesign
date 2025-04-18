export type FormNavigationType = {
  step: number;
  steps: string[];
  submitCurrentForm: (() => void) | null;
  setStep: (step: number) => void;
  setSteps: (steps: string[]) => void;
  setSubmitCurrentForm: (submitFn: () => void) => void;
  incrementStep: () => void;
  decrementStep: () => void;
  reset: () => void;
};
