import Link from "next/link";
import { useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import {
    ArrowLeftCircleIcon,
    Bars3Icon,
    PlusIcon,
    Square3Stack3DIcon,
    UserIcon,
    UserPlusIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import dynamic from 'next/dynamic'
import { useMutation } from "@tanstack/react-query";

import NewButton from "../new-button";
import { logout } from "../../../api/auth";
import { classNames } from "@/utils";
import { useAuth } from "../../../hooks/auth";


// const Userlog = dynamic(() => import('../userlog'), { ssr: false })

export default function NavBar() {
    const { isAuthenticated, signout } = useAuth()
    const [navShow, setNavShow] = useState(false);
    const router = useRouter();
    const { pathname } = router;


    const baseUrl = process.env.NEXT_PUBLIC_VITE_DASHBOARD_URL;

    const capitalizeFirst = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };


    const { mutate } = useMutation<any, Error>(logout,
        {
            onSuccess: () => {
                signout(() => {
                    router.push(router.asPath)
                });
            },
            onError: (err: any) => {
                console.log("logout Error: ", err);
            },
        }
    );

    return (
        <div className="relative">
            {/* desktop view */}
            <div className="w-[97%] mx-auto flex py-5 justify-between items-center px-2">
                <div className="hidden lg:flex md:flex-wrap md:max-w-lg md:items-center md:justify-center">
                    <div>
                        <Link
                            href="/"
                            className={classNames(
                                "px-4 hover:text-secondary text-lg hover:font-bold mx-2",
                                pathname === "/"
                                    ? "border-b-2 text-secondary border-secondary font-bold pb-1"
                                    : "text-black"
                            )}
                        >
                            Home
                        </Link>
                    </div>
                    <div>
                        <Link
                            href="/properties"
                            className={classNames(
                                "px-4 hover:text-secondary text-lg hover:font-bold mx-2",
                                pathname.startsWith("/properties")
                                    ? "border-b-2 text-secondary border-secondary font-bold pb-1"
                                    : "text-black"
                            )}
                        >
                            Properties
                        </Link>
                    </div>
                    <div>
                        <Link
                            href="/"
                            className={classNames(
                                "px-4 hover:text-secondary text-lg hover:font-bold mx-2",
                                pathname.startsWith("/about-us")
                                    ? "border-b-2 text-secondary border-secondary font-bold pb-1"
                                    : "text-black"
                            )}
                        >
                            About Us
                        </Link>
                    </div>
                </div>
                <div className="hidden lg:flex space-x-2">

                    <>
                        {isAuthenticated ? (
                            <span className="border-2 px-4 py-1 rounded-xl w-max place-self-end  hover:bg-secondary hover:text-white hover:drop-shadow-xl hover:cursor-pointer transition delay-50 duration-500" onClick={() => mutate()}>Logout</span>
                        ) : (
                            <div className="flex space-x-2">
                                <div className="flex space-x-2 border-2 px-4 py-1 rounded-xl w-max place-self-end  hover:bg-secondary hover:text-white hover:drop-shadow-xl hover:cursor-pointer transition delay-50 duration-500" onClick={() => {
                                    sessionStorage.setItem("path", "/")
                                    router.push("/login")
                                }} >
                                    <UserIcon className="w-5" />
                                    <span>Login In</span>
                                </div>
                                <Link href="/register">
                                    <div className="flex space-x-2 border-2 px-4 py-1 rounded-xl w-max place-self-end  hover:bg-secondary hover:text-white hover:drop-shadow-xl hover:cursor-pointer transition delay-50 duration-500" >
                                        <UserPlusIcon className="w-5" />
                                        <span>Sign Up123</span>
                                    </div>

                                </Link>

                            </div>
                        )}
                    </>

                    {
                        isAuthenticated &&
                        <div className="border-2 px-4 py-1 rounded-xl w-max  place-self-end  hover:bg-secondary hover:text-white hover:drop-shadow-xl hover:cursor-pointer transition delay-50 duration-500">
                            <Link href="/auth/properties">
                                <div className="flex space-x-2">
                                    <span>Dashboard</span>
                                </div>
                            </Link>
                        </div>
                    }
                </div>


                <div className="flex space-x-2 items-center cursor-pointer lg:hidden">
                    {
                        isAuthenticated ? <ArrowLeftCircleIcon className="w-6" onClick={() => mutate()} /> :

                            <NewButton
                                icon={<UserIcon className="w-6" />}
                                className="w-8 h-8 rounded-full"
                                tooltip="Login"
                                tooltipId="login"
                                onClick={() => {
                                    sessionStorage.setItem("path", "/")
                                    router.push("/login")
                                }}
                            />

                    }

                    <div className=" w-8 " onClick={() => setNavShow(!navShow)}>
                        {navShow ? <XMarkIcon /> : <Bars3Icon />}
                    </div>
                </div>
            </div>
            {/* mobile view */}
            <div
                className={`${navShow ? "block" : "hidden"}  lg:hidden w-full p-2
             flex flex-col justify-center items-center space-y-2 transition ease-in duration-500 absolute z-10 bg-white `}
            >
                {/* <div>
                    <Link
                        href="/"
                        className={classNames(
                            "px-4 hover:text-secondary text-lg hover:font-bold mx-2",
                            pathname === "/"
                                ? "border-b-2 text-secondary border-secondary font-bold pb-1"
                                : "text-black"
                        )}
                    >
                        Home
                    </Link>
                </div> */}
                {/* <div>
                    <Link
                        href="/properties"
                        className={classNames(
                            "px-4 hover:text-secondary text-lg hover:font-bold mx-2",
                            pathname.startsWith('/properties')
                                ? "border-b-2 text-secondary border-secondary font-bold pb-1"
                                : "text-black"
                        )}
                    >
                        Properties
                    </Link>
                </div> */}



            </div>
        </div>
    );
}
