import Image from "next/image";
import { useEffect, useState } from "react";
import { apiClient, getCountries, getList, getProvincesByCountryId, getQueryData, listProvincesByCountryId, showQueryData } from "../../api";
import Link from "next/link";
import dynamic from 'next/dynamic'
import { useAuth } from "../../hooks/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { SortingState } from "@tanstack/react-table";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import Loading from "@/components/loading";
import { useApplication } from "../../hooks/application";
import Button from "@/components/Button";
import { getAdvertisementTypes } from "../../api/advertisement";
import { getNextQueryData } from "@/api/frontend";
import { useDebounce } from "use-debounce";
import AdvertisementCard from "@/components/AdvertisementCard";
import Dropdown from "@/components/dropDown";
import { Input } from "../components";

// const ParsedContent = dynamic(() => import('../../components/innerhtml'), { ssr: false })

export default function Home({ }: any) {
    const { appState, setAppState } = useApplication()
    const [query, setQuery] = useState<string>("");
    const [sorting, setSorting] = useState<SortingState>([{
        id: 'createdAt',
        desc: true
    }])
    const [page, setPage] = useState<number>(0);
    const [pagination, setPagination] = useState<any>({
        totalPages: 0
    })
    const [text] = useDebounce(appState?.search, 300);
    const [advertisements, setAdvertisements] = useState<any>([])
    const { isLoading, refetch, isFetching } = useQuery(
        ["next/advertisements", query, 'createdAt', sorting[0].desc ? 'DESC' : 'ASC', page, 5, appState?.selectedAdvertisementType?.name, appState?.selectedCountry?.name, appState?.selectedProvince?.name, appState?.search],
        getNextQueryData, {
        onSuccess: (data) => {
            setAdvertisements((prev: any) => ([
                ...prev, ...data?.content
            ]))
            setPage(data?.pageable?.pageNumber)
        },
        enabled: page > 0 && page <= pagination.totalPages + 1 ? true : false
    })

    useEffect(() => {
        loadAdvertisements()
    }, [appState?.selectedProvince, appState?.selectedCountry, appState?.selectedAdvertisementType, text])

    const loadAdvertisements = async () => {
        const { selectedCountry, selectedProvince, selectedAdvertisementType } = appState

        const { data } = await apiClient.get(`/next/advertisements?advertisementType=${selectedAdvertisementType?.name}&country=${selectedCountry?.name}&province=${selectedProvince?.name}&search=${text}&pageSize=10&offset=0`);
        setAdvertisements((prev: any) => ([...data?.content]))

        setPage(data?.pageable.pageNumber)
        setPagination((prev: any) => ({
            ...prev, totalPages: data.totalPages
        }))
    }

    useEffect(() => {
        setAppState((prev: any) => ({
            ...prev, selectedCountry: prev.countries.find((country: any) => country.name == prev.country)
        }))
    }, [appState.countries])

    useEffect(() => {
        if (typeof appState?.selectedCountry?.id == "number") {
            loadProvinces(appState?.selectedCountry?.id)
        }
    }, [appState.selectedCountry])
    const loadProvinces = async (id: number) => {
        let data = await listProvincesByCountryId(id)
        setAppState((prev: any) => ({
            ...prev, provinces: data
        }))
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
    }, [])
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setPage((prev: any) => (prev + 1));
        }
    }
    const handleResetClick = () => {
        setAppState((prev: any) => ({
            ...prev, selectedProvince: null, selectedAdvertisementType: null, search: ''
        }))
    }

    return (
        <div className="container mx-auto my-8">
            <div className="mb-4">
                <div className="flex flex-col lg:flex-row lg:items-end md:gap-x-4 space-y-2 lg:space-y-0">
                    <div className=" lg:w-1/3">
                        <Input label="Search" placeholder="Search advertisement" name="searchAdvertisement" type="text" value={appState?.search} onChange={(e: any) => {
                            setAppState((prev: any) => ({
                                ...prev, search: e.target.value
                            }))
                        }
                        } />
                    </div>

                    <div className="w-full lg:w-2/3">
                        <div className="flex items-end space-x-2">
                            <Dropdown label="Select Advertisement Type" selectedValue={appState?.selectedAdvertisementType} data={appState?.advertisementTypes} onChange={(advertisement: any) => {
                                setAppState((prev: any) => ({
                                    ...prev, selectedAdvertisementType: advertisement
                                }))
                            }} />

                            <Dropdown label="Select Country" selectedValue={appState?.selectedCountry} data={appState?.countries} onChange={(country: any) => {
                                setAppState((prev: any) => ({
                                    ...prev, selectedCountry: country, selectedProvince: null
                                }))
                            }} />
                            <Dropdown label="Select Province/State" selectedValue={appState?.selectedProvince} data={appState?.provinces} onChange={(province: any) => {
                                setAppState((prev: any) => ({
                                    ...prev, selectedProvince: province
                                }))
                            }} />
                            <Button label="Reset" buttonType="warning" onClick={(e: any) => {
                                handleResetClick()
                            }} />
                        </div>
                    </div>
                </div>
            </div>
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                {
                    advertisements?.map((advertisement: any, index: number) => {
                        return <div className="" key={index}>
                            <AdvertisementCard advertisement={advertisement} isFrontPage={true} />
                        </div>
                    })
                }
                {
                    isFetching && <Loading />
                }
            </main>
        </div>
    );
}

// export async function getServerSideProps(context: any) {
//     const { data } = await apiClient.get(`/next/advertisements?pageSize=10&offset=0`);

//     return {
//         props: { data }
//     }
// }