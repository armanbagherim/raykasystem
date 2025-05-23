"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import ReactPaginate from "react-paginate";
import ClientLoading from "../../global/ClientLoading";

const Numberpaginate = ({ items }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [forcePage, setForcePage] = useState(0);

  useEffect(() => {
    const offset = searchParams.get("offset");

    if (offset === "0") {
      setItemOffset(0);
      setForcePage(0); // Update the forcePage state to 0
    }
  }, [searchParams]);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + 12;

  const currentItems = items?.result?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.total / 12);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 12) % items.total;

    if (newOffset === 0) {
      setItemOffset(0);
    } else {
      setItemOffset(newOffset);
    }

    // Navigation and scrolling logic
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete("offset");
    current.set("offset", newOffset.toString());
    const query = current.toString() ? `?${current.toString()}` : "";
    startTransition(() => {
      router.push(`${pathname}${query}`);
    });

    window.scrollTo({ top: 250, behavior: "smooth" });
  };

  return (
    <>
      {isPending && (
        <div className="bg-[#fffffff0] fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <ClientLoading />
        </div>
      )}
      <div className="px-4">
        <ReactPaginate
          breakLabel="..."
          className="flex items-center justify-start direction-ltr mt-8 whitespace-nowrap overflow-x-auto"
          nextLabel="بعدی"
          activeLinkClassName="bg-primary outline-none"
          pageLinkClassName="bg-[#B8B8B8] outline-none w-[37px] h-[37px] flex items-center justify-center rounded-[15px] mx-2 text-white"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          forcePage={forcePage}
          previousLabel="قبلی"
          renderOnZeroPageCount={null}
          disabledClassName="hidden" // Add this prop
        />
      </div>
    </>
  );
};

export default Numberpaginate;
