import React, { FormEvent, useState } from 'react'
import { useAuth } from '../../../../hooks/auth'
import { Button, Input } from '../../../../component';
import Dropdown from '../../../../component/dropDown';
import { ja } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';
import { getDocumentTypeList, uploadPartnerDocuments } from '../../../../api';

function PartnerDashboard() {
    const [documentTypeList, setDocumentTypeList] = useState<any>([])
    const [state, setState] = useState<any>({
        documentTypeId: "",
        images: null
    });
    const [errors, setErrors] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)
    const { user: { canPublish } } = useAuth()
    console.log(canPublish);

    useQuery(
        ["document-type-list"],
        getDocumentTypeList, {
        onSuccess: (data: any) => {
            console.log(data);

            setDocumentTypeList(data)
        }
    })
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
        } catch (error: any) {
            const { data } = error.response;
            setErrors(data);
            setLoading(false);
        }
    };
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
        </div>
    )
}

export default PartnerDashboard