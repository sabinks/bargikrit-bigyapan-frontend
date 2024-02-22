import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import PartnerSignUp from './PartnerSignUp'
import UserSignUp from './UserSignUp'
import { classNames } from '@/utils';
import Link from 'next/link';
import { APP_NAME, BASE_URL } from '@/constants';
import Image from 'next/image';
import { montserrat } from '@/fonts';
import Head from 'next/head';

export default function Register() {
    // const [searchParams] = useSearchParams();
    // const user = searchParams.get('user');
    const [tab, setTab] = useState([
        { label: "Personal SignUp", slug: 'user-signup' },
        { label: "Business SignUp", slug: 'partner-signup' },
    ])
    const [navState, setNavState] = useState('user-signup')
    const [partnerType, setPartnerType] = useState<any>()

    return (
        <div className="min-h-screen flex">
            <Head>
                <title>{APP_NAME} | Register</title>
            </Head>
            <div className="flex items-center w-full xl:w-1/3 justify-center px-12 py-12">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <Link href={'/'}>
                        <div >
                            <Link href={'/'}>
                                <div className="flex flex-row gap-x-4 items-center">
                                    <Image
                                        className="h-36 w-auto"
                                        src="/assets/az_logo_250.png"
                                        alt="Logo"
                                        width="100"
                                        height="100"
                                    />
                                    <h2 className={`text-4xl tracking-wider font-extrabold text-secondary ${montserrat.className}`}>
                                        {APP_NAME}
                                    </h2>
                                </div>
                            </Link>
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>
                    </Link>

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
                <Image
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/assets/market-5000694_1920.png"
                    alt="Advertisement"
                    width="1000"
                    height="1000"
                />
            </div>
        </div >
    )
}
