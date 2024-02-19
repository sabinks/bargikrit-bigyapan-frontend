import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useAuth } from "../../../hooks/auth";
import { Button, CheckBox, Input } from "../../components";
import Link from "next/link";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { userLogin } from "../../../api/auth";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import { APP_NAME } from "@/constants";
import { montserrat, nunitoSans, playFair, poppins } from "@/fonts";
import Image from "next/image";

// const SocialLogin = dynamic(
//     () => import("../../../components/socialLogin"),
//     { ssr: false }
// )

export default function Login() {
    const { signin } = useAuth();
    const [isPassword, setIsPassword] = React.useState(true);
    const router = useRouter();

    const [state, setState] = React.useState<any>({
        email: "",
        password: "",
        remember: true,
    });
    const [error, setError] = useState<any>();


    const { isLoading, mutate } = useMutation<any, Error>(userLogin, {
        onSuccess: (data: any) => {
            const { role, token } = data;
            sessionStorage.setItem('token', token)
            setCookie("token", token);
            // setCookie("role", role)
            // setCookie("permissions", JSON.stringify(permissions))
            signin(role, token, () => {

                let prev: any = sessionStorage.getItem("path");
                if (!prev) {
                    prev = "/"
                }
                sessionStorage.removeItem("path");
                router.push(prev);
            });
        },
        onError: ({ response }: any) => {
            (response.status === 422 || response.status === 401) &&
                setError(response.data);
        },
    });

    const handleLogin = async (e: any) => {
        mutate(state);
    };
    return (
        <>
            <div className="min-h-screen flex">
                <div className="flex items-center w-full xl:w-1/3 justify-center px-12 py-12">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <Link href={'/'}>
                                <div className="flex flex-row gap-x-4 items-center">
                                    <Image
                                        className="h-24 w-auto"
                                        src="/assets/bb-250.png"
                                        alt="Logo"
                                        width="100"
                                        height="100"
                                    />
                                    <h2 className={`text-4xl tracking-wider font-extrabold text-secondary ${montserrat.className}`}>
                                        {APP_NAME}
                                    </h2>
                                </div>
                            </Link>

                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>

                        <div className="mt-8">
                            <div className="mt-6 space-y-3">
                                <Input
                                    name="email"
                                    label="Email Address"
                                    type="email"
                                    value={state.email}
                                    placeholder=""
                                    onChange={(e: { target: { value: string } }) =>
                                        setState({ ...state, email: e.target.value })
                                    }
                                />
                                <div className="relative w-full">
                                    <Input
                                        label="Enter password"
                                        name="password"
                                        placeholder=""
                                        type={isPassword ? "password" : "text"}
                                        value={state.password}
                                        onChange={(e: { target: { value: string } }) =>
                                            setState({ ...state, password: e.target.value })
                                        }
                                    />
                                    {isPassword ? (
                                        <EyeIcon
                                            className="w-5 mr-2 cursor-pointer absolute top-8 right-0 "
                                            onClick={() => setIsPassword(!isPassword)}
                                        />
                                    ) : (
                                        <EyeSlashIcon
                                            className="w-5 mr-2 cursor-pointer absolute top-8 right-0 "
                                            onClick={() => setIsPassword(!isPassword)}
                                        />
                                    )}
                                </div>
                                <div className="text-red-500 text-sm">
                                    {error?.password || error?.message}
                                </div>

                                <div className="flex items-center justify-between">
                                    <Link href="/forgot-password">Forgot your password?</Link>
                                </div>

                                <div>
                                    <Button
                                        fullWidth
                                        type="submit"
                                        label="Sign In"
                                        loading={isLoading}
                                        onClick={handleLogin}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center bg-secondary mt-4 rounded-md text-white py-1 hover:scale-105 font-medium transition duration-500">
                            <Link href="/register" >
                                <span className='text-base font-medium'>Register</span>
                            </Link>
                        </div>
                        {/* <div>
                            <SocialLogin />
                        </div> */}
                    </div>
                </div>
                <div className="hidden lg:block relative w-0 flex-1 contrast-50">
                    <Image
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/assets/market-5000694_1920.png"
                        alt="Advertisement"
                        width="1000"
                        height="1000"
                    />
                </div>
            </div>
        </>
    );
}
