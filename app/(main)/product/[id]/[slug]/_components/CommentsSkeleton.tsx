import React from "react";

export default function CommentsSkeleton({ count }) {
  return (
    <div>
      {Array.from(Array(count), (_, i) => (
        <div key={i} className="border-0 w-full rounded-xl mt-5">
          <>
            <div className="border w-full rounded-3xl m-2 p-6">
              <div className="flex gap-4 flex-wrap">
                <div className="text-md items-center my-auto">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                </div>
                <span className="items-center my-auto">|</span>
                <div className="text-md items-center my-auto">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div className="mt-6 mb-2 text-sm text-slate-500 leading-6 border-b border-b-gray-200 pb-4">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                </div>
                <div className="w-full md:w-1/2" dir="ltr">
                  <div>
                    <p className="my-4 text-right">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    </p>
                    <div className="score w-full flex rounded">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      ))}
    </div>
  );
}
