
import React, { useState } from 'react'
import { CheckBox, Input } from '../../../components'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'



export default function MemberForm({ state, setState, error, edit }: any) {
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
            // disabled={edit}
            />
            <p className='text-red-400 text-sm'>{error?.email}</p>

            {
                typeof state?.profile_image === 'string' &&
                <Image
                    src={`${state?.domain}${state?.image_path}${state?.profile_image}`}
                    width={100}
                    height={100}
                    alt={state?.profile_image}
                    className="m-2"
                />
            }
            {state?.profile_image != null && typeof state?.profile_image === 'object' &&
                <Image
                    src={URL.createObjectURL(state?.profile_image)}
                    width={100}
                    height={100}
                    alt={state?.profile_image}
                    className="m-2"
                />

            }

            {/* <Input
                label="Profile Image"
                name='profile_image'
                type='file'
                onChange={handleChange}
                multiple
            /> */}
            <p className='text-red-400 text-sm'>{error?.profile_image}</p>

        </div>
    )
}
