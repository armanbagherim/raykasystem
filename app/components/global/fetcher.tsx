interface FetcherProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
}

export default function fetcher({ url, method, body }: FetcherProps): any {
  const requestOptions: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  };
  return fetch(process.env.NEXT_PUBLIC_BASE_URL + url, requestOptions)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else if (response.status >= 300 && response.status < 400) {
        throw new Error("Redirection error");
      } else {
        throw new Error("Client or Server error");
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
