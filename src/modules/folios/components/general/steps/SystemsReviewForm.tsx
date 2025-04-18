"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SystemsReviewType } from "@/modules/folios/types/SystemsReviewType";
import { systemsReviewSchema } from "@/modules/folios/schemas/systemsReviewSchema";
import { useFolioStore, useFormNavigation } from "@/modules/folios/hooks/hooks";
import { User } from "lucide-react";

export default function SystemsReviewForm() {
  const { systemsReview, setSystemsReview } = useFolioStore();
  const { incrementStep, setSubmitCurrentForm } = useFormNavigation();

  const {
    handleSubmit,
    setValue,
    trigger,
    getValues,
    watch,
    formState: { errors },
  } = useForm<SystemsReviewType>({
    resolver: zodResolver(systemsReviewSchema),
    defaultValues: systemsReview,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedSystem, setSelectedSystem] = useState<keyof SystemsReviewType | null>(null);
  const [description, setDescription] = useState("");
  const [touched, setTouched] = useState(false);

  const onSubmit = useCallback(
    (data: SystemsReviewType) => {
      setSystemsReview(data);
      incrementStep();
    },
    [incrementStep, setSystemsReview]
  );

  useEffect(() => {
    setSubmitCurrentForm(() => handleSubmit(onSubmit)());
  }, [handleSubmit, onSubmit, setSubmitCurrentForm]);

  const systemsMapping: { [key: string]: keyof SystemsReviewType } = {
    "Piel y faneras": "integuementarySystem",
    Osteoarticular: "musculoskeletalSystem",
    Respiratorio: "respiratorySystem",
    Cardiovascular: "cardiovascularSystem",
    Digestivo: "digestiveSystem",
    Urinario: "urinarySystem",
    Endocrino: "endocrineSystem",
    Genital: "reproductiveSystem",
    Neurologico: "nervousSystem",
    Sanguíneo: "hematologicSystem",
    Mental: "mentalHealth",
    "Organos de los sentidos": "sensoryOrgans",
  };

  const systemsRow1 = [
    "Piel y faneras",
    "Osteoarticular",
    "Respiratorio",
    "Cardiovascular",
    "Digestivo",
    "Urinario",
  ];
  const systemsRow2 = [
    "Endocrino",
    "Genital",
    "Neurologico",
    "Sanguíneo",
    "Mental",
    "Organos de los sentidos",
  ];

  const handleSystemSelect = (system: string) => {
    const fieldName = systemsMapping[system];
    setSelectedSystem(fieldName);
    setDescription(watch(fieldName) || "");
    setTouched(false);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const handleDescriptionChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    setDescription(newValue);

    if (selectedSystem && touched) {
      setValue(selectedSystem, newValue, { shouldValidate: true });
      await trigger(selectedSystem);
    }
  };

  const handleAddDescription = async () => {
    if (selectedSystem && description.trim() !== "") {
      setValue(selectedSystem, description.trim(), { shouldValidate: true });
      const isValid = await trigger(selectedSystem);
      setTouched(true);

      if (isValid) {
        setSystemsReview({
          ...systemsReview,
          [selectedSystem]: description.trim(),
        });

        setSelectedSystem(null);
        setDescription("");
        setTouched(false);
      }
    }
  };

  const handleRemoveDescription = async () => {
    if (!selectedSystem) return;
    setValue(selectedSystem, "", { shouldValidate: true });
    await trigger(selectedSystem);
    setSystemsReview(getValues());
    setSelectedSystem(null);
    setDescription("");
    setTouched(false);
  };

  const renderSystemIcon = (name: string) => {
    const fieldName = systemsMapping[name];
    const savedDescription = systemsReview[fieldName];
    const hasValidDescription = !!savedDescription && savedDescription.trim().length > 0;
    const isSelected = selectedSystem === fieldName;

    let colorClass = "bg-gray-300";
    if (hasValidDescription) colorClass = "bg-green-500";
    if (isSelected) colorClass = "bg-sky-500";

    return (
      <button
        type="button"
        onClick={() => handleSystemSelect(name)}
        className="flex flex-col items-center gap-3"
      >
        <div
          className={`w-16 h-16 ${colorClass} rounded-full flex items-center justify-center`}
        >
          <User className="w-8 h-8 text-white" />
        </div>
        <p className="text-center text-gray-800 text-base">{name}</p>
      </button>
    );
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="pt-5 flex justify-center items-center">
          <h2 className="text-black text-4xl font-medium">
            Revisión por Sistemas
          </h2>
        </div>

        <section className="flex-1 px-5 pt-10 pb-5 rounded-[10px] flex flex-col justify-start">
          {/* Grid */}
          <div className="flex flex-col gap-14">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {systemsRow1.map((system, index) => (
                <div key={`system1-${index}`} className="flex justify-center">
                  {renderSystemIcon(system)}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {systemsRow2.map((system, index) => (
                <div key={`system2-${index}`} className="flex justify-center">
                  {renderSystemIcon(system)}
                </div>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <div className="w-full mt-8 flex flex-col gap-2.5">
            <div className="w-full">
              <div
                className={`w-full h-80 p-5 bg-white rounded-md border border-zinc-200 flex flex-col justify-between items-end ${
                  selectedSystem ? "cursor-text" : "cursor-not-allowed"
                }`}
                onClick={(e) => {
                  if (!selectedSystem) return;
                  if (
                    e.target instanceof HTMLElement &&
                    e.target.tagName !== "BUTTON"
                  ) {
                    textareaRef.current?.focus();
                  }
                }}
              >
                <textarea
                  ref={textareaRef}
                  value={description}
                  onChange={handleDescriptionChange}
                  disabled={!selectedSystem}
                  className="w-full flex-grow resize-none bg-transparent outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed"
                  placeholder={
                    selectedSystem
                      ? "Describe la anormalidad..."
                      : "Seleccione un sistema primero"
                  }
                  maxLength={500}
                />
                <div className="flex justify-between items-end h-auto pt-1 gap-2">
                  {selectedSystem && systemsReview[selectedSystem] && (
                    <button
                      type="button"
                      onClick={handleRemoveDescription}
                      className="w-24 py-3 bg-red-500 text-white rounded-lg disabled:bg-gray-300"
                    >
                      Quitar
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleAddDescription}
                    className="flex-1 w-24 py-3 bg-sky-500 text-white rounded-lg disabled:bg-gray-300"
                    disabled={!selectedSystem || description.trim() === ""}
                  >
                    {selectedSystem && systemsReview[selectedSystem]
                      ? "Actualizar"
                      : "Añadir"}
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between items-center">
              <div className="flex-1">
                {selectedSystem &&
                  touched &&
                  errors[selectedSystem]?.message && (
                    <span className="text-red-500 text-sm">
                      {errors[selectedSystem]?.message}
                    </span>
                  )}
              </div>

              <div>
                {selectedSystem && (
                  <span className="text-sm text-gray-500">
                    {description.length}/500
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}
