import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { getCountries, getProvinces, getProvincesByCountryId } from '../../../api'
import { getAdvertisementTypes } from '../../../../api/advertisement';
import Dropdown from "@/components/dropDown";
import { Input } from '../../../components';
import { useAuth } from '../../../../hooks/auth';
import Editor from '@/components/editor';

export default function AdvertisementsForm({ state, setState, error, edit }: any) {
    const { roles, user: { email, name, contactNumber }, getUserDetails } = useAuth()
    const [adsType, setAdsType] = useState<any>([])
    const [countries, setCountries] = useState<any>([])
    const [provinces, setProvinces] = useState<any>([])
    const [districts, setDistricts] = useState<any>([])
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
        console.log(provinces);
        setState((prev: any) => ({
            ...prev, province, provinceId: province?.id
        }))
        console.log(tempProvince);

        if (tempProvince && tempProvince[0]?.districtList) {
            setState((prev: any) => ({
                ...prev, district: tempProvince[0].districtList.length > 0 ? tempProvince[0].districtList[0] : null,
                districtId: tempProvince[0].districtList.length > 0 ? tempProvince[0].districtList[0].id : 0
            }))
            setDistricts(tempProvince[0].districtList)
        }
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
                        charLimit={500}
                        label='Content'

                        value={state?.data ? state?.data : ""}
                        onChange={onEditorContentChanged}
                        defaultValue={state?.data}
                    />
                    <p className='text-red-400 text-sm'>{error?.data}</p>
                </div>
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
