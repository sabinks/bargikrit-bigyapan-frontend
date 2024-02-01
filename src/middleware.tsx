import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const redirectUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
    let islogin = request.cookies.get("token");
    const role = request.cookies.get("role");
    const routes = [
        { roles: ['SUPERADMIN', 'ADMIN', 'PARTNER', 'USER'], startPath: /\/auth\/dashboard/ },
        { roles: ['SUPERADMIN', 'ADMIN', 'PARTNER', 'USER'], startPath: /\/auth\/advertisements/ },
        { roles: ['SUPERADMIN', 'ADMIN'], startPath: /\/auth\/advertisement-type/ },
        { roles: ['SUPERADMIN', 'ADMIN'], startPath: /\/auth\/partners/ },
        { roles: ['SUPERADMIN', 'ADMIN'], startPath: /\/auth\/users/ },
        { roles: ['SUPERADMIN'], startPath: /\/auth\/admins/ },
    ]
    if (!islogin) {
        if (request.nextUrl.pathname.startsWith("/auth")) {
            return NextResponse.redirect(redirectUrl);
        }
    }
    const authorized: any = routes && role?.value && routes.map(({ roles, startPath }: any) => {
        if (url.pathname.match(startPath)) {
            if (!roles.includes(role.value)) {
                return false
            }
            return true
        }
    })
    if (authorized?.includes(false)) {
        return NextResponse.redirect(redirectUrl);
    }
}
