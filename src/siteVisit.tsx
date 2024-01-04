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
        // if (!localStorage.getItem("visit_count")) {
        let state = {
            ipAddress: ipAddress
        }
        await siteVisited(state)
        // await localStorage.setItem('visit_count', "1")
        // }
    }
    return (
        <div></div>
    )
}

export default SiteVisit