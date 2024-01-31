import { montserrat, nunitoSans } from '@/fonts'
import React from 'react'
import { checkSubset } from '../../utils'
import { useAuth } from '../../hooks/auth'
import { PencilIcon, PhoneIcon } from '@heroicons/react/24/outline'
import Button from '@/components/Button'
import CheckBox from './checkbox'
import { useMutation } from '@tanstack/react-query'
import { advertisementStatusChange } from '../../api/advertisement'
import { MdEmail } from 'react-icons/md'
import { FaSms } from 'react-icons/fa'

function AdvertisementCard({ advertisement, handleClick, refetch, isFrontPage = false }: any) {
    const { roles, user: { email } } = useAuth()
    const handleAdsPublishStatus = (e: any, id: number) => {
        const { checked } = e.target
        changeAdsPublishStatus({ id, status: checked })
    }
    const { mutate: changeAdsPublishStatus }: any = useMutation<any>(advertisementStatusChange,
        {
            onSuccess: () => {
                refetch();
            }
        }
    );

    return (
        <div className="p-3 bg-white">
            <div className="relative">
                <div className="absolute right-2 -bottom-10">
                    <div className="flex space-x-2">
                        {
                            (!isFrontPage && (checkSubset(["SUPERADMIN", "ADMIN"], roles) || advertisement?.user?.email == email)) &&
                            <Button
                                label=''
                                buttonType=""
                                icon={<PencilIcon className="w-4" />}
                                onClick={() => handleClick(advertisement?.id)}
                                tooltipMsg="Edit Advertisement"
                            />
                        }
                        {
                            !isFrontPage && (checkSubset(['SUPERADMIN', 'ADMIN'], roles) ?
                                <CheckBox label="" checked={advertisement.publish} onChange={(e: any) => handleAdsPublishStatus(e, advertisement?.id)} />
                                :
                                <CheckBox label="" checked={advertisement.publish} disabled />
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='  border-4 border-black shadow-xl hover:shadow-2xl transition duration-500 p-4 pl-8 cursor-pointer shadow-indigo-100 hover:shadow-indigo-300' id="advertisement-card">
                <div className="space-y-4" key={advertisement?.id}>
                    {/* <h1>{advertisement?.data}</h1> */}
                    <div className="">
                        <h1 className={`${montserrat.className} py-4 text-3xl`}>{advertisement?.companyName}</h1>
                        <h3 className='text-center bg-gray-dark text-white py-2 rounded-tr-2xl rounded-bl-2xl'>{advertisement?.name}</h3>

                        <div dangerouslySetInnerHTML={{ __html: advertisement?.data }}></div>
                        <span className='bg-secondary px-4 py-1 text-white rounded-xl text-sm'>Category: {advertisement?.advertisementType?.name}</span>
                    </div>

                    <div className="flex md:justify-between pt-2">
                        <p className=''>Province: {advertisement?.province?.name}</p>
                        <p className=''>District: {advertisement?.district?.name}</p>
                    </div>
                    <div className="flex flex-col justify-between space-y-1 text-xs">
                        <a href={`mailto:${advertisement?.email}`} className='flex items-center gap-x-2'><MdEmail className='w-4' /> {advertisement?.email}</a>
                        <a href={`sms:/${advertisement?.contactNumber}`} className='flex items-center gap-x-2'><FaSms className='w-4' /> {advertisement?.contactNumber}</a>
                        <a href={`tel:${advertisement?.contactNumber}`} className='flex items-center gap-x-2'><PhoneIcon className='w-4' /> {advertisement?.contactNumber}</a>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default AdvertisementCard