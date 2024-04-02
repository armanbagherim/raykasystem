import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = cookies(request);
  const existingSessionName = cookieStore.get("sessionName");

  if (existingSessionName) {
    return NextResponse.json({
      hasToken: true,
      message: "Session already exists",
      token: existingSessionName.value,
    });
  }

  const res = await fetch(
    "https://nest-jahizan.chbk.run/v1/api/ecommerce/user/sessions/generate",
    {
      method: "POST",
    }
  );

  if (!res.ok) {
    return new Response("Failed to generate session", { status: 500 });
  }

  const data = await res.json();
  console.log("arman", data);

  cookieStore.set("sessionName", data.result.id, {
    expires: new Date(data.result.expireAt),
  });

  return NextResponse.json({
    hasToken: true,
    token: data.result.id,
    message: "New session generated",
  });
}
