import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req, ev) {
  // 'secret' should be the same 'process.env.SECRET' use in NextAuth function
  const session = await getToken({ req: req, secret: process.env.SECRET });
  //   console.log('session in middleware: ', session)

  // if(!session) return NextResponse.redirect('/')

  return NextResponse.next();
}
