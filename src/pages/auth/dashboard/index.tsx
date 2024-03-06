import React, { useEffect, useState } from 'react'
import { checkSubset } from '@/utils';
import { useAuth } from '../../../../hooks/auth'
import Dashboard from './dashboard';
import AdminDashboard from './adminDashboard';
import Modal from '@/components/modal';
import Head from 'next/head';

function Index() {
    const { roles, user: { canPublish, email } } = useAuth()
    let [isOpen, setIsOpen] = useState(false)
    useEffect(() => {

        if (!canPublish && email) {
            setIsOpen(true)
        }
    }, [canPublish, email])

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
                <Modal isVisible={isOpen} onClose={() => setIsOpen(false)} isPrimaryButtonVisible={false} isSecondaryButtonVisible={false}
                    bodyAlign='text-center'
                    title='Dear valued User / Partner'>
                    <div className=" tracking-wide py-2 text-gray-dark text-sm">
                        <p className='text-sm py-1 text-gray-dark'>
                            We kindly request that you upload the following documents for verification purposes: Citizenship ID, Passport, Driving License, or Company Registration.
                            Our administrative team will review the submitted documents, and upon verification, we will grant permission for advertisement publication through your dashboard.
                        </p>
                        <p className='text-sm py-1 text-gray-dark'>Please feel free to reach us if you require further information at <a className='underline text-blue-500' href="mailto:info@adzoner.com">info@adzoner.com</a>.</p>
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