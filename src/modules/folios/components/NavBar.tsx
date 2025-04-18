"use client";

export function NavBar() {
  return (
    <>
      <header className="w-full bg-gray-800 shadow-md py-4 px-10 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
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
    </>
  );
}
