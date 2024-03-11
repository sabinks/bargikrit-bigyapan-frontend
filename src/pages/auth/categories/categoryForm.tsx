
import React from 'react'
import { Input } from '../../../components'

export default function CategoryForm({ state, setState, error }: any) {
    const handleChange = (e: any) => {
        let { name, value } = e.target
        setState((prev: any) => ({
            ...prev, [name]: value
        }))
    }

    return (
        <div className="space-y-2">
            <Input
                label="Name"
                name='name'
                type='text'
                placeholder=''
                value={state?.name}
                onChange={handleChange}
            />
            <p className='text-red-400 text-sm'>{error?.name}</p>
        </div>
    )
}