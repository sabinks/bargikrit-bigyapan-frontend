import { montserrat, nunitoSans } from '@/fonts'
import React, { useState } from 'react'
import { checkSubset } from '@/utils'
import { useAuth } from '../../hooks/auth'
import { ArrowDownLeftIcon, ArrowLeftIcon, PencilIcon, PencilSquareIcon, PhoneIcon, StarIcon } from '@heroicons/react/24/outline'
import Button from '@/components/Button'
import CheckBox from './checkbox'
import { useMutation } from '@tanstack/react-query'
import { advertisementStatusChange } from '../../api/advertisement'
import { MdEmail } from 'react-icons/md'
import { FaIcons, FaSms } from 'react-icons/fa'
import { userFavouriteAdsChange } from '@/api'
import { BsFillStarFill, BsStarFill } from 'react-icons/bs'
import { BiGlobe } from 'react-icons/bi'
import Image from 'next/image'
import { BACKEND_URL } from '@/constants'
import Modal from './modal'

function AdvertisementCard({ advertisement, setAdvertisements, handleClick, refetch, isFrontPage = false, handleFavCheck }: any) {
    const { advertisementImages, categories } = advertisement
    const { roles, user: { email }, isAuthenticated } = useAuth()
    const handleAdsPublishStatus = (e: any, publish: boolean, id: number) => {
        changeAdsPublishStatus({ id, status: publish })
    }
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const { mutate: changeAdsPublishStatus }: any = useMutation<any>(advertisementStatusChange,
        {
            onSuccess: (res: any, variable: any) => {
                const { id, status } = variable
                setAdvertisements((prev: any) => (
                    prev.map((ad: any) => {
                        if (ad.id == id) {
                            return {
                                ...ad, publish: status
                            }
                        } else {
                            return ad
                        }
                    })
                ))
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
                    <div className="flex items-center space-x-2 pb-1">
                        {
                            (!isFrontPage && (checkSubset(["SUPERADMIN", "ADMIN"], roles) || advertisement?.user?.email == email)) &&
                            <div className="flex items-start">
                                <Button
                                    label=''
                                    buttonType="none"
                                    icon={<PencilSquareIcon className="w-4" />}
                                    onClick={() => handleClick(advertisement?.id)}
                                // tooltipMsg="Edit Advertisement"
                                />
                                {/* <div className="flex items-center animate-bounce border bg-primary text-xs rounded-md px-1 space-x-0.5 text-white">
                                    <ArrowLeftIcon className='w-3 h-3' /> Edit
                                </div> */}
                            </div>
                        }
                        {
                            !isFrontPage && ((checkSubset(['SUPERADMIN', 'ADMIN'], roles) || advertisement?.user?.email == email) &&
                                <div className="flex items-center">
                                    {/* <CheckBox name="publish" label="" checked={advertisement.publish} onChange={(e: any) => handleAdsPublishStatus(e, !advertisement?.publish, advertisement?.id)} /> */}
                                    {
                                        !advertisement.publish ?
                                            <div className="flex items-center animate-bounce border bg-secondary text-xs rounded-md px-1 py-0.5 space-x-0.5 text-accent1 cursor-pointer" onClick={(e: any) => handleAdsPublishStatus(e, !advertisement?.publish, advertisement?.id)}>
                                                Click To Publish
                                            </div>
                                            :
                                            <div className="flex items-center animate-bounce border bg-primary text-xs rounded-md px-1 py-0.5 space-x-0.5 text-white cursor-pointer" onClick={(e: any) => handleAdsPublishStatus(e, !advertisement?.publish, advertisement?.id)}>
                                                Published
                                            </div>
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='  border-4 border-black shadow-xl hover:shadow-2xl transition duration-500 p-4 pl-8 shadow-indigo-100 hover:shadow-indigo-300' id="advertisement-card">
                <div className="space-y-4" key={advertisement?.id}>
                    <div >
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
                                            onClick={(e: any) => {
                                                handleFavouriteClick(!advertisement?.favourite, advertisement?.id)
                                            }}
                                        // tooltipMsg="Favourite Advertisement"
                                        />
                                    }
                                </div>
                            </div>
                            <div className=" cursor-pointer" onClick={(e: any) => setModalOpen(true)}>
                                <h3 className='text-center bg-gray-dark text-white py-1 rounded-tr-2xl rounded-bl-2xl'>{advertisement?.name}</h3>

                                <div dangerouslySetInnerHTML={{ __html: advertisement?.data }} className='py-2'></div>

                                <div className="flex flex-row gap-2 items-center pb-2">
                                    {
                                        advertisementImages?.map((image: any) => {
                                            return <div className="rounded-md">
                                                <Image
                                                    className='object-contain'
                                                    src={`${BACKEND_URL}/public/advertisements/${image?.documentName}`}
                                                    height={50} width={50}
                                                    alt='Ads Image' />
                                            </div>
                                        })
                                    }
                                </div>
                                <h3 className='text-sm'>Categories</h3>
                                <div className='flex flex-wrap gap-2 text-black text-xs font-semibold'>{categories?.map(({ name }: any) => <span className="bg-secondary px-2 py-0.5 rounded-md">{name}</span>)}</div>
                            </div>
                        </div>

                        <div className="flex md:justify-between pt-2">
                            <p className=''>Province: {advertisement?.province?.name}</p>
                            {/* <p className=''>District: {advertisement?.district?.name}</p> */}
                        </div>
                    </div>

                    <div className="flex flex-row justify-between space-y-1 text-xs">
                        {
                            advertisement?.showEmail ?
                                <a href={`mailto:${advertisement?.email}`} className='flex items-center gap-x-2'><MdEmail className='w-5 h-5' /></a>
                                : <a className='flex items-center gap-x-2'><MdEmail className='w-5 h-5 text-gray-200' /></a>
                        }
                        {/* {advertisement?.email} */}

                        {
                            advertisement?.showWebsite ?
                                <a href={`${advertisement?.website}`} target='_blank' className='flex items-center gap-x-2'><BiGlobe className='w-5 h-5' /></a>
                                : <a className='flex items-center gap-x-2'><BiGlobe className='w-5 h-5 text-gray-200' /></a>
                        }
                        {
                            advertisement?.showContactNumber ?
                                <a href={`sms:/${advertisement?.contactNumber}`} className='flex items-center gap-x-2'><FaSms className='w-5 h-5' /></a>
                                : <a className='flex items-center gap-x-2'><FaSms className='w-5 h-5 text-gray-200' /></a>
                        }
                        {
                            advertisement?.showContactNumber ?
                                <a href={`tel:${advertisement?.contactNumber}`} className='flex items-center gap-x-2'><PhoneIcon className='w-5 h-5' /></a>
                                : <a className='flex items-center gap-x-2'><PhoneIcon className='w-5 h-5 text-gray-200' /></a>
                        }
                    </div>
                </div>
            </div >
            <Modal isVisible={modalOpen} onClose={() => setModalOpen(false)} isPrimaryButtonVisible={false} secondaryButtonLabel="Close">
                <div className="grid grid-cols-1 lg:grid-cols-2 pt-0 pb-12" id="modal-advertisement-card">
                    <div className="flex flex-row gap-2 items-center pb-2 justify-center">
                        {
                            advertisementImages?.map((image: any) => {
                                return <div className="rounded-md">
                                    <Image
                                        className='object-contain'
                                        src={`${BACKEND_URL}/public/advertisements/${image?.documentName}`}
                                        height={200} width={200}
                                        alt='Ads Image' />
                                </div>
                            })
                        }
                    </div>
                    <div className="">
                        <div className="">
                            <div className="flex items-center justify-between">
                                <div className=""></div>
                                <h1 className={`${montserrat.className} py-4 text-3xl font-semibold`}>{advertisement?.companyName}</h1>
                                <div className="">
                                    {
                                        isAuthenticated &&
                                        <Button
                                            label=''
                                            buttonType="none"
                                            icon={advertisement?.favourite ? <BsFillStarFill className="w-5 text-secondary" /> : <StarIcon className="w-5" />}
                                            className=''
                                            onClick={(e: any) => handleFavouriteClick(!advertisement?.favourite, advertisement?.id)}
                                        // tooltipMsg="Edit Advertisement"
                                        />
                                    }
                                </div>
                            </div>
                            <h3 className='text-center bg-gray-dark text-white py-1 rounded-tr-2xl rounded-bl-2xl'>{advertisement?.name}</h3>
                            <div dangerouslySetInnerHTML={{ __html: advertisement?.data }} className='py-2'></div>
                            <h3 className='text-sm'>Categories</h3>
                            <div className='flex flex-wrap gap-2 text-black text-xs font-semibold'>{categories?.map(({ name }: any) => <span className="bg-secondary px-2 py-0.5 rounded-md">{name}</span>)}</div>
                        </div>

                        <div className="flex md:justify-between pt-2">
                            <p className=''>Province: {advertisement?.province?.name}</p>
                            {/* <p className=''>District: {advertisement?.district?.name}</p> */}
                        </div>
                        <div className="flex flex-col justify-between space-y-1 text-xs">
                            <a href={`mailto:${advertisement?.email}`} className='flex items-center gap-x-2'><MdEmail className='w-5 h-5' /> {advertisement?.email}</a>
                            {
                                advertisement?.website != "null" && <a href={`${advertisement?.website}`} target='_blank' className='flex items-center gap-x-2'><BiGlobe className='w-5 h-5' /> {advertisement.website}</a>
                            }
                            <a href={`sms:/${advertisement?.contactNumber}`} className='flex items-center gap-x-2'><FaSms className='w-5 h-5' /> {advertisement?.contactNumber}</a>
                            <a href={`tel:${advertisement?.contactNumber}`} className='flex items-center gap-x-2'><PhoneIcon className='w-5 h-5' /> {advertisement?.contactNumber}</a>
                        </div>
                    </div>
                </div>
            </Modal >
        </div >
    )
}

export default AdvertisementCard