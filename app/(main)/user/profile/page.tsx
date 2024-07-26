import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import UserProfileModule from "./UserProfileModule";
import { SessionProvider } from "next-auth/react";
import ProfileGuard from "./ProfileGuard";

const Profile = async () => {
  const { result: user } = await getServerSession(authOptions);

  return <ProfileGuard user={user} />;
};

export default Profile;
