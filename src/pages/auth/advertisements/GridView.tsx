import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { apiClient, getList, getQueryData, showQueryData } from "../../../../api";
import Link from "next/link";
import dynamic from 'next/dynamic'
import { useAuth } from "../../../../hooks/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import AdvertisementCard from "../../../../components/AdvertisementCard";
import AdvertisementListing from "../../../../component/AdvertisementListing";
import { SortingState } from "@tanstack/react-table";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import Loading from "../../../../component/loading";
import { Button, PageTitle, SidePanel } from "../../../../component";
import { checkSubset } from "../../../../utils";
import { addAdvertisement, deleteAdvertisement, updateAdvertisement } from "../../../../api/advertisement";
import AdvertisementsForm from "./advertisementsForm";

const initialState = {
    name: "",
    content: "",
};
export default function GridView({ }: any) {
    const [query, setQuery] = useState<string>("");
    const [sorting, setSorting] = useState<SortingState>([{
        id: 'createdAt',
        desc: true
    }])
    const [page, setPage] = useState<number>(0);
    const [pagination, setPagination] = useState<any>({
        totalPages: 0
    })
    const [tableData, setTableData] = useState<any>([]);
    const [state, setState] = useState<any>([])
    const [advertisements, setAdvertisements] = useState<any>([])
    const { roles, user: { email, canPublish } } = useAuth()

    const [adsId, setAdsId] = useState<number>(0)
    const [isVisible, toggleIsVisible] = useState(false);
    const [formerrors, setFormErrors] = useState<any>({});
    const [edit, setEdit] = useState(false)
    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const { data } = await apiClient.get(`/next/advertisements?pageSize=10&offset=0`);
        setAdvertisements(data?.content)
        setPage(data?.pageable.pageNumber)
        setPagination((prev: any) => ({
            ...prev, totalPages: data?.totalPages
        }))
    }

    const { isLoading, refetch, isFetching } = useQuery(
        ["next/advertisements", query, sorting[0].id, sorting[0].desc ? 'DESC' : 'ASC', page, 3],
        getQueryData, {
        onSuccess: (data) => {
            setAdvertisements((prev: any) => ([
                ...prev, ...data?.content
            ]))
            setPage(data?.pageable?.pageNumber)
        },
        enabled: page > 0 && page <= pagination.totalPages + 1 ? true : false
    })

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
    }, [])

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setPage((prev: any) => (prev + 1));
        }
    }

    const { isLoading: creatingAdvertisement, mutate } = useMutation<any, Error>(addAdvertisement,
        {
            onSuccess: () => {
                loadData();
                toggleIsVisible(false);
            },
            onError: (err: any) => {
                const { status, data } = err.response;
                if (status == 422) {
                    setFormErrors(data);
                } else {
                    console.log("Course Form Error: ", err);
                }
            },
        }
    );
    const { mutate: update, isLoading: updatingAdvertisement } = useMutation<any, Error>(updateAdvertisement,
        {
            onSuccess: () => {
                refetch();
                toggleIsVisible(false);
            },
            onError: (err: any) => {
                const { status, data } = err.response;
                if (status == 422) {
                    setFormErrors(data);
                } else {
                    console.log("Course Form Error: ", err);
                }
            },
        }
    );

    const { mutate: mutateDeleteAdvertisement } = useMutation(deleteAdvertisement, {
        onSuccess: () => refetch()
    })

    return (
        <div className="container mx-auto my-12">
            <div className='flex flex-row justify-between items-center'>
                <PageTitle title='Advertisement' />
                {
                    (checkSubset(['SUPERADMIN', 'ADMIN'], roles) || canPublish) &&
                    <Button
                        label='Add Advertisement'
                        buttonType=""
                        className="bg-primary"
                        onClick={() => {
                            toggleIsVisible(true);
                            setState(initialState);
                            setEdit(false)
                        }}
                    />
                }
            </div>
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                {
                    advertisements?.map((advertisement: any, index: number) => {
                        return <div className="" key={index}>
                            <AdvertisementCard advertisement={advertisement} />
                        </div>
                    })
                }
                {
                    isFetching && <Loading />
                }
            </main>
            <SidePanel
                isVisible={isVisible}
                onClose={() => {
                    toggleIsVisible(!isVisible);
                    setFormErrors({});
                }}
                wide="2xl"
                title={edit ? 'Edit Advertisement' : 'Add Advertisement'}
                primaryButtonAction={() => {
                    setFormErrors({});
                    state?.id ? update(state) :
                        mutate(state)
                }}
                primaryButtonLoading={creatingAdvertisement || updatingAdvertisement}
            >
                <Suspense fallback='loading'>
                    <AdvertisementsForm state={state} setState={setState} error={formerrors} />
                </Suspense>
            </SidePanel>
        </div>
    );
}
