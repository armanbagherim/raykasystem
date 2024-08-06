import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import UserCommentsModule from "./UserCommentsModule";

async function getData(session) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/comments`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const UserComments = async () => {
  const session = await getServerSession(authOptions);

  const data = await getData(session);
  return (
    <>
      <UserCommentsModule data={data} />
    </>
  );
};

export default UserComments;
