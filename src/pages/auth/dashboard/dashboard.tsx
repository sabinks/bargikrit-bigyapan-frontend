import React, { FormEvent, useEffect, useMemo, useState } from 'react'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { useAuth } from '../../../../hooks/auth'
import Dropdown from '../../../components/dropDown';
import { useQuery } from '@tanstack/react-query';
import { apiClient, getDocumentTypeList, uploadPartnerDocuments } from '../../../api';
import { getMembersDocuments } from '@/api/dashboard';
import Image from 'next/image';
import Zoom from 'react-medium-image-zoom'
import { Button, Input } from '@/components';
import Head from 'next/head';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type InputType = {
    documentTypeId?: string;
    images?: [];
}

function Dashboard() {
    const { user: { canPublish, remainingAds, currentPublishedAds }, isAuthenticated } = useAuth()
    const [documentTypeList, setDocumentTypeList] = useState<any>([])
    const [state, setState] = useState<any>({
        documentType: null,
    });
    const [loading, setLoading] = useState<boolean>(false)
    const validationSchema = useMemo(
        () =>
            yup.object().shape(
                {
                    documentTypeId: yup.mixed().test({ name: 'documentTypeId', message: 'Document type required', test: (value: any) => value != "" }),
                    images: yup.mixed()
                        .test({
                            name: 'images', message: 'Document(s) is required', test: (value: any) => {
                                return value.length > 0
                            }
                        })
                        .test("fileType", "Unsupported File Format", (value: any) => {
                            for (let i = 0; i < value.length; i++) {
                                if (value[i].type != "image/png" && value[i].type != "image/jpg" && value[i].type != "image/jpeg") {
                                    return false;
                                }
                            }
                            return true
                        })
                }),
        []
    );
    const {
        register,
        handleSubmit,
        setValue, reset,
        formState: { errors },
    } = useForm<InputType>({
        resolver: yupResolver<yup.AnyObject>(validationSchema),
        defaultValues: { documentTypeId: '', images: [] }
    })

    const onSubmit: SubmitHandler<InputType> = async (state) => {
        try {
            const response = await uploadPartnerDocuments(state);
            reset()
            setState((prev: any) => ({ ...prev, documentType: null }))
        } catch (error: any) {
        }
    }

    const { refetch } = useQuery(
        ["document-type-list"],
        getDocumentTypeList, {
        onSuccess: (data: any) => {
            setDocumentTypeList(data)
        },
        enabled: isAuthenticated
    })

    const handleImage = (e: any) => {
        const { name, files } = e.target
        setState((prev: any) => ({ ...prev, images: files }))
    }


    const handleSubmit1 = async (e: FormEvent) => {
        for (let index = 0; index < state.images?.length; index++) {
            const file = state.images[index];
            // if (file.size > imageRequirement.fileSize) {
            //     setImageErrors((prev: any) => ({
            //         ...prev, fileSize: 'File upload size limit is 2MB.'
            //     }))
            // }
        }
    };

    return (
        <div>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Dashboard</h3>
                {/* <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p> */}
            </div>
            {
                !canPublish &&
                <div className="border rounded-md py-2 px-4 text-gray-dark">
                    <h1>Please uploaded required documents!</h1>
                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col space-y-4">
                            <Dropdown
                                label='Document Type' {...register('documentTypeId')}
                                data={documentTypeList}
                                selectedValue={state?.documentType}
                                onChange={(documentType: any) => {
                                    setState((prev: any) => ({
                                        ...prev, documentType
                                    }))
                                    setValue('documentTypeId', documentType?.id, { shouldDirty: true, shouldValidate: true, shouldTouch: true })
                                }} />
                            <p className='text-red-500 text-sm'>{errors?.documentTypeId?.message}</p>
                            <div className='flex flex-col'>
                                <label className="text-sm text-gray-700 font-bold py-1">Upload Document(s): (File Format: jpg, png) </label>
                                <input type='file' {...register('images')} onChange={(e: any) => handleImage(e)} multiple />
                            </div>
                            <p className='text-red-500 text-sm'>{errors?.images?.message}</p>
                            {/* <Controller
                                name="images"
                                control={control}
                                defaultValue={[]}
                                render={({ field }) => (
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            field.onChange(e.target.files);
                                        }}
                                        multiple
                                    />
                                )}
                            /> */}
                            <Button
                                label="Submit"
                                buttonType="submit"
                                loading={loading}
                                type="submit"
                                className="my-6 py-2 bg-primary hover:text-white rounded-md w-96"
                            />
                        </form>
                    </div>
                </div>
            }


            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Total published Ads</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{currentPublishedAds}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Remaining Ads Publish Count</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{remainingAds}</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default Dashboard

export const ImageZoom = ({ src, alt, width, height, className }: any) => (
    <Zoom>
        <Image
            alt={alt}
            src={src}
            width={width}
            height={height}
            className={className}
        />
    </Zoom>
)