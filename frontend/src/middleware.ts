import { NextRequest, NextResponse } from "next/server";

// public URLs
const PUBLIC_URLS = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  // Get the requested URL
  const url = req.nextUrl.pathname;

  // nextjs config
  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // check and get the token from cookies
  const token = req.cookies.get("token")?.value;
  console.log(token);

  // check if public url
  if (PUBLIC_URLS.includes(url)) {
    return NextResponse.next();
  }

  // token not availablke
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // try and verify token from the abckend
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API}/jwtcheck/${token}`;
    const response = await fetch(apiUrl);

    if (response.status === 200) {
      return NextResponse.next();
    }

    // token is wrong
    const responseWithDeletedCookie = NextResponse.redirect(
      new URL("/login", req.url)
    );
    responseWithDeletedCookie.cookies.delete("token");
    return responseWithDeletedCookie;
  } catch (error) {
    const responseWithDeletedCookie = NextResponse.redirect(
      new URL("/login", req.url)
    );
    responseWithDeletedCookie.cookies.delete("token");
    return responseWithDeletedCookie;
  }
}
