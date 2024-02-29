import React from "react";
import Select from "react-select";

// Assuming data is an array of objects with id and name properties
const formatOptions = (data, isDiff) => {
  console.log(data, isDiff);
  return data.map((item) => ({
    value: item.id,
    label: isDiff ? item.address.name : item.name,
  }));
};

export default function SearchSelect({ loadingState, data, isDiff }) {
  if (loadingState) {
    return (
      <div className="flex-1">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          برند
        </label>
        <div className="bg-gray-50 border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <p>در حال بارگزاری</p>
        </div>
      </div>
    );
  }

  const options = formatOptions(data, isDiff);

  return (
    <div className="flex-1">
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        برند
      </label>
      <Select
        options={options}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
}
