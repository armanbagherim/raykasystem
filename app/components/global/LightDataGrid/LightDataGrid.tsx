import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_FA } from "material-react-table/locales/fa";
import { useSession } from "next-auth/react";

const LightDataGrid = ({ url, columns }) => {
  const { data: session } = useSession();

  //data and fetching state
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  //table state
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState();
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchData = async () => {
    if (!data.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }

    const urls = new URL(`${url}`, "https://nest-jahizan.chbk.run");
    urls.searchParams.set(
      "offset",
      `${pagination.pageIndex * pagination.pageSize}`
    );
    urls.searchParams.set("limit", `${pagination.pageSize}`);
    urls.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
    urls.searchParams.set("search", globalFilter ?? "");
    urls.searchParams.set("sorting", JSON.stringify(sorting ?? []));

    try {
      const response = await fetch(urls.href, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
      });
      const json = await response.json();
      setData(json.result);
      setRowCount(json.total);
    } catch (error) {
      setIsError(true);
      console.error(error);
      return;
    }
    setIsError(false);
    setIsLoading(false);
    setIsRefetching(false);
  };

  //if you want to avoid useEffect, look at the React Query example instead
  useEffect(() => {
    if (session) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    columnFilters,
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
    session,
  ]);

  const table = useMaterialReactTable({
    columns,
    enableColumnPinning: true,
    initialState: {
      expanded: true,
      showColumnFilters: false,
      columnPinning: { right: ["Actions"] },
      density: "compact",
    },
    data,
    getRowId: (row) => row.id,

    // initialState: {  }, // Disable column filters
    manualFiltering: false, // Disable manual filtering
    manualPagination: true,
    manualSorting: true,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount,
    enableRowSelection: false,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: false,
      showSkeletons: isRefetching,
      sorting,
    },
    muiBottomToolbarProps: {
      className: "bottomToolbar",
    },

    localization: MRT_Localization_FA,
  });

  return <MaterialReactTable table={table} />;
};

export default LightDataGrid;
