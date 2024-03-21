import React, { useEffect, useState } from 'react'
import { checkSubset } from '@/utils';
import { useAuth } from '../../../../hooks/auth'
import Dashboard from './dashboard';
import AdminDashboard from './adminDashboard';
import Modal from '@/components/modal';
import Head from 'next/head';
import Link from 'next/link';
import { inter, nunitoSans } from '@/fonts';

function Index() {
    const { roles, isAuthenticated, user: { canPublish, email }, getUserDetails } = useAuth()
    let [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        if (!canPublish && email) {
            setIsOpen(true)
        }
    }, [canPublish, email])

    useEffect(() => {
        getUserDetails()
    }, [isAuthenticated])

    return (
        <div>
            <Head>
                <title>Dashboard</title>
            </Head>
            {
                checkSubset(['SUPERADMIN', 'ADMIN'], roles) && <AdminDashboard />
            }
            {
                checkSubset(['PARTNER', 'USER'], roles) && <Dashboard />
            }
            {
                checkSubset(['PARTNER', 'USER'], roles) &&
                <Modal isVisible={isOpen} onClose={() => setIsOpen(false)} isPrimaryButtonVisible={false} isSecondaryButtonVisible={false}
                    bodyAlign='text-center'
                    title=''>
                    <div className=" tracking-wide py-2 text-gray-dark text-sm">
                        <h1 className={`text-4xl tracking-wider pb-2 ${nunitoSans.className}`}>Dear valued User/Partner</h1>
                        <p className={`text-2xl ${nunitoSans.className}`}>To post Ads, please verify yourself, upload one of the following documents</p>
                        <ul className='text-secondary py-4'>
                            <li>Citizenship ID</li>
                            <li>Driving License</li>
                            <li>Passport</li>
                            <li>Company Registration</li>
                        </ul>
                        <p className='text-sm py-1 text-gray-dark'>
                            {/* We kindly request that you upload the following id documents for verification purposes: Citizenship ID, Passport, Driving License, or Company Registration. */}
                            Our administrative team will review the submitted documents, and upon verification, we will allow permission for advertisement posts through your dashboard.
                        </p>
                        <p className='text-sm py-1 text-gray-dark'>Please feel free to reach us if you require further information at <a className='underline text-blue-500' href="mailto:info@adzoner.com">info@adzoner.com</a> or <Link href="/contact-us" className='cursor-pointer underline text-blue-500'>Contact Us</Link>.</p>
                        <div className="pt-4">
                            <p>Thank you for your cooperation and understanding.</p>
                            <p>Sincerely, Adzoner Team</p>
                        </div>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default Index