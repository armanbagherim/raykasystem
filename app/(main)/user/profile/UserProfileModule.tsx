"use client";
import { fetcher } from "@/app/components/global/fetcher";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { toast } from "react-toastify";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
export default function UserProfileModule({ user }) {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [userDataLocal, setUserDataLocal] = useState(user);
  console.log(userDataLocal);
  const pathname = usePathname();

  const updadeUser = async () => {
    try {
      const req = await fetcher({
        url: `/v1/api/core/user/profile`,
        method: "PUT",
        body: {
          firstname: userDataLocal.firstname,
          lastname: userDataLocal.lastname,
          birthDate: userDataLocal.birthDate,
        },
      });

      toast.success("موفق");
      update({
        ...user,
        result: {
          firstname: userDataLocal.firstname,
          lastname: userDataLocal.lastname,
          username: userDataLocal.username,
          phoneNumber: userDataLocal.phoneNumber,
          birthDate: userDataLocal.birthDate,
        },
      });
      setTimeout(function () {
        location.reload();
      }, 200);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <>
        <div className="md:col-span-3 shadow-md border  border-customGray bg-white text-sm rounded-3xl p-4 pb-10">
          <div className="grid grid-cols-3 gap-5 mt-5">
            <div>
              <input
                id="userfirstname"
                className="col-span-1 w-full p-2 text-gray-700 bg-[#F8F8F8]  rounded-2xl py-4 border border-gray-200 px-4 mb-3 focus:outline-none"
                type="text"
                placeholder="نام"
                value={userDataLocal.firstname}
                onChange={(e) =>
                  setUserDataLocal({
                    ...userDataLocal,
                    firstname: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <input
                id="userlastname"
                className="col-span-1 w-full p-2 text-gray-700 bg-[#F8F8F8]  rounded-2xl py-4 border border-gray-200 px-4 mb-3 focus:outline-none "
                type="text"
                value={userDataLocal.lastname}
                placeholder="نام خانوادگی"
                onChange={(e) =>
                  setUserDataLocal({
                    ...userDataLocal,
                    lastname: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <input
                disabled
                id="userMobile"
                className="col-span-1 w-full p-2 text-gray-700 bg-[#F8F8F8]  rounded-2xl py-4 border border-gray-200 px-4 mb-3 focus:outline-none"
                type="text"
                value={user?.phoneNumber}
                placeholder="موبایل"
              />
            </div>
            <DatePicker
              format="MM/DD/YYYY HH:mm:ss"
              calendar={persian}
              value={userDataLocal.birthDate}
              onOpenPickNewDate={false}
              locale={persian_fa}
              inputClass="w-full  text-gray-700 bg-[#F8F8F8]  rounded-2xl py-4 border border-gray-200 px-4 mb-3 focus:outline-none"
              containerClassName="w-full"
              onClose={() =>
                setUserDataLocal({
                  ...userDataLocal,
                  birthDate: null,
                })
              }
              onFocusedDateChange={(dateFocused, dateClicked) => {
                setUserDataLocal({
                  ...userDataLocal,
                  birthDate: dateClicked.toDate().toISOString(),
                });
              }}
            ></DatePicker>
          </div>
          <div className="text-left">
            <button
              onClick={updadeUser}
              className="bg-primary p-4 rounded-2xl text-white"
            >
              ذخیره اطلاعات
            </button>
          </div>
        </div>
      </>
    </div>
  );
}
