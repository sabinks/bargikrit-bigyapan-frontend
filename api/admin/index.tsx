import { apiClient } from "..";

export const addAdmin = async (data: any) => {
    const { id, route } = data
    const formData: any = new FormData()
    if (data.profile_image && typeof data.profile_image != 'string') {
        formData.append(`profile_image`, data.profile_image)
    }
    if (data?.contract_document) {
        const keys = Object.keys(data?.contract_document)
        keys.map((key, index) => {
            formData.append(`contract_document[${index}]`, data?.contract_document[key])
        })
    }
    if (data?.data) {
        formData.append(`data`, JSON.stringify(data?.data))
    }
    let url = `/${route}`
    if (id) {
        formData.append('_method', "PUT")
        url = `/${route}/${id}`
    }

    const array = ["subagency_id", "contact_no", "name", "email", "is_active", "password"]
    array.map(item => {
        data?.[item] != undefined && data?.[item] && formData.append(`${item}`, data[item])
    })

    const response = await apiClient.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data
};