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

function MemberDocuments() {
    const { user: { canPublish }, isAuthenticated, getUserDetails } = useAuth()
    const [documentList, setDocumentList] = useState<any>([])
    const [images, setImages] = useState<any>([])
    const [state, setState] = useState<any>({
        documentTypeId: "",
        images: null
    });
    const [errors, setErrors] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        getUserDetails()
    }, [isAuthenticated])
    const { refetch: partnerDocumentsRefetch } = useQuery(
        ["member-documents"],
        getMembersDocuments, {
        onSuccess: (data: any) => {
            setDocumentList(data)
        },
        enabled: isAuthenticated
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
            <div className="py-8">
                <div className="flex items-center gap-x-2 mb-4">
                    <h1 className='font-bold text-2xl'>Partner Documents</h1>
                    {
                        canPublish &&
                        <p className='text-accent1 text-sm'>(Document locked, cannot edit/delete)</p>
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

export default MemberDocuments

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