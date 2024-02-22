import React, { useEffect, useState } from 'react'
import { checkSubset } from '@/utils';
import { useAuth } from '../../../../hooks/auth'
import Dashboard from './dashboard';
import AdminDashboard from './adminDashboard';
import Modal from '@/components/modal';

function Index() {
    const { roles, user: { canPublish, email } } = useAuth()
    let [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        if (!canPublish && email) {
            setIsOpen(true)
        }
    }, [canPublish])

    return (
        <div>
            {
                checkSubset(['SUPERADMIN', 'ADMIN'], roles) && <AdminDashboard />
            }
            {
                checkSubset(['PARTNER', 'USER'], roles) && <Dashboard />
            }
            {
                <Modal isVisible={isOpen} onClose={() => setIsOpen(false)} isPrimaryButtonVisible={false} isSecondaryButtonVisible={false}
                    bodyAlign='text-center'
                    title='User/Partner Document Required!'>
                    <p className='text-sm py-2 text-gray-dark'>
                        Dear user/partner, please upload documents as such as Citizenship, Passport, Driving License or Company Registration.
                        Our admin will check the documents, once satisfied, we will allow for advertiserment publish from your dashboard. Thank you.
                    </p>
                </Modal>
            }
        </div>
    )
}

export default Index