import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import UserNotificationsModule from "./UserNotificationsModule";

async function getData(session) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/notifications`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const UserComments = async () => {
  const session = await getServerSession(authOptions);
  const data = await getData(session);

  return (
    <>
      <UserNotificationsModule data={data} />
    </>
  );
};

export default UserComments;
