import * as React from "react";
import { useState } from "react";
import { apiClient } from "../../../api";
import { Button, Input } from "../../components";
import ErrorMessage from "../../components/error_message";
import { useRouter } from "next/router";
import Image from "next/image";


export default function ResetPassword() {
    const router = useRouter()
    const { token: resetToken } = router?.query
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const [state, setState] = React.useState<any>({
        resetToken,
        email: "",
        password: "",
    });

    React.useEffect(() => {
        setState((prev: any) => ({ ...state, resetToken }))
    }, [resetToken])


    const handleResetPassword = async (e: any) => {
        e.preventDefault();
        setErrors([]);
        setLoading(true)
        try {
            const data: any = await apiClient.post(`/reset-password`, state);
            router.push('/login');
            setLoading(false)
        } catch (error: any) {
            let { data } = error.response
            setErrors(data)
            setLoading(false)
        }
    }
    return (
        <>
            <div className='min-h-screen flex'>
                <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
                    <div className='mx-auto w-full max-w-sm lg:w-96'>
                        <div>
                            <Image
                                className="h-12 w-auto"
                                src="/assets/bb-250.png"
                                alt="Logo"
                                width="100"
                                height="100"
                            />
                            <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
                                Reset Password
                            </h2>
                        </div>

                        <div className='mt-8'>
                            <div className='mt-6'>
                                <form action='#' method='POST' className='space-y-6'>
                                    <Input
                                        name="password"
                                        label='Email Address'
                                        type='email'
                                        value={state.email}
                                        onChange={(e: { target: { value: string } }) =>
                                            setState({ ...state, email: e.target.value })
                                        }
                                    />
                                    {
                                        errors && <ErrorMessage name="email" errors={errors} />
                                    }

                                    <Input
                                        name="password"
                                        type='password'
                                        label='Password'
                                        value={state.password}
                                        onChange={(e: { target: { value: string } }) =>
                                            setState({ ...state, password: e.target.value })
                                        }
                                    />
                                    {
                                        errors && <ErrorMessage name="password" errors={errors} />
                                    }
                                    <div>
                                        <Button
                                            fullWidth
                                            type='submit'
                                            label='Reset Password'
                                            loading={loading}
                                            onClick={handleResetPassword}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='hidden lg:block relative w-0 flex-1 contrast-50'>
                    <img
                        className='absolute inset-0 h-full w-full object-cover'
                        src='https://images.unsplash.com/photo-1627556704302-624286467c65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
                        alt=''
                    />
                </div>
            </div>
        </>
    );
}
