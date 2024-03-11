import { apiClient } from "..";

export const getNextCategoryList = async () => {
    const response = await apiClient.get(`/next/categories`);
    return response.data;
}
export const getNextQueryData = async (state: any) => {
    const [name, query, sortby, order, page, pagination, catIds, country, province, search] = state?.queryKey
    let url = query ? `/${name}?pageSize=${pagination}&offset=${page}&order=${order}&search=${query}&catIds=${catIds}&country=${country}&province=${province}&search=${search}` :
        `/${name}?pageSize=${pagination}&offset=${page}&sort=${order}&sortBy=${sortby}&catIds=${catIds}&country=${country}&province=${province}&search=${search}`
    const { data } = await apiClient.get(url);
    return data
};
