import { GoogleLogin } from '@react-oauth/google';
import React, { useCallback, useState } from 'react'
import { IResolveParams, LoginSocialFacebook, LoginSocialGoogle, LoginSocialLinkedin, LoginSocialTwitter } from 'reactjs-social-login';
import jwt_decode from "jwt-decode";

import {
    FacebookLoginButton,
    GoogleLoginButton,
    GithubLoginButton,
    AmazonLoginButton,
    InstagramLoginButton,
    LinkedInLoginButton,
    MicrosoftLoginButton,
    TwitterLoginButton,
    AppleLoginButton,
} from 'react-social-login-buttons'

import { useMutation } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';

import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/auth';
import { loginSocial } from '../../api/auth';

export default function SocialLogin() {
    const { signin } = useAuth();
    const router = useRouter();
    const [error, setError] = useState()

    const { isLoading, mutate }: any = useMutation<any, Error>(loginSocial, {
        onSuccess: (data) => {
            console.log(data)
            // const { role, permissions, access_token, name, user_id, email } = data;
            // setCookie("token", access_token);
            // signin(role, permissions, access_token, email, user_id, name, () => {
            //     console.log("asPath", sessionStorage.getItem("path"))
            //     let prev: any = sessionStorage.getItem("path");
            //     if (!prev) {
            //         prev = "/"
            //     }
            //     sessionStorage.removeItem("path");
            //     router.push(prev);
            // });
        },
        onError: ({ response }: any) => {
            (response.status === 422 || response.status === 401) &&
                setError(response.data);
        },
    });
    return (
        <div className='flex w-full justify-center space-x-3'>
            <GoogleLogin
                onSuccess={(credentialResponse: any) => {
                    const data: any = jwt_decode(credentialResponse.credential)
                    console.log(credentialResponse)
                    const { name, email } = data
                    if (name && email) {
                        mutate({ name, email })
                    }

                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />

            {/* <LoginSocialGoogle
                redirect_uri=''
                onLoginStart={onLoginStart}
                isOnlyGetToken
                client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIETNT_ID || ''}
                onResolve={({ provider, data }: any) => {
                    console.log(data)
                    axios
                        .get(`https://www.googleapis.com/oauth2/v1/userinfo.email?access_token=${data.access_token}`, {
                            headers: {
                                Authorization: `Bearer ${data.access_token}`,
                                Accept: 'application/json'
                            }
                        })
                        .then((res) => {
                            console.log(res.data);
                        })
                        .catch((err) => console.log(err));

                }}
                onReject={(err) => {
                    console.log(err)
                }}
            >
                <img src='./google.png' className='h-14 w-14 rounded-full border cursor-pointer' />
            
            </LoginSocialGoogle>
            <LoginSocialFacebook
                redirect_uri=''
                isOnlyGetToken
                appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || ''}
                onResolve={({ provider, data }: IResolveParams) => {
                    console.log(provider)
                    console.log(data)
                }}
                onReject={(err) => {
                    console.log(err)
                }}
            >
                <img src='./facebook.png' className='h-14 w-14 rounded-full border cursor-pointer' />

            </LoginSocialFacebook>
            <LoginSocialLinkedin
                isOnlyGetToken
                client_id={process.env.NEXT_PUBLIC_LINKEDIN_APP_ID || ''}
                client_secret={process.env.NEXT_PUBLIC_LINKEDIN_APP_SECRET || ''}
                redirect_uri={""}
                onResolve={({ provider, data }: IResolveParams) => {
                    console.log(provider)
                    console.log(data)
                }}
                onReject={(err: any) => {
                    console.log(err)
                }}
            >
                <img src='./linkedin.png' className='h-16 w-16 rounded-full border cursor-pointer' />
            </LoginSocialLinkedin>
            <LoginSocialTwitter
                isOnlyGetToken
                client_id={process.env.NEXT_PUBLIC_TWITTER_V2_APP_KEY || ''}
                redirect_uri={""}
                onResolve={({ provider, data }: IResolveParams) => {
                    console.log(provider)
                    console.log(data)
                }}
                onReject={(err: any) => {
                    console.log(err)
                }}
            >
                <img src='./twitter.png' className='h-16 w-16 rounded-full border cursor-pointer' />
            </LoginSocialTwitter> */}




        </div>
    )
}
