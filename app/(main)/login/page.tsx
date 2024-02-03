import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import SignInForm from "./components/BaseForm";
import NextAuth from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.token) {
    return redirect("/");
  }
  return <SignInForm session={session} />;
};

export default LoginPage;
