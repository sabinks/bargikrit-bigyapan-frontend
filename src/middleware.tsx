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
        { roles: ['SUPERADMIN', 'ADMIN'], startPath: /\/auth\/partners/ },
        { roles: ['SUPERADMIN', 'ADMIN'], startPath: /\/auth\/users/ },
        { roles: ['SUPERADMIN'], startPath: /\/auth\/admins/ },



        // { roles: ['SUPERADMIN', 'ADMIN', 'subagency'], startPath: /\/auth\/properties\/\d+\/assign-property/ },
        // { roles: ['SUPERADMIN', 'ADMIN', 'subagency', 'agent'], startPath: /\/auth\/properties\/\d+\/inspection-form/ },
        // { roles: ['SUPERADMIN'], startPath: /\/auth\/admin/ },
        // { roles: ['SUPERADMIN'], startPath: /\/auth\/role/ },
        // { roles: ['SUPERADMIN'], startPath: /\/auth\/permission/ },
        // { roles: ['SUPERADMIN', 'admin', 'subagency', 'agent'], startPath: /\/auth\/inspection/ },
        // { roles: ['SUPERADMIN', 'client'], startPath: /\/auth\/favirate/ },


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
