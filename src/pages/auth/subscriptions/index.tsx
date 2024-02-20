import React from 'react'
import { useAuth } from '../../../../hooks/auth'
import { useQuery } from '@tanstack/react-query'
import { checkSubset } from '@/utils'
import { useSubscription } from '../../../../hooks/subscription'
import { getSubscriptionTypeList, getCurrentSubscription } from '@/api/dashboard/membership'

function Subscription() {
    const { setSubscriptionState } = useSubscription()
    const { roles, user: { email, canPublish, name, contactNumber } } = useAuth()
    const { data: subscriptionList } = useQuery(['subscription-list'], getSubscriptionTypeList, {
        onSuccess: (res: any) => {
            setSubscriptionState((prev: any) => ({
                ...prev, subcriptionList: res
            }))
        }
    })
    const { data: subscription } = useQuery(['current-subscription'], getCurrentSubscription, {
        onSuccess: (res) => {
            setSubscriptionState((prev: any) => ({
                ...prev, subcription: res
            }))
        },
        enabled: checkSubset(['PARTNER'], roles) ? true : false
    })

    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Subscription Information</h3>
                {/* <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p> */}
            </div>
            <div className="mt-6 border-t border-gray-100">
                {/* <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Subscription Name</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{subscription?.subscriptionType?.name}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Advertisement Count</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{subscription?.subscriptionType?.adsCount}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Status</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{subscription?.status ? "Actve" : "Inactive"}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Expires At</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{subscription?.expiresAt}</dd>
                    </div>
                </dl> */}
            </div>
            <div className="container mx-auto w-3/4">
                <h2 className='font-bold text-center text-4xl py-4'>Subscription Plans</h2>
                <p className='text-center pb-8'>Choose an affordable plan that’s packed with the best features for engaging your audience.</p>
                <div className="grid grid-cols-3 gap-x-8">
                    {
                        subscriptionList?.map((subscription: any) => {
                            return <div className="border rounded-md p-8">
                                <h2 className='font-bold text-2xl py-2'>{subscription?.name}</h2>
                                {/* <p>Free Plan Detail</p> */}
                                <p className='py-4 flex items-center'><span className=' text-4xl pr-2 font-bold'>$1</span> /plan</p>
                                <div className="bg-secondary text-white rounded-md text-center py-2 cursor-pointer hover:text-gray-dark transition duration-300">
                                    Buy Plan
                                </div>
                                <div className="py-4">
                                    <p>{subscription?.adsCount} Advertisement</p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Subscription