"use client";

import { useRouter } from "next/navigation";

import { useFormNavigation } from "../hooks/hooks";

export function Footer() {
  const router = useRouter();
  const { step, steps, submitCurrentForm, decrementStep } = useFormNavigation();

  const handleBack = () => {
    if (step > 0) {
      decrementStep();
      router.push(steps[step - 1]);
    }
  };

  return (
    <>
      <footer
        className="px-10 py-4 bg-white border-t border-slate-100 flex justify-end items-center gap-5 fixed bottom-0 right-0"
        style={{ width: "calc(100% - 280px)" }}
      >
        <button
          className="w-28 py-3 bg-white text-gray-800 rounded-lg shadow-md border border-gray-100"
          onClick={handleBack}
        >
          Atrás
        </button>
        <button
          className="w-28 py-3 bg-sky-500 text-white rounded-lg shadow-md"
          onClick={() => {
            if (submitCurrentForm) {
              submitCurrentForm();
            }
          }}
        >
          Siguiente
        </button>
      </footer>
    </>
  );
}
