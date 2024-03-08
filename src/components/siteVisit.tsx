'use client'
import { siteVisited } from '@/api'
import React, { useEffect } from 'react'

function SiteVisit() {
    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then((data: any) => {
                let ipAddress = data.ip ? data.ip : ""
                handleCAllBack(ipAddress)
            })
            .catch(error => console.log(error))
    }, [])

    const handleCAllBack = async (ipAddress: string) => {
        let state = {
            ipAddress: ipAddress
        }
        if (!sessionStorage.getItem('count')) {
            sessionStorage.setItem('count', '1')
            await siteVisited(state)
        }
    }
    return (
        <div></div>
    )
}

export default SiteVisit