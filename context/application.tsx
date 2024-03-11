import { getCountries } from "@/api";
import React, { useEffect, useState } from "react";

interface StateType {
    advertisementView: string;
    advertisementViewToggle: boolean;
    country: string;
    countries: any;
    selectedCountry: any;
    provinces: any;
    selectedProvince: any;
    advertisementTypes: any;
    selectedAdvertisementType: any;
    search: string;
    catIds: any;
}

interface ApplicationType {
    appState: StateType,
    setAppState: Function,
}

export const ApplicationContext = React.createContext<ApplicationType>(null!);

export function ApplicationProvider({ children }: { children: React.ReactNode }) {

    const [appState, setAppState] = React.useState<any>({
        advertisementView: 'listing',
        advertisementViewToogle: false,
        country: '',
        countries: [],
        selectedCountry: {},
        provices: [],
        selectedProvince: {},
        advertisementTypes: [],
        selectedAdvertisementType: null,
        search: "",
        catIds: [0]
    });
    useEffect(() => {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        let zone = ['Asia/Kathmandu', 'Asia/Katmandu']
        let country = 'Nepal'
        if (zone.includes(timeZone)) {
            country = 'Nepal'
        } else {
            country = "Australia"
        }
        setAppState((prev: any) => ({
            ...prev, country
        }))
    }, [])
    useEffect(() => {
        loadCountries()
    }, [])
    const loadCountries = async () => {
        let data = await getCountries()
        setAppState((prev: any) => ({
            ...prev, countries: data
        }))
    }
    // useEffect(() => {
    //     loadAdsType()
    // }, [])
    // const loadAdsType = async () => {
    //     let data = await getNextAdvertisementTypes()
    //     setAppState((prev: any) => ({
    //         ...prev, advertisementTypes: data
    //     }))
    // }
    const value = {
        appState, setAppState
    };

    return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
}
