import React, { useEffect, useState } from "react";
import { apiClient } from "../api";
import { checkSubset } from "../utils";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import { getUser } from "../api/auth";

interface UserType {
    name: string;
    email: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    access_token: string;
    signin: (
        role: string,
        token: string,
        callback: VoidFunction
    ) => void;
    signout: (callback: VoidFunction) => void;
    roles: [];
    permissions: [];
    user: UserType;
    can: Function;
    show: Function;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const isTokenPresent: any = getCookie("token");
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    const [access_token, setAccessToken] = React.useState<string>(isTokenPresent);
    const [roles, setRoles] = React.useState<any>([]);
    const [permissions, setPermissions] = React.useState<any>();
    const [user, setUser] = React.useState<UserType>({
        email: "",
        name: "",
    });

    useEffect(() => {
        if (access_token && isAuthenticated) {
            // setCookie('token', 'access_token')
            // setCookie('role', roles[0])
            getRolePermissionList();
        }
    }, [access_token]);


    const getRolePermissionList = async () => {
        apiClient.defaults.headers.common["Authorization"] = `${access_token}`;
        let { status, data } = await apiClient.post("get-user");
        if (status == 200) {
            let { email, name, role } = data
            setUser(prev => ({
                ...prev, name, email
            }))
            setRoles([role]);
            setIsAuthenticated(true)
        }
    };


    const signin = (
        role: string,
        token: string,
        callback: VoidFunction
    ) => {
        if (token) {
            apiClient.defaults.headers.common["Authorization"] = `${token}`;
            setAccessToken(token);
            // setPermissions(permissions);
            setRoles(roles);
            // setUser((prev) => ({
            //     ...prev, email,
            // }));
            setIsAuthenticated(true);
            callback();
        }
    };

    const can = (permission: string) => {
        if (checkSubset(["SUPERADMIN"], roles)) {
            return true;
        }
        return permissions.find((p: string) => p == permission) ? true : false;
    };

    const show = (permission: string) => {
        if (checkSubset(["SUPERADMIN"], roles)) {
            return true;
        }
        return permissions?.find((p: string) => p == permission) ? true : false;
    };

    const signout = (callback: VoidFunction) => {
        deleteCookie("token")
        deleteCookie("role")
        // deleteCookie("permissions")
        setIsAuthenticated(false);
        callback();
    };

    const value = {
        roles,
        permissions,
        access_token,
        isAuthenticated,
        signin,
        signout,
        user,
        can,
        show,

    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
