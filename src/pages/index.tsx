import Image from "next/image";
import { useEffect, useState } from "react";
import { apiClient, getList, getQueryData, showQueryData } from "../../api";
import Link from "next/link";
import dynamic from 'next/dynamic'
import { useAuth } from "../../hooks/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import AdvertisementCard from "../../components/AdvertisementCard";
import AdvertisementListing from "../../component/AdvertisementListing";
import { SortingState } from "@tanstack/react-table";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

const ParsedContent = dynamic(() => import('../../components/innerhtml'), { ssr: false })

export default function Home({ data }: any) {
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
    const { isLoading, refetch, isFetching } = useQuery(
        ["next/advertisements", query, sorting[0].id, sorting[0].desc ? 'DESC' : 'ASC', page, 3],
        getQueryData, {
        onSuccess: (data) => {
            console.log('data', data);
            setAdvertisements((prev: any) => ([
                ...prev, ...data?.content
            ]))
            setPage(data?.pageable?.pageNumber)
        },
        enabled: page > 0 && page <= pagination.totalPages + 1 ? true : false
    })
    useEffect(() => {
        setAdvertisements(data?.content)
        setPage(data?.pageable.pageNumber)
        setPagination((prev: any) => ({
            ...prev, totalPages: data.totalPages
        }))
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
    }, [])
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setPage((prev: any) => (prev + 1));
        }
    }

    // const [searchValue, setSearchValue] = useState<any>()
    // const router = useRouter()
    // const [userFav, setUserFav] = useState<any>([])
    // const { refetch } = useQuery(['user-favorite'], faviroteIdList, {
    //     onSuccess: (data) => {
    //         setUserFav(data.data)
    //     },
    //     enabled: isAuthenticated && show("list-favirate")
    // })

    // const { mutate: addFav } = useMutation(userFavirote, {
    //     onSuccess: () => refetch()
    // })

    // const { mutate: removeFav } = useMutation(removeUserFavirote, {
    //     onSuccess: () => refetch()
    // })

    // const handleFav = (id: number) => {
    //     if (isAuthenticated) {
    //         userFav.includes(id) ?
    //             removeFav(id) :
    //             addFav({ property_id: id })
    //     } else {
    //         sessionStorage.setItem("path", router.asPath);
    //         router.push('\login')
    //     }

    // }



    return (
        <div className="container mx-auto my-12">
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                {
                    advertisements?.map((advertisement: any, index: number) => {
                        return <div className="" key={index}>
                            <AdvertisementCard advertisement={advertisement} />
                        </div>
                    })
                }

            </main>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    const { data } = await apiClient.get(`/next/advertisements?pageSize=10&offset=0`);

    return {
        props: { data }
    }
}