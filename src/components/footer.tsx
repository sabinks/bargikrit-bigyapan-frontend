import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa6'

function Footer() {
    return (
        <div className='bg-primary'>
            <div className="container mx-auto pt-8 pb-4">
                <div className="flex flex-col items-center">
                    <div className="flex space-x-6 text-white">
                        <Link href="" className="rounded-full p-2"><FaFacebookF /></Link>
                        <Link href="" className="rounded-full p-2"><FaTwitter /></Link>
                        <Link href="" className="rounded-full p-2"><FaInstagram /></Link>
                        <Link href="" className="rounded-full p-2"><FaYoutube /></Link>
                    </div>
                    <div className="flex items-center space-x-4 text-white py-4">
                        {/* <Link href="/about-us" className='text-sm border-b-[1px] border-dotted'>About Us</Link>
                        <p className='text-xs opacity-50'>/</p> */}
                        <Link href="/contact-us" className="text-sm border-b-[1px] border-dotted">Contact Us</Link>
                        <Link href="/privacy-policy" className="text-sm border-b-[1px] border-dotted">Privacy Policy</Link>
                    </div>
                    <div className="text-white text-center text-sm tracking-wider">
                        Copyright © 2024 Ad Zoner . All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer