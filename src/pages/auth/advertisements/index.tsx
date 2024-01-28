import { CheckBox, NewTable, PageTitle } from "../../../../component";
import { useState } from "react";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addAdvertisement, advertisementStatusChange, deleteAdvertisement, showAdvertisement, updateAdvertisement } from "../../../../api/advertisement";
import { useAuth } from "../../../../hooks/auth";
import { getQueryData } from "../../../../api";
import { checkSubset } from "../../../../utils";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Search from "../../../../component/search";
import AdvertisementsForm from "./advertisementsForm";
import SidePanel from "../../../../component/sidePanel";
import Button from "../../../../component/Button";
import { useApplication } from "../../../../hooks/application";
import GridView from "./GridView";
import ListingView from "./listingView";
import { MdGridView } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";

const initialState = {
    name: "",
    content: "",
};
export default function Advertisements() {
    const { roles, user: { email, canPublish, name, contactNumber } } = useAuth()
    const { appState, setAppState } = useApplication()
    return (
        <div className="space-y-2">
            <div className="flex justify-end">
                <div className=" flex space-x-2">
                    <Button icon={<MdGridView className="w-5 h-5" />} className="bg-secondary" label='' disable={appState?.advertisementView == 'grid'} buttonType="" onClick={(e: any) => setAppState((prev: any) => ({ ...prev, advertisementView: 'grid' }))} />
                    <Button icon={<CiBoxList className="w-5 h-5" />} className="bg-secondary" label='' disable={appState?.advertisementView == 'listing'} buttonType="" onClick={(e: any) => setAppState((prev: any) => ({ ...prev, advertisementView: 'listing' }))} />
                </div>
            </div>
            {
                appState?.advertisementView == 'grid' ?
                    <GridView /> : <ListingView />
            }
        </div>
    )
}
