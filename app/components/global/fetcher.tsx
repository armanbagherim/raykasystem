import { useQuery, UseQueryResult } from "react-query";
import { getSession } from "next-auth/react";

interface FetcherParams {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown>;
}

interface FetcherReturn {
  data: unknown;
  isLoading: boolean;
  error: Error | null;
}

export const fetcher = async ({
  url,
  method,
  body,
}: FetcherParams): Promise<unknown> => {
  const session = await getSession();
  const requestOptions: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token || ""}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  };
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + url,
    requestOptions
  );
  let result = await response.json();
  if (response.ok) {
    return result;
  } else {
    let errorText;
    if (typeof result.errors === "string") {
      errorText = result.errors;
    } else {
      result.errors.map((value) => {
        errorText += value + "\n";
      });
    }
    throw new Error(errorText);
  }
};

const useFetcher = (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: Record<string, unknown>
): UseQueryResult<unknown, Error> => {
  return useQuery([url, method, body], () => fetcher({ url, method, body }), {
    staleTime: Infinity,
  });
};

export { useFetcher };
