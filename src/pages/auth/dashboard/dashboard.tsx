import React, { FormEvent, useEffect, useState } from 'react'
import { useAuth } from '../../../../hooks/auth'
import Dropdown from '../../../components/dropDown';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient, getDocumentTypeList, uploadPartnerDocuments } from '../../../api';
import { deletePartnerDocument, getMembersDocuments } from '@/api/dashboard';
import Image from 'next/image';
import Zoom from 'react-medium-image-zoom'
import { Button, Input } from '@/components';
import { TrashIcon } from '@heroicons/react/24/outline';
import Head from 'next/head';

function Dashboard() {
    const { user: { canPublish, remainingAds, currentPublishedAds } } = useAuth()
    const [documentTypeList, setDocumentTypeList] = useState<any>([])
    const [documentList, setDocumentList] = useState<any>([])
    const [image, setImage] = useState<any>({})
    const [images, setImages] = useState<any>([])
    const [state, setState] = useState<any>({
        documentTypeId: "",
        images: null
    });
    const [errors, setErrors] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)

    const { refetch } = useQuery(
        ["document-type-list"],
        getDocumentTypeList, {
        onSuccess: (data: any) => {
            setDocumentTypeList(data)
        }
    })
    const { refetch: partnerDocumentsRefetch } = useQuery(
        ["member-documents"],
        getMembersDocuments, {
        onSuccess: (data: any) => {
            setDocumentList(data)
        }
    })

    useEffect(() => {
        if (documentList.length) {
            setImages([])
            for (let index = 0; index < documentList.length; index++) {
                const element = documentList[index];
                loadImages(element?.documentName)
            }
        }
    }, [documentList])

    const loadImages = async (filename: string) => {
        try {
            const { data } = await apiClient.get(`member-document/${filename}`)
            setImages((prev: any) => (
                [...prev, { filename, data }]
            ))
        } catch (error) {
            console.log('error occured for image fetch');
        }
    }

    const handleImage = (e: any) => {
        const { name, files } = e.target
        setState((prev: any) => ({ ...prev, images: files }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            const response = await uploadPartnerDocuments(state);
            setState((prev: any) => ({
                ...prev, message: response.data
            }))
            setState({ images: null, documentTypeId: 0 });
            setLoading(false)
            setImages([])
            partnerDocumentsRefetch()
        } catch (error: any) {
            const { data } = error.response;
            setErrors(data);
            setLoading(false);
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
                        <form onSubmit={handleSubmit} className=" flex flex-col space-y-4">
                            <Dropdown label='Document Type' data={documentTypeList} selectedValue={state?.documentType} onChange={(documentType: any) => {
                                setState((prev: any) => ({
                                    ...prev, documentTypeId: documentType?.id, documentType
                                }))
                            }} />

                            <div>
                                <Input type='file' name='images' label='Select images' onChange={handleImage} />
                                <p className='text-red-500 text-sm'>{errors?.image}</p>
                            </div>
                            <Button
                                label="Submit"
                                // buttonType="submit"
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