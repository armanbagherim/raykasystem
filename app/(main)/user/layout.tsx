import "./../../globals.scss";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import SignOutButton from "@/app/components/SignOut";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import ThemeRegistry from "./Theme";

export default async function page({ children }) {
  const session = await getServerSession(authOptions);

  if (!session?.token) {
    return redirect("/login");
  }
  return (
    <ThemeRegistry>
      <div className="container mx-auto">
        <div className="grid grid-cols-12  sm:grid-cols-12 gap-4 text-black">
          <div className="bg-white border border-gray-200 col-span-12 md:col-span-3 text-center rounded-none md:rounded-2xl text-white px-4">
            <img src="/user.png" className="mx-auto mb-7" alt="" />
            <div className="border-b pb-4 mb-7">
              <h4 className="text-right text-gray-700  text-2xl mb-3">
                {session?.result?.firstname} {session?.result?.lastname}
              </h4>
              <p className="text-gray-700 text-md font-bold text-right">
                {session?.result?.phoneNumber}
              </p>
            </div>

            <ul className="text-center p-0 gap-4 md:block">
              <li className="flex mb-8 text-gray-800">
                {" "}
                <Link className="flex" href="/user">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.07 2.82009L3.14002 8.37008C2.36002 8.99008 1.86002 10.3001 2.03002 11.2801L3.36002 19.2401C3.60002 20.6601 4.96002 21.8101 6.40002 21.8101H17.6C19.03 21.8101 20.4 20.6501 20.64 19.2401L21.97 11.2801C22.13 10.3001 21.63 8.99008 20.86 8.37008L13.93 2.8301C12.86 1.9701 11.13 1.97009 10.07 2.82009Z"
                      stroke="#20ac77"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 15.5C13.3807 15.5 14.5 14.3807 14.5 13C14.5 11.6193 13.3807 10.5 12 10.5C10.6193 10.5 9.5 11.6193 9.5 13C9.5 14.3807 10.6193 15.5 12 15.5Z"
                      stroke="#20ac77"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="mr-4">داشبورد</span>
                </Link>
              </li>

              <li className="flex mb-8 text-gray-800">
                <Link className="flex" href="/user/orders">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5L7.6 2L2 6L6.4 9L12 5Z"
                      stroke="#20ac77"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 5L16.4 2L22 6L17.6 9L12 5Z"
                      stroke="#20ac77"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 14L7.6 17L2 13L6.4 10L12 14Z"
                      stroke="#20ac77"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 14L16.4 17L22 13L17.6 10L12 14Z"
                      stroke="#20ac77"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M19 15.5V18.8L12.4 21.8C12.1 21.9 11.8 21.9 11.6 21.8L5 18.8V15.5"
                      stroke="#20ac77"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <span className="mr-4"> سفارشات</span>
                </Link>
              </li>

              {/* <li className="flex mb-8 text-gray-800">
                <Link className="flex" href="/user/profile">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                      stroke="#20ac77"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
                      stroke="#20ac77"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="mr-4"> اطلاعات کاربری</span>
                </Link>
              </li> */}

              <li className="flex mb-8 text-gray-800">
                <Link className="flex" href="/user/addresses">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.28998 7.77998V17.51C2.28998 19.41 3.63998 20.19 5.27998 19.25L7.62998 17.91C8.13998 17.62 8.98998 17.59 9.51998 17.86L14.77 20.49C15.3 20.75 16.15 20.73 16.66 20.44L20.99 17.96C21.54 17.64 22 16.86 22 16.22V6.48998C22 4.58998 20.65 3.80998 19.01 4.74998L16.66 6.08998C16.15 6.37998 15.3 6.40998 14.77 6.13998L9.51998 3.51998C8.98998 3.25998 8.13998 3.27998 7.62998 3.56998L3.29998 6.04998C2.73998 6.36998 2.28998 7.14998 2.28998 7.77998Z"
                      stroke="#20ac77"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.56 4V17"
                      stroke="#20ac77"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.73 6.62012V20.0001"
                      stroke="#20ac77"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <span className="mr-4">آدرس ها</span>
                </Link>
              </li>

              <li className="flex mb-8 text-gray-800">
                <Link className="flex" href={"/user/transactions"}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.4002 17.4201H10.8902C9.25016 17.4201 7.92016 16.0401 7.92016 14.3401C7.92016 13.9301 8.26016 13.5901 8.67016 13.5901C9.08016 13.5901 9.42016 13.9301 9.42016 14.3401C9.42016 15.2101 10.0802 15.9201 10.8902 15.9201H13.4002C14.0502 15.9201 14.5902 15.3401 14.5902 14.6401C14.5902 13.7701 14.2802 13.6001 13.7702 13.4201L9.74016 12.0001C8.96016 11.7301 7.91016 11.1501 7.91016 9.36008C7.91016 7.82008 9.12016 6.58008 10.6002 6.58008H13.1102C14.7502 6.58008 16.0802 7.96008 16.0802 9.66008C16.0802 10.0701 15.7402 10.4101 15.3302 10.4101C14.9202 10.4101 14.5802 10.0701 14.5802 9.66008C14.5802 8.79008 13.9202 8.08008 13.1102 8.08008H10.6002C9.95016 8.08008 9.41016 8.66008 9.41016 9.36008C9.41016 10.2301 9.72016 10.4001 10.2302 10.5801L14.2602 12.0001C15.0402 12.2701 16.0902 12.8501 16.0902 14.6401C16.0802 16.1701 14.8802 17.4201 13.4002 17.4201Z"
                      fill="#20ac77"
                    />
                    <path
                      d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z"
                      fill="#20ac77"
                    />
                    <path
                      d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                      fill="#20ac77"
                    />
                  </svg>

                  <span className="mr-4">تراکنش ها</span>
                </Link>
              </li>

              <li className="flex mb-8 text-gray-800">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
                    stroke="#20ac77"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 12H3.62"
                    stroke="#20ac77f"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
                    stroke="#20ac77"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="pr-4">
                  <SignOutButton hasIcon={false} />
                </span>
              </li>
            </ul>
          </div>
          <div className="md:col-span-9 col-span-12 md:p-0 p-4 ">
            {children}
          </div>
        </div>
      </div>
    </ThemeRegistry>
  );
}
