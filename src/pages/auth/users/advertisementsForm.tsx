import React, { useState } from 'react'
import { Input } from '../../../components';
import Editor from '../../../components/editor'
import { useQuery } from '@tanstack/react-query';
import { getAdvertisementTypes } from '../../../../api/advertisement';
import Dropdown from '../../../components/dropDown';
import { getProvinces } from '../../../../api';

export default function AdvertisementsForm({ state, setState, error }: any) {
    const [adsType, setAdsType] = useState<any>([])
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
    useQuery(
        ["get-provinces"],
        getProvinces, {
        onSuccess: (data) => {
            setProvinces(data)
        }
    })

    function handleProviceSelected(province: any) {
        setDistricts([])
        const tempProvince = provinces.filter((data: any) => data.id == province.id)
        if (tempProvince && tempProvince[0]?.districtList) {
            setState((prev: any) => ({
                ...prev, province, provinceId: province?.id,
                district: tempProvince[0].districtList[0],
                districtId: tempProvince[0].districtList[0].id
            }))
            setDistricts(tempProvince[0].districtList)
        }
    }

    return (
        <div className='space-y-2'>
            <Input
                name='name'
                label='Advertisement Name'
                type="text"
                value={state?.name}
                onChange={(e: any) => setState({ ...state, name: e.target.value })}
            />
            <p className='text-red-400 text-sm'>{error?.name}</p>

            <Dropdown label='Advertisement Type' data={adsType} selectedValue={state?.advertisementType} onChange={(advertisementType: any) => {
                setState((prev: any) => ({
                    ...prev, advertisementType: advertisementType, advertisementTypeId: advertisementType?.id
                }))
            }} />
            <p className='text-red-400 text-sm'>{error?.advertisementType}</p>

            <Dropdown label='Province' data={provinces} selectedValue={state?.province} onChange={(province: any) => {
                handleProviceSelected(province);
            }} />
            <p className='text-red-400 text-sm'>{error?.provice}</p>

            <Dropdown label='District' data={districts} selectedValue={state?.district} onChange={(district: any) => {
                setState((prev: any) => ({
                    ...prev, district, districtId: district?.id
                }))
            }} />
            <p className='text-red-400 text-sm'>{error?.district}</p>

            <Editor
                label='Content'
                value={state?.data ? state?.data : ""}
                onChange={onEditorContentChanged}
                defaultValue={state?.data}
            />
            <p className='text-red-400 text-sm'>{error?.data}</p>

        </div>
    )
}
