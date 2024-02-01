import { apiClient } from "../../src/api";

export const addAdvertisement = async (data: any) => {
    return await apiClient.post(`/advertisements`, data, {
    });
};
export const showAdvertisement = async (data: any) => {
    const [name, id] = data?.queryKey
    return await apiClient.get(`/advertisements/${id}`);
};
export const updateAdvertisement = async (state: any) => {
    const { id, name, data, advertisementTypeId, districtId, provinceId, countryId, companyName, email, contactNumber } = state
    return await apiClient.put(`/advertisements/${id}`, {
        name, data, advertisementTypeId, districtId, provinceId, countryId, companyName, email, contactNumber,
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
export const getAdvertisementTypes = async () => {
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