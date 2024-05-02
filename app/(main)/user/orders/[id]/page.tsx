import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import OrderDetailModule from "./OrderDetailModule";

async function getData(session, params) {
  console.log(params);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/transactions/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Orders = async ({ params }) => {
  const session = await getServerSession(authOptions);

  const data = await getData(session, params);

  return (
    <>
      <OrderDetailModule data={data} />
    </>
  );
};

export default Orders;
