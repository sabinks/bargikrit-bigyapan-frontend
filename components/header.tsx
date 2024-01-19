"use client"
import { Dialog } from '@headlessui/react';
import { montserrat, montserratRegular } from '../app/fonts'
import React, { useState } from 'react'
import { BiCross } from 'react-icons/bi';
import { FaBars, FaCross, FaFacebookF, FaInstagram, FaMobile, FaPhone, FaYoutube } from 'react-icons/fa';
import { FaLocationPin, FaMessage, FaTwitter, FaXmark } from 'react-icons/fa6';
import { BsMarkdown } from 'react-icons/bs';
import Link from 'next/link';
function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about-us' },
        { name: 'Contact Us', href: '/contact-us' },
    ]
    return (
        <div>
            <nav className="flex md:hidden items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Java Energy Solution</span>
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt=""
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
                        <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                            {item.name}
                        </a>
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
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e: any) => setMobileMenuOpen(false)}
                                        className="-mx-3 block px-3 py-2 text-gray-light tracking-wide text-base text-gray-900 hover:bg-gray-50 hover:bg-primary hover:text-white transition duration-300"
                                    >
                                        {item.name}
                                    </a>
                                ))}
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
            <div className="hidden lg:flex bg-primary py-3">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="flex md:space-x-4 divide-x divide-white text-white">
                            <div className=""><FaFacebookF className=" hover:text-[#316FF6] transition duration-300 cursor-pointer" /></div>
                            <div className="pl-4"><FaTwitter className=" hover:text-[#1DA1F2] transition duration-300 cursor-pointer" /></div>
                            <div className="pl-4"><FaInstagram className=" hover:text-pink-600 transition duration-300 cursor-pointer" /></div>
                            <div className="pl-4"><FaYoutube className=" hover:text-[#CD201F] transition duration-300 cursor-pointer" /> </div>
                        </div>
                        <div className={`flex md:space-x-2 divide-x text-xs text-white`}>
                            <div className="flex items-center pl-2 hover:cursor-pointer"><FaMobile /><span className='pl-2'> +123-456-7890</span></div>
                            <div className="flex items-center pl-2 hover:cursor-pointer"><FaMessage /><span className='pl-2'> info@example.com</span></div>
                            <div className="flex items-center pl-2 hover:cursor-pointer"><FaLocationPin /><span className='pl-2'> 1234 Elm Street</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" hidden md:flex py-0.5">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center ">
                        <div className="">
                            <h1 className={`text-gray-dark tracking-wider font-semibold text-2xl ${montserrat.className}`}>JAVA ENERGY SOLUTION</h1>
                        </div>
                        <div className={`flex items-center text-gray-light tracking-wide ${montserratRegular.className}`}>
                            <Link href="/" className=" hover:text-white text-sm hover:bg-primary border-t-4 border-white hover:border-t-yellow-600 py-5 px-5 transition duration-200 cursor-pointer">HOME</Link>
                            <Link href="/about-us" className=" hover:text-white text-sm hover:bg-primary border-t-4 border-white hover:border-t-yellow-600 hover:outline-t-4 py-5 px-5 transition duration-200 cursor-pointer">ABOUT US</Link>
                            <Link href="/contact-us" className=" hover:text-white text-sm hover:bg-primary border-t-4 border-white hover:border-t-yellow-600 hover:outline-t-4 py-5 px-5 transition duration-200 cursor-pointer">CONTACT US</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header