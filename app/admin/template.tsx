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
      <div className=" sm:mr-72 print:p-0 print:m-0 print:w-full print:mr-0">
        <div className="flex justify-between  items-center h-20 bg-[#008d54] px-4 no-print">
          <div className="text-lg font-bold text-white">{atom.title}</div>
          {atom.link !== "" ? (
            <Link href={atom.link}>
              <button className="bg-white text-[#008d54] px-8 hover:bg-transparent hover:border hover:border-white hover:text-white transition-all py-3 border border-transparent rounded-2xl">
                {atom.buttonTitle}
              </button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="p-4 pb-36 sm:mr-72 print:p-0 print:m-0 print:w-full print:mr-0 ">
        <div className="mb-16">{children}</div>
      </div>
    </div>
  );
}
