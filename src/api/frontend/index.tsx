import { apiClient } from "../../../api";

export const getNextAdvertisementTypes = async () => {
    const response = await apiClient.get(`/next/advertisement-type`);
    return response.data;
}
export const getNextQueryData = async (state: any) => {
    const [name, query, sortby, order, page, pagination, advertisementType, country, province, search] = state?.queryKey
    let url = query ? `/${name}?pageSize=${pagination}&offset=${page}&order=${order}&search=${query}&advertisementType=${advertisementType}&country=${country}&province=${province}&search=${search}` :
        `/${name}?pageSize=${pagination}&offset=${page}&sort=${order}&sortBy=${sortby}&advertisementType=${advertisementType}&country=${country}&province=${province}&search=${search}`
    const { data } = await apiClient.get(url);
    return data
};
