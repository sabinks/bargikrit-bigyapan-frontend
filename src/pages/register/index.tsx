import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import PartnerSignUp from './PartnerSignUp'
import UserSignUp from './UserSignUp'
import { classNames } from '../../../utils';
import Link from 'next/link';
import { BASE_URL } from '@/constants';

export default function Register() {
    // const [searchParams] = useSearchParams();
    // const user = searchParams.get('user');
    const [tab, setTab] = useState([
        { label: "User SignUp", slug: 'user-signup' },
        { label: "Partner SignUp", slug: 'partner-signup' },
    ])
    const [navState, setNavState] = useState('user-signup')
    const [partnerType, setPartnerType] = useState<any>()

    // useEffect(() => {
    //     if (user) {
    //         setNavState(`${user}-signup`)
    //         setTab((prev: any) => prev.filter((item: any) => item.slug == `${user}-signup`))
    //     }
    // }, [user])

    // useQuery(['partner-type-list'], getList, {
    //     onSuccess: (res) => {
    //         const roles = res?.data?.map(({ name, id }: any) => ({ name, value: id }))
    //         setPartnerType(roles)
    //     }
    // })

    return (
        <div className="min-h-screen flex">
            <div className="flex items-center w-1/3 justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div >
                        <img
                            className="h-24 w-auto"
                            src={`/assets/bb-250.png`}
                            alt='Bargikrit Bigyapan Logo'
                            width={150} height={150}
                        />
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className='mt-8'>

                        <div className='' >
                            <div className="pb-2 rounded-md ">
                                <div className="flex flex-row mb-2">
                                    {
                                        tab.map(({ label, slug }) => (
                                            <div key={label} className={
                                                classNames(
                                                    `px-4 py-1.5 text-center border-b rounded-t-md cursor-pointer w-full`,
                                                    slug == navState ? 'bg-accent1 text-white font-bold' : 'bg-secondary',
                                                    // user ? 'cursor-not-allowed w-full' : 'w-full'
                                                )
                                            }
                                                onClick={() => {
                                                    // if (user) {
                                                    //     return
                                                    // }
                                                    setNavState(slug)
                                                }}>
                                                {label}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            {navState == 'user-signup' && <UserSignUp />}
                            {navState == 'partner-signup' && <PartnerSignUp partnerType={partnerType} />}
                        </div>
                        <div className="flex justify-center bg-secondary mt-4 rounded-md text-white py-1 hover:scale-105 font-medium transition duration-500">
                            <Link href="login" >
                                <span className='text-base font-medium'>Login</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block relative w-0 flex-1 contrast-50">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/assets/market-5000694_1920.png"
                    alt=""
                />
            </div>
        </div >
    )
}
