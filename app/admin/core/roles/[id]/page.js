"use client";
import React, { useEffect, useState } from "react";

export default function Page({ params }) {
  const [role, setRole] = useState();
  const [permissions, setPermissions] = useState();

  const getRole = () => {
    fetch(
      `https://nest-jahizan.chbk.run/v1/api/core/admin/roles/${params.id}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzA2MTQzMzE4fQ.p7S_aJ1DoRgCISsQMgmm0LLkxq7bD1N7FZr3poQNV7c",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setRole(data.result));
  };

  const getPermissions = () => {
    fetch(
      `https://nest-jahizan.chbk.run/v1/api/core/admin/permissionGroups?sortOrder=ASC&offset=0&limit=10&orderBy=id&ignorePaging=true`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzA2MTQzMzE4fQ.p7S_aJ1DoRgCISsQMgmm0LLkxq7bD1N7FZr3poQNV7c",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setPermissions(data.result));
  };

  useEffect(() => {
    getRole();
    getPermissions();
  }, []);

  const isPermissionChecked = (permissionName) => {
    return (
      role && role.permissions && role.permissions.includes(permissionName)
    );
  };

  return (
    permissions && (
      <div>
        {permissions.map((group, key) => (
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
                    checked={isPermissionChecked(permission.permissionName)}
                    readOnly
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  );
}
