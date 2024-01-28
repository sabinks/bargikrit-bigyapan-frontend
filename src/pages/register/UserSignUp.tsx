import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { userRegisterForm } from "../../../api";
import { useRouter } from "next/router";
import Input from "../../../component/Input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Button from "../../../component/Button";
import { classNames } from "../../../utils";

export default function UserSignUp() {
    const router = useRouter()
    const [state, setState] = useState<any>({ data: { mobile: '' } })
    const [isChecked, setChecked] = useState(false)
    const [error, setError] = useState<any>()

    const { mutate, isLoading } = useMutation(userRegisterForm, {
        onSuccess: () => router.push('login'),
        onError: (err: any) => {
            const { status, data } = err.response
            if (status === 422) {
                setError(data)
            }
        }
    })

    const [showPasswords, setShowPasswords] = useState<any>({
        password: true,
        confirmPassword: true
    })

    const handleChange = (e: any) => {
        const { name, value, checked, type } = e.target
        if (type == 'checkbox') {
            setChecked(checked)
        }
        else {
            setState((prev: any) => ({
                ...prev, [name]: value
            }))
        }
    }

    const handleSubmit = () => {
        let submitData = {
            state: { ...state },
            route: "user-register"
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
        <div className="space-y-2">
            <div className="">
                <Input type='text' label="Name" name="name" onChange={handleChange} placeholder='' value={state?.name} />
                <p className="text-red-400 text-sm">{error?.name}</p>
            </div>
            <div className="">
                <Input type='text' label="Email" name="email" onChange={handleChange} placeholder='' value={state?.email} />
                <p className="text-red-400 text-sm">{error?.email}</p>
            </div>
            <div className="">
                <Input type='text' label="Contact Number" name="contactNumber" onChange={handleChange} placeholder='' value={state?.contactNumber} />
                <p className="text-red-400 text-sm">{error?.contactNumber}</p>
            </div>
            <div className="pb-4">
                <label className={"block text-sm font-semibold text-gray-700"}>
                    New Password
                </label>
                <div className="relative items-center">
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
            {/* <div>
                <div className="text-sm font-semibold">Confirm  Password</div>
                <div className="relative w-full items-center">
                    <Input
                        name='confirmPassword'
                        type={showPasswords?.confirmPassword ? 'password' : 'text'}
                        onChange={handleChange}
                    />
                    {
                        showPasswords?.confirmPassword ?
                            <EyeIcon className="w-5 mr-2 cursor-pointer absolute top-2 right-0" onClick={() => togglePassword('confirmPassword')} />
                            :
                            <EyeOffOutline className="w-5 mr-2 cursor-pointer absolute top-2 right-0" onClick={() => togglePassword('confirmPassword')} />
                    }
                </div>
                <div className="text-red-500 text-sm">{errors?.confirmPassword}</div>
            </div>

            <p className="text-red-400 text-sm">{error?.password}</p> */}


            {/* <CheckBox
                label="Do you have any referial Code"
                name="doHaveReferialCode"
                labelClassName="font-bold"
                onChange={handleChange}
                checked={isChecked}
            /> */}
            {/* {
                false && isChecked && (
                    <>
                        <Input label="Refer Code" name="referral_code" onChange={handleChange} />
                        <p className="text-red-400 text-sm">{error?.referCode}</p>
                    </>
                )
            } */}
            {/* <div className="text-sm">
                By clicking Sign Up, you agree to our <Link to={`${frontendUrl}/terms-and-conditions`} target="_blank" className='text-blue-500 underline font-semibold'>
                    Terms, Privacy Policy and Cookies Policy
                </Link>.
            </div> */}

            <Button buttonType="" label="Sign Up" loading={isLoading} onClick={handleSubmit} className='w-full' />
        </div>
    );
}
