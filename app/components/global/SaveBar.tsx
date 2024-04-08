import React from "react";

export default function SaveBar({ action }) {
  return (
    <div className="fixed bottom-0 left-0 px-8 py-4 bg-slate-50 border-t w-full text-left">
      <button
        onClick={action}
        className="!border-blue-700 outline-none text-blue-700 px-6 hover:bg-transparent hover:border hover:border-blue-700 hover:text-blue-700 transition-all py-2 border border-transparent rounded-xl"
      >
        ذخیره
      </button>
    </div>
  );
}
