import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/eav/admin/entityTypes/slug/${params.slug}`,
      { cache: "no-store" }
    );

    if (res.status === 410) {
      return NextResponse.json(
        { 
          error: 'Gone',
          message: 'This resource has been permanently removed',
          status: 410
        },
        { status: 410 }
      );
    }

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return NextResponse.json(await res.json());
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 }
    );
  }
}