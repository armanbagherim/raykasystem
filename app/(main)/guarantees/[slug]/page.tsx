import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

const getGuarantees = async (slug: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/guarantees/slug/${slug}`
  );
  const response = await res.json();
  if (response.statusCode === 404) {
    return notFound();
  }
  return response;
};

export async function generateMetadata({ params }): Promise<Metadata> {
  const slug = params.slug;

  const guarantees = await getGuarantees(slug);
  return {
    title: guarantees.result.name,
  };
}

export default async function Guarantees({ params }) {
  const guarantees = await getGuarantees(params.slug);
  const markup = { __html: guarantees?.result.description };
  return (
    <div className="container mx-auto content">
      <div>
        <div className="text-3xl py-5 flex items-center">
          <Image
            width={100}
            height={100}
            className="w-[100px] h-auto border border-gray-200 rounded-2xl ml-4"
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/guarantees/${guarantees?.result?.attachment?.fileName}`}
          />
          <h1 className="peyda text-[26px]">{guarantees?.result?.name}</h1>
        </div>
        <div dangerouslySetInnerHTML={markup}></div>
      </div>
    </div>
  );
}
