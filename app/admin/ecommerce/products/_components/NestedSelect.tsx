import React from "react";

const NestedSelect = ({ data, selected, onChange, depth = 0 }) => {
  const renderOptions = (items, depth) => {
    return items.map((item, index) => {
      const prefix = "--".repeat(depth);
      return (
        <>
          <option
            selected={selected === item.id ? "selected" : ""}
            key={item.id}
            value={item.id}
          >
            {prefix + item.name}
          </option>
          {item.subEntityTypes && renderOptions(item.subEntityTypes, depth + 1)}
        </>
      );
    });
  };

  return (
    <div>
      <label
        for="first_name"
        class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
      >
        دسته بندی
      </label>
      <select
        className="bg-transparent  border-b mb-6 border-gray-400 text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={onChange}
        value={undefined}
      >
        {renderOptions(data, depth)}
      </select>
    </div>
  );
};

export default NestedSelect;
