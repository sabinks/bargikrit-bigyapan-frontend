import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Button, Input } from '../../../../component'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { changePassword } from '../../../../api/auth'


function ChangeUserPassword() {

    const [user, setUser] = useState<any>({
        current_password: '',
        password: '',
        password_confirmation: ''
    })
    const [showPasswords, setShowPasswords] = useState<any>({
        current_password: true,
        password: true,
        password_confirmation: true
    })
    const [errors, setErrors] = useState<any>([])

    const { mutate, isLoading }: any = useMutation(changePassword, {
        onError: (err: any) => {
            const { status, data } = err.response
            if (status === 422) {
                setErrors(data)
            }
        },
        onSuccess: () => setErrors("")
    })

    const handleInputChange = (e: any) => {
        let { name, value } = e.target;
        setUser((prev: any) => ({
            ...prev, [name]: value,
        }));
    };

    // const handlePasswordChange = () => {
    //     mutate({ ...user })
    // }

    const togglePassword = (name: string) => {
        setShowPasswords({ ...showPasswords, [name]: !showPasswords?.[name] })
    }

    return (
        <div className='space-y-2'>
            <div>
                <div className="text-sm font-semibold">Current Password</div>
                <div className="relative w-full items-center">
                    <Input
                        name='current_password'
                        value={user?.current_password}
                        type={showPasswords?.current_password ? 'password' : 'text'}
                        onChange={handleInputChange}
                    />
                    {
                        showPasswords.current_password ?
                            <EyeIcon className="w-5 mr-2 cursor-pointer absolute top-2 right-0" onClick={() => togglePassword('current_password')} />
                            :
                            <EyeSlashIcon className="w-5 mr-2 cursor-pointer absolute top-2 right-0" onClick={() => togglePassword('current_password')} />
                    }
                </div>
                <div className="text-red-500 text-sm">{errors?.current_password}</div>
            </div>
            <div>
                <div className="text-sm font-semibold">New Password</div>
                <div className="relative w-full items-center">
                    <Input
                        name='password'
                        value={user?.password}
                        type={showPasswords?.password ? 'password' : 'text'}
                        onChange={handleInputChange}
                    />
                    {
                        showPasswords?.password ?
                            <EyeIcon className="w-5 mr-2 cursor-pointer absolute top-2 right-0" onClick={() => togglePassword('password')} />
                            :
                            <EyeSlashIcon className="w-5 mr-2 cursor-pointer absolute top-2 right-0" onClick={() => togglePassword('password')} />
                    }

                </div>
                <div className="text-red-500 text-sm">{errors?.password}</div>
            </div>
            <div>
                <div className="text-sm font-semibold">Confirm  Password</div>
                <div className="relative w-full items-center">
                    <Input
                        name='password_confirmation'
                        value={user?.password_confirmation}
                        type={showPasswords?.password_confirmation ? 'password' : 'text'}
                        onChange={handleInputChange}
                    />
                    {
                        showPasswords?.password_confirmation ?
                            <EyeIcon className="w-5 mr-2 cursor-pointer absolute top-2 right-0" onClick={() => togglePassword('password_confirmation')} />
                            :
                            <EyeSlashIcon className="w-5 mr-2 cursor-pointer absolute top-2 right-0" onClick={() => togglePassword('password_confirmation')} />

                    }
                </div>
                <div className="text-red-500 text-sm">{errors?.password_confirmation}</div>
            </div>

            <Button label='Update' loading={isLoading} className='w-full' onClick={() => mutate(user)} />
        </div>
    )
}

export default ChangeUserPassword