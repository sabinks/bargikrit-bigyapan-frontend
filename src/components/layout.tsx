import React from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Head from 'next/head'
import { APP_NAME } from '@/constants'

// const NavBar = dynamic(() => import('./navBar'), { ssr: false })

export default function Layout({ props }: any) {
    return (
        <div className="flex flex-col h-screen">
            <div className="w-full mb-auto">
                <Head>
                    <title>{APP_NAME}</title>
                </Head>
                {/* <NavBar /> */}
                <Header />
                <div className='px-3'>{props}</div>
            </div>
            <Footer />
        </div >
    )
}

