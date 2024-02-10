import React, { FormEvent, useEffect, useState } from 'react'
import { useAuth } from '../../../../hooks/auth'
import Dropdown from '../../../components/dropDown';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient, getDocumentTypeList, uploadPartnerDocuments } from '../../../api';
import { deletePartnerDocument, getPartnerDocuments } from '@/api/dashboard';
import Image from 'next/image';
import Zoom from 'react-medium-image-zoom'
import { Button, Input } from '@/components';
import { TrashIcon } from '@heroicons/react/24/outline';

function PartnerDashboard() {
    const { user: { canPublish } } = useAuth()
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
        ["partner-documents"],
        getPartnerDocuments, {
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
            const { data } = await apiClient.get(`partner-document/${filename}`)
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
    const handleDocumentDelete = (documentName: string) => {
        mutate(documentName)
    }
    const { mutate, isLoading } = useMutation(deletePartnerDocument, {
        onSuccess: (data: any, variable: any) => {
            setImages((prev: any) => (
                prev.filter((image: any) => image.filename != variable)
            ))
        }
    })

    return (
        <div>
            {
                !canPublish &&
                <div className="border rounded-md py-2 px-4 text-gray-dark">
                    <h1>Please uploaded required documents!</h1>
                    <div className="">
                        <form onSubmit={handleSubmit} className=" flex flex-col space-y-4">
                            <Dropdown label='Advertisement Type' data={documentTypeList} selectedValue={state?.documentType} onChange={(documentType: any) => {
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
            <div className="py-8">
                <div className="flex items-center gap-x-2 mb-4">
                    <h1 className='font-bold text-2xl'>Partner Documents</h1>
                    {
                        canPublish &&
                        <p className='text-accent1'>(Document locked, cannot edit/delete)</p>
                    }
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        images && images.map((image: any) => {
                            return <div className="flex flex-row justify-center border items-center">
                                <ImageZoom className='object-center' src={`data:image/jpeg;base64,${image?.data}`} width={400} height={400} alt="Documents" />
                                {
                                    !canPublish &&
                                    < Button buttonType='danger' className='w-8 h-8 relative left-2' icon={<TrashIcon className='w-5 h-5 self-center'
                                        onClick={(e: any) => handleDocumentDelete(image?.filename)} />} />
                                }
                            </div>
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default PartnerDashboard

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