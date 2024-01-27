import React, { useEffect, useState } from "react";
import { apiClient } from "../api";
import { booleanCheck, checkSubset } from "../utils";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import { getUser } from "../api/auth";
import { cookies } from "next/dist/client/components/headers";

interface StateType {
    advertisementView: string;
    advertisementViewToggle: boolean;
}

interface ApplicationType {
    appState: StateType,
    setAppState: Function,
}

export const ApplicationContext = React.createContext<ApplicationType>(null!);

export function ApplicationProvider({ children }: { children: React.ReactNode }) {
    const [appState, setAppState] = React.useState<any>({
        advertisementView: 'grid',
        advertisementViewToogle: false
    });


    const value = {
        appState, setAppState

    };

    return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
}
