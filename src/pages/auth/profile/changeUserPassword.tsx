import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Button, Input } from '../../../../component'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { changePassword } from '../../../../api/auth'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'


function ChangeUserPassword() {
    const router = useRouter();

    const [user, setUser] = useState<any>({
        currentPassword: '',
        password: '',
        passwordConfirmation: ''
    })
    const [showPasswords, setShowPasswords] = useState<any>({
        currentPassword: true,
        password: true,
        passwordConfirmation: true
    })
    const [errors, setErrors] = useState<any>([])

    const { mutate, isLoading }: any = useMutation(changePassword, {
        onError: (err: any) => {
            const { status, data } = err.response
            if (status === 422) {
                setErrors(data)
            }
        },
        onSuccess: () => {
            setCookie('token', '')
            setCookie('role', '')
            router.push('/login')
        }
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
                        name='currentPassword'
                        value={user?.currentPassword}
                        type={showPasswords?.currentPassword ? 'password' : 'text'}
                        onChange={handleInputChange}
                    />
                    {
                        showPasswords.currentPassword ?
                            <EyeIcon className="w-5 mr-2 cursor-pointer absolute top-2 right-0" onClick={() => togglePassword('currentPassword')} />
                            :
                            <EyeSlashIcon className="w-5 mr-2 cursor-pointer absolute top-2 right-0" onClick={() => togglePassword('currentPassword')} />
                    }
                </div>
                <div className="text-red-500 text-sm">{errors?.currentPassword}</div>
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
                        name='passwordConfirmation'
                        value={user?.passwordConfirmation}
                        type={showPasswords?.passwordConfirmation ? 'password' : 'text'}
                        onChange={handleInputChange}
                    />
                    {
                        showPasswords?.passwordConfirmation ?
                            <EyeIcon className="w-5 mr-2 cursor-pointer absolute top-2 right-0" onClick={() => togglePassword('passwordConfirmation')} />
                            :
                            <EyeSlashIcon className="w-5 mr-2 cursor-pointer absolute top-2 right-0" onClick={() => togglePassword('passwordConfirmation')} />

                    }
                </div>
                <div className="text-red-500 text-sm">{errors?.passwordConfirmation}</div>
            </div>

            <Button label='Update' loading={isLoading} className='w-full' onClick={() => mutate(user)} />
        </div>
    )
}

export default ChangeUserPassword