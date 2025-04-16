"use client";

import { User } from "lucide-react";

export default function SystemsReview() {
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

  const renderSystemIcon = (name: string) => (
    <div className="flex flex-col items-center gap-3">
      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
        <User className="w-8 h-8 text-white" />
      </div>
      <p className="text-center text-gray-800 text-base">{name}</p>
    </div>
  );

  return (
    <>
      <div className="pt-5 flex justify-center items-center">
        <h2 className="text-black text-4xl font-medium">
          Revisión por Sistemas
        </h2>
      </div>

      <section className="flex-1 px-5 pt-10 pb-5 rounded-[10px] flex flex-col justify-between">
        {/* System icons grid */}
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

        {/* Text input area */}
        <div className="w-full mt-8 flex flex-col gap-2.5">
          <div className="w-full">
          <div className="w-full h-70 p-5 bg-white rounded-md border border-zinc-200 flex items-start gap-4">
  <textarea
    className="w-full h-70 resize-none bg-transparent outline-none text-gray-800 placeholder-gray-400"
    placeholder="Agregar anormalidad en..."
    maxLength={500}
  />
  <div className="w-24 flex items-end h-full shrink-0">
    <button className="w-full px-4 py-2 bg-sky-500 text-white rounded-lg">
      Añadir
    </button>
  </div>
</div>

          </div>
          <div className="flex justify-end">
            <span className="text-sm text-gray-500">0/500</span>
          </div>
        </div>
      </section>
    </>
  );
}
