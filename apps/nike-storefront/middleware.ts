import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host");
  const pathname = url.pathname;

  if (pathname.startsWith("/checkout")) {
    return NextResponse.next();
  }

  if (pathname.includes("_next") || pathname.includes(".jpg") || pathname.includes(".png")) {
    return NextResponse.next();
  }

  if (hostname?.startsWith("localhost")) {
    url.pathname = `${url.locale}/_sites/nike.vercel.com/default`;

    return NextResponse.rewrite(url);
  }

  const channel = "default-channel";
  url.pathname = `${url.locale}/_sites/${hostname}/${channel}${pathname}`;

  return NextResponse.rewrite(req.nextUrl);
}
