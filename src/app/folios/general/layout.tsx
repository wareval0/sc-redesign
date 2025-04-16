"use client";
import { User, CircleCheck } from "lucide-react";

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-white">
        {/* Header/Navbar */}
        <header className="w-full bg-gray-800 shadow-md py-4 px-10 flex justify-between items-center">
          <h1 className="text-white text-4xl font-medium">Historia Clínica</h1>
          <div className="flex items-center gap-5">
            <button className="px-7 py-3 bg-sky-500 text-white rounded-lg">
              Guardar Historia
            </button>
            <button className="px-7 py-3 bg-white text-gray-800 rounded-lg border border-gray-800/10">
              Cerrar Historia
            </button>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-[280px] min-w-[280px] max-w-[280px] flex-shrink-0 bg-white shadow-lg flex flex-col px-10">
            {/* Patient Info */}
            <div className="py-5 flex flex-col items-center gap-4">
              <div className="relative w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                <User className="w-full h-full p-2 text-gray-500" />
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="text-xs text-black">Paciente: </p>
                <p className="text-xs font-bold text-black">
                  Wilmer Manuel Arévalo González
                </p>
                <div className="w-full flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <p className="text-xs text-black">CC:</p>
                    <p className="text-xs font-bold text-zinc-900">
                      1069718999
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-xs text-black">Edad:</p>
                    <p className="text-xs font-bold text-black">19</p>
                  </div>
                </div>
                <div className="flex items-start gap-1">
                  <p className="text-xs text-black">Eps:</p>
                  <p className="text-xs font-bold text-black break-words w-full">
                    E.P.S. FAMISANAR LTDA.
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 py-5 border-t border-black overflow-y-auto">
              <ul className="p-2.5 flex flex-col gap-4">
                <li className="flex items-center gap-2.5">
                  <div className="w-6 h-6 relative overflow-hidden">
                    <CircleCheck className="w-6 h-6 text-sky-500" />
                  </div>
                  <span className="text-sm text-gray-500">Anamnesis</span>
                </li>
                {[
                  "Revisión por Sistemas",
                  "Antecedentes",
                  "Ginecología",
                  "Examen Físico",
                  "Diagnóstico",
                  "Fórmula",
                  "Examenes Médicos",
                  "Orden Médica",
                  "Nota Médica",
                  "Incapacidad",
                  "Resumen",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2.5">
                    <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center">
                      <span className="text-sm text-white">{index + 2}</span>
                    </div>
                    <span className="text-sm text-gray-500">{item}</span>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col relative">
            <div className="flex-1 overflow-y-auto bg-gray-50 shadow-md pb-24">
              <div className="max-w-5xl mx-auto px-10 py-5 flex flex-col gap-3">
                {children}
              </div>
            </div>

            <footer className="w-full px-10 py-4 bg-white border-t border-slate-100 flex justify-end items-center gap-5 absolute bottom-0 left-0">
              <button className="w-28 px-7 py-3 bg-white text-gray-800 rounded-lg shadow-md border border-gray-100">
                Atrás
              </button>
              <button className="w-28 px-7 py-3 bg-sky-500 text-white rounded-lg shadow-md">
                Siguiente
              </button>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
