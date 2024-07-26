"use client";
import { useFetcher } from "@/app/components/global/fetcher";
import MenuLoader from "@/app/components/global/menuLoader";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Corrected import for useRouter
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

const SideMenu = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState<Boolean>();
  const [subMenuVisibility, setSubMenuVisibility] = useState<any>({});
  const {
    data: menus,
    isLoading: menusIsLoading,
    error: menusError,
  } = useFetcher(
    `/v1/api/core/user/menus?sortOrder=ASC&ignorePaging=true&offset=0&limit=10&orderBy=id&onlyParent=true`,
    "GET"
  );

  const router = usePathname();
  const toggleSubMenu = (index: number): void => {
    setSubMenuVisibility({
      ...subMenuVisibility,
      [index]: !subMenuVisibility[index],
    });
  };

  const isActive = (path: string) => {
    return router.startsWith(path);
  };

  // Function to check if any submenu is active
  const isSubMenuActive = (subMenus: any[]) => {
    return subMenus.some((submenu) => isActive(submenu.url));
  };

  useEffect(() => {
    if (menus?.result) {
      const newSubMenuVisibility = {};
      menus.result.forEach((menu) => {
        newSubMenuVisibility[menu.id] = isSubMenuActive(menu.subMenus);
      });
      setSubMenuVisibility(newSubMenuVisibility);
    }
  }, [menus, router]);

  return (
    <div className="no-print">
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="inline-flex relative z-50 items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 xs:pt-14 right-0 z-40 w-72 h-screen transition-transform ${
          !menuOpen
            ? "-translate-x-full sm:translate-x-0 translate-x-full"
            : "transform-none"
        } `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 bg-[#20ac73] flex justify-between flex-col h-full overflow-y-auto custom-scroll">
          <div>
            <div className="flex bg-white justify-between items-center rounded-xl p-4 mb-5 border-b">
              <a
                href="https://flowbite.com/"
                className="flex items-center ps-2.5"
              >
                <img
                  src="/images/logo-admin.png"
                  className="h-6 me-3 sm:h-7"
                  alt="پنل مدیریت"
                />
              </a>
              <a href="/">
                <span className="self-center text-md font-normal whitespace-nowrap">
                  مشاهده سایت
                </span>
              </a>
            </div>
            {menusIsLoading && <MenuLoader />}
            <ul className="space-y-2 font-medium pb-8">
              {menus?.result?.map((menu, key) => (
                <li key={key}>
                  <button
                    type="button"
                    className={`flex items-center w-full p-2 text-base transition duration-75 rounded-lg group ${
                      isActive(menu.url)
                        ? "text-blue-500 bg-gray-700"
                        : "text-gray-900"
                    }`}
                    aria-controls="dropdown-example"
                    data-collapse-toggle="dropdown-example"
                    aria-expanded="true"
                    onClick={() => toggleSubMenu(menu.id)}
                  >
                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-white">
                      {menu.title}
                    </span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      ></path>
                    </svg>
                  </button>
                  <ul
                    className={`py-2 space-y-2 ${
                      subMenuVisibility[menu.id] ? "" : "hidden"
                    }`}
                  >
                    {menu.subMenus.map((submenu, key) => (
                      <li key={key}>
                        <Link href={submenu.url}>
                          <p
                            className={`flex items-center w-full px-4 py-3  text-white transition duration-75 rounded-xl pl-11 group ${
                              isActive(submenu.url)
                                ? "!text-[#20ac73] bg-white"
                                : "!text-white"
                            }`}
                          >
                            {submenu.title}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between text-white items-center">
            <span>
              <span> سلام </span>
              {session?.result?.firstname} {session?.result?.lastname}
            </span>
            <span className="cursor-pointer" onClick={() => signOut()}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M15 12H3.62"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SideMenu;
