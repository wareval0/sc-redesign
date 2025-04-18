"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnamnesisType } from "@/modules/folios/types/AnamnesisType";
import { anamnesisSchema } from "@/modules/folios/schemas/anamnesisSchema";
import { useFolioStore, useFormNavigation } from "@/modules/folios/hooks/hooks";

export default function AnamnesisForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AnamnesisType>({
    resolver: zodResolver(anamnesisSchema),
  });

  const watchMotive = watch("motive") || "";
  const watchDescription = watch("description") || "";

  const { anamnesis, setAnamnesis } = useFolioStore();
  const { step, steps, incrementStep, setSubmitCurrentForm } =
    useFormNavigation();

  const onSubmit = useCallback(
    (data: AnamnesisType) => {
      setAnamnesis(data);
      incrementStep();
      router.push(steps[step + 1]);
    },
    [incrementStep, router, setAnamnesis, step, steps]
  );

  useEffect(() => {
    if (anamnesis) {
      setValue("motive", anamnesis.motive);
      setValue("description", anamnesis.description);
    }
    setSubmitCurrentForm(() => handleSubmit(onSubmit)());
  }, [anamnesis, handleSubmit, onSubmit, setSubmitCurrentForm, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pt-5 flex justify-center items-center">
          <h2 className="text-black text-4xl font-medium">Anamnesis</h2>
        </div>

        <section className="flex-1 px-5 pt-10 pb-5 rounded-[10px] flex flex-col gap-6">
          {/* Reason for Visit */}
          <div className="flex flex-col gap-2">
            <h3 className="text-black text-2xl font-medium">Motivo consulta</h3>
            <div className="flex flex-col gap-2.5">
              <textarea
                className="w-full h-56 p-5 bg-white rounded-md border border-zinc-200 text-base"
                placeholder="Ingrese el motivo de la enfermedad del paciente"
                maxLength={500}
                {...register("motive")}
              />
              <div className="flex justify-between">
                <span className="text-red-500 text-sm">
                  {errors.motive?.message}
                </span>

                <span className="text-sm text-gray-500">
                  {watchMotive.length}/500
                </span>
              </div>
            </div>
          </div>

          {/* Disease Description */}
          <div className="flex flex-col gap-2">
            <h3 className="text-gray-900 text-2xl font-medium">
              Descripción enfermedad
            </h3>
            <div className="flex flex-col gap-2.5">
              <textarea
                className="w-full h-56 p-5 bg-white rounded-md border border-zinc-200 text-base"
                placeholder="Ingrese una descripción de la enfermedad del paciente"
                maxLength={2500}
                {...register("description")}
              />
              <div className="flex justify-between">
                <span className="text-red-500 text-sm">
                  {errors.description?.message}
                </span>
                <span className="text-sm text-gray-500">
                  {watchDescription.length}/2500
                </span>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}
