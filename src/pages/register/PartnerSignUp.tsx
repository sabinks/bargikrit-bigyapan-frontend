import React, { useState } from 'react'
import { useMutation, useQuery } from "@tanstack/react-query";
import Input from '../../components/Input';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Button from '../../components/Button';
import { useRouter } from 'next/router';
import { userRegisterForm } from '../../api';

export default function PartnerSignUp({ partnerType }: any) {
    const router = useRouter()
    const [state, setState] = useState<any>({ data: { contactNumber: '' } })
    const [error, setError] = useState<any>()
    // const [partnerId, setPartnerId] = useState<any>()
    const [showPasswords, setShowPasswords] = useState<any>({
        password: true,
        confirmPassword: true
    })
    const { mutate, isLoading } = useMutation(userRegisterForm, {
        onSuccess: () => router.push('/login'),
        onError: (err: any) => {
            const { status, data } = err.response
            if (status === 422) {
                setError(data)
            }
        }
    })

    const handleChange = (e: any) => {
        const { name, value, checked, type } = e.target
        setState({ ...state, [name]: type === 'checkbox' ? checked : value })
    }

    const handleSubmit = () => {
        let submitData = {
            state: {
                ...state,
                // partner_type_id: partnerId?.value
            },
            route: "partner-register"
        }
        mutate(submitData)
    }

    const handleDataChange = (e: any) => {
        const { name, value } = e.target
        setState((prev: any) => ({
            ...prev, data: { ...prev.data, [name]: value }
        }))
    }

    const togglePassword = (name: string) => {
        setShowPasswords({ ...showPasswords, [name]: !showPasswords?.[name] })
    }

    return (
        <div className='space-y-2'>
            <div className="">
                <Input type='text' label="Company Name" name="name" onChange={handleChange} placeholder='' value={state?.name} />
                <p className="text-red-400 text-sm">{error?.name}</p>
            </div>
            <div className="">
                <Input type='text' label="Company Email" name="email" onChange={handleChange} placeholder='' value={state?.email} />
                <p className="text-red-400 text-sm">{error?.email}</p>
            </div>
            <div className="">
                <Input type='text' label="Company Contact Number" name="contactNumber" onChange={handleChange} placeholder='' value={state?.contactNumber} />
                <p className="text-red-400 text-sm">{error?.contactNumber}</p>
            </div>
            <div className="pb-4">
                <div className="text-sm font-semibold">New Password</div>
                <div className="relative w-full items-center">
                    <Input
                        name='password'
                        type={showPasswords?.password ? 'password' : 'text'}
                        placeholder=''
                        value={state?.password}
                        onChange={handleChange}
                    />
                    <p className="text-red-400 text-sm">{error?.password}</p>
                    {
                        showPasswords?.password ?
                            <EyeIcon className="w-5 mr-2 cursor-pointer absolute top-2 right-0" onClick={() => togglePassword('password')} />
                            :
                            <EyeSlashIcon className="w-5 mr-2 cursor-pointer absolute top-2 right-0" onClick={() => togglePassword('password')} />
                    }
                </div>
                {/* <div className="text-red-500 text-sm">{errors?.password}</div> */}
            </div>

            {/* {
                partnerType &&
                <ListBox
                    label='Partner Type'
                    people={partnerType}
                    placeholder="Select Partner-type"
                    selected={partnerId}
                    setSelected={setPartnerId}
                />
            }
            <p className="text-red-400 text-sm">{error?.partner_type_id}</p> */}

            {/* <div className="text-sm">
                By clicking Sign Up, you agree to our <Link to={`${frontendUrl}/terms-and-conditions`} target="_blank" className='text-blue-500 underline font-semibold'>
                    Terms, Privacy Policy and Cookies Policy
                </Link>.
            </div> */}
            <p className="text-red-500 text-sm text-center">Note: Partner can add three advertisements under Free Plan.</p>
            <Button buttonType="" label="Sign Up" loading={isLoading} onClick={handleSubmit} className="w-full" />
        </div>
    )
}
