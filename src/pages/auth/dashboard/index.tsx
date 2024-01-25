import React from 'react'
import { useAuth } from '../../../../hooks/auth'
import PartnerDashboard from './PartnerDashboard';
import { checkSubset } from '../../../../utils';
import Dashboard from './Dashboard';
import UserDashboard from './UserDashboard';

function Index() {
    const { roles } = useAuth()
    console.log(roles);
    return (
        <div>
            {
                checkSubset(['SUPERADMIN', 'ADMIN'], roles) && <Dashboard />
            }
            {
                checkSubset(['PARTNER'], roles) && <PartnerDashboard />
            }
            {
                checkSubset(['USER'], roles) && <UserDashboard />
            }
        </div>
    )
}

export default Index