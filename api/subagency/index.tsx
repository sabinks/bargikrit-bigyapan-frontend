import { apiClient } from "..";

export const addAgency = async (data: any) => {
    const { id, route } = data
    const formData: any = new FormData()
    if (data?.profile_image && typeof data?.profile_image != 'string') {
        formData.append(`profile_image`, data.profile_image)
    }

    if (data?.logo && typeof data?.logo != 'string') {
        formData.append(`logo`, data.logo)
    }
    if (data?.contract_document) {
        const keys = Object.keys(data?.contract_document)
        keys.map((key, index) => {
            formData.append(`contract_document[${index}]`, data?.contract_document[key])
        })
    }

    let url = `/${route}`
    if (id) {
        formData.append('_method', "PUT")
        url = `/${route}/${id}`
    }

    const array = [
        "subagency_id",
        "name",
        "email",
        "password",
        'contact_no',
        'vat',
        'pan',
        'website',
        'contract_start_date',
        'contract_end_date',
        'add_sold_commission',
        'assign_sold_commission',
        'other_sold_commission',
        'add_commission'
    ]
    array.map(item => {
        data?.[item] != undefined && data?.[item] && formData.append(`${item}`, data[item])
    })

    const response = await apiClient.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data
};