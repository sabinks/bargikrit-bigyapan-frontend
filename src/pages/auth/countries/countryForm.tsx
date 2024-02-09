
import React, { useState } from 'react'
import { CheckBox, Input } from '../../../components'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function CountryForm({ state, setState, error, edit }: any) {
    const [isPassword, setIsPassword] = useState(true)
    const handleChange = (e: any) => {
        let { name, type, value, files, checked } = e.target

        if (type === "file") {
            value = files[0]
        }
        if (type === "checkbox") {
            value = checked
        }
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
