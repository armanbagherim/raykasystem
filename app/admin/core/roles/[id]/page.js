"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useFetcher, fetcher } from "@/app/components/global/fetcher";
import Loading from "./../../../../components/global/loading";
import { useAtom } from "jotai";
import { pageTitle } from "../../../layout";

export default function Page({ params }) {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "ویرایش نقش",
      buttonTitle: "",
      link: "",
    });
  }, []);
  const router = useRouter();

  const {
    data: role,
    isLoading: roleLoading,
    error: roleError,
  } = useFetcher(`/v1/api/core/admin/roles/${params.id}`, "GET");
  const {
    data: permissions,
    isLoading: permissionsLoading,
    error: permissionsError,
  } = useFetcher(
    `/v1/api/core/admin/permissionGroups?sortOrder=ASC&offset=0&limit=10&orderBy=id&ignorePaging=true`,
    "GET"
  );
  const [checkedPermissions, setCheckedPermissions] = useState([]);
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    if (role) {
      setRoleName(role.result.roleName);
      setCheckedPermissions(
        role.result.permissions.map((permission) => permission.id)
      );
    }
  }, [role]);

  const isPermissionChecked = (permissionId) => {
    return checkedPermissions.includes(permissionId);
  };

  const saveRole = async () => {
    try {
      await fetcher({
        url: `/v1/api/core/admin/roles/${params.id}`,
        method: "PUT",
        body: {
          roleName,
          permissions: checkedPermissions,
        },
      });
      toast.success("موفق");
      setTimeout(() => {
        router.push("/admin/core/roles");
      }, 2000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePermissionChange = (permissionId) => {
    const updatedPermissions = [...checkedPermissions];
    if (updatedPermissions.includes(permissionId)) {
      const index = updatedPermissions.indexOf(permissionId);
      updatedPermissions.splice(index, 1);
    } else {
      updatedPermissions.push(permissionId);
    }
    setCheckedPermissions(updatedPermissions);
  };
  if (roleLoading || permissionsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        نام نقش
      </label>
      <input
        type="text"
        id="first_name"
        className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="John"
        required
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
      />
      {permissions.result.map((group, key) => (
        <div key={key}>
          <div className="bg-gray-200 p-5 rounded-xl">
            {group.permissionGroupName}
          </div>
          <div className="px-5 py-6">
            {group.permissions.map((permission, key) => (
              <div key={key}>
                {permission.permissionName}
                <input
                  type="checkbox"
                  checked={isPermissionChecked(permission.id)}
                  onChange={() => handlePermissionChange(permission.id)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={saveRole}
        className="bg-blue-700 text-white px-6 hover:bg-transparent hover:border hover:border-blue-700 hover:text-blue-700 transition-all py-3 border border-transparent rounded-xl"
      >
        ویرایش نقش
      </button>
    </div>
  );
}
