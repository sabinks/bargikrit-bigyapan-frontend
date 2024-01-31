import React from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/header'
import Footer from '@/components/footer'

// const NavBar = dynamic(() => import('./navBar'), { ssr: false })

export default function Layout({ props }: any) {
    return (
        <div className="flex flex-col h-screen">
            <div className="w-full mb-auto">
                {/* <NavBar /> */}
                <Header />
                <div className='px-3'>{props}</div>
            </div>
            <Footer />
        </div >
    )
}

