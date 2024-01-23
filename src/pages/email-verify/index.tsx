import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "../../../component";
import { useRouter } from "next/router";
import { apiClient } from "../../../api";
import Image from "next/image";


export default function MailVerification() {
    const router = useRouter();
    const { id, verification_token } = router?.query
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (id && verification_token) {
            handleVerifyMail()
        }
    }, [id, verification_token])

    const handleVerifyMail = async () => {
        try {
            setLoading(true)
            let res = await apiClient({
                method: 'GET',
                url: `/email/verify/${id}/${verification_token}`,
            })
            setLoading(false)
        } catch (error: any) {
            const { data } = error.response
            if (data?.status == 401) {
                setMessage(data.message);
            }
            setLoading(false)
        }
    }
    return (
        <div className='w-full h-screen border flex items-center'>
            <div className='mx-auto w-full max-w-sm'>
                <div className="flex space-x-5 items-center">
                    <Image
                        className="h-12 w-auto"
                        src="/assets/bb-250.png"
                        alt="Logo"
                        width="100"
                        height="100"
                    />
                    <h5 className='text-3xl font-extrabold text-gray-900'>
                        Account verified
                    </h5>

                </div>
                <div className="flex justify-center mt-4">
                    <Link href="/login">
                        <Button
                            label="Login"
                            buttonType="success"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}