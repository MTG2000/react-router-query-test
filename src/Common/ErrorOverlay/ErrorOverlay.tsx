import React, { ReactNode } from "react";

export default function ErrorOverlay({ children }: { children: ReactNode }) {
  return (
    <div className="bg-red-500 rounded bg-opacity-50 text-white flex flex-col justify-center items-center px-32 py-42">
      <p className="text-body1 font-bold mb-12">Oops...</p>
      <p className="text-body2">{children}</p>
    </div>
  );
}
