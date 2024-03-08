import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { deleteCookie } from "cookies-next";
import { logout } from "../../api/auth";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

let headers: any = {
    "Content-Type": "application/json",
};

export const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
        ...headers,
    },
});

export const resetPassword = async (token: string, email: string, password: string) => {
    const response = await apiClient.post(`/reset-password`, {
        token,
        email,
        password,
    });
    return response.data;
};
export const forgotPassword = async (email: string) => {
    const response = await apiClient.post(`/forgot-password`, {
        email,
    });
};


export const getQueryData = async (state: any) => {
    const [name, query, sortby, order, page, pagination, publish, advertisementType, country, province] = state?.queryKey
    let pub = ''
    let assign = ''
    if (publish) {
        pub = `&publish=${publish}`
    }
    let url = query ? `/${name}?pageSize=${pagination}&offset=${page}&order=${order}&search=${query}&advertisementType=${advertisementType}&country=${country}&province=${province}` :
        `/${name}?pageSize=${pagination}&offset=${page}&sort=${order}&sortBy=${sortby}&advertisementType=${advertisementType}&country=${country}&province=${province}`
    const { data } = await apiClient.get(url);
    return data
};


export const getCountries = async () => {
    const { data } = await apiClient.get('/countries-list');
    return data;
}
export const getProvincesByCountryId = async (value: any) => {
    const [query, id] = value.queryKey
    const { data } = await apiClient.get(`/countries/${id}/provinces`)
    return data;
}
export const listProvincesByCountryId = async (id: number) => {
    const { data } = await apiClient.get(`/countries/${id}/provinces`)
    return data;
}
export const getProvinces = async () => {
    const { data } = await apiClient.get('/provinces');
    return data;
}
export const getDistricts = async () => {
    const response = await apiClient.get('/districts');
    return response;
}
export const getDistrictsByProvince = async (value: any) => {
    const { id } = value
    const response = await apiClient.get(`/provinces/${id}/districts`);
    return response;
}
export const getDocumentTypeList = async (value: any) => {
    const { id } = value
    const { data } = await apiClient.get(`/document-types`);
    return data;
}
export const uploadPartnerDocuments = async (value: any) => {
    const formData: any = new FormData()
    const { documentTypeId, images } = value

    if (images) {
        const keys = Object.keys(images);
        keys.forEach((key, i) => {
            formData.append(`images`, images[key])
        });
    }
    formData.append('documentTypeId', documentTypeId)
    const response = await apiClient.post(`/documents-submission`, formData, {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    });
    return response
}
export const getSingeQueryData = async (data: any) => {
    const [name, query, sortby, order, page, pagination, id] = data?.queryKey

    const url = query ? `/${name}/${id}/agents?pagination=${pagination}&page=${page}&order=${order}&search=${query}` :
        `/${name}/${id}/agents?pagination=${pagination}&page=${page}&order=${order}&order_by=${sortby}`

    const response = await apiClient.get(url);
    return response.data;
};

export const toggleIsActive = async (data: any) => {
    const response = await apiClient.post(`/user-status-change`, data);
    return response?.data
};

export const getList = async (data: any) => {
    const [name, property_id, company_id] = data?.queryKey

    let companyID = ''
    if (company_id) {
        companyID = `company_id=${company_id}`
    }
    let propertyId = ''
    if (property_id) {
        propertyId = `&property_id=${property_id}`
    }
    return await apiClient.get(`/${name}?${companyID}${propertyId}`);
};

export const showQueryData = async (data: any) => {
    const [name, id] = data?.queryKey
    return await apiClient.get(`/${name}/${id}`);
};

export const deleteById = async ({ name, id }: any) => {
    const response = await apiClient.delete(`/${name}/${id}`);
    return response
};
export const userRegisterForm = async (value: any) => {
    const { route, state } = value
    return await apiClient.post(`/${route}`, state);
}
export const searchUser = async (data: any) => {
    const [query] = data?.queryKey
    const response = await apiClient.get(`/user-list?search=${query}`);
    return response
};
export const userActiveStatusChange = async (id: number, status: boolean) => {
    const response = await apiClient.post(`/user-status-change`,
        {
            id,
            status,
        });
    return response;
};
export const userStatusChange = async (data: any) => {
    const { id, status } = data
    await apiClient.post(`/user-status-change/${id}`,
        {
            status,
        });
};
export const userCanPublishChange = async (data: any) => {
    const { id, status } = data
    await apiClient.post(`/user-can-publish/${id}`,
        {
            status,
        });
};
export const userFavouriteAdsChange = async (data: any) => {
    const { id, status } = data
    await apiClient.post(`/advertisement/${id}/favourite`,
        {
            status,
        });
};
apiClient.interceptors.response.use(
    function (response) {
        const { status, data } = response;
        if (status == 201 || status == 200) {
            toast.success(data, { autoClose: 2500 });
        }
        if (status == 205) {
            toast.success(data, { autoClose: 2500 });
        }
        return response;
    },
    function (error) {
        const { status, data } = error.response;

        if (status == 400 || status == 403 || status == 404 || status == 409) {
            toast.error(data.message, { autoClose: 3500 });
        }
        if (status == 401) {
            deleteCookie("token");
            deleteCookie("role");
            window.location.reload();
        }
        if (status == 500) {
            toast.error("Server Error!", { autoClose: 2500 });
        }
        if (status == 413) {
            toast.error("File size large!", { autoClose: 2500 });
        }
        if (status == 422) {
            toast.error("Please fill form !", { autoClose: 2500 });
        }
        return Promise.reject(error);
    }
);

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
})
export const sendContact = async (data: {
    name: string;
    email: string;
    phone: string | number;
    subject: string;
    message: string;
}) => {
    const response = await apiClient.post(`/next/contact-form-send-mail`, data);
    return response;
};

export const siteVisited = async (data: any) => {
    await apiClient.post(`/next/site-visit-count`, data);
};

apiClient.interceptors.request.use(async (config: any) => {
    if (config.method == 'delete') {
        let modal = Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1ea432e6',
            cancelButtonColor: '#9F1853',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
        })
        const { isConfirmed, dismiss } = await modal;
        if (isConfirmed) {
            return config
        }
    } else {
        return config
    }
}, (error) => {
    console.log(error, 'error')
    return Promise.reject(error)
})

