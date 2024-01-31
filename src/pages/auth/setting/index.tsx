import React, { useState } from 'react'
import { Button, Input, PageTitle } from '../../../components'
import Image from 'next/image'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getList } from '../../../../api'
import { useAuth } from '../../../../hooks/auth'
// import { updateInfo } from '../../../../api/daludai'
import { APP_NAME } from '@/constants'

export default function Setting() {
    const { isAuthenticated } = useAuth()
    const [state, setState] = useState<any>()
    const [error, setError] = useState<any>()

    useQuery(['daludai-info'], getList, {
        onSuccess: (data) => {
            setState({ ...data?.data, ...data?.data?.company })
        },
        enabled: isAuthenticated
    })

    // const { mutate, isLoading } = useMutation(updateInfo, {
    //     onError: ({ response }: any) => {
    //         if (response.status == 422) {
    //             setError(response.data)
    //         }
    //     }
    // })

    const handleChange = (e: any) => {
        let { name, type, value, files } = e.target

        if (type === "file") {
            value = files[0]
        }
        setState((prev: any) => ({
            ...prev, [name]: value
        }))
    }

    return (
        <div className='w-full  lg:w-1/2 xl:w-1/3'>
            <PageTitle title={`${APP_NAME} Info`} />

            <div className='space-y-2 mt-4'>

                <Input
                    label="Name"
                    name='name'
                    type='text'
                    value={state?.name}
                    onChange={handleChange}
                />
                <p className='text-red-400 text-sm'>{error?.name}</p>
                <Input
                    label="Email"
                    name='email'
                    type='text'
                    value={state?.email}
                    onChange={handleChange}

                />
                <p className='text-red-400 text-sm'>{error?.email}</p>
                <Input
                    label="Contact Number"
                    name='contact_no'
                    type='text'
                    value={state?.contact_no}
                    onChange={handleChange}
                />
                <p className='text-red-400 text-sm'>{error?.contact_no}</p>

                {
                    typeof state?.logo === 'string' && state?.logo &&
                    <Image
                        src={`${state?.domain}${state?.logo_path}${state?.logo}`}
                        width={100}
                        height={100}
                        alt={state?.logo}
                        className="m-2"
                    />
                }
                {state?.logo != null && typeof state?.logo === 'object' &&
                    <Image
                        src={URL.createObjectURL(state?.logo)}
                        width={100}
                        height={100}
                        alt={state?.logo}
                        className="m-2"
                    />

                }
                {/* <Input
                    label="Company Logo"
                    name='logo'
                    type='file'
                    onChange={handleChange}
                /> */}
                <p className='text-red-400 text-sm'>{error?.logo}</p>

                <Input
                    label="PAN number"
                    name='pan'
                    type='number'
                    value={state?.pan}
                    onChange={handleChange}
                />
                <Input
                    label="VAT number"
                    name='vat'
                    type='number'
                    value={state?.vat}
                    onChange={handleChange}
                />

                {/* <Button
                    label='Update'
                    className='w-full'
                    onClick={() => mutate(state)}
                    loading={isLoading}
                /> */}
            </div>


        </div>
    )
}
