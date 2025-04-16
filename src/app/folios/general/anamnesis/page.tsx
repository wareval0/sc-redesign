"use client";

export default function Anamnesis() {
  return (
    <>
      <div className="pt-5 flex justify-center items-center">
        <h2 className="text-black text-4xl font-medium">Anamnesis</h2>
      </div>

      <section className="flex-1 px-5 pt-10 pb-5 rounded-[10px] flex flex-col gap-6">
        {/* Reason for Visit */}
        <div className="flex flex-col gap-2">
          <h3 className="text-black text-2xl font-medium">Motivo consulta</h3>
          <div className="flex flex-col gap-2.5">
            <textarea
              className="w-full h-28 p-5 bg-white rounded-md border border-zinc-200 text-base"
              placeholder="Ingrese el motivo de la enfermedad del paciente"
            />
            <div className="flex justify-end">
              <span className="text-sm text-gray-500">0/500</span>
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
              className="w-full h-84 p-5 bg-white rounded-md border border-zinc-200 text-base"
              placeholder="Ingrese una descripción de la enfermedad del paciente"
            />
            <div className="flex justify-end">
              <span className="text-sm text-gray-500">0/2500</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
