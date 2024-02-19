"use client"
import { Dialog } from '@headlessui/react';
import React, { useContext, useState } from 'react'
import { BiCross, BiUser } from 'react-icons/bi';
import { FaBars, FaCross, FaFacebookF, FaInstagram, FaMobile, FaPhone, FaYoutube } from 'react-icons/fa';
import { FaLocationPin, FaMessage, FaTwitter, FaXmark } from 'react-icons/fa6';
import { BsMarkdown } from 'react-icons/bs';
import Link from 'next/link';
import { montserrat, montserratRegular } from '@/fonts';
import { APP_NAME, BASE_URL } from '@/constants';
import { UserIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { setCookie } from 'cookies-next';
import { useAuth } from '../../hooks/auth';
import { logout } from '../../api/auth';
import { useApplication } from '../../hooks/application';
function Header() {
    const { isAuthenticated, signout } = useAuth()
    const { appState: { country } } = useApplication()
    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigation = [
        { name: 'Home', href: '/' },
        // { name: 'About Us', href: '/about-us' },
        { name: 'Contact Us', href: '/contact-us' },
    ]
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
    const handleLogout = () => {
        setCookie('role', '')
        setCookie('token', '')
        router.reload()
    }
    return (
        <div>
            <nav className="flex md:hidden items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">{APP_NAME}</span>
                        <Image
                            className="h-12 w-auto"
                            src="/assets/az_logo_250.png"
                            alt=""
                            width="100"
                            height="100"
                        />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <FaBars className="h-5 w-5 md:h-6 md:w-6 text-secondary" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                            {item.name}
                        </Link>
                    ))}

                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        {/* <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a> */}
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <FaXmark className="text-secondary" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e: any) => setMobileMenuOpen(false)}
                                        className="-mx-3 block px-3 py-2 tracking-wide text-base text-gray-dark hover:bg-primary hover:text-white transition duration-300"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                {
                                    !isAuthenticated ?
                                        <>
                                            <Link href="/login" className="-mx-3 block px-3 py-2 tracking-wide text-base text-gray-dark hover:bg-primary hover:text-white transition duration-300">Login</Link>
                                            <Link href="/register" className="-mx-3 block px-3 py-2 tracking-wide text-base text-gray-dark hover:bg-primary hover:text-white transition duration-300">Register</Link>
                                        </>
                                        :
                                        <>
                                            <Link href="/auth/dashboard" className="-mx-3 block px-3 py-2 tracking-wide text-base text-gray-dark hover:bg-primary hover:text-white transition duration-300">Dashboard</Link>
                                            <span className="-mx-3 block px-3 py-2 tracking-wide text-base text-gray-dark hover:bg-primary hover:text-white transition duration-300" onClick={() => handleLogout()}>Logout</span>
                                        </>
                                }
                            </div>
                            {/* <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div> */}
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
            <div className="hidden md:flex bg-primary py-3">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="flex md:space-x-4 divide-x divide-white text-white">
                            <div className=""><FaFacebookF className=" hover:text-[#316FF6] transition duration-300 cursor-pointer" /></div>
                            {/* <div className="pl-4"><FaTwitter className=" hover:text-[#1DA1F2] transition duration-300 cursor-pointer" /></div> */}
                            {/* <div className="pl-4"><FaInstagram className=" hover:text-pink-600 transition duration-300 cursor-pointer" /></div>
                            <div className="pl-4"><FaYoutube className=" hover:text-[#CD201F] transition duration-300 cursor-pointer" /> </div> */}
                        </div>
                        <div className={`flex md:space-x-2 text-sm text-white`}>
                            <div className="flex items-center pl-2 hover:cursor-pointer hover:text-secondary transition duration-500"><FaMobile /><span className='pl-2'> {country == "Nepal" ? "+977 9861168333" : " + 61 402 941 594"}</span></div>
                            < div className="flex items-center pl-2 hover:cursor-pointer hover:text-secondary transition duration-500"><FaMessage /><span className='pl-2'>info@adzoner.com</span></div>
                            {/* <div className="flex items-center pl-2 hover:cursor-pointer hover:text-gray-dark transition duration-500"><FaLocationPin /><span className='pl-2'> 1234 Elm Street</span></div> */}
                            <div className="flex items-center pl-2 hover:cursor-pointer transition duration-500">
                                {isAuthenticated &&
                                    <div className="px-4 py-1 rounded-xl w-max  place-self-end hover:text-white hover:drop-shadow-xl hover:cursor-pointer transition delay-50 duration-500">
                                        <Link href="/auth/dashboard">
                                            <div className="flex space-x-2">
                                                <span>Dashboard</span>
                                            </div>
                                        </Link>
                                    </div>
                                }
                                {
                                    isAuthenticated ?
                                        <span className="px-4 py-1 rounded-xl w-max place-self-en hover:text-white hover:drop-shadow-xl hover:cursor-pointer transition delay-50 duration-500" onClick={() => handleLogout()}>Logout</span>
                                        :
                                        <span className='pl-2'>
                                            <div className="flex space-x-2 px-4 py-1 rounded-xl w-max place-self-en hover:text-white hover:drop-shadow-xl hover:cursor-pointer transition delay-50 duration-500"
                                                onClick={() => {
                                                    sessionStorage.setItem("path", "/")
                                                    router.push("/login")
                                                }} >
                                                <UserIcon className="w-4" />
                                                <span>Login</span>
                                            </div>
                                        </span>
                                }
                                {
                                    !isAuthenticated &&
                                    <Link href="/register">
                                        <div className="flex space-x-2 px-4 py-1 rounded-xl w-max place-self-end hover:text-white hover:drop-shadow-xl hover:cursor-pointer transition delay-50 duration-500" >
                                            <UserIcon className="w-4" />
                                            <span>Sign Up</span>
                                        </div>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" hidden md:flex py-0.5">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center ">
                        <div className="flex items-center gap-x-2">
                            <Image
                                className="h-12 w-auto"
                                src="/assets/az_logo_250.png"
                                alt=""
                                width="100"
                                height="100"
                            />
                            <h1 className={`text-secondary tracking-wider font-semibold text-3xl ${montserrat.className}`}>{APP_NAME}</h1>
                        </div>
                        <div className={`flex items-center text-gray-dark ${montserratRegular.className}`}>
                            <Link href="/" className=" hover:text-white text-sm hover:bg-primary border-t-4 border-white hover:border-secondary py-5 px-5 transition duration-300 cursor-pointer">HOME</Link>
                            {/* <Link href="/about-us" className=" hover:text-white text-sm hover:bg-primary border-t-4 border-white hover:border-t-yellow-600 hover:outline-t-4 py-5 px-5 transition duration-200 cursor-pointer">ABOUT US</Link> */}
                            <Link href="/contact-us" className=" hover:text-white text-sm hover:bg-primary border-t-4 border-white hover:border-secondary hover:outline-t-4 py-5 px-5 transition duration-300 cursor-pointer">CONTACT US</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header