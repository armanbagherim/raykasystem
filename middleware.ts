import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  // Check if the SessionName cookie already exists
  const existingSessionName = req.cookies.get("SessionName");

  // If the SessionName cookie exists, skip the fetch request
  if (existingSessionName) {
    console.log("SessionName cookie already exists, skipping fetch request.");
    return NextResponse.next(); // Proceed with the request without modifying the response
  }

  // If the SessionName cookie does not exist, generate a new session
  const resp = await fetch(
    "https://nest-jahizan.chbk.run/v1/api/ecommerce/user/sessions/generate",
    {
      method: "POST",
    }
  );

  if (!resp.ok) {
    return new Response("Failed to generate session", { status: 500 });
  }

  const data = await resp.json();
  console.log("arman", data);

  // Set the SessionName cookie with the new session ID
  const response = NextResponse.next();
  response.cookies.set("SessionName", data.result.id, {
    path: "/",
    httpOnly: true,
    secure: true, // Set to true if your site is served over HTTPS
    sameSite: "Lax", // Adjust according to your security requirements
  });

  console.log("SessionName cookie set:", data.result.id);
  return response;
}
