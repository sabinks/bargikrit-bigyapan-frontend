import React, { useEffect, useState } from "react";
import { booleanCheck, checkSubset } from "@/utils";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import { apiClient } from "@/api";

interface UserType {
    name: string;
    email: string;
    canPublish: false;
    contactNumber: string;
    remainingAds: number;
    currentPublishedAds: number;
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
    getUserDetails: Function;
    setAccessToken: Function;
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
        canPublish: false,
        contactNumber: '',
        remainingAds: 0,
        currentPublishedAds: 0,
    });
    useEffect(() => {
        // getUserDetails()
    }, [])

    // useEffect(() => {
    //     if (access_token && isAuthenticated) {
    //         getUserDetails();
    //     }
    // }, [access_token]);
    useEffect(() => {
        if (isTokenPresent) {
            setIsAuthenticated(true)
            getUserDetails();
            setAccessToken(isTokenPresent);
        }
    }, [isTokenPresent])

    const getUserDetails = async () => {
        apiClient.defaults.headers.common["Authorization"] = `${access_token}`;
        let { status, data } = await apiClient.post("get-user");
        if (status == 200) {
            let { email, name, role, canPublish, contactNumber, currentPublishedAds, remainingAds } = data
            setUser(prev => ({
                ...prev, name, email, canPublish: booleanCheck(canPublish), contactNumber, currentPublishedAds, remainingAds
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
        setAccessToken,
        isAuthenticated,
        signin,
        signout,
        user,
        can,
        show,
        getUserDetails
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
