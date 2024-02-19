import { montserrat, nunitoSans } from '@/fonts'
import React from 'react'
import { checkSubset } from '@/utils'
import { useAuth } from '../../hooks/auth'
import { PencilIcon, PhoneIcon, StarIcon } from '@heroicons/react/24/outline'
import Button from '@/components/Button'
import CheckBox from './checkbox'
import { useMutation } from '@tanstack/react-query'
import { advertisementStatusChange } from '../../api/advertisement'
import { MdEmail } from 'react-icons/md'
import { FaSms } from 'react-icons/fa'
import { userFavouriteAdsChange } from '@/api'
import { BsFillStarFill, BsStarFill } from 'react-icons/bs'
import { BiGlobe } from 'react-icons/bi'

function AdvertisementCard({ advertisement, handleClick, refetch, isFrontPage = false, handleFavCheck }: any) {
    const { roles, user: { email }, isAuthenticated } = useAuth()
    const handleAdsPublishStatus = (e: any, publish: boolean, id: number) => {
        const { checked } = e.target
        changeAdsPublishStatus({ id, status: publish })
    }
    const { mutate: changeAdsPublishStatus }: any = useMutation<any>(advertisementStatusChange,
        {
            onSuccess: () => {
                refetch();
            }
        }
    );
    const handleFavouriteClick = (status: boolean, id: number) => {
        mutateUserFavouriteChange({ id, status })
    }
    const { mutate: mutateUserFavouriteChange }: any = useMutation<any>(userFavouriteAdsChange,
        {
            onSuccess: (res, variable: any) => {
                handleFavCheck(variable?.id, variable?.status)
            }
        }
    );

    return (
        <div className="p-2 bg-white">
            <div className="relative">
                <div className="absolute right-2 -bottom-10">
                    <div className="flex space-x-2">
                        {
                            (!isFrontPage && (checkSubset(["SUPERADMIN", "ADMIN"], roles) || advertisement?.user?.email == email)) &&
                            <Button
                                label=''
                                buttonType="none"
                                icon={<PencilIcon className="w-4" />}
                                onClick={() => handleClick(advertisement?.id)}
                                tooltipMsg="Edit Advertisement"
                            />
                        }
                        {
                            !isFrontPage && (checkSubset(['SUPERADMIN', 'ADMIN', 'PARTNER', 'USER'], roles) ?
                                <CheckBox label="" checked={advertisement.publish} onChange={(e: any) => handleAdsPublishStatus(e, !advertisement?.publish, advertisement?.id)} />
                                :
                                <CheckBox label="" checked={advertisement.publish} disabled />
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='  border-4 border-black shadow-xl hover:shadow-2xl transition duration-500 p-4 pl-8 cursor-pointer shadow-indigo-100 hover:shadow-indigo-300' id="advertisement-card">
                <div className="space-y-4" key={advertisement?.id}>
                    <div className="">
                        <div className="flex items-center justify-between">
                            <div className=""></div>
                            <h1 className={`${montserrat.className} py-4 text-3xl`}>{advertisement?.companyName}</h1>
                            <div className="">
                                {
                                    isAuthenticated &&
                                    <Button
                                        label=''
                                        buttonType="none"
                                        icon={advertisement?.favourite ? <BsFillStarFill className="w-5 text-secondary" /> : <StarIcon className="w-5" />}
                                        className=''
                                        onClick={(e: any) => handleFavouriteClick(!advertisement?.favourite, advertisement?.id)}
                                        tooltipMsg="Edit Advertisement"
                                    />
                                }
                            </div>
                        </div>
                        <h3 className='text-center bg-gray-dark text-white py-1 rounded-tr-2xl rounded-bl-2xl'>{advertisement?.name}</h3>

                        <div dangerouslySetInnerHTML={{ __html: advertisement?.data }} className='py-4'></div>
                        <span className='bg-secondary px-4 py-1 text-white rounded-xl text-sm'>Category: {advertisement?.advertisementType?.name}</span>
                    </div>

                    <div className="flex md:justify-between pt-2">
                        <p className=''>Province: {advertisement?.province?.name}</p>
                        {/* <p className=''>District: {advertisement?.district?.name}</p> */}
                    </div>
                    <div className="flex flex-col justify-between space-y-1 text-xs">
                        <a href={`mailto:${advertisement?.email}`} className='flex items-center gap-x-2'><MdEmail className='w-4' /> {advertisement?.email}</a>
                        {
                            advertisement?.website && <a href={`${advertisement?.website}`} target='_blank' className='flex items-center gap-x-2'><BiGlobe className='w-4' /> {advertisement.website}</a>
                        }
                        <div className="flex flex-row justify-between gap-x-2">
                            <a href={`sms:/${advertisement?.contactNumber}`} className='flex items-center gap-x-2'><FaSms className='w-4' /> {advertisement?.contactNumber}</a>
                            <a href={`tel:${advertisement?.contactNumber}`} className='flex items-center gap-x-2'><PhoneIcon className='w-4' /> {advertisement?.contactNumber}</a>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default AdvertisementCard