import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { getCountries, getProvinces, getProvincesByCountryId } from '@/api'
import { getAdvertisementTypes } from '@/api/advertisement';
import Dropdown from "@/components/dropDown";
import { Button, Input } from '../../../components';
import { useAuth } from '../../../../hooks/auth';
import Editor from '@/components/editor';
import Compressor from 'compressorjs';
import Image from 'next/image';
import { BACKEND_URL } from '@/constants';
import { ImageZoom } from '../dashboard/dashboard';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function AdvertisementsForm({ state, setState, error, edit }: any) {
    const { roles, user: { email, name, contactNumber }, getUserDetails } = useAuth()
    const [adsType, setAdsType] = useState<any>([])
    const [countries, setCountries] = useState<any>([])
    const [provinces, setProvinces] = useState<any>([])
    const [districts, setDistricts] = useState<any>([])
    const [imageRequirement, setImageRequirement] = useState<any>({ fileSize: 2048000, fileType: ['image/png', 'image/jpg', 'image/jpeg'] })
    const [imageErrors, setImageErrors] = useState<any>({})
    const onEditorContentChanged = (content: any) => {
        setState((prev: any) => ({ ...prev, data: content?.html }))
    };
    useQuery(
        ["advertisement-type"],
        getAdvertisementTypes, {
        onSuccess: (data) => {
            setAdsType(data)
        }
    })
    useEffect(() => {
        getUserDetails()
        if (!edit) {
            setState((prev: any) => ({
                ...prev, companyName: name, email, contactNumber
            }))
        }
    }, [email, name, contactNumber])

    useQuery(
        ["countries"],
        getCountries, {
        onSuccess: (data) => {
            setCountries(data)
        }
    })
    useQuery(
        ["get-provinces", state?.countryId],
        getProvincesByCountryId, {
        onSuccess: (data) => {
            if (data) {
                setProvinces(data)
                setDistricts([])
            } else {
                setState((prev: any) => ({
                    ...prev, provice: null, proviceId: 0, district: null, districtId: 0
                }))
                setProvinces([])
                setDistricts([])
            }
        },
        enabled: state?.countryId ? true : false
    })
    async function handleCountrySelected(country: any) {
        setState((prev: any) => ({
            ...prev, country, countryId: country?.id,
            province: null, provinceId: 0, district: null, districtId: 0,
        }))
        setProvinces([])
    }
    function handleProviceSelected(province: any) {
        setDistricts([])
        const tempProvince = provinces.filter((data: any) => data.id == province.id)
        setState((prev: any) => ({
            ...prev, province, provinceId: province?.id
        }))

        if (tempProvince && tempProvince[0]?.districtList) {
            setState((prev: any) => ({
                ...prev, district: tempProvince[0].districtList.length > 0 ? tempProvince[0].districtList[0] : null,
                districtId: tempProvince[0].districtList.length > 0 ? tempProvince[0].districtList[0].id : 0
            }))
            setDistricts(tempProvince[0].districtList)
        }
    }
    const handleAdvertisementImages = (e: any) => {
        setState((prev: any) => ({
            ...prev, adImages: []
        }))
        setImageErrors({})
        const files = e.target.files;
        if (files.length > 3) {
            setImageErrors((prev: any) => ({
                ...prev, maxFileUpload: 'Max 3 images can be uploaded.'
            }))
        }
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            if (file.size > imageRequirement.fileSize) {
                setImageErrors((prev: any) => ({
                    ...prev, fileSize: 'File upload size limit is 2MB.'
                }))
            }
            if (!imageRequirement.fileType.includes(file.type)) {
                setImageErrors((prev: any) => ({
                    ...prev, fileType: 'Please upload file type of: jpg, png.'
                }))
            }
        }
        if (true) {
            setState((prev: any) => ({
                ...prev, adImages: []
            }))
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                let quality = 1;
                switch (true) {
                    case file.size >= 1536000 && file.size <= 2048000:
                        quality = 0.4; break;
                    case file.size >= 1024000 && file.size < 1536000:
                        quality = 0.6; break;
                    case file.size >= 512000 && file.size < 1024000:
                        quality = 0.8; break;
                    default:
                        quality = 1; break;
                }
                if (true) {
                    setState((prev: any) => ({
                        ...prev, adImages: [...prev.adImages, file]
                    }))
                } else {
                    new Compressor(file, {
                        quality: quality,
                        success(result) {
                            setState((prev: any) => ({
                                ...prev, adImages: [...prev.adImages, result]
                            }))
                        },
                        error(err) {
                            console.log(err.message);
                        },
                    });
                }
            }
        }
    }
    const handleDelete = (id: number) => {
        let newDocuments = state.advertisementImages.filter((document: any) => document.id != id)
        setState((prev: any) => ({
            ...prev, advertisementImages: newDocuments, imageRemoveIds: [...prev.imageRemoveIds, id]
        }))
    }

    return (
        <div className='space-y-4 mb-4'>
            <div className="border rounded-md p-2 space-y-2 bg-gray-light">
                <div className="">
                    <Input
                        name="companyName"
                        label='Company Name'
                        placeholder=''
                        type="text"
                        value={state?.companyName}
                        onChange={(e: any) => setState({ ...state, companyName: e.target.value })}
                    />
                    <p className='text-red-400 text-sm'>{error?.companyName}</p>
                </div>
                <div className="">
                    <Input
                        name="name"
                        label='Advertisement Name'
                        placeholder=''
                        type="text"
                        value={state?.name}
                        onChange={(e: any) => setState({ ...state, name: e.target.value })}
                    />
                    <p className='text-red-400 text-sm'>{error?.name}</p>
                </div>
            </div>

            <div className="border rounded-md p-2 space-y-4 bg-gray-light">
                <div className="">
                    <Dropdown label='Advertisement Type' data={adsType} selectedValue={state?.advertisementType} onChange={(advertisementType: any) => {
                        setState((prev: any) => ({
                            ...prev, advertisementType: advertisementType, advertisementTypeId: advertisementType?.id
                        }))
                    }} />
                    <p className='text-red-400 text-sm'>{error?.advertisementTypeId}</p>
                </div>

                <div className="">
                    <Dropdown label='Country' data={countries} selectedValue={state?.country} onChange={(country: any) => {
                        handleCountrySelected(country);
                    }} />
                    <p className='text-red-400 text-sm'>{error?.countryId}</p>
                </div>
                <div className="">
                    <Dropdown label='Province' data={provinces} selectedValue={state?.province} onChange={(province: any) => {
                        handleProviceSelected(province);
                    }} />
                    <p className='text-red-400 text-sm'>{error?.provinceId}</p>
                </div>

                <div className="">
                    <Dropdown label='District' data={districts} selectedValue={state?.district} onChange={(district: any) => {
                        setState((prev: any) => ({
                            ...prev, district, districtId: district?.id
                        }))
                    }} />
                    <p className='text-red-400 text-sm'>{error?.districtId}</p>
                </div>
            </div>
            <div className="border rounded-md p-2">

                <div className="">
                    <Editor
                        charLimit={3000}
                        label='Content'
                        value={state?.data ? state?.data : ""}
                        onChange={onEditorContentChanged}
                        defaultValue={state?.data}
                    />
                    <p className='text-red-400 text-sm'>{error?.data}</p>
                </div>
            </div>
            <div className="border rounded-md p-2 space-y-2 bg-gray-light">
                <div className="">
                    <Input
                        name="advertisementImages"
                        label='Advertisement Images'
                        placeholder=''
                        type="file"
                        onChange={(e: any) => {
                            handleAdvertisementImages(e)
                        }}
                    />
                    <p className='text-red-400 text-sm'>{error?.companyName}</p>
                </div>
            </div>
            <div className="flex flex-row gap-2 items-center pb-2 justify-center">
                {
                    state?.advertisementImages?.map((image: any) => {
                        return <div className="rounded-md">
                            <ImageZoom className='object-contain'
                                src={`${BACKEND_URL}/public/advertisements/${image?.documentName}`}
                                height={800} width={800}
                                alt='Ads Image' />
                            <Button className='text-red-500' buttonType='none' icon={<TrashIcon className='w-4 h-4' />}
                                onClick={(e: any) => handleDelete(image?.id)} />

                            {/* <Image
                                className='object-contain'
                                src={`${BACKEND_URL}/public/advertisements/${image?.documentName}`}
                                height={200} width={200}
                                alt='Ads Image' /> */}
                        </div>
                    })
                }
            </div>
            <div className="border rounded-md p-2 bg-gray-light">
                <h1 className=''>Footer</h1>
                <div className="">
                    <Input
                        name="email"
                        label='Email'
                        placeholder=''
                        type="text"
                        value={state?.email}
                        onChange={(e: any) => setState({ ...state, email: e.target.value })}
                    />
                    <p className='text-red-400 text-sm'>{error?.email}</p>
                </div>
                <div className="">
                    <Input
                        name="website"
                        label='Website'
                        placeholder=''
                        type="text"
                        value={state?.website}
                        onChange={(e: any) => setState({ ...state, website: e.target.value })}
                    />
                    <p className='text-red-400 text-sm'>{error?.website}</p>
                </div>
                <div className="">
                    <Input
                        name="contactNumber"
                        label='Contact Number'
                        placeholder=''
                        type="text"
                        value={state?.contactNumber}
                        onChange={(e: any) => setState({ ...state, contactNumber: e.target.value })}
                    />
                    <p className='text-red-400 text-sm'>{error?.contactNumber}</p>
                </div>
            </div>
        </div>
    )
}
