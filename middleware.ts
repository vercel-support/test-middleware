import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {

    if (request.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.next();
    }

    const { origin } = new URL(request.url);
    console.log(request.url);
    
    const session = request.cookies.get('session');

    if (!session) {
        return NextResponse.redirect(`${origin}/auth/login`);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
        * Match all request paths except for the ones starting with:
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico, sitemap.xml, robots.txt (metadata files)
        * - api/public
        * - api/aws-mktplace
        */
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/public|api/aws-mktplace).*)',
    ],
};