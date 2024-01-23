import { useMutation } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";
import { apiClient } from "../../../api";
import { useRouter } from "next/router";
import { Button, Input } from "../../../component";
import ErrorMessage from "../../../component/error_message";


export default function ForgotPassword() {
    const router = useRouter();
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const [state, setState] = React.useState<any>({
        email: "",
    });

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setErrors([]);
        setLoading(true)
        try {
            const data: any = await apiClient.post(`/forgot-password`, {
                email: state.email
            });
            console.log(data);

            const { message } = data
            setLoading(false)
            // router.push("/login");
        } catch (error: any) {
            let { data } = error.response
            setErrors(data)
            setLoading(false)
        }
    };
    return (
        <>
            <div className='min-h-screen flex'>
                <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
                    <div className='mx-auto w-full max-w-sm lg:w-96'>
                        <div>
                            <img
                                className='h-12 w-auto'
                                src='/assets/bb-250.png'
                                alt='Workflow'
                            />
                            <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
                                Forgot Password
                            </h2>
                        </div>

                        <div className='mt-8'>
                            <div className='mt-6'>
                                <form action='#' method='POST' className='space-y-6'>
                                    <Input
                                        name="email"
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
                                    <div>
                                        <Button
                                            fullWidth
                                            type='submit'
                                            label='Reset Password'
                                            loading={loading}
                                            onClick={handleLogin}
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
