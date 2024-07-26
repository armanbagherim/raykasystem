import React from "react";

const Tab = ({ activeTab, tabName, tabId, setActiveTab }) => (
  <li className="-mb-px mr-2 first:mr-0 flex-auto text-center">
    <a
      className={
        "text-sm uppercase px-5 py-3 border border-gray-200 rounded-lg block leading-normal " +
        (activeTab === tabId
          ? "text-white bg-[#20ac73]"
          : "text-[#20ac73] bg-white")
      }
      onClick={(e) => {
        e.preventDefault();
        setActiveTab(tabId);
      }}
      data-toggle="tab"
      href={`#link${tabId}`}
      role="tablist"
    >
      {tabName}
    </a>
  </li>
);

export default Tab;
