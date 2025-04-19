"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AntecedentsType } from "@/modules/folios/types/AntecedentsType";
import { antecedentsSchema } from "@/modules/folios/schemas/antecedentsSchema";
import { useFolioStore, useFormNavigation } from "@/modules/folios/hooks/hooks";
import { CirclePlus, CircleCheck } from "lucide-react";

export default function AntecedentsForm() {
  const router = useRouter();
  const { antecedents, setAntecedents } = useFolioStore();
  const { step, steps, incrementStep, setSubmitCurrentForm } = useFormNavigation();

  const {
    handleSubmit,
    setValue,
    trigger,
    getValues,
    watch,
    formState: { errors },
  } = useForm<AntecedentsType>({
    resolver: zodResolver(antecedentsSchema),
    defaultValues: antecedents,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<keyof AntecedentsType | null>(null);
  const [description, setDescription] = useState("");
  const [touched, setTouched] = useState(false);

  const onSubmit = useCallback(
    (data: AntecedentsType) => {
      setAntecedents(data);
      incrementStep();
      router.push(steps[step + 1]);
    },
    [incrementStep, router, setAntecedents, step, steps]
  );

  useEffect(() => {
    setSubmitCurrentForm(() => handleSubmit(onSubmit)());
  }, [handleSubmit, onSubmit, setSubmitCurrentForm]);

  const categoryMapping: { [key: string]: keyof AntecedentsType } = {
    Nutrición: "nutrition",
    "Actividad Física": "physicalActivity",
    Hidratación: "hydration",
    Suplementos: "supplements",
    Sueño: "sleep",
    Patólogicos: "pathological",
    Farmacólogicos: "pharmacological",
    Quirúrgicos: "surgical",
    Hospitalarios: "hospitalizations",
    Tóxicos: "toxic",
    Alérgicos: "allergic",
    Inmunización: "immunization",
    Traumáticos: "traumatic",
    Ocupacionales: "occupational",
  };

  const sportsBackground = [
    "Nutrición",
    "Actividad Física",
    "Hidratación",
    "Suplementos",
    "Sueño",
  ];

  const generalBackground = [
    "Patólogicos",
    "Farmacólogicos",
    "Quirúrgicos",
    "Hospitalarios",
    "Tóxicos",
    "Alérgicos",
    "Inmunización",
    "Traumáticos",
    "Ocupacionales",
  ];

  const familyBackground = [
    "Hipertensión arterial",
    "Enfermedades cardíacas",
    "Convulsiones",
    "Trastornos mentales",
    "Cáncer",
    "Diabetes",
    "Enfermedad cerebro vascular",
    "Otro",
  ];

  const handleCategorySelect = (category: string) => {
    const fieldName = categoryMapping[category];
    setSelectedCategory(fieldName);
    setDescription(watch(fieldName) || "");
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setDescription(newValue);
    
    if (selectedCategory && touched) {
      setValue(selectedCategory, newValue, { shouldValidate: true });
      trigger(selectedCategory);
    }
  };

  const handleAddDescription = async () => {
    if (!selectedCategory || description.trim() === "") return;
    setValue(selectedCategory, description.trim(), { shouldValidate: true });
    const isValid = await trigger(selectedCategory);
    setTouched(true);

    if (isValid) {
      setAntecedents({
        ...antecedents,
        [selectedCategory]: description.trim(),
      });
      setSelectedCategory(null);
      setDescription("");
      setTouched(false);
    }
  };

  const handleRemoveDescription = async () => {
    if (!selectedCategory) return;
    setValue(selectedCategory, "", { shouldValidate: true });
    await trigger(selectedCategory);
    setAntecedents(getValues());
    setSelectedCategory(null);
    setDescription("");
    setTouched(false);
  };

  const getCategoryLabel = (field: keyof AntecedentsType): string => {
    const reversedMapping = Object.entries(categoryMapping).reduce((acc, [label, key]) => {
      acc[key] = label;
      return acc;
    }, {} as Record<keyof AntecedentsType, string>);
  
    return reversedMapping[field] || "";
  };
  

  const renderCategoryItem = (category: string) => {
    const fieldName = categoryMapping[category];
    const savedDescription = antecedents[fieldName];
    const isSelected = selectedCategory === fieldName;
    const hasSavedDescription = !!savedDescription && savedDescription.trim().length > 0;
  
    const bgColor = hasSavedDescription? "bg-green-500" : isSelected ? "bg-sky-500" : "bg-white";
    let textColor = "text-gray-900";
    let borderColor = "border border-stone-300";

    if (hasSavedDescription || isSelected) {
      textColor = "text-white";
      borderColor = "";
    }
  
    return (
      <button
        type="button"
        onClick={() => handleCategorySelect(category)}
        className={`w-full px-4 py-3 rounded-md shadow-sm flex items-center gap-2 transition-colors ${bgColor} ${textColor} ${borderColor}`}
      >
        <div className="w-5 h-5 relative">
          {hasSavedDescription 
            ? <CircleCheck className={`w-5 h-5 ${textColor}`} />
            : <CirclePlus className={`w-5 h-5 ${textColor}`} />
          }
        </div>
        <span className="text-base z-10">{category}</span>
      </button>
    );
  };

  return (
    <form>
      <div className="pt-5 flex justify-center items-center">
        <h2 className="text-black text-4xl font-medium">Antecedentes</h2>
      </div>

      <section className="flex-1 px-5 pt-10 pb-5 rounded-[10px] flex flex-col gap-6">
        {/* Previous section with tags */}
        <div className="w-full flex flex-col gap-2">
            <h3 className="text-black text-2xl font-medium">Previos</h3>
            <div className="w-full p-5 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-wrap gap-2">
              {[
                "Quirúrgicos",
                "Patológicos",
                "Farmacológicos",
                "Alérgicos",
              ].map((tag) => (
                <button
                  key={tag}
                  className="px-2.5 py-[3px] rounded-sm text-xs font-medium transition-colors bg-gray-200 text-gray-700"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

        {/* Two column layout */}
        <div className="h-[500px] w-full flex flex-col md:flex-row gap-5">
          {/* Left column - Categories */}
          <div className="w-full md:w-96 p-5 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col gap-5 overflow-y-auto">
            <div className="flex flex-col gap-5">
              <h3 className="text-black text-2xl font-medium">Antecedentes Deportivos</h3>
              <div className="flex flex-col gap-3">
                {sportsBackground.map((category, index) => (
                  <div key={`sports-${index}`}>{renderCategoryItem(category)}</div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="text-black text-2xl font-medium">Antecedentes Generales</h3>
              <div className="flex flex-col gap-3">
                {generalBackground.map((category, index) => (
                  <div key={`general-${index}`}>{renderCategoryItem(category)}</div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="text-black text-2xl font-medium">Antecedentes Familiares</h3>
              <div className="flex flex-col gap-3">
                {familyBackground.map((category, index) => (
                  <div key={`family-${index}`}>{renderCategoryItem(category)}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Textarea */}
          <div className="w-full flex-1 flex flex-col gap-2.5">
            <div
              className={`w-full h-[500px] p-5 bg-white rounded-md border border-zinc-200 flex flex-col justify-between ${
                selectedCategory ? "cursor-text" : "cursor-not-allowed"
              }`}
              onClick={(e) => {
                if (!selectedCategory) return;
                if (e.target instanceof HTMLElement && e.target.tagName !== "BUTTON") {
                  textareaRef.current?.focus();
                }
              }}
            >
              <textarea
                ref={textareaRef}
                value={description}
                onChange={handleDescriptionChange}
                disabled={!selectedCategory}
                className="w-full flex-grow resize-none bg-transparent outline-none text-gray-800 placeholder-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed"
                placeholder={
                  selectedCategory
                    ? `Describe los antecedentes (de) ${getCategoryLabel(selectedCategory)}...`
                    : "Seleccione una categoría"
                }
                maxLength={500}
              />

              <div className="flex justify-end items-end h-auto pt-1 gap-2">
                {selectedCategory && antecedents[selectedCategory] && (
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
                  className="w-24 py-3 bg-sky-500 text-white rounded-lg disabled:bg-gray-300"
                  disabled={!selectedCategory || description.trim() === ""}
                >
                  {selectedCategory && antecedents[selectedCategory] ? "Actualizar" : "Añadir"}
                </button>
              </div>
            </div>

            <div className="w-full flex justify-between items-center">
              <div className="flex-1">
                {selectedCategory && touched && errors[selectedCategory]?.message && (
                  <span className="text-red-500 text-sm">
                    {errors[selectedCategory]?.message}
                  </span>
                )}
              </div>

              <div>
                {selectedCategory && (
                  <span className="text-sm text-gray-500">{description.length}/500</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}
