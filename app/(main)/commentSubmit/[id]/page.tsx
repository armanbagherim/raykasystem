import SubmitCommentModule from "./SubmitCommentModule";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getPossibleFactors = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/productComments/possibleFactor/${id}`,
    {
      cache: "no-store",
    }
  );
  const response = await res.json();
  return response;
};

const getProduct = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/products/id/${id}`,
    {
      cache: "no-store",
    }
  );
  const response = await res.json();
  return response;
};
const Submitcomment = async ({ params }) => {
  const { result: possibleFactors } = await getPossibleFactors(params.id);
  const { result: product } = await getProduct(params.id);
  const session = await getServerSession(authOptions);
  const cookieStore = cookies();

  if (session === null) {
    redirect(`/login?redirect_back_url=/commentSubmit/${product.result.id}`);
  }

  return (
    <SubmitCommentModule
      product={product}
      session={session}
      possibleFactors={possibleFactors}
      cookies={cookieStore.get("SessionName")}
    />
  );
};

export default Submitcomment;
