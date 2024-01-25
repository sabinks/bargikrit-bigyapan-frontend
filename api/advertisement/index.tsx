import { apiClient } from "..";

export const addAdvertisement = async (data: any) => {
    return await apiClient.post(`/advertisements`, data, {
    });
};
export const showAdvertisement = async (data: any) => {
    const [name, id] = data?.queryKey
    return await apiClient.get(`/advertisements/${id}`);
};
export const updateAdvertisement = async (state: any) => {
    const { id, name, data, advertisementTypeId, districtId, provinceId, countryId, companyName, email, phone } = state
    return await apiClient.put(`/advertisements/${id}`, {
        name, data, advertisementTypeId, districtId, provinceId, countryId, companyName, email, phone,
    });
};

export const deleteAdvertisement = async (data: any) => {
    const { id } = data
    return await apiClient.delete(`/advertisements/${id}`);
};
export const advertisementStatusChange = async (data: any) => {
    const { id, status } = data
    await apiClient.post(`/advertisements/${id}/publish`,
        {
            status,
        });
};
export const getAdvertisementTypes = async (data: any) => {
    const response = await apiClient.get(`/advertisement-type`);
    return response.data;
}
export const advertisementFavourite = async (data: any) => {
    const { id, status } = data
    await apiClient.post(`/advertisement/${id}/favourite`,
        {
            status,
        });
};