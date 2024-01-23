import { apiClient } from "..";

export const getAssignedList = async (data: any) => {
    const [name, property_id, company_id] = data?.queryKey
    let subagency = ""
    if (company_id) {
        subagency = `&company_id=${company_id}`
    }
    const response = await apiClient.get(`/${name}?property_id=${property_id}${subagency}`);
    return response.data;
};