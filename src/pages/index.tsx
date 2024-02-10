import { useEffect, useState } from "react";
import { apiClient, listProvincesByCountryId } from "../api";
import { useQuery } from "@tanstack/react-query";
import { SortingState } from "@tanstack/react-table";
import Loading from "@/components/loading";
import { useApplication } from "../../hooks/application";
import Button from "@/components/Button";
import { getNextQueryData } from "@/api/frontend";
import { useDebounce } from "use-debounce";
import AdvertisementCard from "@/components/AdvertisementCard";
import Dropdown from "@/components/dropDown";
import { Input } from "../components";

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
        ["next/advertisements", query, 'createdAt', sorting[0].desc ? 'DESC' : 'ASC', page, 5,
            appState?.selectedAdvertisementType?.name,
            appState?.selectedCountry?.name,
            appState?.selectedProvince?.name,
            appState?.search],
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
        if (appState?.selectedProvince?.hasOwnProperty('name') || appState?.selectedCountry?.hasOwnProperty('name') || appState?.selectedAdvertisementType || text) {
            loadAdvertisements()
        }
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
    const handleFavCheck = (id: number, status: boolean) => {
        let advertisementsTemp = advertisements.map((ad: any) => {
            if (ad.id == id) {
                return { ...ad, favourite: status }
            }
            return ad
        })
        setAdvertisements(advertisementsTemp)
    }

    return (
        <div className="container mx-auto mb-8">
            <div className="mb-4">
                <div className="flex flex-col">
                    <div className="flex flex-row items-end space-x-2">
                        <div className="w-full">
                            <Input label="Search" placeholder="Search advertisement" name="searchAdvertisement" type="text" value={appState?.search} onChange={(e: any) => {
                                setAppState((prev: any) => ({
                                    ...prev, search: e.target.value
                                }))
                            }
                            } />
                        </div>
                        <div className="">
                            <div className="flex md:hidden">
                                <Button label="Reset" buttonType="warning" onClick={(e: any) => {
                                    handleResetClick()
                                }} />
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col md:flex-row md:space-x-2">
                        <div className="md:w-full">
                            <Dropdown label="Select Ads Type" selectedValue={appState?.selectedAdvertisementType} data={appState?.advertisementTypes} onChange={(advertisement: any) => {
                                setAppState((prev: any) => ({
                                    ...prev, selectedAdvertisementType: advertisement
                                }))
                            }} />
                        </div>
                        <div className="w-full flex items-end space-x-2">
                            <Dropdown label="Country" selectedValue={appState?.selectedCountry} data={appState?.countries} onChange={(country: any) => {
                                setAppState((prev: any) => ({
                                    ...prev, selectedCountry: country, selectedProvince: null
                                }))
                            }} />
                            <Dropdown label="Province/State" selectedValue={appState?.selectedProvince} data={appState?.provinces} onChange={(province: any) => {
                                setAppState((prev: any) => ({
                                    ...prev, selectedProvince: province
                                }))
                            }} />
                            <div className="hidden md:flex">
                                <Button label="Reset" buttonType="warning" onClick={(e: any) => {
                                    handleResetClick()
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                {
                    advertisements?.map((advertisement: any, index: number) => {
                        return <div className="" key={index}>
                            <AdvertisementCard advertisement={advertisement} isFrontPage={true} handleFavCheck={handleFavCheck} />
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