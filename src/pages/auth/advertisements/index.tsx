import React, { useEffect } from "react";
import Button from "../../../components/Button";
import GridView from "./GridView";
import ListingView from "./listingView";
import { MdGridView } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { useApplication } from "../../../../hooks/application";
import { useAuth } from "../../../../hooks/auth";
import Head from "next/head";
import { checkSubset } from "@/utils";

export default function Advertisements() {
    const { roles, isAuthenticated, user: { email, canPublish, }, getUserDetails } = useAuth()
    const { appState, setAppState } = useApplication()
    useEffect(() => {
        getUserDetails()
    }, [isAuthenticated])
    return (
        <div className="space-y-2">
            <Head>
                <title>Advertisements</title>
            </Head>
            <div className="flex justify-end">
                <div className=" flex space-x-2">
                    <Button icon={<MdGridView className="w-5 h-5" />} className="bg-secondary" label='' disable={appState?.advertisementView == 'grid'} buttonType="" onClick={(e: any) => setAppState((prev: any) => ({ ...prev, advertisementView: 'grid' }))} />
                    {
                        checkSubset(['Super Admin', 'Admin'], roles) &&
                        <Button icon={<CiBoxList className="w-5 h-5" />} className="bg-secondary" label='' disable={appState?.advertisementView == 'listing'} buttonType="" onClick={(e: any) => setAppState((prev: any) => ({ ...prev, advertisementView: 'listing' }))} />
                    }
                </div>
            </div>
            {
                (appState?.advertisementView == "grid" && checkSubset(['PARTNER', 'USER'], roles)) ?
                    <GridView /> : <ListingView />
            }
        </div>
    )
}
