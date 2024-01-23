import { apiClient } from "..";

export const addPayment = async (data: any) => {
    const { id, route } = data
    const formData: any = new FormData()
    if (data?.receipt && typeof data.profile_image != 'string') {
        formData.append(`receipt`, data.receipt)
    }

    let url = `/${route}`
    if (id) {
        formData.append('_method', "PUT")
        url = `/${route}/${id}`
    }

    const array = ["amount", "remark", "pay_company_id", "sale_id"]
    array.map(item => {
        data?.[item] != undefined && data?.[item] && formData.append(`${item}`, data[item])
    })

    const response = await apiClient.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data
};