import { apiClient } from "..";

export const getProperty = async () => {
    const response = await apiClient.get(`/property`);
    return response.data;
};

export const showProperty = async (id: number) => {
    const response = await apiClient.get(`/property/${id}`);
    return response.data;
};

export const publishProperty = async (data: any) => {
    const { id, publish } = data
    const response = await apiClient.post(`/property/${id}/publish`, { publish });
    return response.data;
};

export const propertyStatus = async (data: any) => {
    const { id, active } = data
    const response = await apiClient.post(`/property/${id}/active`, { active });
    return response.data;
};


export const soldProperty = async (data: any) => {
    const { id, soldData } = data
    const response = await apiClient.post(`/property/${id}/sold`, soldData);
    return response.data;
};

export const deleteProperty = async (id: any) => {
    const response = await apiClient.delete(`/property/${id}`);
    return response.data;
};

export const addProperty = async (data: any) => {
    const { id, floor_plans, image } = data;
    const formData: any = new FormData();

    if (image.length > 0) {
        image.forEach(({ file, id }: any) => {
            formData.append(`image[${id}]`, file);
        });
    }

    if (floor_plans.length > 0) {
        floor_plans.forEach(({ file, id }: any) => {
            formData.append(`floor_plan[${id}]`, file);
        });
    }


    let url = `/property`;

    formData.append("data", JSON.stringify(data.data));

    if (data?.video_urls[0]?.video_title) {
        formData.append("video_urls", JSON.stringify(data?.video_urls));
    }

    const array = [
        "category_id",
        "title",
        "description",
        "location",
        "latitude",
        "longitude",
        "price",
        "property_type",
        "slug",
        "commission_type",
        "commission",
        "created_by",
        "name",
        "contact_no",
        "email",
        "address",
    ];
    array.map((item) => {
        if (data?.[item]) {
            formData.append(`${item}`, data[item]);
        }
    });

    if (id) {
        formData.append("_method", "PUT");
        formData.append("floor_plan_id", JSON.stringify(data?.removedItems))
        url = `/property/${id}`;
    }

    const response = await apiClient.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const listMedia = async (data: any) => {
    const [name, id] = data?.queryKey;
    const response = await apiClient.get(`/${name}/${id}`);
    return response.data;
};

export const deleteMedia = async (data: any) => {
    const { name, id } = data;
    const response = await apiClient.delete(`/${name}/${id}`);
    return response.data;
};
