"use client";

import SideMenu from "./components/SideMenu";
import "./../globals.scss";
import { useAtom } from "jotai";
import { pageTitle } from "./layout";
import Link from "next/link";

export default function Template({ children }: { children: React.ReactNode }) {
  const [atom] = useAtom(pageTitle);
  return (
    <div>
      <SideMenu />
      <div className="p-4 sm:mr-64">
        <div className="flex justify-between px-3 mb-5 items-center h-16 bg-gray-100 py-2 rounded-2xl pl-2">
          <div className="text-lg font-bold">{atom.title}</div>
          {atom.link !== "" ? (
            <Link href={atom.link}>
              <button className="bg-blue-700 text-white px-6 hover:bg-transparent hover:border hover:border-blue-700 hover:text-blue-700 transition-all py-3 border border-transparent rounded-xl">
                {atom.buttonTitle}
              </button>
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="mb-16">
        {children}
        </div>
        
      </div>
    </div>
  );
}
