import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { setInitialState } from "./features/cartSlice";
import { getCookie } from "cookies-next";

async function fetchTotalCount() {
  const cookie = getCookie("SessionName");
  console.log("areeeeeeeeeeeeeeeee", cookie);
  try {
    const response = await fetch(
      "https://nest-jahizan.chbk.run/v1/api/ecommerce/user/stocks/count",
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
    console.log("hiiiiiiiiiiiii", data);
    return data.result; // Assuming the response has a 'total' property
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    return 0; // Return a default value in case of error
  }
}

export const fetchAndSetInitialState = () => async (dispatch) => {
  const totalCount = await fetchTotalCount();
  console.log("totaaaaaaaaaaaaaaaaaaaaaal", totalCount);
  dispatch(setInitialState(totalCount));
};
