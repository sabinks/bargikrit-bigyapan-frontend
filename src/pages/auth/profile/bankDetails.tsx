import { useEffect, useState } from 'react'

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Input } from '../../../../component';
import Select from 'react-select'
import { getList } from '../../../../api';
import { userBank } from '../../../../api/bank';



export default function BankDetail() {

    const [state, setState] = useState<any>()
    const [error, seterror] = useState<any>()

    useQuery(['get-user-bank'], getList, {
        onSuccess: (data) => {
            setState({ ...data?.data, account_type: { label: data?.data?.account_type, value: data?.data?.account_type } })
        }
    })

    const { isLoading, mutate } = useMutation<any, Error>(userBank, {
        onSuccess: () => seterror({}),
        onError: ({ response }: any) => {
            if (response.status == 422) {
                seterror(response.data)
            }
        }
    })



    const handleChange = (e: any) => {
        let { name, value } = e.target
        setState((prev: any) => ({
            ...prev, [name]: value
        }))
    }


    const handleClick = () => {
        mutate({ ...state, account_type: state?.account_type?.value })
    }


    return (
        <div className='space-y-2 w-full md:grid md:grid-cols-1 px-2 md:px-0'>
            <div className="space-y-2">
                <Input
                    label='Bank Name'
                    type="text"
                    name="name"
                    value={state?.name}
                    onChange={handleChange}
                />
                <p className='text-red-400 text-sm'>{error?.name}</p>
                <Input
                    label='Account Name'
                    type="text"
                    name="account_name"
                    value={state?.account_name}
                    onChange={handleChange}
                />
                <p className='text-red-400 text-sm'>{error?.account_name}</p>
                <Input
                    label='Account Number'
                    type="text"
                    name="account_number"
                    value={state?.account_number}
                    onChange={handleChange}
                />
                <p className='text-red-400 text-sm'>{error?.account_number}</p>

                <p className='text-sm font-semibold text-gray-700'>Select Account type</p>
                <Select
                    value={state?.account_type}
                    options={[{ label: "Saving", value: "Saving" },
                    { label: "Current", value: "Current" }]}
                    isMulti={false}
                    onChange={(value: any) => setState((prev: any) => ({ ...prev, account_type: value }))}
                    placeholder="Select Account-type"
                />
                <p className='text-red-400 text-sm'>{error?.account_type}</p>

                <Input
                    label='Branch/BSB'
                    type="text"
                    name="branch"
                    value={state?.branch}
                    onChange={handleChange}
                />
                <p className='text-red-400 text-sm'>{error?.branch}</p>

            </div>
            <Button label='Submit' onClick={handleClick} loading={isLoading} />
        </div>
    )
}
