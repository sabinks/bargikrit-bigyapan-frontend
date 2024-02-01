import { apiClient } from "../../src/api";

export const advanceSearch = async (data: any) => {


    const query = ['bathrooms', 'bedrooms', 'floors', 'air_condition', 'cable_tv', 'elevator', 'fireplace', 'garage', 'grill', 'intercom', 'pet_friendly', 'ventilation', 'wifi', 'category', 'type', 'min_area', 'max_area', 'max_price', 'address']

    let url = `filter-property?min_price=${data?.min_price}`
    query.map((key: any) => {
        if (key in data) {
            const newParam = `&${key}=${data?.[key]}`
            url = url + newParam
        }
    })
    const response = await apiClient.get(url);
    return response.data;
};