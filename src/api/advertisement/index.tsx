import { apiClient } from "..";

export const addAdvertisement = async (state: any) => {
    const formData = new FormData()
    const keys = Object.keys(state)
    const index = keys.indexOf('adImages')
    if (index) {
        keys.splice(index, 1);
        const images = state['adImages']
        for (let index = 0; index < state['adImages'].length; index++) {
            formData.append(`adImages`, images[index])
        }
    }
    keys.forEach((key: string) => {
        formData.append(key, state[key])
    })
    return await apiClient.post(`/advertisements`,
        formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const showAdvertisement = async (data: any) => {
    const [name, id] = data?.queryKey
    return await apiClient.get(`/advertisements/${id}`);
};
export const updateAdvertisement = async (state: any) => {
    const { id, name, data, advertisementTypeId, districtId, provinceId, countryId, companyName, email, contactNumber, website } = state
    return await apiClient.put(`/advertisements/${id}`, {
        name, data, advertisementTypeId, districtId, provinceId, countryId, companyName, email, contactNumber, website,
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