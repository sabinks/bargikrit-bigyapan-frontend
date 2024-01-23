import { apiClient } from "..";

export const updateInfo = async (data: any) => {
    const formData: any = new FormData()

    if (data?.logo && typeof data?.logo != 'string') {
        formData.append(`logo`, data.logo)
    }

    const array = [
        "name",
        "email",
        'contact_no',
        'vat',
        'pan',
    ]
    array.map(item => {
        data?.[item] != undefined && data?.[item] && formData.append(`${item}`, data[item])
    })

    const response = await apiClient.post('update-daludai-info', formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data
};