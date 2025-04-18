"use client";

import { useEffect, useMemo } from "react";
import { UserType } from "@/types/UserType";
import { useFormNavigation } from "../hooks/useFormNavigation";
import { User, CircleCheck } from "lucide-react";

export function SideBar({ user }: { user: UserType }) {
  const { step, setSteps } = useFormNavigation();

  const steps: string[] = useMemo(
    () => [
      "Anamnesis",
      "Revisión por Sistemas",
      "Antecedentes",
      ...(user.gender === "Female" ? ["Ginecología"] : []),
      "Examen Físico",
      "Diagnóstico",
      "Fórmula",
      "Exámenes Médicos",
      "Orden Médica",
      "Nota Médica",
      "Incapacidad",
      "Resumen",
    ],
    [user.gender]
  );

  const stepPaths: string[] = useMemo(
    () => [
      "/folios/general/anamnesis",
      "/folios/general/systems_review",
      "/folios/general/antecedents",
      ...(user.gender === "Female" ? ["/folios/general/gynecology"] : []),
      "/folios/general/physical_exam",
      "/folios/general/diagnosis",
      "/folios/general/prescription",
      "/folios/general/medical_tests",
      "/folios/general/medical_order",
      "/folios/general/medical_note",
      "/folios/general/incapacity",
      "/folios/general/summary",
    ],
    [user.gender]
  );

  useEffect(() => {
    setSteps(stepPaths);
  }, [setSteps, stepPaths]);

  const renderStep = (index: number) => {
    const isCompleted = step >= index;
    const stepLabel = steps[index];
    //const stepPath = stepPaths[index];

    return (
      <li key={index} className="flex items-center gap-2.5">
        {isCompleted ? (
          <>
            <div className="w-6 h-6 relative overflow-hidden">
              <CircleCheck
                className="w-6 h-6"
                stroke={step > index ? "#06BC55" : "#0EA5E9"}
              />
            </div>
            <span className="text-sm text-gray-500">{stepLabel}</span>
          </>
        ) : (
          <>
            <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center">
              <span className="text-sm text-white">{index + 1}</span>
            </div>
            <span className="text-sm text-gray-500">{stepLabel}</span>
          </>
        )}
      </li>
    );
  };

  return (
    <aside className="w-[280px] min-w-[280px] max-w-[280px] bg-white shadow-lg flex flex-col fixed left-0 top-[82px] bottom-0 z-10">
      {/* Patient Info */}
      <div className="py-5 flex flex-col items-center gap-4 px-10">
        <div className="relative w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
          <User className="w-full h-full p-2 text-gray-500" />
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="text-xs text-black">Paciente:</p>
          <p className="text-xs font-bold text-black">{user.name}</p>
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-1">
              <p className="text-xs text-black">CC:</p>
              <p className="text-xs font-bold text-zinc-900">{user.cc}</p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-xs text-black">Edad:</p>
              <p className="text-xs font-bold text-black">{user.age}</p>
            </div>
          </div>
          <div className="flex items-start gap-1">
            <p className="text-xs text-black">Eps:</p>
            <p className="text-xs font-bold text-black break-words w-full">
              {user.eps}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-5 border-t border-black overflow-y-auto px-10">
        <ul className="p-2.5 flex flex-col gap-4">
          {steps.map((_, index) => renderStep(index))}
        </ul>
      </nav>
    </aside>
  );
}
