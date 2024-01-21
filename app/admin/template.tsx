import React from "react";
import SideMenu from "./components/SideMenu";
import "./../globals.scss";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SideMenu />
      <div className="p-4 sm:mr-64">
        <div className="flex justify-between px-3 mb-5 items-center bg-gray-100 py-2 rounded-2xl pl-2">
          <div className="text-lg font-bold">داشبورد</div>
          <button className="bg-blue-700 text-white px-6 hover:bg-transparent hover:border hover:border-blue-700 hover:text-blue-700 transition-all py-3 border border-transparent rounded-xl">
            افزودن محصول
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
