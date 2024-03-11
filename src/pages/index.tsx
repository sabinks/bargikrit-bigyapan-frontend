import { useEffect, useState } from "react";
import { apiClient, listProvincesByCountryId, siteVisited } from "../api";
import { useQuery } from "@tanstack/react-query";
import { SortingState } from "@tanstack/react-table";
import Loading from "@/components/loading";
import { useApplication } from "../../hooks/application";
import Button from "@/components/Button";
import { getNextCategoryList, getNextQueryData } from "@/api/frontend";
import { useDebounce } from "use-debounce";
import AdvertisementCard from "@/components/AdvertisementCard";
import Dropdown from "@/components/dropDown";
import { Input } from "@/components";
import { setCookie } from "cookies-next";
import { useAuth } from "../../hooks/auth";
import SiteVisit from "@/components/siteVisit";
import { getCategories } from "@/api/advertisement/category";
import ReactSelect from "react-select";

export default function Home({ }: any) {
    const { setAccessToken } = useAuth()
    const { appState, setAppState } = useApplication()
    const [categories, setCategories] = useState<any>([])
    const [query, setQuery] = useState<string>("");
    const [sorting, setSorting] = useState<SortingState>([{
        id: 'createdAt',
        desc: true
    }])
    const [page, setPage] = useState<number>(0);
    const [pagination, setPagination] = useState<any>({
        totalPages: 0
    })
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setCookie('token', sessionStorage.getItem('token'))
            setAccessToken(sessionStorage.getItem('token'))
        }
    }, [])

    const [text] = useDebounce(appState?.search, 300);
    const [advertisements, setAdvertisements] = useState<any>([])
    useQuery(
        ["categories"],
        getNextCategoryList, {
        onSuccess: (data) => {
            setCategories(data?.map(({ id, name }: any) => ({ id, value: id, label: name })))
        }
    })
    const { isLoading, refetch, isFetching } = useQuery(
        ["next/advertisements", query, 'createdAt', sorting[0].desc ? 'DESC' : 'ASC', page, 5,
            appState?.catIds,
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
        if (appState?.selectedProvince?.hasOwnProperty('name') ||
            appState?.selectedCountry?.hasOwnProperty('name') ||
            appState?.selectedAdvertisementType ||
            text) {
            loadAdvertisements()
        }
    }, [appState?.selectedProvince, appState?.selectedCountry, appState?.catIds, text])

    const loadAdvertisements = async () => {
        const { selectedCountry, selectedProvince, catIds } = appState
        const { data } = await apiClient.get(`/next/advertisements?categoryIds=${catIds.toString()}&country=${selectedCountry?.name}&province=${selectedProvince?.name}&search=${text}&pageSize=10&offset=0`);
        setAdvertisements((prev: any) => ([...data?.content]))
        setPage(data?.pageable?.pageNumber)
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
    const handleCategoryChange = (selected: any) => {
        setAppState((prev: any) => ({
            ...prev, catIds: selected.map(({ id }: any) => id), selectedCategories: selected
        }))
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
                            <label htmlFor="" className="text-gray-700 text-sm font-semibold">Select category</label>
                            <ReactSelect
                                name={'category'}
                                options={categories}
                                isMulti
                                isClearable={false}
                                onChange={(value: any, clicked) => handleCategoryChange(value)
                                }
                                isSearchable={true}
                                placeholder="Select Client"
                                className={` text-sm capitalize`}

                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles, borderColor: "#5F8670", borderRadius: "8px", color: "#FF9800",


                                    }),
                                    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                                        ...styles, backgroundColor: "white", ":hover": { ...styles[':hover'], backgroundColor: "#FF9800", color: "white" }
                                    }),
                                    // multiValueLabel: (styles, { data }) => {
                                    //     return {
                                    //         ...styles,
                                    //         backgroundColor: "red"
                                    //     };
                                    // },
                                }}

                            />
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
            <SiteVisit />
        </div>
    );
}

// export async function getServerSideProps(context: any) {
//     const { data } = await apiClient.get(`/next/advertisements?pageSize=10&offset=0`);

//     return {
//         props: { data }
//     }
// }