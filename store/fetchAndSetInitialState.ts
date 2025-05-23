import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { setInitialState } from "./features/cartSlice";
import { getCookie } from "cookies-next";

async function fetchTotalCount() {
  const cookie = getCookie("SessionName");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/stocks/count`,
      {
        method: "GET",
        headers: {
          "x-session-id": cookie,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data.result; // Assuming the response has a 'total' property
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    return 0; // Return a default value in case of error
  }
}

export const fetchAndSetInitialState = () => async (dispatch) => {
  const totalCount = await fetchTotalCount();

  dispatch(setInitialState(totalCount));
};
