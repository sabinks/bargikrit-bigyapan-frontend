import { ArrowSmallUpIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react'

export default function MoveUp() {
    const [showTopBtn, setShowTopBtn] = useState("hidden")


    useEffect(() => {
        const height = window.innerHeight
        window.onscroll = () => {
            if (document.documentElement.scrollTop > height) {
                setShowTopBtn("block")
            }
            else {
                setShowTopBtn("hidden")
            }

        };
    }, [])

    return (
        <div className={`${showTopBtn} fixed bottom-3 right-5 flex space-x-3 p-2 rounded border cursor-pointer bg-third text-white z-50`}
            onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}
        >
            <ArrowSmallUpIcon className="w-5" />
            <span className="text-sm font-medium">Top</span>
        </div>
    )
}
