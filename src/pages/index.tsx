import Image from "next/image";
import { useEffect, useState } from "react";
import { apiClient, getList, showQueryData } from "../../api";
import Link from "next/link";
import dynamic from 'next/dynamic'
import { useAuth } from "../../hooks/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { faviroteIdList, removeUserFavirote, userFavirote } from "../../api/favouriteProperty";
import { useRouter } from "next/router";
import AdvertisementCard from "../../components/AdvertisementCard";

const ParsedContent = dynamic(() => import('../../components/innerhtml'), { ssr: false })

export default function Home({ data }: any) {
    const { isAuthenticated, show } = useAuth()
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
                    data?.map((advertisement: any, index: number) => {
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
    const { data } = await apiClient.get(`/next/advertisements`);
    return {
        props: { data }
    }
}