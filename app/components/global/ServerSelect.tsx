import React from "react";
import AsyncSelect from "react-select/async";
import { useSession } from "next-auth/react";

const ServerSelect = ({ type, init, setRequestBody, requestBody }) => {
  const { data: session } = useSession();

  // Transform the data prop to match the expected format
  const initialData = init?.result.map((item) => ({
    label: item.value,
    value: item.key,
  }));

  const loadOptions = async (inputValue, callback) => {
    const response = await fetch(
      `https://nest-jahizan.chbk.run/v1/api/ecommerce/admin/discountConditionValues?conditionTypeId=${type}&orderBy=id&search=${encodeURIComponent(
        inputValue
      )}`,
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );
    const data = await response.json();
    const transformedData = data.result.map((item) => ({
      label: item.value,
      value: item.key,
    }));
    callback(transformedData);
  };

  const handleChange = (selectedOption) => {
    setRequestBody({ ...requestBody, conditionValue: selectedOption.value });
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      onChange={handleChange}
      placeholder="Search..."
      defaultValue={initialData} // Set the initial data
    />
  );
};

export default ServerSelect;
